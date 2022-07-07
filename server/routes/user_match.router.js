const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(`in user_match Router POST`,req.body);

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

router.get('/', (req, res) => {
    console.log(` in user_match Router GET`);

    const sqlQuery = `
        SELECT * FROM "user_match_junction"
        WHERE "match_id" = 
    `
})

module.exports = router;
