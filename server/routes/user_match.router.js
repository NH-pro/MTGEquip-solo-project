const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {

    const sqlQuery = `
        INSERT INTO "user_match_junction" ("match_id", "user_id", "hp", "poison")
        VALUES ($1, $2, 40, 0);
    `;

    pool.query(sqlQuery, [req.body.matchId, req.user.id])
        .then(result => {
            console.log('Success user_match Router POST')
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.post('/join', (req, res) => {
    const sqlQuery = `
        INSERT INTO "user_match_junction" ("match_id", "user_id", "hp", "poison")
        VALUES ($1, $2, 40, 0);
    `;

    pool.query(sqlQuery, [req.body.id, req.user.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/:matchId', (req, res) => {

    const sqlQuery = `
        SELECT 
            "user".id,
            "user".username,
            user_match_junction.id AS junction_id,
            user_match_junction.match_id,
            user_match_junction.user_id,
            user_match_junction.hp,
            user_match_junction.poison
        FROM user_match_junction
        JOIN "user"
        ON user_match_junction.user_id = "user".id
        WHERE match_id = $1;
    `
    pool.query(sqlQuery, [Number(req.params.matchId)])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

module.exports = router;
