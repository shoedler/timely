import ElectronStore from "electron-store";

const electronStorage = new ElectronStore()
const databasePath = "databasePath"

export function useElectronStorage() {
    const getDatabasePath = (): string | null => { return electronStorage.get(databasePath) as string | null}
    const setDatabasePath = (v: unknown) => { electronStorage.set(databasePath, v)}

    return {
        getDatabasePath,
        setDatabasePath,
        storage: electronStorage
    }
}

