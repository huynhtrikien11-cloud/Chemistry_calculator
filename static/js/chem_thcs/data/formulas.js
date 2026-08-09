/**
 * CHEM THCS - Categorized Formulas Data Library (Groups A to H)
 */

const FORMULA_GROUPS = [
    {
        id: "group-a",
        name: "A. CÔNG THỨC HÓA HỌC & THÀNH PHẦN",
        items: [
            {
                id: "cthh-co-ban",
                title: "Công thức hóa học & Hóa trị",
                formula: "A_x B_y \\Rightarrow a \\cdot x = b \\cdot y",
                variables: [
                    { symbol: "A, B", desc: "Ký hiệu nguyên tố hoặc nhóm nguyên tử" },
                    { symbol: "a, b", desc: "Hóa trị tương ứng của A và B" },
                    { symbol: "x, y", desc: "Chỉ số nguyên tử / nhóm nguyên tử" }
                ],
                example: {
                    problem: "Lập CTHH của hợp chất tạo bởi Al (hóa trị III) và O (hóa trị II).",
                    solution: "Áp dụng quy tắc hóa trị: III · x = II · y => x/y = 2/3 => CTHH là Al₂O₃."
                },
                calcMode: "valency_solver"
            },
            {
                id: "phan-tu-khoi",
                title: "Phân tử khối (M_r)",
                formula: "M_r = \\sum (n_i \\cdot A_i)",
                variables: [
                    { symbol: "M_r", desc: "Phân tử khối của hợp chất (đvC / g/mol)" },
                    { symbol: "A_i", desc: "Nguyên tử khối của nguyên tố thứ i" },
                    { symbol: "n_i", desc: "Số nguyên tử nguyên tố thứ i" }
                ],
                example: {
                    problem: "Tính phân tử khối của CaCO₃.",
                    solution: "M_r(CaCO₃) = 40 (Ca) + 12 (C) + 3 × 16 (O) = 100 g/mol."
                },
                calcMode: "molar_mass_lookup"
            },
            {
                id: "phan-tram-khoi-luong",
                title: "Phần trăm khối lượng nguyên tố",
                formula: "\\%E = \\frac{n_E \\cdot M_E}{M_{hợp chất}} \\times 100\\%",
                variables: [
                    { symbol: "%E", desc: "Phần trăm khối lượng của nguyên tố E (%)" },
                    { symbol: "n_E", desc: "Số nguyên tử nguyên tố E trong 1 phân tử" },
                    { symbol: "M_E", desc: "Nguyên tử khối của nguyên tố E" }
                ],
                example: {
                    problem: "Tính % khối lượng của H và O trong nước H₂O.",
                    solution: "M_r(H₂O) = 18. %H = (2 × 1 / 18) × 100% ≈ 11.11%. %O = (16 / 18) × 100% ≈ 88.89%."
                },
                calcMode: "element_percent"
            }
        ]
    },
    {
        id: "group-b",
        name: "B. MOL & KHỐI LƯỢNG",
        items: [
            {
                id: "mol-khoi-luong",
                title: "Tính Số Mol từ Khối lượng",
                formula: "n = \\frac{m}{M}",
                variables: [
                    { symbol: "n", desc: "Số mol chất (mol)" },
                    { symbol: "m", desc: "Khối lượng chất (g)" },
                    { symbol: "M", desc: "Khối lượng mol chất (g/mol)" }
                ],
                example: {
                    problem: "Tính số mol của 5,6 g Fe.",
                    solution: "n(Fe) = m / M = 5,6 / 56 = 0,1 mol."
                },
                calcMode: "mol_by_mass"
            },
            {
                id: "khoi-luong-tu-mol",
                title: "Tính Khối lượng từ Số Mol",
                formula: "m = n \\times M",
                variables: [
                    { symbol: "m", desc: "Khối lượng chất (g)" },
                    { symbol: "n", desc: "Số mol (mol)" },
                    { symbol: "M", desc: "Khối lượng mol (g/mol)" }
                ],
                example: {
                    problem: "Tính khối lượng của 0,5 mol H₂O.",
                    solution: "m(H₂O) = n × M = 0,5 × 18 = 9 g."
                },
                calcMode: "mass_by_mol"
            },
            {
                id: "khoi-luong-mol",
                title: "Tính Khối lượng Mol",
                formula: "M = \\frac{m}{n}",
                variables: [
                    { symbol: "M", desc: "Khối lượng mol (g/mol)" },
                    { symbol: "m", desc: "Khối lượng (g)" },
                    { symbol: "n", desc: "Số mol (mol)" }
                ],
                example: {
                    problem: "Biết 0,2 mol chất X nặng 8 g. Tìm M.",
                    solution: "M = m / n = 8 / 0,2 = 40 g/mol (X là NaOH hoặc Ca)."
                },
                calcMode: "molar_mass_calc"
            }
        ]
    },
    {
        id: "group-c",
        name: "C. CHẤT KHÍ",
        items: [
            {
                id: "the-tich-khi",
                title: "Thể tích chất khí",
                formula: "V = n \\times V_m \\quad (V_{m, ĐKTC} = 22,4 \\text{ lít}, V_{m, ĐKC} = 24,79 \\text{ lít})",
                variables: [
                    { symbol: "V", desc: "Thể tích chất khí (lít)" },
                    { symbol: "n", desc: "Số mol chất khí (mol)" },
                    { symbol: "V_m", desc: "Thể tích mol chất khí ở điều kiện chuẩn" }
                ],
                example: {
                    problem: "Tính thể tích của 0,5 mol khí CO₂ ở ĐKTC.",
                    solution: "V = n × 22,4 = 0,5 × 22,4 = 11,2 lít."
                },
                calcMode: "vol_by_mol"
            },
            {
                id: "mol-tu-the-tich",
                title: "Số mol khí từ thể tích",
                formula: "n = \\frac{V}{V_m}",
                variables: [
                    { symbol: "n", desc: "Số mol khí (mol)" },
                    { symbol: "V", desc: "Thể tích khí (lít)" },
                    { symbol: "V_m", desc: "22,4 lít (ĐKTC) hoặc 24,79 lít (ĐKC)" }
                ],
                example: {
                    problem: "Tính số mol của 4,48 lít khí O₂ ở ĐKTC.",
                    solution: "n = V / 22,4 = 4,48 / 22,4 = 0,2 mol."
                },
                calcMode: "mol_by_vol"
            },
            {
                id: "ti-khoi-chat-khi",
                title: "Tỉ khối chất khí",
                formula: "d_{A/B} = \\frac{M_A}{M_B} \\quad | \\quad d_{A/kk} = \\frac{M_A}{29}",
                variables: [
                    { symbol: "d_{A/B}", desc: "Tỉ khối của khí A đối với khí B" },
                    { symbol: "d_{A/kk}", desc: "Tỉ khối của khí A đối với không khí (M_kk ≈ 29)" }
                ],
                example: {
                    problem: "So sánh khí CO₂ nặng hơn hay nhẹ hơn không khí bao nhiêu lần?",
                    solution: "d_(CO₂/kk) = M(CO₂) / 29 = 44 / 29 ≈ 1,52 (nặng hơn 1,52 lần)."
                },
                calcMode: "gas_density"
            }
        ]
    },
    {
        id: "group-d",
        name: "D. DUNG DỊCH",
        items: [
            {
                id: "nong-do-phan-tram",
                title: "Nồng độ phần trăm (C%)",
                formula: "C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\% \\quad (m_{dd} = m_{ct} + m_{dm})",
                variables: [
                    { symbol: "C%", desc: "Nồng độ phần trăm của dung dịch (%)" },
                    { symbol: "m_ct", desc: "Khối lượng chất tan (g)" },
                    { symbol: "m_dd", desc: "Khối lượng dung dịch (g)" }
                ],
                example: {
                    problem: "Hòa tan 20 g NaCl vào 80 g nước. Tính C%.",
                    solution: "m_dd = 20 + 80 = 100 g. C% = (20 / 100) × 100% = 20%."
                },
                calcMode: "c_percent"
            },
            {
                id: "nong-do-mol",
                title: "Nồng độ Mol (C_M)",
                formula: "C_M = \\frac{n}{V_{dd}} \\quad (V_{dd} \\text{ tính bằng lít})",
                variables: [
                    { symbol: "C_M", desc: "Nồng độ mol (mol/lít hoặc M)" },
                    { symbol: "n", desc: "Số mol chất tan (mol)" },
                    { symbol: "V_dd", desc: "Thể tích dung dịch (lít)" }
                ],
                example: {
                    problem: "Hòa tan 0,5 mol NaOH vào nước thu được 2 lít dung dịch. Tính C_M.",
                    solution: "C_M = n / V = 0,5 / 2 = 0,25 M."
                },
                calcMode: "cm_molarity"
            },
            {
                id: "khoi-luong-dung-dich",
                title: "Khối lượng dung dịch từ C%",
                formula: "m_{dd} = \\frac{m_{ct} \\times 100\\%}{C\\%} \\quad | \\quad m_{dd} = V \\times D",
                variables: [
                    { symbol: "m_dd", desc: "Khối lượng dung dịch (g)" },
                    { symbol: "D", desc: "Khối lượng riêng của dung dịch (g/ml)" }
                ],
                example: {
                    problem: "Tính khối lượng dung dịch HCl 10% chứa 5 g HCl.",
                    solution: "m_dd = (5 × 100) / 10 = 50 g."
                },
                calcMode: "m_solution"
            }
        ]
    },
    {
        id: "group-e",
        name: "E. PHƯƠNG TRÌNH HÓA HỌC & BẢO TOÀN",
        items: [
            {
                id: "bao-toan-khoi-luong",
                title: "Định luật Bảo toàn khối lượng",
                formula: "m_{tham gia} = m_{sản phẩm} \\Rightarrow m_A + m_B = m_C + m_D",
                variables: [
                    { symbol: "m_A, m_B", desc: "Khối lượng các chất tham gia phản ứng" },
                    { symbol: "m_C, m_D", desc: "Khối lượng các chất sản phẩm tạo thành" }
                ],
                example: {
                    problem: "Đốt cháy 12 g Cacbon cần 32 g Oxi. Tính khối lượng CO₂ tạo thành.",
                    solution: "m(CO₂) = m(C) + m(O₂) = 12 + 32 = 44 g."
                },
                calcMode: "mass_conservation"
            }
        ]
    }
];
