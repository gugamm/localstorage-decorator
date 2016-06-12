//LOCAL STORAGE SERVICE
export class LStorageService {
    private _storage : any = {};

    public addStorageKey(storageKey : any) : void {
        if (!this._storage.hasOwnProperty(storageKey)) {
            let storageData : string  = window.localStorage.getItem(storageKey);
            this._storage[storageKey] = (storageData)? JSON.parse(storageData) : null;
        }
    }

    public getStorageValue(storageKey : string) : any {
        return this._storage[storageKey];
    }

    public setStorageValue(storageKey : string, value : any) : any {
        this._storage[storageKey] = value;
    }

    public saveAllStorages() : void {
        for (let prop in this._storage)
            if (this._storage.hasOwnProperty(prop))
                window.localStorage.setItem(prop, JSON.stringify(this._storage[prop]));
    }

    public saveStorageByKey(storageKey : string) : void {
        if (this._storage.hasOwnProperty(storageKey))
            window.localStorage.setItem(storageKey, JSON.stringify(this._storage[storageKey]));
    }

    public clearStorage() : void {
        window.localStorage.clear();
        for (let prop in this._storage)
            if (this._storage.hasOwnProperty(prop))
                this._storage[prop] = null;
    }

    public clearStorageByKey(storageKey : string) : void {
        if (this._storage.hasOwnProperty(storageKey)) {
            window.localStorage.removeItem(storageKey);
            this._storage[storageKey] = null;
        }
    }
}

export var storageService = new LStorageService();

//LOCAL STORAGE DECORATOR
export function LocalStorage(autoSave : boolean, key ?: string) {
    return function(target : Object, propName : string) {
        let propNameId : string  = (key) ? key : propName;

        storageService.addStorageKey(propNameId);

        function getValue() : any {
            return storageService.getStorageValue(propNameId);
        }

        function setValueAuto(val : any) {
            storageService.setStorageValue(propNameId, val);
            storageService.saveStorageByKey(propNameId);
        }

        function setValue(val : any) {
            storageService.setStorageValue(propNameId, val);
        }

        Object.defineProperty(target, propName, {
            configurable : true,
            enumerable   : true,
            get          : getValue,
            set          : (autoSave)? setValueAuto : setValue
        });
    }
}

