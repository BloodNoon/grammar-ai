if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const initializePassport = require('./passport/passport-config');
initializePassport(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
// mongoose.connect(process.env.MONGODB_URI);
// const db = mongoose.connection;
// db.on('error', (error) => {
// 	console.error(error);
// });
// db.once('open', () => {
// 	console.log('Database Connected');
// });
const usersRouter = require('./routes/users');
const promptsRouter = require('./routes/prompts');
//const answersRouter = require('./routes/answers');
app.use('/api/user', usersRouter);
app.use('/api/prompt', promptsRouter);
//app.use('/api/answer', answersRouter);

// Grammar AI proxy — must be before the production static catch-all
app.use('/api/grammar', createProxyMiddleware({
	target: 'http://localhost:8000',
	changeOrigin: true,
	pathRewrite: { '^/api/grammar': '' }
}));

if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
