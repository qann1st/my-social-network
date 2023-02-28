const router = require('express').Router();

router.get('/');
router.get('*', () => {
  
})

module.exports.usersRouter = router;
