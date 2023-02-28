const router = require('express').Router();

router.get('/', (req, res) => res.send('lol'));

module.exports.usersRouter = router;
