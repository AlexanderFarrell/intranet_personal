import {clientEngine} from "./code/core/client_engine.js";
import {Auth} from "./code/apps/auth/auth.js";
import {Home} from "./code/apps/home/home.js";

clientEngine.start_app('Home')
clientEngine.start_app('Auth')