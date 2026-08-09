/**
 * CHEM THCS - 15 THCS Calculator Engine & Step-by-Step Resolution
 */

function formatResultNumber(val, decimals = 2) {
    if (isNaN(val) || !isFinite(val)) return "Lỗi tính toán";
    if (decimals === "exact") return val.toString();
    const d = parseInt(decimals, 10);
    const mult = Math.pow(10, d);
    return (Math.round(val * mult) / mult).toString();
}

/**
 * Execute calculation by mode ID
 */
function solveChemCalculation(modeId, inputs, decimals = 2) {
    let resultVal = 0;
    let formulaStr = "";
    let subStr = "";
    let resultUnit = "";
    let fullStepsStr = "";

    switch (modeId) {
        // 1. Tính số mol (n = m / M)
        case "mol_by_mass": {
            const m = parseFloat(inputs.m);
            const M = parseFloat(inputs.M);
            if (isNaN(m) || isNaN(M)) throw new Error("Vui lòng nhập đầy đủ m và M.");
            if (M <= 0) throw new Error("Khối lượng mol M phải lớn hơn 0.");
            if (m < 0) throw new Error("Khối lượng m không thể âm.");
            resultVal = m / M;
            formulaStr = "n = \\frac{m}{M}";
            subStr = `n = \\frac{${m}}{${M}}`;
            resultUnit = "mol";
            break;
        }

        // 2. Tính khối lượng (m = n * M)
        case "mass_by_mol": {
            const n = parseFloat(inputs.n);
            const M = parseFloat(inputs.M);
            if (isNaN(n) || isNaN(M)) throw new Error("Vui lòng nhập đầy đủ n và M.");
            if (n < 0 || M <= 0) throw new Error("Giá trị nhập vào không hợp lệ.");
            resultVal = n * M;
            formulaStr = "m = n \\times M";
            subStr = `m = ${n} \\times ${M}`;
            resultUnit = "g";
            break;
        }

        // 3. Tính khối lượng mol (M = m / n)
        case "molar_mass_calc": {
            const m = parseFloat(inputs.m);
            const n = parseFloat(inputs.n);
            if (isNaN(m) || isNaN(n)) throw new Error("Vui lòng nhập đầy đủ m và n.");
            if (n <= 0) throw new Error("Số mol n phải lớn hơn 0.");
            resultVal = m / n;
            formulaStr = "M = \\frac{m}{n}";
            subStr = `M = \\frac{${m}}{${n}}`;
            resultUnit = "g/mol";
            break;
        }

        // 4. Tính thể tích khí (V = n * Vm)
        case "vol_by_mol": {
            const n = parseFloat(inputs.n);
            const Vm = parseFloat(inputs.Vm || 22.4);
            if (isNaN(n) || isNaN(Vm)) throw new Error("Vui lòng nhập đầy đủ thông số.");
            if (n < 0 || Vm <= 0) throw new Error("Giá trị không hợp lệ.");
            resultVal = n * Vm;
            formulaStr = "V = n \\times V_m";
            subStr = `V = ${n} \\times ${Vm}`;
            resultUnit = "lít";
            break;
        }

        // 5. Tính số mol từ thể tích khí (n = V / Vm)
        case "mol_by_vol": {
            const V = parseFloat(inputs.V);
            const Vm = parseFloat(inputs.Vm || 22.4);
            if (isNaN(V) || isNaN(Vm)) throw new Error("Vui lòng nhập đầy đủ thông số.");
            if (Vm <= 0) throw new Error("Thể tích mol Vm phải lớn hơn 0.");
            resultVal = V / Vm;
            formulaStr = "n = \\frac{V}{V_m}";
            subStr = `n = \\frac{${V}}{${Vm}}`;
            resultUnit = "mol";
            break;
        }

        // 6. Tính nồng độ phần trăm (C% = m_ct / m_dd * 100)
        case "c_percent": {
            const mct = parseFloat(inputs.mct);
            const mdd = parseFloat(inputs.mdd);
            if (isNaN(mct) || isNaN(mdd)) throw new Error("Vui lòng nhập m_ct và m_dd.");
            if (mdd <= 0) throw new Error("Khối lượng dung dịch m_dd phải lớn hơn 0.");
            if (mct > mdd) throw new Error("Khối lượng chất tan không thể lớn hơn m_dung dịch.");
            resultVal = (mct / mdd) * 100;
            formulaStr = "C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\%";
            subStr = `C\\% = \\frac{${mct}}{${mdd}} \\times 100\\%`;
            resultUnit = "%";
            break;
        }

        // 7. Tính khối lượng chất tan (m_ct = C% * m_dd / 100)
        case "m_solute": {
            const Cpct = parseFloat(inputs.Cpct);
            const mdd = parseFloat(inputs.mdd);
            if (isNaN(Cpct) || isNaN(mdd)) throw new Error("Vui lòng nhập C% và m_dd.");
            if (mdd < 0 || Cpct < 0) throw new Error("Giá trị không hợp lệ.");
            resultVal = (Cpct * mdd) / 100;
            formulaStr = "m_{ct} = \\frac{C\\% \\times m_{dd}}{100}";
            subStr = `m_{ct} = \\frac{${Cpct} \\times ${mdd}}{100}`;
            resultUnit = "g";
            break;
        }

        // 8. Tính khối lượng dung dịch (m_dd = m_ct * 100 / C%)
        case "m_solution": {
            const mct = parseFloat(inputs.mct);
            const Cpct = parseFloat(inputs.Cpct);
            if (isNaN(mct) || isNaN(Cpct)) throw new Error("Vui lòng nhập m_ct và C%.");
            if (Cpct <= 0) throw new Error("Nồng độ phần trăm C% phải lớn hơn 0.");
            resultVal = (mct * 100) / Cpct;
            formulaStr = "m_{dd} = \\frac{m_{ct} \\times 100\\%}{C\\%}";
            subStr = `m_{dd} = \\frac{${mct} \\times 100}{${Cpct}}`;
            resultUnit = "g";
            break;
        }

        // 9. Tính nồng độ mol (C_M = n / V)
        case "cm_molarity": {
            const n = parseFloat(inputs.n);
            let V = parseFloat(inputs.V);
            const unitV = inputs.unitV || "L";
            if (unitV === "ml") V = V / 1000;
            if (isNaN(n) || isNaN(V)) throw new Error("Vui lòng nhập n và V.");
            if (V <= 0) throw new Error("Thể tích dung dịch V phải lớn hơn 0.");
            resultVal = n / V;
            formulaStr = "C_M = \\frac{n}{V_{dd}}";
            subStr = `C_M = \\frac{${n}}{${V}}`;
            resultUnit = "M (mol/lít)";
            break;
        }

        // 10. Tính số mol từ C_M và V (n = C_M * V)
        case "mol_from_cm": {
            const CM = parseFloat(inputs.CM);
            let V = parseFloat(inputs.V);
            const unitV = inputs.unitV || "L";
            if (unitV === "ml") V = V / 1000;
            if (isNaN(CM) || isNaN(V)) throw new Error("Vui lòng nhập C_M và V.");
            if (V < 0 || CM < 0) throw new Error("Giá trị không hợp lệ.");
            resultVal = CM * V;
            formulaStr = "n = C_M \\times V_{dd}";
            subStr = `n = ${CM} \\times ${V}`;
            resultUnit = "mol";
            break;
        }

        // 11. Tính thể tích dung dịch (V = n / C_M)
        case "vol_solution": {
            const n = parseFloat(inputs.n);
            const CM = parseFloat(inputs.CM);
            if (isNaN(n) || isNaN(CM)) throw new Error("Vui lòng nhập n và C_M.");
            if (CM <= 0) throw new Error("Nồng độ mol C_M phải lớn hơn 0.");
            resultVal = n / CM;
            formulaStr = "V_{dd} = \\frac{n}{C_M}";
            subStr = `V_{dd} = \\frac{${n}}{${CM}}`;
            resultUnit = "lít";
            break;
        }

        // 12. Tính tỉ khối chất khí (d_A/B = M_A / M_B hoặc d_A/kk = M_A / 29)
        case "gas_density": {
            const MA = parseFloat(inputs.MA);
            const targetType = inputs.targetType || "air";
            let MB = 29;
            let label = "không khí";
            if (targetType === "gasB") {
                MB = parseFloat(inputs.MB);
                label = "khí B";
                if (isNaN(MB) || MB <= 0) throw new Error("Molar mass M_B phải lớn hơn 0.");
            }
            if (isNaN(MA) || MA <= 0) throw new Error("Molar mass M_A phải lớn hơn 0.");
            resultVal = MA / MB;
            formulaStr = `d_{A/${targetType === "air" ? "kk" : "B"}} = \\frac{M_A}{${targetType === "air" ? "29" : "M_B"}}`;
            subStr = `d = \\frac{${MA}}{${MB}}`;
            resultUnit = `lần (so với ${label})`;
            break;
        }

        default:
            throw new Error("Dạng bài chưa được hỗ trợ.");
    }

    const formattedVal = formatResultNumber(resultVal, decimals);

    fullStepsStr = `📐 Công thức:\n${formulaStr}\n\n🔢 Thay số:\n${subStr}\n\n✅ Kết quả:\n= ${formattedVal} ${resultUnit}`;

    return {
        modeId: modeId,
        resultValue: resultVal,
        formattedResult: formattedVal,
        unit: resultUnit,
        formulaStr: formulaStr,
        subStr: subStr,
        fullStepsText: fullStepsStr
    };
}
