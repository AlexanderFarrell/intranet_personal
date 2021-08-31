const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const morgan_logging = require('morgan')
const sessions = require('express-session')

get_express = express

function load_config(path){
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        throw new Error(`Error loading the config file.\n - Path: ${path}\n - Message: ${e.message}`)
    }
}

function setup_express(app, config){
    app.use(express.static(config.static_dir))
    app.use(morgan_logging(config.logging))
    app.use(bodyParser.json())
    app.use(sessions({
            secret: "!*HF*ngwufni",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 600000
            }
        }
    ))
}

function listen(app, config){
    app.set('port', config.port)
    app.listen(app.get('port'), () => {
            console.log('Server app running!')
            console.log(`  Listening on port ${this.app.get('port')}!\n   Visit http://localhost:${this.app.get('port')} to view locally!`)
        })
}

module.exports = {get_express, setup_express, get_config: load_config, listen}

// class ServerBuilder{
//     constructor(config_path=path.resolve(__dirname, '../server.config.json')) {
//         const config = load_config(config_path)
//
//         this.app = express()
//         this.app.use(express.static(config.static_dir))
//         this.app.use(morgan_logging(config.logging))
//         this.app.set('port', config.port)
//         this.app.use(bodyParser.json())
//         console.log("Express App initialized")
//
//         this.Config = config;
//
//         return this;
//     }
//
//     add_app(app_builder){
//         app_builder.build(this.app)
//         return this;
//     }
//
//     add_database(){
//         setup_database(this.app, this.Config)
//         return this;
//     }
//
//     add_redis(){
//
//     }
//
//     add_sessions(){
//         this.app.use(sessions({
//             secret: "!*HF*ngwufni",
//             resave: false,
//             saveUninitialized: false,
//             cookie: {
//                 maxAge: 600000
//             }
//             }
//         ))
//         return this;
//     }
//
//     add_security(){
//
//     }
//
//     build(){
//         this.app.listen(this.app.get('port'), () => {
//             console.log('Server app running!')
//             console.log(`  Listening on port ${this.app.get('port')}!\n   Visit http://localhost:${this.app.get('port')} to view locally!`)
//         })
//         return this;
//     }
// }
//
// class AppBuilder {
//     constructor(root_dir) {
//         this.Config = load_config(root_dir + "/config.json")
//         this.Name = this.Config.name;
//         this.Meta = new Map()
//         this.SetupOperations = []
//     }
//
//     add_route(url, route){
//         this.add_setup_operation((app) => {
//             app.use(url, route)
//         }, `router: ${route.path}`)
//         return this;
//     }
//
//     add_content(content_builder){
//
//     }
//
//     add_setup_operation(op, name=null){
//         this.SetupOperations.push([op, name])
//     }
//
//     build(app) {
//         console.log(" - Setting up " + this.Name)
//         for (let i = 0; i < this.SetupOperations.length; i++){
//             if (this.SetupOperations[i][1] != null){
//                 console.log("    - " + this.SetupOperations[i][1])
//             }
//             this.SetupOperations[i][0](app)
//         }
//     }
// }