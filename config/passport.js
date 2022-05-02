import Merchant from '../models/merchant-schemma.js';
import { Strategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import passport from 'passport';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'crave_secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new Strategy(opts, function(jwt_payload, done) {
    Merchant.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user)

        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
