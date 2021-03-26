'use strict';
const axios = require('axios');
const apiVersion = 'v9.0';


class FBeamer {

	constructor({pageAccessToken,VerifyToken}) {
		if(pageAccessToken != null && VerifyToken != null){
			this.pageAccessToken = pageAccessToken;
			this.VerifyToken = VerifyToken;	
		}
	}

	registerHook(req,res){
		const params = req.query;
		const mode = params['hub.mode'];
		const token = params['hub.verify_token'];
		const challenge = params['hub.challenge'];

		try{
			if(mode === 'subscribe' && token === this.VerifyToken){ 

				console.log('webhook is registered');
				return res.send(challenge);
			}else{
				throw "Could not register webhook !";
				return res.sendStatus(200);
 			}
 		}catch(e){
 			console.log(e);
 		}
 	}

 	incoming(req,res,callback){
    res.sendStatus(200);
 		if (req.body.object === 'page' && req.body.entry) {
            const data = req.body;
            const messageObj = data.entry;
            //console.log(messageObj);
            if (!messageObj[0].messaging)
                console.log("Error message");
            else {
                return callback(messageObj[0].messaging);
            }
        }
        
        
 	}


 	messageHandler(obj) {
        const sender = obj[0].sender.id;
        const message = obj[0].message;
        const obj2 = {
            sender,
            type: 'text',
            content: message
        }
        return obj2;
  }

    sendMessage2(msgType, id, text){
        const payload = {
            "messaging_type": msgType,
            "recipient": {
                "id": id
            },
            "message": {
                "text": text
            }
        };
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `https://graph.facebook.com/v6.0/me/messages?access_token=${this.pageAccessToken}`,
                headers: { 'Content-Type': 'application/json' },
                data: payload
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve({
                        messageId: body.message_id
                    });
                } else {
                    //reject(error);
                    console.log('Error')
                }
            });
        });
    }

    txt(id, text, messaging_type = 'RESPONSE') {
        let obj = {
            messaging_type,
            recipient: {
                id
            },
            message: {
                text
            }
        }
        return this.sendMessage(obj);
    }

}

module.exports = FBeamer;