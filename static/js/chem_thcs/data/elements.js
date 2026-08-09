/**
 * CHEM THCS - Full 118 Elements Dataset & Validation
 * Meets strict international IUPAC standard atomic masses & properties.
 */

const ELEMENTS_DATA = [
    { atomicNumber: 1, symbol: "H", name: "Hydrogen", nameVi: "Hydro", atomicMass: 1.008, group: 1, period: 1, category: "nonmetal", block: "s", stateAtRoomTemperature: "gas" },
    { atomicNumber: 2, symbol: "He", name: "Helium", nameVi: "Heli", atomicMass: 4.0026, group: 18, period: 1, category: "noble", block: "s", stateAtRoomTemperature: "gas" },
    { atomicNumber: 3, symbol: "Li", name: "Lithium", nameVi: "Liti", atomicMass: 6.94, group: 1, period: 2, category: "alkali", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 4, symbol: "Be", name: "Beryllium", nameVi: "Beri", atomicMass: 9.0122, group: 2, period: 2, category: "alkaline", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 5, symbol: "B", name: "Boron", nameVi: "Bo", atomicMass: 10.81, group: 13, period: 2, category: "metalloid", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 6, symbol: "C", name: "Carbon", nameVi: "Cacbon", atomicMass: 12.011, group: 14, period: 2, category: "nonmetal", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 7, symbol: "N", name: "Nitrogen", nameVi: "Nitơ", atomicMass: 14.007, group: 15, period: 2, category: "nonmetal", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 8, symbol: "O", name: "Oxygen", nameVi: "Oxi", atomicMass: 15.999, group: 16, period: 2, category: "nonmetal", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 9, symbol: "F", name: "Fluorine", nameVi: "Flo", atomicMass: 18.998, group: 17, period: 2, category: "halogen", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 10, symbol: "Ne", name: "Neon", nameVi: "Neon", atomicMass: 20.180, group: 18, period: 2, category: "noble", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 11, symbol: "Na", name: "Sodium", nameVi: "Natri", atomicMass: 22.990, group: 1, period: 3, category: "alkali", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 12, symbol: "Mg", name: "Magnesium", nameVi: "Magie", atomicMass: 24.305, group: 2, period: 3, category: "alkaline", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 13, symbol: "Al", name: "Aluminium", nameVi: "Nhôm", atomicMass: 26.982, group: 13, period: 3, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 14, symbol: "Si", name: "Silicon", nameVi: "Silic", atomicMass: 28.085, group: 14, period: 3, category: "metalloid", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 15, symbol: "P", name: "Phosphorus", nameVi: "Photpho", atomicMass: 30.974, group: 15, period: 3, category: "nonmetal", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 16, symbol: "S", name: "Sulfur", nameVi: "Lưu huỳnh", atomicMass: 32.06, group: 16, period: 3, category: "nonmetal", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 17, symbol: "Cl", name: "Chlorine", nameVi: "Clo", atomicMass: 35.45, group: 17, period: 3, category: "halogen", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 18, symbol: "Ar", name: "Argon", nameVi: "Argon", atomicMass: 39.948, group: 18, period: 3, category: "noble", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 19, symbol: "K", name: "Potassium", nameVi: "Kali", atomicMass: 39.098, group: 1, period: 4, category: "alkali", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 20, symbol: "Ca", name: "Calcium", nameVi: "Canxi", atomicMass: 40.078, group: 2, period: 4, category: "alkaline", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 21, symbol: "Sc", name: "Scandium", nameVi: "Xcandi", atomicMass: 44.956, group: 3, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 22, symbol: "Ti", name: "Titanium", nameVi: "Titan", atomicMass: 47.867, group: 4, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 23, symbol: "V", name: "Vanadium", nameVi: "Vanadi", atomicMass: 50.942, group: 5, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 24, symbol: "Cr", name: "Chromium", nameVi: "Crom", atomicMass: 51.996, group: 6, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 25, symbol: "Mn", name: "Manganese", nameVi: "Mangan", atomicMass: 54.938, group: 7, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 26, symbol: "Fe", name: "Iron", nameVi: "Sắt", atomicMass: 55.845, group: 8, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 27, symbol: "Co", name: "Cobalt", nameVi: "Coban", atomicMass: 58.933, group: 9, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 28, symbol: "Ni", name: "Nickel", nameVi: "Niken", atomicMass: 58.693, group: 10, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 29, symbol: "Cu", name: "Copper", nameVi: "Đồng", atomicMass: 63.546, group: 11, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 30, symbol: "Zn", name: "Zinc", nameVi: "Kẽm", atomicMass: 65.38, group: 12, period: 4, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 31, symbol: "Ga", name: "Gallium", nameVi: "Gali", atomicMass: 69.723, group: 13, period: 4, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 32, symbol: "Ge", name: "Germanium", nameVi: "Gecmani", atomicMass: 72.630, group: 14, period: 4, category: "metalloid", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 33, symbol: "As", name: "Arsenic", nameVi: "Asen", atomicMass: 74.922, group: 15, period: 4, category: "metalloid", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 34, symbol: "Se", name: "Selenium", nameVi: "Selen", atomicMass: 78.971, group: 16, period: 4, category: "nonmetal", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 35, symbol: "Br", name: "Bromine", nameVi: "Brom", atomicMass: 79.904, group: 17, period: 4, category: "halogen", block: "p", stateAtRoomTemperature: "liquid" },
    { atomicNumber: 36, symbol: "Kr", name: "Krypton", nameVi: "Kripton", atomicMass: 83.798, group: 18, period: 4, category: "noble", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 37, symbol: "Rb", name: "Rubidium", nameVi: "Rubidi", atomicMass: 85.468, group: 1, period: 5, category: "alkali", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 38, symbol: "Sr", name: "Strontium", nameVi: "Xtronti", atomicMass: 87.62, group: 2, period: 5, category: "alkaline", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 39, symbol: "Y", name: "Yttrium", nameVi: "Ytri", atomicMass: 88.906, group: 3, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 40, symbol: "Zr", name: "Zirconium", nameVi: "Zirconi", atomicMass: 91.224, group: 4, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 41, symbol: "Nb", name: "Niobium", nameVi: "Niobi", atomicMass: 92.906, group: 5, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 42, symbol: "Mo", name: "Molybdenum", nameVi: "Molipden", atomicMass: 95.95, group: 6, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 43, symbol: "Tc", name: "Technetium", nameVi: "Tecneti", atomicMass: 98, group: 7, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 44, symbol: "Ru", name: "Ruthenium", nameVi: "Ruteni", atomicMass: 101.07, group: 8, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 45, symbol: "Rh", name: "Rhodium", nameVi: "Rodi", atomicMass: 102.91, group: 9, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 46, symbol: "Pd", name: "Palladium", nameVi: "Paladi", atomicMass: 106.42, group: 10, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 47, symbol: "Ag", name: "Silver", nameVi: "Bạc", atomicMass: 107.87, group: 11, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 48, symbol: "Cd", name: "Cadmium", nameVi: "Cadimi", atomicMass: 112.41, group: 12, period: 5, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 49, symbol: "In", name: "Indium", nameVi: "Indi", atomicMass: 114.82, group: 13, period: 5, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 50, symbol: "Sn", name: "Tin", nameVi: "Thiếc", atomicMass: 118.71, group: 14, period: 5, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 51, symbol: "Sb", name: "Antimony", nameVi: "Antimon", atomicMass: 121.76, group: 15, period: 5, category: "metalloid", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 52, symbol: "Te", name: "Tellurium", nameVi: "Telua", atomicMass: 127.60, group: 16, period: 5, category: "metalloid", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 53, symbol: "I", name: "Iodine", nameVi: "Iốt", atomicMass: 126.90, group: 17, period: 5, category: "halogen", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 54, symbol: "Xe", name: "Xenon", nameVi: "Xenon", atomicMass: 131.29, group: 18, period: 5, category: "noble", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 55, symbol: "Cs", name: "Caesium", nameVi: "Xêsi", atomicMass: 132.91, group: 1, period: 6, category: "alkali", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 56, symbol: "Ba", name: "Barium", nameVi: "Bari", atomicMass: 137.33, group: 2, period: 6, category: "alkaline", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 57, symbol: "La", name: "Lanthanum", nameVi: "Lantan", atomicMass: 138.91, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 58, symbol: "Ce", name: "Cerium", nameVi: "Ceri", atomicMass: 140.12, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 59, symbol: "Pr", name: "Praseodymium", nameVi: "Prazeodim", atomicMass: 140.91, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 60, symbol: "Nd", name: "Neodymium", nameVi: "Neodim", atomicMass: 144.24, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 61, symbol: "Pm", name: "Promethium", nameVi: "Prometi", atomicMass: 145, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 62, symbol: "Sm", name: "Samarium", nameVi: "Samari", atomicMass: 150.36, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 63, symbol: "Eu", name: "Europium", nameVi: "Europi", atomicMass: 151.96, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 64, symbol: "Gd", name: "Gadolinium", nameVi: "Gadolini", atomicMass: 157.25, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 65, symbol: "Tb", name: "Terbium", nameVi: "Terbi", atomicMass: 158.93, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 66, symbol: "Dy", name: "Dysprosium", nameVi: "Diprosi", atomicMass: 162.50, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 67, symbol: "Ho", name: "Holmium", nameVi: "Holmi", atomicMass: 164.93, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 68, symbol: "Er", name: "Erbium", nameVi: "Erbi", atomicMass: 167.26, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 69, symbol: "Tm", name: "Thulium", nameVi: "Thuli", atomicMass: 168.93, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 70, symbol: "Yb", name: "Ytterbium", nameVi: "Yterbi", atomicMass: 173.05, group: 3, period: 6, category: "lanthanide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 71, symbol: "Lu", name: "Lutetium", nameVi: "Luteti", atomicMass: 174.97, group: 3, period: 6, category: "lanthanide", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 72, symbol: "Hf", name: "Hafnium", nameVi: "Hafni", atomicMass: 178.49, group: 4, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 73, symbol: "Ta", name: "Tantalum", nameVi: "Tantal", atomicMass: 180.95, group: 5, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 74, symbol: "W", name: "Tungsten", nameVi: "Vonfram", atomicMass: 183.84, group: 6, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 75, symbol: "Re", name: "Rhenium", nameVi: "Reni", atomicMass: 186.21, group: 7, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 76, symbol: "Os", name: "Osmium", nameVi: "Osimi", atomicMass: 190.23, group: 8, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 77, symbol: "Ir", name: "Iridium", nameVi: "Iridi", atomicMass: 192.22, group: 9, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 78, symbol: "Pt", name: "Platinum", nameVi: "Bạch kim", atomicMass: 195.08, group: 10, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 79, symbol: "Au", name: "Gold", nameVi: "Vàng", atomicMass: 196.97, group: 11, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 80, symbol: "Hg", name: "Mercury", nameVi: "Thủy ngân", atomicMass: 200.59, group: 12, period: 6, category: "transition", block: "d", stateAtRoomTemperature: "liquid" },
    { atomicNumber: 81, symbol: "Tl", name: "Thallium", nameVi: "Tali", atomicMass: 204.38, group: 13, period: 6, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 82, symbol: "Pb", name: "Lead", nameVi: "Chì", atomicMass: 207.2, group: 14, period: 6, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 83, symbol: "Bi", name: "Bismuth", nameVi: "Bismuth", atomicMass: 208.98, group: 15, period: 6, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 84, symbol: "Po", name: "Polonium", nameVi: "Poloni", atomicMass: 209, group: 16, period: 6, category: "post-transition", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 85, symbol: "At", name: "Astatine", nameVi: "Astatin", atomicMass: 210, group: 17, period: 6, category: "halogen", block: "p", stateAtRoomTemperature: "solid" },
    { atomicNumber: 86, symbol: "Rn", name: "Radon", nameVi: "Radon", atomicMass: 222, group: 18, period: 6, category: "noble", block: "p", stateAtRoomTemperature: "gas" },
    { atomicNumber: 87, symbol: "Fr", name: "Francium", nameVi: "Francium", atomicMass: 223, group: 1, period: 7, category: "alkali", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 88, symbol: "Ra", name: "Radium", nameVi: "Radi", atomicMass: 226, group: 2, period: 7, category: "alkaline", block: "s", stateAtRoomTemperature: "solid" },
    { atomicNumber: 89, symbol: "Ac", name: "Actinium", nameVi: "Actini", atomicMass: 227, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 90, symbol: "Th", name: "Thorium", nameVi: "Tori", atomicMass: 232.04, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 91, symbol: "Pa", name: "Protactinium", nameVi: "Protactini", atomicMass: 231.04, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 92, symbol: "U", name: "Uranium", nameVi: "Urani", atomicMass: 238.03, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 93, symbol: "Np", name: "Neptunium", nameVi: "Neptuni", atomicMass: 237, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 94, symbol: "Pu", name: "Plutonium", nameVi: "Plutoni", atomicMass: 244, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 95, symbol: "Am", name: "Americium", nameVi: "Americi", atomicMass: 243, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 96, symbol: "Cm", name: "Curium", nameVi: "Curi", atomicMass: 247, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 97, symbol: "Bk", name: "Berkelium", nameVi: "BerReli", atomicMass: 247, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 98, symbol: "Cf", name: "Californium", nameVi: "Californi", atomicMass: 251, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 99, symbol: "Es", name: "Einsteinium", nameVi: "Ensteni", atomicMass: 252, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 100, symbol: "Fm", name: "Fermium", nameVi: "Phemi", atomicMass: 257, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 101, symbol: "Md", name: "Mendelevium", nameVi: "Mendelevi", atomicMass: 258, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 102, symbol: "No", name: "Nobelium", nameVi: "Nobeli", atomicMass: 259, group: 3, period: 7, category: "actinide", block: "f", stateAtRoomTemperature: "solid" },
    { atomicNumber: 103, symbol: "Lr", name: "Lawrencium", nameVi: "Lörenxi", atomicMass: 266, group: 3, period: 7, category: "actinide", block: "d", stateAtRoomTemperature: "solid" },
    { atomicNumber: 104, symbol: "Rf", name: "Rutherfordium", nameVi: "Rơtơphoti", atomicMass: 267, group: 4, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 105, symbol: "Db", name: "Dubnium", nameVi: "Dupni", atomicMass: 268, group: 5, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 106, symbol: "Sg", name: "Seaborgium", nameVi: "Xiborgi", atomicMass: 269, group: 6, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 107, symbol: "Bh", name: "Bohrium", nameVi: "Bori", atomicMass: 270, group: 7, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 108, symbol: "Hs", name: "Hassium", nameVi: "Hasi", atomicMass: 277, group: 8, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 109, symbol: "Mt", name: "Meitnerium", nameVi: "Maitneri", atomicMass: 278, group: 9, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 110, symbol: "Ds", name: "Darmstadtium", nameVi: "Đamstati", atomicMass: 281, group: 10, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 111, symbol: "Rg", name: "Roentgenium", nameVi: "Rơnxen", atomicMass: 282, group: 11, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 112, symbol: "Cn", name: "Copernicium", nameVi: "Copexnici", atomicMass: 285, group: 12, period: 7, category: "transition", block: "d", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 113, symbol: "Nh", name: "Nihonium", nameVi: "Nihoni", atomicMass: 286, group: 13, period: 7, category: "post-transition", block: "p", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 114, symbol: "Fl", name: "Flerovium", nameVi: "Flerovi", atomicMass: 289, group: 14, period: 7, category: "post-transition", block: "p", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 115, symbol: "Mc", name: "Moscovium", nameVi: "Moscovi", atomicMass: 290, group: 15, period: 7, category: "post-transition", block: "p", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 116, symbol: "Lv", name: "Livermorium", nameVi: "Livermori", atomicMass: 293, group: 16, period: 7, category: "post-transition", block: "p", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 117, symbol: "Ts", name: "Tennessine", nameVi: "Tennessine", atomicMass: 294, group: 17, period: 7, category: "halogen", block: "p", stateAtRoomTemperature: "synthetic" },
    { atomicNumber: 118, symbol: "Og", name: "Oganesson", nameVi: "Oganesson", atomicMass: 294, group: 18, period: 7, category: "noble", block: "p", stateAtRoomTemperature: "synthetic" }
];

/**
 * MANDATORY VALIDATION FUNCTION
 * Validates integrity of 118 elements dataset.
 */
function validatePeriodicTable() {
    if (ELEMENTS_DATA.length !== 118) {
        console.error(`[VALIDATION FAILED] Expected 118 elements, found ${ELEMENTS_DATA.length}`);
        return false;
    }

    const atomicNumbers = new Set();
    const symbols = new Set();

    for (let i = 0; i < ELEMENTS_DATA.length; i++) {
        const el = ELEMENTS_DATA[i];
        const num = i + 1;
        if (el.atomicNumber !== num) {
            console.error(`[VALIDATION FAILED] Element index ${i} has atomicNumber ${el.atomicNumber}, expected ${num}`);
            return false;
        }
        if (atomicNumbers.has(el.atomicNumber)) {
            console.error(`[VALIDATION FAILED] Duplicate atomicNumber: ${el.atomicNumber}`);
            return false;
        }
        if (symbols.has(el.symbol)) {
            console.error(`[VALIDATION FAILED] Duplicate symbol: ${el.symbol}`);
            return false;
        }
        if (!el.nameVi || !el.atomicMass || !el.group || !el.period || !el.category) {
            console.error(`[VALIDATION FAILED] Missing required properties for element ${el.symbol}`);
            return false;
        }

        atomicNumbers.add(el.atomicNumber);
        symbols.add(el.symbol);
    }

    console.log("Periodic Table: 118/118 elements loaded ✓");
    return true;
}

// Auto-run validation
validatePeriodicTable();
