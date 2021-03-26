const patternDict = [
	{
		pattern :'\\b(?<greeting>Hi|Hello|Hey|Good morning)\\b',
		intent : 'greeting'

	},
	{
 		pattern :'(how can i (do|cook|prepare|make)|(instructions|recipe) for)\\s\\b(?<menu>.+)',
		intent : 'Recipe'
	},

	{
 		pattern :'((I want to (eat something with|finish my|consume my|devour my))|with) (?<food>.+)',
		intent : 'Menu'
	},
	{
 		pattern :'\\b(cook|eat)\\b',
		intent : 'get ingredient'
	},
	{
 		pattern :'\\b(recipe|instructions)\\b',
		intent : 'get recipe'
	},
	{
 		pattern :'\\b(recommend|suggestion|suggest|recommendation)\\b',
		intent : 'reco'
	},
	{
 		pattern :'\\b(favorite ingredient is) (?<fav>.+)',
		intent : 'favorite'
	},

	{
 		pattern :'\\b(bye|exit|see you|goodbye)\\b',
		intent : 'Exit'
	}
];

module.exports = patternDict;