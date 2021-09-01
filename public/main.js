import {clientEngine} from "./code/core/client_engine.js";
import {Auth} from "./code/apps/auth/auth.js";
import {Home} from "./code/apps/home/home.js";
import {IdeaApp} from "./code/apps/idea/idea.js";

clientEngine.start_app('Home')
clientEngine.start_app('Auth')

let apps = [
    new IdeaApp()
]

let home = clientEngine.get_app('Home');
home.AddToMenu('Idea')