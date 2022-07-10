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

module.exports = router;
