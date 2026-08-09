/**
 * CHEM THCS - Chemical Equation Balancer & Atom Counter Utility
 */

/**
 * Balance Equation & Verify Atom Counts on both sides
 */
function balanceAndVerifyEquation(eqStr) {
    if (!eqStr || (!eqStr.includes('->') && !eqStr.includes('='))) {
        throw new Error("Vui lòng nhập phương trình dạng: A + B -> C + D");
    }

    const normStr = eqStr.replace('=', '->');
    const parts = normStr.split('->');
    const leftStr = parts[0].trim();
    const rightStr = parts[1].trim();

    const reactants = leftStr.split('+').map(s => s.trim()).filter(Boolean);
    const products = rightStr.split('+').map(s => s.trim()).filter(Boolean);

    if (reactants.length === 0 || products.length === 0) {
        throw new Error("Phương trình phải có cả chất tham gia và sản phẩm.");
    }

    const allSpecies = [...reactants, ...products];
    const parsed = allSpecies.map(s => parseChemicalFormula(s));

    // Element set
    const elementSet = new Set();
    parsed.forEach(p => Object.keys(p).forEach(k => elementSet.add(k)));
    const elements = Array.from(elementSet);

    // Build coefficient matrix
    const numEq = elements.length;
    const numVar = allSpecies.length;
    const matrix = [];

    for (let i = 0; i < numEq; i++) {
        const el = elements[i];
        const row = [];
        for (let j = 0; j < reactants.length; j++) {
            row.push(parsed[j][el] || 0);
        }
        for (let j = 0; j < products.length; j++) {
            row.push(-(parsed[reactants.length + j][el] || 0));
        }
        matrix.push(row);
    }

    // Solve for small integer coefficients (up to 20)
    function searchCoeffs(index, vector) {
        if (index === numVar) {
            for (let r = 0; r < matrix.length; r++) {
                let sum = 0;
                for (let c = 0; c < numVar; c++) {
                    sum += matrix[r][c] * vector[c];
                }
                if (sum !== 0) return null;
            }
            return [...vector];
        }
        for (let v = 1; v <= 20; v++) {
            vector[index] = v;
            const res = searchCoeffs(index + 1, vector);
            if (res) return res;
        }
        return null;
    }

    const coeffs = searchCoeffs(0, new Array(numVar).fill(1));

    if (!coeffs) {
        throw new Error("Không thể cân bằng tự động phương trình này. Vui lòng kiểm tra lại công thức hóa học các chất.");
    }

    // Build balanced output string
    const leftTerms = reactants.map((r, i) => (coeffs[i] === 1 ? '' : coeffs[i]) + r);
    const rightTerms = products.map((p, i) => (coeffs[reactants.length + i] === 1 ? '' : coeffs[reactants.length + i]) + p);
    const balancedEquation = leftTerms.join(' + ') + ' → ' + rightTerms.join(' + ');

    // Atom verification count on Left vs Right
    const atomCheck = elements.map(el => {
        let leftCount = 0;
        let rightCount = 0;
        for (let j = 0; j < reactants.length; j++) {
            leftCount += (parsed[j][el] || 0) * coeffs[j];
        }
        for (let j = 0; j < products.length; j++) {
            rightCount += (parsed[reactants.length + j][el] || 0) * coeffs[reactants.length + j];
        }
        return {
            element: el,
            left: leftCount,
            right: rightCount,
            isEqual: leftCount === rightCount
        };
    });

    return {
        original: eqStr,
        balanced: balancedEquation,
        coefficients: coeffs,
        reactants: reactants,
        products: products,
        atomCheck: atomCheck,
        isBalanced: atomCheck.every(a => a.isEqual)
    };
}
