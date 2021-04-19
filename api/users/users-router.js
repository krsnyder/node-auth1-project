const router = require('express').Router();
const {restricted} = require('../auth/auth-middleware');
const Users = require('./users-model');

router.get('/', restricted, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next);
});

module.exports = router;
