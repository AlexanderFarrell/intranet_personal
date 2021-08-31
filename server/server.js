const {get_express, setup_express, get_config, listen} = require('./core/server_core')
const {get_debug_router} = require("./api/debug");
const {get_auth_router} = require("./api/auth");
const {setup_database} = require("./modules/database");

const app = get_express()
const config = get_config()

setup_express(app, config)
setup_database(app, config)

app.use('/auth', get_auth_router())
app.use('/debug', get_debug_router())

listen(app, config)

// let r = new ServerBuilder()
//     .add_app(new DebugApp())
//     .add_database()
//     .add_sessions();

// r.app.use('/auth', add_auth_route())
// r.build()