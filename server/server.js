const {ServerBuilder} = require('./core/server_core')
const {DebugApp} = require("./apps/debug/debug");

const s = new ServerBuilder()
    .add_app(new DebugApp())
    .build()