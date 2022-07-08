const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log(`In match.router GET`)

  const sqlQuery = `
    SELECT "id" from "match"
    ORDER BY "id" DESC LIMIT 1;
  `
  pool.query(sqlQuery)
    .then(result => {
        console.log('The highest match id is:', result.rows[0].id);
        res.send(result.rows[0])
    })
    .catch(err => {
        console.log(`Error in match.router GET`, err);
        res.sendStatus(500);
    })
});

router.get('/:matchCode', (req, res) => {
  // GET route code here
  console.log(`In match.router GET`, req.params.matchCode)

  const sqlQuery = `
    SELECT "id" from "match"
    WHERE "code" = $1;
  `;
  pool.query(sqlQuery, [req.params.matchCode])
    .then(result => {
        console.log('this is the match id from Router params', result.rows[0].id)
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
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;
