module.exports = function ensureAdmin(req, res, next) {
  if (!req.Cap805Session.user.isAdmin) {
    res.render("login", {
      errorMsg: "You do not have permissions for the page requested!",
      layout: false,
    });
  } else {
    next();
  }
};
