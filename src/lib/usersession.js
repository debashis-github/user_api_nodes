const db = require('./../models');
const uuidv1 = require('uuid/v1')
class UserSession {
    constructor() {

    }

    setAndSaveSession(user) {
        return new Promise((reslove, reject)=>{

            let user_session = {
                userId: user.id,
                token: uuidv1(),
                role: user.role,
                createdBy: user.id,
                updatedBy: user.id
            }
            db.session.upsert(user_session).then((session) => {
                //console.log(session)
                reslove(user_session.token)
            }).catch((err) => {
                //console.log(err)
                reject(err.message)
            }) ;
        })
    }

    getUser(session_token) {
        return  new Promise((res,rej)=>{
            let qr_str = `SELECT users.* FROM sessions INNER JOIN users ON users.id = sessions.userId WHERE sessions.token =?`;
            db.sequelize.query(
                qr_str,
                {replacements: [session_token], type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
                if (result) {
                    res(result[0]);
                } else {
                    rej('user not found');
                }
            }).catch((err) => {
                //console.log(err);
                rej(err);
            })
        })
    }
}

module.exports = UserSession;