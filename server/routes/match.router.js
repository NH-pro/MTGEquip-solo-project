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
    const sqlQuery = `
        INSERT INTO "match" ("code", "date", "creator_id")
        VALUES ($1, $2, $3)
        RETURNING "id";
    `;
    pool.query(sqlQuery, [req.body.code, req.body.date, req.body.creator])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/id/:matchId', (req, res) => {
  const sqlQuery = `
    SELECT * FROM "match"
    WHERE "id" = $1;
  `;
  pool.query(sqlQuery, [req.params.matchId])
    .then(result => {
      res.send(result.rows[0])
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

module.exports = router;
