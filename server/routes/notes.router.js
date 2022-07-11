const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post ('/', (req, res) => {
    const sqlQuery = `
        INSERT INTO "notes" ("user_match_id", "note")
        VALUES ($1, $2);
    `;
    pool.query(sqlQuery, [req.body.juncId, req.body.note])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/:matchId', (req, res) => {
    const sqlQuery = `
        SELECT
            notes.id,
            notes.user_match_id,
            notes.note
        FROM notes
        JOIN user_match_junction
            ON notes.user_match_id = user_match_junction.id
        JOIN "user"
            ON user_match_junction.user_id = "user".id
        JOIN match
            ON user_match_junction.match_id = match.id
        WHERE "user".id = $1
        AND match.id = $2
        GROUP BY notes.id;
    `;
    pool.query(sqlQuery, [req.user.id, req.params.matchId])
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })

})

router.get('/userHistory/:userId', (req, res) => {
    const sqlQuery = `
        SELECT
            match.id,
            match.date,
            match.winner_id
        FROM user_match_junction
        JOIN match
            ON user_match_junction.match_id = match.id
        JOIN "user"
            ON user_match_junction.user_id = "user".id
        WHERE "user".id = $1;
    `;
    pool.query(sqlQuery, [req.params.userId])
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

module.exports = router;
