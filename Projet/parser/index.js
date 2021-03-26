'use strict';
const colors = require("colors");


const currentMenu = module.exports.currentMenu = response => {
	return `You can make ${response}`
	
}

const currentRecipe = module.exports.currentRecipe = response => {
	return `Follow the instructions below:\n ${response}`
	
}
