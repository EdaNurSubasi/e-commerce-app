const Storage = {
    load: (key) => {
        try {
            const data = localStorage.getItem(key)
            return data ? JSON.parse(data): null
        } catch (err) {
            console.log("Error occurred while retrieving the key")
            return null
        }
    },
    save: (key, data) => {
        try {
            const serialized = JSON.stringify(data)
            localStorage.setItem(key, serialized);
        } catch (err) {
            console.log("Error occurred while saving the key")
        }
    },
    clear: (key) => {
        try {
            localStorage.removeItem(key)
        } catch (err) {
            console.log("Error occurred while saving the key")
        }

    }
}

export default Storage