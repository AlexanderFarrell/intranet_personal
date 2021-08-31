const {Pool} = require('pg')

function setup_database(app, config){
    const pool = new Pool({
        connectionString: create_uri(config.data.username, config.data.password, config.data.host, config.data.port, config.data.database)
    })

    app.set('data', pool)
}

function create_uri(username, password, host, port, database){
    return `postgres://${username}:${password}@${host}:${port}/${database}`;
}

module.exports = {setup_database}

