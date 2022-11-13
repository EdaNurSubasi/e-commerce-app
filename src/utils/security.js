import Storage from "./storage"

const Security = {
    session: {
        save: (session) => {
            Storage.save("session", session)
        },
        get: () => {
            return Storage.load('session')
        },
        clear: () => {
            Storage.clear('session')
        }
    }
}

export default Security
