const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function initialize(passport) {
	passport.use(
		'login',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				try {
					const user = await User.findOne({ email });
					if (!user)
						return done(null, false, { message: 'User not found.' });
					if (await bcrypt.compare(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Incorrect password.' });
					}
				} catch (err) {
					return done(err);
				}
			}
		)
	);

	passport.use(
		new JWTStrategy(
			{
				secretOrKey: process.env.JWT_SECRET,
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			},
			async (token, done) => {
				try {
					const user = await User.findById({ _id: token.id });
					if (user) return done(null, user);
				} catch (err) {
					return done(err);
				}
			}
		)
	);

	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id);
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	});
}

module.exports = initialize;
