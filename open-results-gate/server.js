const Pusher = require('pusher');
const credentials = require('./cred');
const africastalking = require('africastalking')(credentials.AT);
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { pullResults, pullWithSwitch } = require('./pull');
const ussd = require('./routes/ussd');
const test = require('./routes/test');
const { service, stepone, steptwo, stepthree, stepfour, stepfive } = require('./switch');
const { extract } = require('./assign');
const request = require('superagent');

// Application Instances
const pusher = new Pusher(credentials.pusher);
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Global Variables
let collection = '';
let candidate = '';

const welcomeMsg = `CON Welcome to Open Results. \nSelect your desired option.
1. ZIMSEC results.
2. University application.
3. EMAP Form 1 application.
4. Passport application.
5. Driver's License Application.
6. Medical Lab results.
`;

// Routes
app.use('/', test);
//app.use('/view', ussd);

app.post('/view', async (req, res) => {
	console.log(req.body);
	let message = '';
	const { sessionId, serviceCode, phoneNumber, text } = req.body;
	const textValue = text.split('*').length;

	if (text === '') message = welcomeMsg;
	else
		switch (textValue) {
			case 1:
				collection = service(text);
				message = stepone(collection);
				break;
			case 2:
				candidate = text.split('*')[1];
				message = steptwo(collection);
				break;
			case 3:
				switch (collection) {
					case 'immigration':
						message = `END Thank you for using Open Results`;
						break;
					case 'vid':
						message = `END Thank you for using Open Results`;
						break;
					case 'labs':
						message = `END Thank you for using Open Results`;
						break;
					default:
						message = stepthree(collection);
						break;
				}
				break;
			case 4:
				switch (collection) {
					case 'admissions':
						const params = await extract(text, collection);
						const uri = `https://khaya-api.herokuapp.com/parse/classes/admissions?where={"ref":${
							params[1]
						}}&limit=1`;
						let str = '';
						await request
							.get(uri)
							.set('X-Parse-Application-Id', 'parse-khaya-app-ID')
							.then(results => {
								const data = results.body.results[0].results;
								if (results.body.results === []) {
									str = 'No results found.';
								} else {
									for (var result in data) {
										str += `${data[result]} \n`;
									}
								}
								console.log(str);
								return results;
							})
							.catch(error => console.log(error));

						message = `END Your TelOne Part 1 Application : \n${str} Thank you for using Open Results`;
						break;
					default:
						message = stepfour(collection);
						break;
				}
				break;
			case 5:
				switch (collection) {
					case 'emap':
						const params = await extract(text, collection);
						const uri = `https://khaya-api.herokuapp.com/parse/classes/emap?where={"number":${
							params[0]
						}}&limit=1`;
						let str = '';
						await request
							.get(uri)
							.set('X-Parse-Application-Id', 'parse-khaya-app-ID')
							.then(results => {
								const data = results.body.results[0].results;
								if (results.body.results === []) {
									str = 'No results found.';
								} else {
									for (var result in data) {
										str += `${data[result]} \n`;
									}
								}
								console.log(str);
								return results;
							})
							.catch(error => console.log(error));

						message = `END Your Form 1 Application : \n${str} Thank you for using Open Results`;
						break;
					default:
						message = stepfive(collection);
						break;
				}
				break;
			case 6:
				message = `CON You are about to view results for candidate : ${candidate}, please confirm.
        1. Yes
		2. No`;
				break;
			default:
				const params = await extract(text, collection);
				const uri = `https://khaya-api.herokuapp.com/parse/classes/zimsec?where={"number":${
					params[0]
				}}&limit=1`;
				let str = '';
				await request
					.get(uri)
					.set('X-Parse-Application-Id', 'parse-khaya-app-ID')
					.then(results => {
						const data = results.body.results[0].results;
						if (results.body.results === []) {
							str = 'No results found.';
						} else {
							for (var result in data) {
								str += `${result} ${data[result]} \n`;
							}
						}

						console.log(str);
						return results;
					})
					.catch(error => console.log(error));

				message = `END Your ZIMSEC results : \n${str} Thank you for using Open Results
				`;
				break;
		}

	res.contentType('text/plain');
	res.status(200).send(message);

	// Reset data
});

try {
	app.listen(port);
	console.log(`Open Results API running on port ${port}.`);
} catch (error) {
	console.log(error);
}
