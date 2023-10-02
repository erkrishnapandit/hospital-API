const passport = require("passport");
const Doctor = require("../models/doctor");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("JWT", jwt_payload);
    Doctor.findById(jwt_payload._id)
      .then(function (user) {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(function (error) {
        console.log("Error in finding the User from JWT");
        return done(error);
      });
  }),
);

module.exports = passport;
