const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('In commJunc Router, this is req.body', req.body);

    const sqlQuery = `
        INSERT INTO "commander_damage_junction" ("match_id", "attacker_id", "defender_id", "amount")
        VALUES ($1, $2, $3, 0)
    `;
    pool.query(sqlQuery, [req.body.matchId, req.body.attackerId, req.body.defenderId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});


module.exports = router;
