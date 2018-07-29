export const loadState = (name, defaultValue = {}) => {
    try {
        const value = localStorage.getItem(name)
        if (value === null) return defaultValue
        return JSON.parse(value)
    } catch (e) {
        console.error("Can't load state '" + name + "'")
        return defaultValue
    }
}

export const saveState = (name, value) => {
    try {
        localStorage.setItem(name, JSON.stringify(value))
    } catch (e) {
        console.error("Can't save state '" + name + "'")
    }
}
