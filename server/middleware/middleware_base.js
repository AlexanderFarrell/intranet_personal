const express = require("express");
const morgan_logging = require("morgan");
const bodyParser = require("body-parser");
const sessions = require("express-session");

function require_body(...body_params) {
    return (req, res, next) => {
        body_params.forEach(p => {
            if (req.body[p] === undefined){
                res.sendStatus(400)
            }
        })
        next()
    }
}

function require_auth(){
    return (req, res, next) => {
        if (req.session.username === undefined){
            res.sendStatus(404)
        } else {
            next()
        }
    }
}

function setup_express_middleware(app, config){
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

module.exports = {require_body, require_login: require_auth, setup_express_middleware}