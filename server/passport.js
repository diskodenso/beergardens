// first passport code:

// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
//     const secretOrKey = require("./config.js").secretOrKey;
// const userModel = require("./models/userModel");

// const jwtOptions = {
// secretOrKey: secretOrKey,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

// const jwtVerify = async (payload, next) => {
//     try {
//         const user = await userModel.findById(payload.id);
//         console.log("user :>>", user);
//         if (!user) {
//             return next(null, false);
//         }
//         next(null, user);
//     } catch (error) {
//         next(error, false);
//     }
// };

// const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
// module.exports = {
//     jwtStrategy,
// };
// second passport code
const passport = require('pa');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require("./models/userModel");
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}
// authorization - 
passport.use(new JwtStategy({
    // 
    jwtFromRequest: cookieExtractor,
    // the key that you use to sign the token - 
    // secretOrKey to verify that the token is legit
    secretOrKey: "Testperson"
    // the payload is basically the data we set within our jwt token
}, (payload, done) => {
    // first we need to check to see if the user exists 
    user.findById({ _id: payload.sub }, (err, user) => {
        // if there is an error, we gonna return the done function and return that 
            // error and say false
        if (err)
            return done(err, false);
                    // next is to check if the user is null
        // if the user is not null we can return the user
        // the reason for doing that we have been authenticated already 
        // so we do not need to check the password
        if (user)
            return done(null, user);
        else
            // there is no error but there is also no user that has that primary key (_id)
            return done(null, false);
    });
}));
// passport.use will be triggered when we try to authenticate
// sign in using our username and password
// once we are authenticated we gonna set a cookie on the clients browser - this is gonna be the jwt token
// we provide a custom function to extract the jwt token from the request 
// authenticated local strategy using username and password
passport.use(newLocalStrategy((userName, password, done) => {
    User.findOne({ userName }, (err, user) => {
        // something went wrong with the database
        if (err)
            return done(err);
        // if no user exists
        if (!user)
            return done(null, false);
        // checks if password is correct
        user.comparePassword(password, done);
    });
}));