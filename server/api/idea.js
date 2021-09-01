const {get_content_router} = require("./template.js");

function get_idea_router(app, config) {
    return get_content_router('idea', app, config, ['title', 'content'])
}

module.exports = {get_idea_router}