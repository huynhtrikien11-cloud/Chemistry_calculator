/**
 * CHEM THCS - Advanced Chemical Formula Parser
 * Parses multi-level chemical formulas with parentheses, indices, e.g. Ca(OH)2, Al2(SO4)3, (NH4)2SO4, Fe3O4.
 */

// Lookup map for element atomic mass from ELEMENTS_DATA
function getElementData(sym) {
    if (typeof ELEMENTS_DATA !== 'undefined') {
        return ELEMENTS_DATA.find(e => e.symbol === sym) || null;
    }
    return null;
}

/**
 * Parse chemical formula string into element counts object.
 * e.g., "Al2(SO4)3" -> { Al: 2, S: 3, O: 12 }
 */
function parseChemicalFormula(formulaStr) {
    if (!formulaStr || typeof formulaStr !== 'string') {
        throw new Error("Công thức hóa học không được để trống.");
    }

    const cleanStr = formulaStr.replace(/\s+/g, '').replace(/[·•]/g, '');
    if (!cleanStr) throw new Error("Công thức không hợp lệ.");

    const stack = [{}];
    const regex = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(cleanStr)) !== null) {
        if (match.index !== lastIndex) {
            throw new Error(`Công thức chứa ký tự không hợp lệ tại vị trí ${lastIndex + 1}`);
        }
        lastIndex = regex.lastIndex;

        if (match[1]) { // Element symbol (e.g. Ca, H, O)
            const sym = match[1];
            const count = match[2] ? parseInt(match[2], 10) : 1;
            const elData = getElementData(sym);
            if (!elData) {
                throw new Error(`Nguyên tố '${sym}' không tồn tại trong Bảng tuần hoàn.`);
            }
            const currentScope = stack[stack.length - 1];
            currentScope[sym] = (currentScope[sym] || 0) + count;
        } else if (match[3]) { // '('
            stack.push({});
        } else if (match[4]) { // ')' + count
            if (stack.length <= 1) {
                throw new Error("Lỗi dấu ngoặc đóng ')' không hợp lệ.");
            }
            const mult = match[5] ? parseInt(match[5], 10) : 1;
            const popped = stack.pop();
            const currentScope = stack[stack.length - 1];
            for (let el in popped) {
                currentScope[el] = (currentScope[el] || 0) + popped[el] * mult;
            }
        }
    }

    if (lastIndex !== cleanStr.length) {
        throw new Error("Cú pháp công thức hóa học chưa đúng.");
    }
    if (stack.length > 1) {
        throw new Error("Thiếu dấu ngoặc đóng ')'.");
    }

    return stack[0];
}

/**
 * Calculate Molecular Mass (M_r) of parsed formula
 */
function calculateMolecularMass(formulaStr) {
    const counts = parseChemicalFormula(formulaStr);
    let totalMass = 0;
    const details = [];

    for (let sym in counts) {
        const elData = getElementData(sym);
        const count = counts[sym];
        const mass = elData ? elData.atomicMass : 0;
        const subTotal = mass * count;
        totalMass += subTotal;
        details.push({
            symbol: sym,
            nameVi: elData ? elData.nameVi : sym,
            count: count,
            atomicMass: mass,
            subTotal: Math.round(subTotal * 1000) / 1000
        });
    }

    return {
        formula: formulaStr,
        molarMass: Math.round(totalMass * 1000) / 1000,
        counts: counts,
        details: details
    };
}

/**
 * Calculate Element Mass Percentage in a compound
 */
function calculateElementMassPercentages(formulaStr) {
    const info = calculateMolecularMass(formulaStr);
    const totalM = info.molarMass;
    const percentages = [];

    info.details.forEach(item => {
        const pct = (item.subTotal / totalM) * 100;
        percentages.push({
            symbol: item.symbol,
            nameVi: item.nameVi,
            count: item.count,
            subTotalMass: item.subTotal,
            percentage: Math.round(pct * 100) / 100
        });
    });

    return {
        formula: formulaStr,
        molarMass: totalM,
        percentages: percentages
    };
}
