const {get_express, get_config, listen} = require('./core/server_core')
const {get_debug_router} = require("./api/debug");
const {get_auth_router} = require("./api/auth");
const {setup_database} = require("./modules/database");
const {setup_express_middleware} = require("./middleware/middleware_base");
const {get_idea_router} = require("./api/idea");

const app = get_express()
const config = get_config()

setup_express_middleware(app, config)
setup_database(app, config)

app.use('/auth', get_auth_router())
app.use('/debug', get_debug_router())
app.use('/idea', get_idea_router(app, config))

listen(app, config)