const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
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
});

module.exports = router;
