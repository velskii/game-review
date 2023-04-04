module.exports = function ensureLogin(req, res, next) {
  if (!req.Cap805Session.user) {
    // res.redirect("/login");
    res.status(401).json({
      err: "You have no permission to do the operation, please login first!",
      link: "/login",
    });
    return;
  } else {
    next();
  }
};
