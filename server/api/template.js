const {Router} = require("express");
const {require_login, require_body} = require("../middleware/middleware_base");

function get_attr_input_sql(count){
    let params = []
    for (let i = 0; i < count; i++){
        params.push(`$${i}`)
    }
    return params.join(', ')
}

function get_col_with_table(params, abbrv){
    return params.map(p => {
        return `${abbrv}.${p}`;
    })
}

async function database_query_route(database, res, sql, params, single=false) {
    try {
        let data = await database.query(sql, params);
        let rows = data.rows
        if (rows.length > 0){
            res.json(single ? rows[0] : rows)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function database_execute_route(database, res, sql, params) {
    try {
        await database.query(sql, params);
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

function get_content_router(name, app, config, attr_names){
    let database = app.get('data')

    let r = Router();

    r.post('/', [
        require_login(),
        require_body(...attr_names),
        async (req, res) => {
            await database_execute_route(
                database,
                res,
                `call add_${name}(${get_attr_input_sql(attr_names.length + 1)})`,
                [...(attr_names.map(item => {
                    return req.body[item]
                })), req.session.username]
            )
        }
    ])

    r.get(`/id/:id`, [
        require_login(),
        async (req, res) => {
            await database_query_route(
                database,
                res,
                `select ${attr_names.join(', ')}
                 from ${name}
                 where id = $1
                   and account_id = (select id from accounts where username = $2)`,
                [req.params.id, req.session.username],
                true
            )
        }
    ])

    r.get('/search_tag/:tag', [
        require_login(),
        async (req, res) => {
            await database_query_route(
                database,
                res,
                `
                    select ${get_col_with_table(attr_names, 'a')}, d.created_on
                    from items_by_tag($1, $2) d
                             inner join ${name} a on i.item_id = d.item_id;`,
                [req.params.tag, req.session.username]
            )
        }
    ])

    r.get(`/tags/id/:id`, [
        require_login(),
        async (req, res) => {
            await database_query_route(
                database,
                res,
                `
                    select t.name
                    from tags_by_item((select item_id from ${name} where id = 1), $1) t;
                `,
                [req.session.username]
            )
        }
    ])
    return r;
}

module.exports = {get_content_router}