const express = require('express')
const fs = require('fs')
const path = require('path')

get_express = express

let def_config_path= path.resolve(__dirname, '../server.config.json')

function get_config(path=def_config_path){
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        throw new Error(`Error loading the config file.\n - Path: ${path}\n - Message: ${e.message}`)
    }
}

function listen(app, config){
    app.set('port', config.port)
    app.listen(app.get('port'), () => {
            console.log('Server app running!')
            console.log(`  Listening on port ${app.get('port')}!\n   Visit http://localhost:${app.get('port')} to view locally!`)
        })
}

module.exports = {get_express, get_config, listen}