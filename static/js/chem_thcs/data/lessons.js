/* ==========================================================================
   CHEM THCS - Lesson Content Data (8 chủ đề THCS)
   ========================================================================== */

const LESSON_DATA = {
    'cthh': {
        id: 'cthh',
        icon: '📐',
        title: 'Công thức hóa học',
        subtitle: 'Ý nghĩa CTHH, phân tử khối, quy tắc hóa trị',
        color: '#0284c7',
        content: `<h3>1. Công thức hóa học (CTHH) là gì?</h3>
<p>Công thức hóa học dùng để biểu diễn chất, gồm <strong>ký hiệu nguyên tố</strong> và <strong>chỉ số</strong> (số nguyên tử của mỗi nguyên tố trong một phân tử chất).</p>
<ul>
  <li><strong>Đơn chất kim loại &amp; phi kim rắn:</strong> CTHH chính là ký hiệu nguyên tố. VD: Fe, Cu, S, C...</li>
  <li><strong>Đơn chất phi kim khí:</strong> thường dùng chỉ số 2. VD: H₂, O₂, N₂, Cl₂...</li>
  <li><strong>Hợp chất:</strong> gồm 2 loại nguyên tố trở lên. VD: H₂O, CO₂, NaCl, H₂SO₄...</li>
</ul>

<h3>2. Ý nghĩa của CTHH</h3>
<p>CTHH của một chất cho biết:</p>
<ol>
  <li>Chất đó được cấu tạo từ những <strong>nguyên tố nào</strong>.</li>
  <li>Số <strong>nguyên tử</strong> mỗi nguyên tố trong một phân tử chất.</li>
  <li><strong>Phân tử khối</strong> (M<sub>r</sub>) của chất.</li>
</ol>
<div class="lesson-formula-box">
  <strong>Ví dụ: H₂SO₄ (Axit sunfuric)</strong><br>
  → Gồm: 2 nguyên tử H + 1 nguyên tử S + 4 nguyên tử O<br>
  → M<sub>r</sub> = 2×1 + 32 + 4×16 = <strong>98 g/mol</strong>
</div>

<h3>3. Hóa trị và Quy tắc hóa trị</h3>
<p><strong>Hóa trị</strong> là con số biểu thị khả năng liên kết của nguyên tố (hoặc nhóm nguyên tử) với nguyên tố khác.</p>
<div class="lesson-formula-box">
  <strong>Quy tắc hóa trị:</strong> a × x = b × y<br>
  Trong đó: A<sup>a</sup><sub>x</sub>B<sup>b</sup><sub>y</sub><br>
  • a = hóa trị của A, x = chỉ số của A<br>
  • b = hóa trị của B, y = chỉ số của B
</div>
<p><strong>Ví dụ:</strong> Lập CTHH của Al (hóa trị III) và O (hóa trị II):<br>
→ III × x = II × y → x = 2, y = 3 → CTHH: <strong>Al₂O₃</strong></p>

<h3>4. Bảng hóa trị thường gặp</h3>
<table class="lesson-table">
  <tr><th>Nguyên tố / Nhóm</th><th>Hóa trị</th><th>Ví dụ</th></tr>
  <tr><td>H, Na, K, Li</td><td>I</td><td>HCl, NaCl</td></tr>
  <tr><td>O, Ca, Mg, Ba, Fe(II), Cu(II)</td><td>II</td><td>CaO, MgO</td></tr>
  <tr><td>Al, Fe(III)</td><td>III</td><td>Al₂O₃, Fe₂O₃</td></tr>
  <tr><td>C, Si</td><td>IV</td><td>CO₂, SiO₂</td></tr>
  <tr><td>OH (hydroxyl)</td><td>I</td><td>NaOH, Ca(OH)₂</td></tr>
  <tr><td>SO₄ (sulfate)</td><td>II</td><td>CaSO₄, FeSO₄</td></tr>
  <tr><td>NO₃ (nitrate)</td><td>I</td><td>NaNO₃, Cu(NO₃)₂</td></tr>
  <tr><td>PO₄ (phosphate)</td><td>III</td><td>Ca₃(PO₄)₂</td></tr>
</table>`
    },
    'mol': {
        id: 'mol',
        icon: '🧮',
        title: 'Mol & Khối lượng',
        subtitle: 'Khái niệm mol, khối lượng mol M, chuyển đổi m và n',
        color: '#7c3aed',
        content: `<h3>1. Mol là gì?</h3>
<p><strong>Mol</strong> là lượng chất chứa 6,022 × 10²³ hạt (nguyên tử, phân tử, ion, ...) — còn gọi là <strong>số Avogadro (N<sub>A</sub>)</strong>.</p>
<div class="lesson-formula-box">
  N<sub>A</sub> = 6,022 × 10²³ (hạt/mol)
</div>

<h3>2. Khối lượng mol (M)</h3>
<p><strong>Khối lượng mol</strong> (M) của một chất là khối lượng của 1 mol chất đó, đơn vị <strong>g/mol</strong>. Có giá trị bằng phân tử khối M<sub>r</sub>.</p>
<div class="lesson-formula-box">
  M (g/mol) = M<sub>r</sub> (đvC)<br>
  Ví dụ: M(H₂O) = 2×1 + 16 = <strong>18 g/mol</strong><br>
  M(NaCl) = 23 + 35,5 = <strong>58,5 g/mol</strong>
</div>

<h3>3. Công thức tính số mol (n)</h3>
<div class="lesson-formula-box">
  <strong>n = m / M</strong><br>
  • n = số mol (mol)<br>
  • m = khối lượng (gam)<br>
  • M = khối lượng mol (g/mol)
</div>
<p><strong>Ví dụ:</strong> Có 9 gam H₂O, tính số mol?<br>
→ n = 9 / 18 = <strong>0,5 mol</strong></p>

<h3>4. Công thức tính khối lượng (m)</h3>
<div class="lesson-formula-box">
  <strong>m = n × M</strong>
</div>
<p><strong>Ví dụ:</strong> Tính khối lượng 2 mol CaCO₃?<br>
→ M(CaCO₃) = 40 + 12 + 3×16 = 100 g/mol<br>
→ m = 2 × 100 = <strong>200 gam</strong></p>

<h3>5. Sơ đồ chuyển đổi nhanh</h3>
<div class="lesson-formula-box">
  m (gam) ÷ M → n (mol) × M → m (gam)<br>
  n (mol) × N<sub>A</sub> → Số hạt (nguyên tử/phân tử)<br>
  Số hạt ÷ N<sub>A</sub> → n (mol)
</div>`
    },
    'khi': {
        id: 'khi',
        icon: '💨',
        title: 'Chất khí',
        subtitle: 'Thể tích khí ĐKTC, điều kiện chuẩn mới, tỷ khối d_A/B',
        color: '#059669',
        content: `<h3>1. Thể tích mol của chất khí ở ĐKTC</h3>
<p>Ở <strong>Điều kiện tiêu chuẩn (ĐKTC)</strong>: 0°C, 1 atm (101 325 Pa):<br>
→ 1 mol bất kỳ chất khí nào cũng chiếm thể tích <strong>22,4 lít</strong>.</p>
<div class="lesson-formula-box">
  V = n × 22,4 (lít) [ĐKTC: 0°C, 1atm]<br>
  V = n × 24,79 (lít) [Điều kiện chuẩn mới: 25°C, 1 bar]
</div>

<h3>2. Công thức tính thể tích và số mol khí</h3>
<div class="lesson-formula-box">
  <strong>V = n × V<sub>m</sub></strong> → Tính thể tích<br>
  <strong>n = V / V<sub>m</sub></strong> → Tính số mol<br>
  • V<sub>m</sub> = 22,4 L/mol (ĐKTC) hoặc 24,79 L/mol (25°C, 1 bar)
</div>
<p><strong>Ví dụ:</strong> Tính thể tích 0,5 mol O₂ ở ĐKTC?<br>
→ V = 0,5 × 22,4 = <strong>11,2 lít</strong></p>

<h3>3. Tỉ khối chất khí (d)</h3>
<p>Tỉ khối cho biết khí A <em>nặng</em> hay <em>nhẹ</em> hơn khí B bao nhiêu lần.</p>
<div class="lesson-formula-box">
  <strong>d<sub>A/B</sub> = M<sub>A</sub> / M<sub>B</sub></strong><br>
  <strong>d<sub>A/kk</sub> = M<sub>A</sub> / 29</strong> (M<sub>kk</sub> ≈ 29 g/mol)
</div>
<p><strong>Ví dụ 1:</strong> SO₂ nặng hay nhẹ hơn không khí?<br>
→ d<sub>SO₂/kk</sub> = 64 / 29 ≈ <strong>2,21</strong> → SO₂ nặng hơn kk 2,21 lần → nằm ở đáy bình.</p>
<p><strong>Ví dụ 2:</strong> H₂ nặng hay nhẹ hơn không khí?<br>
→ d<sub>H₂/kk</sub> = 2 / 29 ≈ <strong>0,069</strong> → H₂ nhẹ hơn kk rất nhiều → bay lên trên.</p>

<h3>4. Quy đổi đơn vị thể tích</h3>
<div class="lesson-formula-box">
  1 lít (L) = 1 dm³<br>
  1 m³ = 1000 lít<br>
  1 lít = 1000 mL = 1000 cm³
</div>`
    },
    'dungdich': {
        id: 'dungdich',
        icon: '🧪',
        title: 'Dung dịch',
        subtitle: 'Độ tan, nồng độ C%, nồng độ mol C_M, pha chế dung dịch',
        color: '#db2777',
        content: `<h3>1. Dung dịch là gì?</h3>
<p>Dung dịch là <strong>hỗn hợp đồng nhất</strong> của chất tan (solute) và dung môi (solvent).<br>
Phổ biến nhất: dung môi là nước.</p>

<h3>2. Độ tan (S)</h3>
<p><strong>Độ tan</strong> của một chất là số gam chất đó tan tối đa trong 100 gam dung môi ở nhiệt độ xác định để tạo dung dịch bão hòa.</p>
<div class="lesson-formula-box">
  S = m<sub>ct</sub> / m<sub>dm</sub> × 100 (g/100g dung môi)
</div>

<h3>3. Nồng độ phần trăm (C%)</h3>
<div class="lesson-formula-box">
  <strong>C% = m<sub>ct</sub> / m<sub>dd</sub> × 100%</strong><br>
  • m<sub>ct</sub> = khối lượng chất tan (gam)<br>
  • m<sub>dd</sub> = khối lượng dung dịch (gam)<br>
  • m<sub>dd</sub> = m<sub>ct</sub> + m<sub>dm</sub>
</div>
<p><strong>Ví dụ:</strong> Hòa tan 20g NaCl vào 80g nước. Tính C%?<br>
→ m<sub>dd</sub> = 20 + 80 = 100g<br>
→ C% = 20/100 × 100% = <strong>20%</strong></p>

<h3>4. Nồng độ mol (C<sub>M</sub>)</h3>
<div class="lesson-formula-box">
  <strong>C<sub>M</sub> = n / V</strong><br>
  • n = số mol chất tan (mol)<br>
  • V = thể tích dung dịch (lít)<br>
  • Đơn vị C<sub>M</sub>: mol/L (M)
</div>
<p><strong>Ví dụ:</strong> Hòa tan 4g NaOH (M=40) vào nước được 0,5L dung dịch. Tính C<sub>M</sub>?<br>
→ n = 4/40 = 0,1 mol<br>
→ C<sub>M</sub> = 0,1 / 0,5 = <strong>0,2 M</strong></p>

<h3>5. Pha chế dung dịch</h3>
<p>Để pha 500 mL NaCl 0,1M:</p>
<ol>
  <li>Tính m<sub>ct</sub>: n = C<sub>M</sub>×V = 0,1×0,5 = 0,05 mol → m = 0,05×58,5 = <strong>2,925 gam NaCl</strong></li>
  <li>Cân đúng 2,925g NaCl, hòa tan vào ít nước cất.</li>
  <li>Cho vào bình định mức 500 mL, thêm nước cất đến vạch 500 mL.</li>
</ol>`
    },
    'pthh': {
        id: 'pthh',
        icon: '⚗️',
        title: 'Phương trình hóa học',
        subtitle: 'Các bước lập PTHH, ý nghĩa phương trình, tính theo PTHH',
        color: '#d97706',
        content: `<h3>1. Phương trình hóa học (PTHH) là gì?</h3>
<p>PTHH dùng công thức hóa học để biểu diễn phản ứng hóa học, thể hiện tỉ lệ mol của các chất tham gia và sản phẩm.</p>

<h3>2. Các bước lập PTHH</h3>
<ol>
  <li><strong>Viết sơ đồ phản ứng</strong>: ghi đúng CTHH các chất (kiểm tra hóa trị).</li>
  <li><strong>Cân bằng số nguyên tử</strong>: đặt hệ số phù hợp trước CTHH (không sửa chỉ số).</li>
  <li><strong>Kiểm tra</strong>: số nguyên tử mỗi loại ở 2 vế phải bằng nhau.</li>
  <li><strong>Viết PTHH hoàn chỉnh</strong> với điều kiện phản ứng (t°, xt, áp suất...).</li>
</ol>
<div class="lesson-formula-box">
  <strong>Ví dụ:</strong> Fe + O₂ → Fe₃O₄<br>
  → Cân bằng: <strong>3Fe + 2O₂ → Fe₃O₄</strong>
</div>

<h3>3. Ý nghĩa của PTHH</h3>
<p>Tỉ lệ hệ số chính là tỉ lệ mol của các chất trong phản ứng:</p>
<div class="lesson-formula-box">
  2H₂ + O₂ → 2H₂O<br>
  → 2 mol H₂ tác dụng với 1 mol O₂ tạo ra 2 mol H₂O
</div>

<h3>4. Tính theo phương trình hóa học</h3>
<p><strong>Bước 1:</strong> Viết PTHH cân bằng.<br>
<strong>Bước 2:</strong> Tính n của chất đã biết.<br>
<strong>Bước 3:</strong> Dùng tỉ lệ mol trong PTHH → tính n chất cần tìm.<br>
<strong>Bước 4:</strong> Tính m, V, C%... theo yêu cầu đề bài.</p>
<div class="lesson-formula-box">
  <strong>Ví dụ:</strong> Đốt cháy 5,6g Fe trong O₂. Tính khối lượng Fe₃O₄ thu được?<br>
  PTHH: 3Fe + 2O₂ → Fe₃O₄ (t°)<br>
  n(Fe) = 5,6/56 = 0,1 mol<br>
  Theo PT: n(Fe₃O₄) = n(Fe)/3 = 0,1/3 mol<br>
  m(Fe₃O₄) = (0,1/3) × 232 ≈ <strong>7,73 gam</strong>
</div>

<h3>5. Các loại phản ứng thường gặp ở THCS</h3>
<table class="lesson-table">
  <tr><th>Loại</th><th>Dạng tổng quát</th><th>Ví dụ</th></tr>
  <tr><td>Phản ứng hóa hợp</td><td>A + B → AB</td><td>2H₂ + O₂ → 2H₂O</td></tr>
  <tr><td>Phản ứng phân hủy</td><td>AB → A + B</td><td>2HgO → 2Hg + O₂</td></tr>
  <tr><td>Phản ứng thế</td><td>A + BC → AC + B</td><td>Fe + CuSO₄ → FeSO₄ + Cu</td></tr>
  <tr><td>Phản ứng trao đổi</td><td>AB + CD → AD + CB</td><td>NaCl + AgNO₃ → AgCl↓ + NaNO₃</td></tr>
</table>`
    },
    'btkl': {
        id: 'btkl',
        icon: '⚖️',
        title: 'Bảo toàn khối lượng',
        subtitle: 'Tổng khối lượng chất tham gia = tổng khối lượng sản phẩm',
        color: '#2563eb',
        content: `<h3>1. Định luật Bảo toàn khối lượng (BTKL)</h3>
<p><em>"Trong một phản ứng hóa học, tổng khối lượng các chất tham gia phản ứng bằng tổng khối lượng các sản phẩm."</em></p>
<div class="lesson-formula-box">
  <strong>m(chất tham gia) = m(sản phẩm)</strong><br>
  m<sub>A</sub> + m<sub>B</sub> = m<sub>C</sub> + m<sub>D</sub>
</div>

<h3>2. Giải thích bản chất</h3>
<p>Trong phản ứng hóa học, chỉ có liên kết giữa các nguyên tử thay đổi, còn số nguyên tử của mỗi nguyên tố <strong>được bảo toàn</strong>. Vì vậy tổng khối lượng không đổi.</p>

<h3>3. Áp dụng tính khối lượng chưa biết</h3>
<div class="lesson-formula-box">
  <strong>Ví dụ 1:</strong> CaCO₃ → CaO + CO₂<br>
  Nung 100g CaCO₃ thu được 56g CaO. Tính khối lượng CO₂ thoát ra?<br>
  → BTKL: m(CO₂) = 100 - 56 = <strong>44 gam</strong>
</div>
<div class="lesson-formula-box">
  <strong>Ví dụ 2:</strong> Fe + S → FeS<br>
  Cho 5,6g Fe tác dụng hết với S thu được FeS. Tính khối lượng S cần dùng?<br>
  → n(Fe) = 5,6/56 = 0,1 mol → n(S) = 0,1 mol → m(S) = 0,1×32 = 3,2g<br>
  → m(FeS) = 5,6 + 3,2 = <strong>8,8 gam</strong> (kiểm tra: 0,1×88=8,8g ✓)
</div>

<h3>4. Lưu ý quan trọng</h3>
<ul>
  <li>Phải tính đầy đủ <strong>tất cả</strong> chất tham gia (kể cả O₂ nếu đốt cháy trong không khí).</li>
  <li>Nếu có kết tủa (↓) hoặc khí bay ra (↑) thì vẫn phải tính vào khối lượng sản phẩm.</li>
  <li>BTKL <strong>luôn luôn đúng</strong> cho mọi phản ứng hóa học.</li>
</ul>`
    },
    'axitbazo': {
        id: 'axitbazo',
        icon: '🧫',
        title: 'Axit – Bazơ – Muối – Oxit',
        subtitle: 'Phân loại hợp chất vô cơ, tính chất hóa học cơ bản THCS',
        color: '#0284c7',
        content: `<h3>1. Oxit</h3>
<p>Oxit = hợp chất của một nguyên tố + Oxy.</p>
<table class="lesson-table">
  <tr><th>Loại</th><th>Gồm</th><th>Ví dụ</th><th>Tính chất</th></tr>
  <tr><td>Oxit axit</td><td>Phi kim + O</td><td>CO₂, SO₂, SO₃, P₂O₅</td><td>Tác dụng với nước → axit; với bazơ → muối</td></tr>
  <tr><td>Oxit bazơ</td><td>Kim loại + O</td><td>Na₂O, CaO, FeO, Fe₂O₃</td><td>Tác dụng với nước → bazơ (nếu tan); với axit → muối + nước</td></tr>
</table>

<h3>2. Axit</h3>
<p>Phân tử axit gồm: <strong>1 hay nhiều nguyên tử H + gốc axit</strong>.</p>
<div class="lesson-formula-box">
  HCl (axit clohydric) | H₂SO₄ (axit sunfuric) | HNO₃ (axit nitric) | H₃PO₄ (axit photphoric)
</div>
<p><strong>Tính chất:</strong></p>
<ul>
  <li>Làm quỳ tím → <span style="color:red">đỏ</span>.</li>
  <li>Tác dụng với kim loại → muối + H₂ (điều kiện: trước H trong dãy hoạt động).</li>
  <li>Tác dụng với oxit bazơ → muối + nước.</li>
  <li>Tác dụng với bazơ → muối + nước (phản ứng trung hòa).</li>
  <li>Tác dụng với muối → muối mới + axit mới.</li>
</ul>

<h3>3. Bazơ</h3>
<p>Phân tử bazơ gồm: <strong>1 nguyên tử kim loại + 1 hay nhiều nhóm OH</strong>.</p>
<div class="lesson-formula-box">
  NaOH (natri hydroxit) | Ca(OH)₂ (canxi hydroxit) | Fe(OH)₃ (sắt(III) hydroxit)
</div>
<p><strong>Tính chất:</strong></p>
<ul>
  <li>Làm quỳ tím → <span style="color:blue">xanh</span> (bazơ tan).</li>
  <li>Tác dụng với axit → muối + nước.</li>
  <li>Bazơ không tan bị nhiệt phân → oxit kim loại + nước.</li>
</ul>

<h3>4. Muối</h3>
<p>Phân tử muối gồm: <strong>cation kim loại + anion gốc axit</strong>.</p>
<div class="lesson-formula-box">
  NaCl | CaCO₃ | FeSO₄ | Al₂(SO₄)₃ | Ca(HCO₃)₂
</div>
<p><strong>Tính chất:</strong></p>
<ul>
  <li>Tác dụng với axit → muối mới + axit mới.</li>
  <li>Tác dụng với bazơ → muối mới + bazơ mới.</li>
  <li>Tác dụng với muối → 2 muối mới (điều kiện: tạo kết tủa/khí).</li>
  <li>Tác dụng với kim loại → muối mới + kim loại mới.</li>
</ul>`
    },
    'kimloai': {
        id: 'kimloai',
        icon: '🔩',
        title: 'Kim loại',
        subtitle: 'Dãy hoạt động hóa học của kim loại, kim loại + axit/muối',
        color: '#059669',
        content: `<h3>1. Tính chất vật lí của kim loại</h3>
<ul>
  <li>Dẫn điện, dẫn nhiệt tốt.</li>
  <li>Có ánh kim, dẻo, có thể dát mỏng, kéo sợi.</li>
  <li>Phần lớn là chất rắn ở nhiệt độ thường (trừ Hg là lỏng).</li>
</ul>

<h3>2. Dãy hoạt động hóa học của kim loại</h3>
<div class="lesson-formula-box">
  K, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, <strong>H</strong>, Cu, Hg, Ag, Pt, Au<br>
  ← Mức độ hoạt động giảm dần →
</div>
<p><strong>Mẹo nhớ:</strong> <em>"Khi Nào May Áo Zanh Fải Nên Sang Phố Hỏi Cửa Hàng Á Phi Âu"</em></p>
<p>Ý nghĩa dãy:</p>
<ul>
  <li>Kim loại <strong>trước</strong> đẩy kim loại <strong>sau</strong> ra khỏi dung dịch muối.</li>
  <li>Kim loại trước H phản ứng với dung dịch axit (HCl, H₂SO₄ loãng) → muối + H₂↑.</li>
  <li>K, Na, Ca... phản ứng trực tiếp với nước → bazơ + H₂↑.</li>
</ul>

<h3>3. Kim loại tác dụng với Axit</h3>
<div class="lesson-formula-box">
  <strong>Kim loại (trước H) + HCl/H₂SO₄ loãng → Muối + H₂↑</strong><br>
  Ví dụ: Fe + 2HCl → FeCl₂ + H₂↑<br>
  Zn + H₂SO₄ → ZnSO₄ + H₂↑
</div>
<p>⚠️ Cu, Ag, Au, Pt... <strong>không</strong> tác dụng với HCl và H₂SO₄ loãng.</p>

<h3>4. Kim loại tác dụng với dung dịch Muối</h3>
<div class="lesson-formula-box">
  <strong>Kim loại A + Muối B → Muối A mới + Kim loại B</strong><br>
  (điều kiện: A hoạt động hơn B trong dãy; A không tan trong nước)<br>
  Ví dụ: Fe + CuSO₄ → FeSO₄ + Cu↓<br>
  Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓
</div>

<h3>5. Kim loại tác dụng với Oxi</h3>
<div class="lesson-formula-box">
  3Fe + 2O₂ →(t°) Fe₃O₄ (oxit sắt từ)<br>
  2Cu + O₂ →(t°) 2CuO (đồng(II) oxit, màu đen)<br>
  4Al + 3O₂ →(t°) 2Al₂O₃ (nhôm oxit)
</div>

<h3>6. Điều chế kim loại</h3>
<table class="lesson-table">
  <tr><th>Phương pháp</th><th>Áp dụng</th><th>Ví dụ</th></tr>
  <tr><td>Nhiệt luyện</td><td>Kim loại trung bình (Fe, Zn, Cu...)</td><td>Fe₂O₃ + 3CO → 2Fe + 3CO₂</td></tr>
  <tr><td>Điện phân nóng chảy</td><td>Kim loại mạnh (Na, Mg, Al)</td><td>2Al₂O₃ →(điện phân, t°) 4Al + 3O₂</td></tr>
  <tr><td>Thủy luyện</td><td>Kim loại yếu (Cu, Ag...)</td><td>Fe + CuSO₄ → FeSO₄ + Cu</td></tr>
</table>`
    }
};
