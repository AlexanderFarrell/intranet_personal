const {AppBuilder} = require("../../core/server_core");
const {Router} = require('express')

class DebugApp extends AppBuilder {
    constructor() {
        super(__dirname);
        let router = Router()
        router.post('/log', (req, res) => {
            if (req.body.kind === undefined || req.body.message === undefined){
                res.sendStatus(400)
            }

            console.log(req.body.kind + ": " + req.body.message)
        })

        router.post("/err", (req, res) => {
            const message = req.body.message;
            const url = req.body.url;
            const linenumber = req.body.linenumber;

            console.log(`Error message: ${message}\nUrl: ${url}\nLine Number: ${linenumber}`)
        })

        this.add_route('/debug', router)
    }
}

module.exports = {DebugApp}