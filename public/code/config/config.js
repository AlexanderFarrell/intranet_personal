import {client} from "../core/client_engine.js";
import {HomeApp} from "../apps/home/home.js";
import {IdeaApp} from "../apps/idea/idea.js";
import {AuthApp} from "../apps/auth/authApp.js";

export function start_up(){
    client.load_apps(
        new HomeApp(),
        new AuthApp(() => {
            client.close_running_app();
            client.close_running_app();
        }),
        new IdeaApp()
    )
}
