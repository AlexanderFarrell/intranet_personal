const {Router} = require('express')
const {has_body_vars} = require("../middleware/middleware_base");

function get_debug_router(){
    let router = Router()
    router.post('/log', [has_body_vars('kind', 'message'),(req, res) => {
        if (req.body.kind === undefined || req.body.message === undefined){
            res.sendStatus(400)
        }

        console.log(req.body.kind + ": " + req.body.message)
    }])

    router.post("/err", [has_body_vars('message', 'url', 'linenumber'),(req, res) => {
        const message = req.body.message;
        const url = req.body.url;
        const linenumber = req.body.linenumber;

        console.log(`Error message: ${message}\nUrl: ${url}\nLine Number: ${linenumber}`)

        res.sendStatus(200)
    }])

    return router;
}

module.exports = {get_debug_router}