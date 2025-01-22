exports.isLoggedIn = function (req, res, next) {
  console.log('Checking if user is logged in');
  if (req.user) {
    console.log('User is logged in');
    next();
  } else {
    console.log('User is not logged in');
    return res.status(401).send('Access Denied');
  }
}