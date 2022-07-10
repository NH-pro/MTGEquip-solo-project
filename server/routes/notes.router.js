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

// router.get('/:userId', (req, res) => {
//     const sqlQuery = `
//         SELECT
//             notes.id AS notes_id,
//             notes.user_match_id,
//             notes.note
//         FROM notes
//         JOIN user_match_junction
//             ON notes.user_match_id = user_match_junction.id
//         JOIN "user"
//             ON user_match_junction.user_id = "user".id
//         WHERE "user".id = $1
//         GROUP BY notes_id;
//     `;

    
// })

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
