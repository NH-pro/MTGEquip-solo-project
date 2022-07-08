const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlQuery = `
    SELECT "id" from "match"
    ORDER BY "id" DESC LIMIT 1;
  `
  pool.query(sqlQuery)
    .then(result => {
        res.send(result.rows[0])
    })
    .catch(err => {
        console.log(`Error in match.router GET`, err);
        res.sendStatus(500);
    })
});

router.get('/:matchCode', (req, res) => {
  // GET route code here
  const sqlQuery = `
    SELECT "id" from "match"
    WHERE "code" = $1;
  `;
  pool.query(sqlQuery, [req.params.matchCode])
    .then(result => {
        res.send(result.rows[0]);
    })
    .catch(err => {
        console.log(`Error in match.router GET`, err);
        res.sendStatus(500);
    })
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
    console.log(req.body);

    const sqlQuery = `
        INSERT INTO "match" ("code", "date")
        VALUES ($1, $2)
        RETURNING "id";
    `
    pool.query(sqlQuery, [req.body.code, req.body.date])
        .then(result => {
            console.log('New Match Id:', result.rows[0].id);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;
