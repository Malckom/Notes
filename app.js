require ('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// STATIC FILES
app.use(express.static('public'));

// TEMPLATES
app.use(expressLayouts);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.get('*', function(req, res) {
  res.status(404).render('404');
})

app.listen(port, ()=>{
	console.log(`App is running on port ${port}`);
});