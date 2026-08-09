/**
 * CHEM THCS - LocalStorage Persistence Manager
 * Handles Favorites, Calculation History & Dark/Light Theme preferences.
 */

const StorageManager = {
    // Theme Preference
    getTheme: () => localStorage.getItem("chem_thcs_theme") || "light",
    setTheme: (theme) => localStorage.setItem("chem_thcs_theme", theme),

    // Favorites
    getFavorites: () => {
        try {
            return JSON.parse(localStorage.getItem("chem_thcs_favorites")) || [];
        } catch (e) {
            return [];
        }
    },
    toggleFavorite: (formulaId) => {
        let favs = StorageManager.getFavorites();
        if (favs.includes(formulaId)) {
            favs = favs.filter(id => id !== formulaId);
        } else {
            favs.push(formulaId);
        }
        localStorage.setItem("chem_thcs_favorites", JSON.stringify(favs));
        return favs.includes(formulaId);
    },
    isFavorite: (formulaId) => StorageManager.getFavorites().includes(formulaId),

    // History Records
    getHistory: () => {
        try {
            return JSON.parse(localStorage.getItem("chem_thcs_history")) || [];
        } catch (e) {
            return [];
        }
    },
    addHistoryRecord: (record) => {
        let history = StorageManager.getHistory();
        record.id = "hist_" + Date.now();
        record.timestamp = new Date().toLocaleString("vi-VN");
        history.unshift(record); // Add to top
        if (history.length > 50) history = history.slice(0, 50); // Keep max 50
        localStorage.setItem("chem_thcs_history", JSON.stringify(history));
        return history;
    },
    removeHistoryRecord: (histId) => {
        let history = StorageManager.getHistory().filter(h => h.id !== histId);
        localStorage.setItem("chem_thcs_history", JSON.stringify(history));
        return history;
    },
    clearHistory: () => {
        localStorage.removeItem("chem_thcs_history");
        return [];
    }
};
