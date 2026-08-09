/**
 * Chemistry Engine - Equation Parsing, Matrix Balancing, Electrolysis & Calculation Engine
 */

// Global Chemical Weights lookup
const ELEMENT_WEIGHTS = {};
if (typeof PERIODIC_TABLE_DATA !== 'undefined') {
    PERIODIC_TABLE_DATA.forEach(el => {
        ELEMENT_WEIGHTS[el.symbol] = el.mass;
    });
}

// Additional fallback masses
ELEMENT_WEIGHTS['H'] = 1.008;
ELEMENT_WEIGHTS['He'] = 4.003;
ELEMENT_WEIGHTS['Li'] = 6.94;
ELEMENT_WEIGHTS['Be'] = 9.012;
ELEMENT_WEIGHTS['B'] = 10.81;
ELEMENT_WEIGHTS['C'] = 12.011;
ELEMENT_WEIGHTS['N'] = 14.007;
ELEMENT_WEIGHTS['O'] = 15.999;
ELEMENT_WEIGHTS['F'] = 18.998;
ELEMENT_WEIGHTS['Na'] = 22.99;
ELEMENT_WEIGHTS['Mg'] = 24.305;
ELEMENT_WEIGHTS['Al'] = 26.982;
ELEMENT_WEIGHTS['Si'] = 28.085;
ELEMENT_WEIGHTS['P'] = 30.974;
ELEMENT_WEIGHTS['S'] = 32.06;
ELEMENT_WEIGHTS['Cl'] = 35.45;
ELEMENT_WEIGHTS['K'] = 39.098;
ELEMENT_WEIGHTS['Ca'] = 40.078;
ELEMENT_WEIGHTS['Cr'] = 51.996;
ELEMENT_WEIGHTS['Mn'] = 54.938;
ELEMENT_WEIGHTS['Fe'] = 55.845;
ELEMENT_WEIGHTS['Cu'] = 63.546;
ELEMENT_WEIGHTS['Zn'] = 65.38;
ELEMENT_WEIGHTS['Br'] = 79.904;
ELEMENT_WEIGHTS['Ag'] = 107.87;
ELEMENT_WEIGHTS['I'] = 126.90;
ELEMENT_WEIGHTS['Ba'] = 137.33;
ELEMENT_WEIGHTS['Au'] = 196.97;
ELEMENT_WEIGHTS['Pb'] = 207.2;

/**
 * Parse a chemical formula into element counts.
 * e.g., "Fe2(SO4)3" -> { Fe: 2, S: 3, O: 12 }
 */
function parseFormula(formula) {
    // Strip charge indicators if present
    const cleanForm = formula.replace(/[+-]\d*$/g, '').trim();
    const stack = [{}];
    const regex = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
    let match;

    while ((match = regex.exec(cleanForm)) !== null) {
        if (match[1]) { // Element symbol + optional count
            const elem = match[1];
            const count = match[2] ? parseInt(match[2], 10) : 1;
            const currentScope = stack[stack.length - 1];
            currentScope[elem] = (currentScope[elem] || 0) + count;
        } else if (match[3]) { // Left paren '('
            stack.push({});
        } else if (match[4]) { // Right paren ')' + optional multiplier
            const mult = match[5] ? parseInt(match[5], 10) : 1;
            const popped = stack.pop();
            const currentScope = stack[stack.length - 1];
            for (let el in popped) {
                currentScope[el] = (currentScope[el] || 0) + popped[el] * mult;
            }
        }
    }
    return stack[0];
}

/**
 * Calculate Molar Mass of a chemical formula string
 * e.g., "H2O" -> 18.015
 */
function calculateMolarMass(formula) {
    if (!formula || typeof formula !== 'string') return 0;
    try {
        const parsed = parseFormula(formula.trim());
        let totalMass = 0;
        for (let elem in parsed) {
            const weight = ELEMENT_WEIGHTS[elem] || 0;
            totalMass += weight * parsed[elem];
        }
        return Math.round(totalMass * 1000) / 1000;
    } catch (e) {
        return 0;
    }
}

/**
 * Balance Chemical Equation using linear system / matrix reduction
 */
