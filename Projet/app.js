'use strict';

function app(reply){
	const matcher = require('./matcher'); // to use the matcher module here
	const { getMenu } = require('./api');
	const { getRecipe } = require('./api');

	const { currentMenu } = require('./parser');
	const { currentRecipe } = require('./parser');



	let answ = "";
	let m = "";

	matcher(reply , cb => {
		if(cb.intent == "greeting"){			
			//console.log(`${cb.entities.greeting} to you too !`);
			//return `${cb.entities.greeting} to you too !`;
			let r = cb.entities.greeting;
			answ = r.concat(' to you too');
			
		}

		if (cb.intent == "get ingredient"){
			answ = 'With which ingredient would you like to cook ?';
		}
		if (cb.intent == "Menu"){
			let r = cb.entities.food;
			answ = 'Checking menus with '.concat(r).concat(' ...\n');
			m = getMenu(cb.entities.food)

			/*
			.then(response => {
				let parseResult = currentMenu(response);
				console.log('response available');
				//answ= answ.concat(parseResult);
				console.log(parseResult);
				return parseResult;
			})	
			.catch(error => {
				let r = cb.entities.food
				answ = 'I do not have any menus with '.concat(r).concat('... Sorry :(');
				//return answ;
				//answ = `I don't have any menus with ${cb.entities.food}... Sorry :(`;

			});
			*/
			console.log(m);
			
		}
		if (cb.intent == "get recipe"){
			answ = 'For which menu would you like the recipe ?'
		}
		if (cb.intent == "Recipe"){
			let r = cb.entities.menu;
			answ = 'Checking recipes for '.concat(r).concat(' ...\n');
			console.log(`Checking recipes for ${cb.entities.menu}...`);
			getRecipe(cb.entities.menu)
			.then(response => {
				let parseResult = currentRecipe(response);
				console.log('response available');
				answ.concat(parseResult);
				console.log(answ);
				return answ;
			})
			.catch(error => {
				let r = cb.entities.menu;
				answ = answ.concat('I do not have any recipe with ').concat(r).concat('... Sorry :(');
				
			});
		}		
		if (cb.intent == "Exit"){
			answ = 'Bye ! Enjoy your food'
			
		}
		/*
		else{
    		answ = 'I am sorry, I do not understand your question';
    		//return answ;
		}
		*/
	});
	return answ;
}


module.exports = app;
