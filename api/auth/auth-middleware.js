const Users = require('../users/users-model');

function restricted(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, message: "You shall not pass!"})
  }
}

async function checkUsernameFree(req, res, next) {
  const { username } = req.body;
  const users = await Users.find();
  const userNames = []
  users.forEach(user => {
    userNames.push(user.username)
  });

  if (userNames.includes(username)) {
    res.status(422).json({
      message: "Username taken"
    })
  } else {
    next()
  }
}

async function checkUsernameExists(req, res, next) {
  const { username } = req.body;
  const users = await Users.find();
  const userNames = []
  users.forEach(user => {
    userNames.push(user.username)
  });

  if (!userNames.includes(username)) {
    res.status(401).json({
      message: "Invalid credentials"
    })
  } else {
    next()
  }
}

function checkPasswordLength(req, res, next) {
  const { password } = req.body;

  if (!password || password.length < 3) {
    res.status(422).json({
      message: "Password must be longer than 3 chars"
    })
  } else {
    next()
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}
