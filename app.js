require ('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;


app.use(session({
  secret: 'Pathways',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


// CONNECTING DB
connectDB();


// STATIC FILES
app.use(express.static('public'));

// TEMPLATES
app.use(expressLayouts);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.get('*', function(req, res) {
  res.status(404).render('404');
})

app.listen(port, ()=>{
	console.log(`App is running on port ${port}`);
});