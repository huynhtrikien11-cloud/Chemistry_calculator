/**
 * CHEM THCS - Common Valencies & Valency Rule Solver
 */

const COMMON_VALENCIES = {
    // Single Elements
    "H": 1, "K": 1, "Na": 1, "Ag": 1, "Cl": 1, "F": 1, "Br": 1, "I": 1,
    "Ca": 2, "Ba": 2, "Mg": 2, "Zn": 2, "Cu": 2, "Fe": 2, "O": 2,
    "Al": 3,
    // Radical Groups
    "OH": 1, "NO3": 1, "HCO3": 1,
    "SO4": 2, "CO3": 2, "SO3": 2,
    "PO4": 3
};

/**
 * Solve CTHH using valency rule: a * x = b * y => x/y = b/a
 */
function solveFormulaByValency(elemA, valA, elemB, valB) {
    if (!elemA || !elemB || !valA || !valB || valA <= 0 || valB <= 0) {
        throw new Error("Hóa trị phải là số nguyên dương.");
    }

    // Find greatest common divisor (GCD) of valA and valB
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    const g = gcd(valA, valB);
    const x = valB / g;
    const y = valA / g;

    // Formatting formula string
    const formatPart = (elem, count) => {
        const hasParens = ["OH", "NO3", "SO4", "CO3", "PO4", "SO3", "HCO3"].includes(elem);
        if (count === 1) return elem;
        if (hasParens) return `(${elem})${count}`;
        return `${elem}${count}`;
    };

    const formulaResult = `${formatPart(elemA, x)}${formatPart(elemB, y)}`;

    return {
        formula: formulaResult,
        x: x,
        y: y,
        explanation: `Quy tắc hóa trị: ${valA} · x = ${valB} · y => x/y = ${valB}/${valA} = ${x}/${y}. CTHH tối giản là ${formulaResult}.`
    };
}
