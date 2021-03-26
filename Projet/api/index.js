"use strict ";
const axios = require("axios") ;

const OutputMenu = data => {
	var max =data["meals"].length;
	var id = Math.floor(Math.random() * Math.floor(max));
	return data["meals"][id]["strMeal"]
}

const getMenu = module.exports.getMenu = ingredient => {
	return new Promise(async (resolve, reject) => {
		const params= ingredient;
		try{
			const menus = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/filter.php?i=${params}`
				);
			var max =menus.data["meals"].length;
			var id1 = Math.floor(Math.random() * Math.floor(max));
			var id2 = Math.floor(Math.random() * Math.floor(max));
			var id3 = Math.floor(Math.random() * Math.floor(max));
			resolve([menus.data["meals"][id1]["strMeal"],menus.data["meals"][id2]["strMeal"],menus.data["meals"][id3]["strMeal"]]);
		} catch (error){
			reject(error);
		}
	});
}


const OutputRecipe = data => {
	return data["meals"][0]["strInstructions"]
}

const getRecipe = module.exports.getRecipe = menu => {
	return new Promise(async (resolve, reject) => {
		const params= menu;
		try{
			const recipe = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${params}`
				);
			resolve(OutputRecipe(recipe.data));
		} catch (error){
			reject(error);
		}
	});
}

