const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const db = require('./DB')

const registerRouter = require('./api/register/register_router')
const hrRouter = require('./api/hr/hr_router')
const companyRouter = require('./api/company/company_router')
const jobOfferRouter = require('./api/jobOffer/jobOffer_router')
const studentsRouter = require('./api/student/studentRouter')

const passport = require('passport')
const passportFunc = require('./config/passport')

const path = require('path');
const companyRouter = require('./api/company/companyRouter');

const app = express()
const PORT = process.env.PORT || 4201
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.set('view engine', 'ejs')
app.set('trust proxy', true);
app.use('/', express.static(path.join(__dirname, './uploads'), { etag: false }));
db.on('error', () => {
    console.log(chalk.red('Connection error'))
})
app.listen(PORT, () => {
    console.log(`${chalk.green('tech_career-employers-team2')} ${chalk.yellow('live and up on port')} ${chalk.red(PORT)}`);
})


app.use(passport.initialize());
app.use('/registration', registerRouter);
app.use('/hrs', hrRouter);
app.use('/companies', companyRouter);
app.use('/jobOffers', jobOfferRouter);
app.use('/company', companyRouter);
app.use('/students', studentsRouter);


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}