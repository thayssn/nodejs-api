const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const nunjucks = require('nunjucks');

nunjucks.configure('./src/views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/uploads', express.static('uploads'));

require('./src/controllers/authController')(app);
require('./src/controllers/users')(app);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(3000, () => console.log('all good.'));