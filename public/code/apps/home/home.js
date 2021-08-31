import {ClientApp} from "../../core/client_app.js";

class HomeApp extends ClientApp {
    constructor() {
        super("Home");
    }

    OnStart() {

    }
}

export let Home = new HomeApp()