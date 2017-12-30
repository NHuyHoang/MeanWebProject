
const jwt = require('jsonwebtoken');
const config = require('../config.json');
module.exports = {
    verify:(req)=>{
        let token = getToken(req);
        return new Promise((resolve,reject) => {
            if(token){
                jwt.verify(token,config.secret,(err,decoded) => {
                   
                    if(err) reject()
                    if(decoded.admin && decoded.admin === true)
                        resolve();
                    reject();
                })
            }
            else reject()
        })
    }
}

function getToken(req){
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}