const db = require('./../models');
const Op = require('sequelize').Op;
class ApiAccess {
    constructor(request) {
        this._request = request;
    }

    checkAppKey() {
        if(this._request.headers.app_key === (process.env.APP_KEY || 123456)) {
            return true;
        }
        return false;
    }

    checkSessionKey(session_token) {
        return new Promise((resolve, reject) => {
            const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/g;
            if (regex.test(this._request.headers.session_token)) {
                db.session.findOne({
                    where: {token: this._request.headers.session_token || session_token, is_active:  '1'},
                    attribute: ['userID']
                }).then((session) => {
                    if (session)
                        resolve(session.userId);
                    else reject('session not found');
                }).catch((err) => {
                    reject(err)
                })
            } else
                reject('invalid session token');
        })
    }
    destorySessionKey(session_token, userId){
        return new Promise((resolve, reject) => {
            const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/g;
            if (regex.test(this._request.headers.session_token)) {
                db.session.findOne({
                    where: {
                        token: this._request.headers.session_token || session_token,
                        userId: userId,
                        is_active: '1'
                    },
                    attribute: ['userId','token']
                }).then((session) => {
                    if (session){
                        //console.log(session);
                        //console.log('asdsa');
                        db.session.update({
                            is_active: '0',
                        }, {
                            where: {
                                token:  session.token,
                                userId: session.userId
                            }
                        }).then((check) =>{
                            if(check){
                                resolve(session.userId);
                            } else {
                                reject('session not destoryed');
                            }
                        })
                        resolve(session.userId);
                    }
                    else {
                        reject('session not found');
                    }
                }).catch((err) => {
                    reject(err)
                })
            } else
                reject('invalid session token');
        })
    }
    removeAllSesstion(id,role){
        return new Promise((resolve, reject) => {
            db.session.update({is_active: '0'},{
                where: {
                    userId: id,
                    role: role,
                    is_active: '1'
                }
            }).then((session) => {
                if (session){
                    resolve(session.userId);
                }
                else {
                    reject('session not found');
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
}


module.exports = ApiAccess;