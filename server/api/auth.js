const bcrypt = require('bcrypt')
const {Router} = require('express')
const {has_body_vars} = require("../middleware/middleware_base");

function has_logged_in(req, username){
    req.session.username = username
}

function get_auth_router(){
    let r = Router()

    r.post('/create', [has_body_vars('username', 'password'), async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10, (err, hash) => {
            try {
                if (err) {
                    throw new Error(err)
                }

                req.app.get('data')
                    .query('insert into accounts (username, password) values ($1, $2)', [username, hash]);
                has_logged_in(req, username)
                res.sendStatus(200)
            } catch (e) {
                console.log(e)
                res.sendStatus(500)
            }
        });
    }])

    r.post('/login', [has_body_vars('username', 'password'), async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            let data = (await req.app.get('data')
                .query('select password from accounts where username=$1', [username])).rows;
            if (data.length !== 0){
                bcrypt.compare(password, data[0]['password'], (err, result) => {
                    if (err != null){
                        throw new Error(err)
                    }

                    if (result){
                        has_logged_in(req, username)
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(403)
                    }
                })
            } else {
                res.sendStatus(403)
            }
        } catch (e) {
            console.error(e)
            res.sendStatus(500)
        }
    }])

    r.post('/logout', (req, res) => {
        if (req.session.username !== undefined){
            delete req.session.username
        }

        res.sendStatus(200)
    })

    r.post('/is_logged_in', async (req, res) => {
        res.json({
            'online': req.session.username !== undefined
        })
    })

    r.get('/username_exists', async (req, res) => {

    })

    return r
}

module.exports = {get_auth_router}