function balanceEquation(inputStr) {
    if (!inputStr || !inputStr.includes('->') && !inputStr.includes('=')) {
        // Search preset if available
        if (typeof PRESET_REACTIONS !== 'undefined') {
            const found = PRESET_REACTIONS.find(r => r.equation.toLowerCase().replace(/\s+/g, '') === inputStr.toLowerCase().replace(/\s+/g, ''));
            if (found) return found;
        }
        throw new Error("Vui lòng nhập phương trình dạng: A + B -> C + D");
    }

    const normInput = inputStr.replace('=', '->');
    const parts = normInput.split('->');
    const leftStr = parts[0].trim();
    const rightStr = parts[1].trim();

    // Check presets first for full rich metadata
    if (typeof PRESET_REACTIONS !== 'undefined') {
        const matched = PRESET_REACTIONS.find(r => {
            const cleanReq = normInput.toLowerCase().replace(/\s+/g, '');
            const cleanEq = r.equation.toLowerCase().replace(/\s+/g, '');
            return cleanReq === cleanEq;
        });
        if (matched) return matched;
    }

    const reactants = leftStr.split('+').map(s => s.trim()).filter(Boolean);
    const products = rightStr.split('+').map(s => s.trim()).filter(Boolean);

    if (reactants.length === 0 || products.length === 0) {
        throw new Error("Phương trình phải có ít nhất 1 chất tham gia và 1 chất sản phẩm.");
    }

    const allSpecies = [...reactants, ...products];
    const parsedSpecies = allSpecies.map(s => parseFormula(s));

    // Gather unique elements
    const elementSet = new Set();
    parsedSpecies.forEach(p => {
        Object.keys(p).forEach(el => elementSet.add(el));
    });
    const elements = Array.from(elementSet);

    // Build matrix
    const numEq = elements.length;
    const numVar = allSpecies.length;
    const matrix = [];

    for (let i = 0; i < numEq; i++) {
        const el = elements[i];
        const row = [];
        // Reactants (+)
        for (let j = 0; j < reactants.length; j++) {
            row.push(parsedSpecies[j][el] || 0);
        }
        // Products (-)
        for (let j = 0; j < products.length; j++) {
            row.push(-(parsedSpecies[reactants.length + j][el] || 0));
        }
        matrix.push(row);
    }

    // Solve for small integer coefficients (Brute-force / integer search up to 20 for typical school chemistry)
    const coeffs = findIntegerCoefficients(matrix, numVar);

    if (!coeffs) {
        throw new Error("Không thể tìm thấy hệ số cân bằng phù hợp cho phương trình này.");
    }

    // Format balanced output
    const leftTerms = reactants.map((r, i) => (coeffs[i] === 1 ? '' : coeffs[i]) + r);
    const rightTerms = products.map((p, i) => (coeffs[reactants.length + i] === 1 ? '' : coeffs[reactants.length + i]) + p);
    const balancedStr = leftTerms.join(' + ') + ' -> ' + rightTerms.join(' + ');

    // Deduce reaction types and ion forms
    let type = "Phản ứng Hóa học";
    if (reactants.length === 1 && products.length > 1) type = "Phản ứng Phân hủy";
    else if (reactants.length > 1 && products.length === 1) type = "Phản ứng Hóa hợp";
    else if (inputStr.toLowerCase().includes('hno3') || inputStr.toLowerCase().includes('kmno4') || inputStr.toLowerCase().includes('k2cr2o7')) {
        type = "Phản ứng Oxi hóa - Khử";
    }

    return {
        equation: inputStr,
        balanced: balancedStr,
        coefficients: coeffs,
        reactants: reactants,
        products: products,
        type: type,
        ionFull: generateIonEquation(balancedStr, false),
        ionNet: generateIonEquation(balancedStr, true),
        redoxInfo: null
    };
}

/**
 * Solve matrix for integer coefficients using small brute-force bounds
 */
function findIntegerCoefficients(matrix, numVar) {
    // Try integer vector solutions
    const maxCoeff = 20;
    
    // Recursive search
    function search(index, currentVector) {
        if (index === numVar) {
            // Check if matrix * currentVector == 0
            for (let r = 0; r < matrix.length; r++) {
                let sum = 0;
                for (let c = 0; c < numVar; c++) {
                    sum += matrix[r][c] * currentVector[c];
                }
                if (sum !== 0) return null;
            }
            return [...currentVector];
        }

        for (let val = 1; val <= maxCoeff; val++) {
            currentVector[index] = val;
            const res = search(index + 1, currentVector);
            if (res) return res;
        }
        return null;
    }

    return search(0, new Array(numVar).fill(1));
}

/**
 * Generate Ion Equations (Full & Net) for common soluble electrolytes
 */
function generateIonEquation(balancedStr, isNet) {
    if (!balancedStr) return "";
    let result = balancedStr;
    // Common replacements for display
    result = result.replace(/HCl/g, "H⁺ + Cl⁻")
                   .replace(/NaOH/g, "Na⁺ + OH⁻")
                   .replace(/KOH/g, "K⁺ + OH⁻")
                   .replace(/HNO3/g, "H⁺ + NO3⁻")
                   .replace(/H2SO4/g, "2H⁺ + SO4²⁻")
                   .replace(/NaCl/g, "Na⁺ + Cl⁻")
                   .replace(/BaCl2/g, "Ba²⁺ + 2Cl⁻")
                   .replace(/Na2SO4/g, "2Na⁺ + SO4²⁻");
                   
    if (isNet) {
        if (balancedStr.includes("NaOH") && balancedStr.includes("HCl")) {
            return "H⁺ + OH⁻ -> H₂O";
        }
        if (balancedStr.includes("BaCl2") && balancedStr.includes("Na2SO4")) {
            return "Ba²⁺ + SO₄²⁻ -> BaSO₄↓";
        }
    }
    return result;
}

/**
 * Chemistry Calculator Utility Functions
 */
const ChemCalc = {
    // 1. Calculate Mol (n)
    calcMolByMass: (m, M) => (M > 0 ? m / M : 0),
    calcMolByVolGas: (V, isSTP = true) => (isSTP ? V / 22.4 : V / 24.79), // 22.4L or 24.79L under standard state
    calcMolByMolarity: (CM, Vliters) => CM * Vliters,

    // 2. Calculate Gas Volume (V)
    calcVolGas: (n, isSTP = true) => (isSTP ? n * 22.4 : n * 24.79),

    // 3. Calculate Mass (m)
    calcMass: (n, M) => n * M,

    // 4. Calculate Percentage Concentration (C%)
    calcCPercent: (mSolute, mSolution) => (mSolution > 0 ? (mSolute / mSolution) * 100 : 0),
    calcSoluteMassByCPercent: (mSolution, Cpercent) => (mSolution * Cpercent) / 100,

    // 5. Calculate Molar Concentration (C_M)
    calcMolarity: (nSolute, Vliters) => (Vliters > 0 ? nSolute / Vliters : 0),
    calcCMFromCPercent: (Cpercent, D_gml, M) => (M > 0 ? (10 * D_gml * Cpercent) / M : 0)
};
