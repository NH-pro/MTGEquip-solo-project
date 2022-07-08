const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/addHp', (req, res) => {
    console.log('this is req.body', req.body);

    const sqlQuery = `
        UPDATE user_match_junction
        SET hp = $1
        WHERE id = $2;
    `;
    pool.query(sqlQuery, [req.body.playerHp, req.body.junctionId])
        .then(result => {
            console.log(`Success user_match Router PUT`);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;
