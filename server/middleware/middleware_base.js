function has_body_vars(...body_params) {
    return (req, res, next) => {
        body_params.forEach(p => {
            if (req.body[p] === undefined){
                res.sendStatus(400)
            }
        })
        next()
    }
}

function must_be_logged_in(){
    return (req, res, next) => {
        if (req.session.username === undefined){
            res.sendStatus(404)
        } else {
            next()
        }
    }
}

module.exports = {has_body_vars, must_be_logged_in}