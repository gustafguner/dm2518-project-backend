const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import User from './models/user';

export const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  },
  (jwtPayload: any, callback: any) => {
    User.findById(jwtPayload.id, (err, user) => {
      if (err) {
        return callback(err, false);
      }
      if (user) {
        return callback(null, user);
      }
      return callback(null, null);
    });
  },
);
