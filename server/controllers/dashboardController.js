// GET /
// Dashboard

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "The Unlimited Version",
  }
  res.render('dashboard/index', {
    locals,
    layout: '../views/layouts/dashboard'
  });
}