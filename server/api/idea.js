const {Router} = require("express");
const {has_body_vars, must_be_logged_in} = require("../middleware/middleware_base");

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
    return
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
        must_be_logged_in(),
        has_body_vars(...attr_names),
        async (req, res) => {
            database_execute_route(
                database,
                res,
                `call add_${name}(${get_attr_input_sql(attr_names.length + 1)})`,
                [...(attr_names.map(item => {return req.body[item]})), req.session.username]
            )
        }
    ])

    r.get(`/id/:id`, [
        must_be_logged_in(),
        async (req, res) => {
            database_query_route(
                database,
                res,
                `select ${attr_names.join(', ')} from ${name} where id=$1 and account_id=(select id from accounts where username=$2)`,
                [req.params.id, req.session.username],
                true
            )
        }
    ])

    r.get('/search_tag/:tag', [
        must_be_logged_in(),
        async (req, res) => {
            database_query_route(
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
        must_be_logged_in(),
        async (req, res) => {
            database_query_route(
                database,
                res,
                `
                select t.name
from tags_by_item((select item_id from ${name} where id=1), $1) t;
                `,
                [req.session.username]
            )
        }
    ])

    // r.put('/id/:id', [
    //     must_be_logged_in()
    // ])

    return r;
}

function get_idea_router(app, config) {
    return get_content_router('idea', app, config, ['title', 'content'])
}

module.exports = {get_idea_router}

// function get_idea_router(app, config){
//     let database = app.get('data')
//
//     let returnValue = Router()
//
//     returnValue.post('/', [
//         must_be_logged_in(),
//         has_body_vars('title', 'content'),
//         async (req, res) => {
//             try {
//                 await database.query(
//                     'call add_idea($1, $2, $3)',
//                     [req.session.username,
//                         req.body.title,
//                         req.body.content]
//                 );
//                 res.sendStatus(200)
//             } catch (e) {
//                 console.error(e)
//                 res.sendStatus(500)
//             }
//         }
//     ])
//
//     returnValue.get('/id/:id',
//         [
//             must_be_logged_in(),
//             async (req, res) => {
//                 const data = (await database.query(
//                     'select title, content, created_on from idea_item where id=$1 and account_id=(select id from accounts where username=$2)',
//                     [req.params.id, req.session.username]
//                 )).rows
//
//                 if (data.length > 0){
//                     res.json(data[0])
//                 } else {
//                     res.sendStatus(404)
//                 }
//             }
//         ])
//
//     return returnValue;
// }