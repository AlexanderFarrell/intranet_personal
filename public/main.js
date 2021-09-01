import {client} from "./code/core/client_engine.js";
import {start_up} from "./code/config/config.js";

start_up()

client.start_app('Home')
client.start_app('Auth')