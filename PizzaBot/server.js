'use strict';

const express = require('express');
const config = require('./config');

const bodyParser = require('body-parser')

const matcher = require('../Projet/matcher'); // to use the matcher module here
const { getMenu } = require('../Projet/api');
const { getRecipe } = require('../Projet/api');

const { currentMenu } = require('../Projet/parser');
const { currentRecipe } = require('../Projet/parser');

const {spawn} = require("child_process");

const fb = require('./fbeamer');

//console.log(config.FB);
const f = new fb(config.FB);

//console.log(f.VerifyToken);

const app = require('../Projet/app'); // to use the matcher module here

// create application/json parser
var jsonParser = bodyParser.json()
  
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const server = express(); 
const PORT = process.env.PORT || 3000;

//server.get('/',jsonParser,(req,res) => f.registerHook(req,res));
server.get('/', jsonParser,(request, response) => f.registerHook(request, response));
server.listen(PORT, () => console.log(`The bot server is running on port ${PORT}`) );

//server.post('/',jsonParser, (req,res,next) => f.incoming(req, res));

server.post('/', jsonParser,(request, response, data) => f.incoming(request, response, data => {
	var dataToSend;
	const userData = f.messageHandler(data);
	console.log(userData);
	matcher(userData.content.text , cb => {
		if(cb.intent == "greeting"){			
			//console.log(`${cb.entities.greeting} to you too !`);
			//return `${cb.entities.greeting} to you too !`;
			//answ = "merde";
			let r = cb.entities.greeting;
			//console.log(r);
			//answ = r.concat(' to you too');

			f.sendMessage2("RESPONSE",userData.sender,r.concat(' to you too'));
			//console.log(answ);
			//return answ;
		}

		else if (cb.intent == "get ingredient"){
			f.sendMessage2("RESPONSE",userData.sender,'With which ingredient would you like to cook ?');
			//return answ;
		}
		else if (cb.intent == "Menu"){
			let r = cb.entities.food;
			
			getMenu(cb.entities.food).then(x=>{f.sendMessage2("RESPONSE", userData.sender, ('Checking menus with '.concat(r).concat(' ...⏳\n')+ currentMenu(x[0]) + '\nOr ' + currentMenu(x[1]) + '\nOr ' +currentMenu(x[2]) ))})
			.catch(error => {
				let r = cb.entities.food
				f.sendMessage2("RESPONSE", userData.sender, 'I do not have any menus with '.concat(r).concat('... Sorry :('));
				//return answ;
				//answ = `I don't have any menus with ${cb.entities.food}... Sorry :(`;

			});
			
			//answ.concat(m);
			
		}
		else if (cb.intent == "get recipe"){
			f.sendMessage2("RESPONSE",userData.sender,'For which menu would you like the recipe ?');

		}
		else if (cb.intent == "Recipe"){
			let r = cb.entities.menu;

			getRecipe(cb.entities.menu).then(x=>{f.sendMessage2("RESPONSE", userData.sender, ('Checking recipes for '.concat(r).concat(' ...⏳\n')+  currentRecipe(x).concat('\nGood Luck ! 👨‍🍳\n') ))})

			
			.catch(error => { 
				let r = cb.entities.menu;
				f.sendMessage2("RESPONSE", userData.sender,'I do not have any recipe with '.concat(r).concat('... Sorry :('));
				//return answ;
				//return `I don't have any recipe with ${cb.entities.menu}... Sorry :(`;
			});
		}
		else if(cb.intent == "reco"){
			f.sendMessage2("RESPONSE",userData.sender,'Sure ! What is your favorite ingredient ?');
 
		}
		else if(cb.intent == "favorite"){

			const pythonProcess = spawn('python',["./recommendation.py", userData.sender,cb.entities.fav]);
			console.log(userData.sender)
			console.log(cb.entities.fav)
  			pythonProcess.stdout.on('data', (data) => {
  				dataToSend = data.toString();
  			});
  			console.log(dataToSend)
  			pythonProcess.on('close', (code) => {
 				// send data to browser
				f.sendMessage2("RESPONSE",userData.sender,'Let me search something for you ...⏳\n'+"Why don't you try some of these meals :\n"+dataToSend);
 			});

		}		
		else if (cb.intent == "Exit"){
			f.sendMessage2("RESPONSE",userData.sender,'Bye ! Enjoy your food');
		}
		
		else{
    		f.sendMessage2("RESPONSE",userData.sender,'I am sorry, I do not understand your question');
		}
		
	});
		
}));


