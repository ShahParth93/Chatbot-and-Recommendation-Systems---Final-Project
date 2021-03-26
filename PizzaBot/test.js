
/*
const {spawn} = require("child_process");
const pythonProcess = spawn('python',["./recommendation.py"]);
pythonProcess.stdout.on('data', (data) => {
    // Do something with the data returned from python script
    console.log(data.toString())
});


*/


/*

const {spawn} = require("child_process");
const Readline = require('readline'); // for reading inputs

const rl = Readline.createInterface({ // for reading inputs
	input : process.stdin,
	output : process.stdout,
	terminal : false
})


/*rl.setPrompt("ingredient :");
rl.prompt()
rl.on('line', ingredient => {
	/*rl.setPrompt("sender :")
	rl.prompt()
	rl.on('line',sender => { 
	//const sender =6348204667888287
	const pythonProcess = spawn('python',["./recommendation.py"]);
	pythonProcess.stdout.on('data', (data) => {
    // Do something with the data returned from python script
    console.log(data.toString())
	});
//})

//})
 /*
let ingredient = ""
rl.setPrompt("ingredient :");
rl.prompt()
rl.on('line', replyIngredient => {
	ingredient = replyIngredient
})
let sender = ""
rl.setPrompt("sender :")
rl.prompt()
rl.on('line', replySender => {
	sender = replySender
})	
const pythonProcess = spawn('python',["./recommendation.py", sender,ingredient]);
pythonProcess.stdout.on('data', (data) => {
// Do something with the data returned from python script
console.log(data.toString())
});
*/
const {spawn} = require("child_process");
const Readline = require('readline'); // for reading inputs

const rl = Readline.createInterface({ // for reading inputs
	input : process.stdin,
	output : process.stdout,
	terminal : false
})

let s = ''
let i = '' 
const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your sender ?', (answer) => {
    	s=answer
      	console.log(`Your sender: ${s}`)
      	resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your favorite ingredient ? ', (answer) => {
    	i=answer
    	console.log(`Your ingredient: ${i}`)
      	resolve()
    })
  })
}

const main = async () => {
  await question1()
  await question2()
  const pythonProcess = spawn('python',["./recommendation.py", s,i]);
  pythonProcess.stdout.on('data', (data) => {
// Do something with the data returned from python script
		console.log(data.toString())
  });
  rl.close()
}

main()

