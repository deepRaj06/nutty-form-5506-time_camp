const { Router } = require("express");
const passport = require("passport");

const pass = Router();

pass.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfull Login",
      user: req.user,
      userId: req.user.id
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

pass.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

pass.get("/google", passport.authenticate("google", ["profile", "email"]))

pass.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/app/timesheet",
    failureRedirect: "/login/failed",
  })
);

pass.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
})

module.exports = {
  pass
}
