import {ClientApp} from "../core/client_app.js";

export class ContentApp extends ClientApp {
    constructor(kind) {
        let proper = String(kind.Name);
        proper = proper[0].toUpperCase() + proper.slice(1, proper.length)
        super(proper);
        this.Kind = kind;
    }
}