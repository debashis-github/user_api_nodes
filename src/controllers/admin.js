"use strict"

const adminController = require('express').Router()

const bodyParser = require('body-parser')

adminController.use(bodyParser.urlencoded({extended: true}))
adminController.use(bodyParser.json())

const db = require('./../models')
const useSession = require('./../lib/usersession')
const md5 = require('md5')
const Op = require('sequelize').Op
const ApiAccess = require('./../middleware/access')
const UserInputValidator = require("../lib/input_validation")


adminController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT')
    response.append('Access-Control-Allow-Headers', ['session_token'])
    next()
})

/*
* Get All User
* */

adminController.route('/users').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkSessionKey(request.headers.session_token).then((result) => {
        //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            }
            db.user.all({
                attributes: ['id', 'usernm', 'phone_no', 'role', 'email','service_id','is_active','createdAt']
            }).then(users => {
                try {
                    response.json({success: true, data: users})
                } catch (exception) {
                    response.json({success: false, 'error': exception.message})
                }
            }).catch((err) => {
                response.json({success: false, error: err.errors[0].message})
            })
        }).catch((err) => {
            response.json({success: false, message: 'Session token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, 'error': exception.message})
    }
})

/*
* Get a User
* */

adminController.route('/users/:id').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkSessionKey(request.headers.session_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            }
            db.user.find({
                where: {
                    id: request.params.id
                },
                attributes: ['id', 'usernm', 'phone_no', 'role', 'email','service_id','is_active','createdAt']
            }).then(user => {
                try {
                    response.json({success: true, data: user})
                  } catch (exception) {
                    response.json({success: false, 'error': exception.message})
                }
            }).catch((err) => {
                response.json({success: false, error: err.errors[0].message})
            })
        }).catch((err) => {
            response.json({success: false, message: 'Session token required or expired'})
    })
    } catch (exception) {
        response.json({success: false, 'error': exception.message})
    }
})

/*
* Admin Registration
* */

adminController.route('/create').post((request, response) => {
    try {
        let password = request.body.password || 'A12345687'
        let new_user = {
            usernm: request.body.usernm,
            password: password,
            phone_no: request.body.phone_no,
            email: request.body.email || null,
            role: request.body.role || 0,
            service_id: request.body.service_id || 0,
            createdBy: request.body.created_by || null,
            updatedBy: request.body.created_by || null,
            createdAt: new Date() || null,
            updatedAt: new Date() || null
        }
        console.log(new_user)
        db.user.create(new_user).then(function (user) {
            let user_session = new useSession()
            user_session.setAndSaveSession(user)
                .then((result) => {
                    try {
                        if (result) {
                            response.json(
                                {
                                    success: true,
                                    userId: user.id,
                                    userRole: user.role,
                                    usernm: user.usernm,
                                    phone_no: user.phone_no,
                                    email:user.email,
                                    role:user.role,
                                    service_id: user.service_id,
                                    createdBy: user.created_by,
                                    createdAt: user.created_at,
                                    menu: [],
                                    permission: [],
                                    session_token: result,
                                    message: 'Successfully Logged In'
                                }
                            )
                        } else {
                            response.json({
                                success: true, data: {
                                    userId: user.id,
                                    userRole: user.role,
                                    session_token: null,
                                    message: 'Successfully Created Please Login'
                                }
                            })
                        }
                    }catch (exception) {
                        response.json({success: false, error: exception.message})
                    }
                })
                .catch((err) => {
                    response.json({success: false, error: err.message})
                })
        }).catch(function (err) {
            //let er = new ValidationError(message, [err])
            response.json({success: false, error: err.message})
        })
    }
    catch
        (exception) {
        response.json({success: false, error: exception.message})
    }
})


/*
 * Admin Login
 * */
adminController.route('/login').post(function (request, response) {
    try {
        if ((UserInputValidator.isEmail(request.body.usernm)
            || UserInputValidator.isMobile(request.body.usernm))
            || UserInputValidator.isPassword(request.body.password)) {
            db.user.findOne({
                where: {
                    usernm: request.body.usernm,
                    is_active:'1'
                },
                attributes: ['id', 'phone_no', 'role', 'email', 'password', 'usernm',  'service_id', 'createdAt']
            }).then((user) => {
                try {
                    if (user) {
                        if (user.password === md5(request.body.password)) {
                            let user_session = new useSession()
                            user_session.setAndSaveSession(user).then((result) => {
                                try {
                                    if (result) {
                                        const permission_sql = `SELECT AUTH.PERMISSIONS.ACTION_PERMISSION 
                                        FROM AUTH.ROLE_USERS 
                                        INNER JOIN AUTH.ROLE_PERMISSIONS ON AUTH.ROLE_PERMISSIONS.ROLE = AUTH.ROLE_USERS.ROLE 
                                        INNER JOIN AUTH.PERMISSIONS ON AUTH.PERMISSIONS.ID = AUTH.ROLE_PERMISSIONS.PERMISSION 
                                        WHERE AUTH.ROLE_USERS.USER = ? `;
                                        db.sequelize.query(
                                            permission_sql,
                                            {
                                                replacements: [user.id],
                                                type: db.sequelize.QueryTypes.SELECT
                                            }).then((permission) => {
                                            if (permission) {
                                                const menu_sql = `SELECT AUTH.MENUS.MENU, AUTH.MENUS.DISPLAY_MENU 
                                                FROM AUTH.ROLE_USERS 
                                                INNER JOIN AUTH.ROLE_MENUS ON AUTH.ROLE_MENUS.ROLE = AUTH.ROLE_USERS.ROLE 
                                                INNER JOIN AUTH.MENUS ON AUTH.MENUS.ID = AUTH.ROLE_MENUS.MENU 
                                                WHERE AUTH.ROLE_USERS.USER = ? `;
                                                db.sequelize.query(
                                                    menu_sql,
                                                    {
                                                        replacements: [user.id],
                                                        type: db.sequelize.QueryTypes.SELECT
                                                    }).then((menu) => {
                                                    let data = {};
                                                    if (menu) {
                                                        response.json({
                                                            success: true,
                                                            userId: user.id,
                                                            userRole: user.role,
                                                            usernm: user.usernm,
                                                            phone_no: user.phone_no,
                                                            email:user.email,
                                                            role:user.role,
                                                            service_id: user.service_id,
                                                            createdBy: user.created_by,
                                                            createdAt: user.created_at,
                                                            menu: menu,
                                                            permission: permission,
                                                            session_token: result,
                                                            message: 'Successfully Logged In'
                                                        })
                                                    } else {
                                                        response.json({
                                                            success: true,
                                                            userId: user.id,
                                                            userRole: user.role,
                                                            usernm: user.usernm,
                                                            phone_no: user.phone_no,
                                                            email:user.email,
                                                            role:user.role,
                                                            service_id: user.service_id,
                                                            createdBy: user.created_by,
                                                            createdAt: user.created_at,
                                                            menu: [],
                                                            permission: permission,
                                                            session_token: result,
                                                            message: 'Successfully Logged In'
                                                        })
                                                    }
                                                })
                                            } else {
                                                response.json({
                                                    success: true,
                                                    userId: user.id,
                                                    userRole: user.role,
                                                    usernm: user.usernm,
                                                    phone_no: user.phone_no,
                                                    email:user.email,
                                                    role:user.role,
                                                    service_id: user.service_id,
                                                    createdBy: user.created_by,
                                                    createdAt: user.created_at,
                                                    menu: [],
                                                    permission: [],
                                                    session_token: result,
                                                    message: 'Successfully Logged In'
                                                })
                                            }
                                        })

                                    }else{
                                        response.json({success: false, message: 'server err'})
                                    }
                                }catch (exception) {
                                    response.json({success: false, error: exception.message})
                                }
                            }).catch((err) => {
                                response.json({success: false, error: err.message})
                            })
                        } else {
                            response.json({success: false, message: 'Password doesn\'t match'})
                        }
                    } else {
                        response.json({success: false, message: 'User doesn\'t exist'})
                    }
                }catch (exception) {
                    response.json({success: false, error: exception.message})
                }
            })
            .catch((err) => {
                response.json({success: false, error: err})
            })
        } else {
            response.json({success: false, error: 'Username or Password is invalid'})
        }
    } catch (exception) {
        response.json({success: false, error: exception.message})
    }
})

/*
 * Update  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
adminController.route('/users/:id').patch((request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.checkSessionKey(request.headers.session_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            }
            db.user.find({where: {id: request.params.id}})
            .then(function (user) {
                if (user) {
                    //console.log(request.body)
                    let update_data = request.body
                    user.updateAttributes(update_data)
                        .then(function (result) {
                            if (result) {
                                response.json({success: true, message: 'successfully updated'})

                            }else{
                                response.json({success: false, message: 'Not deleted'})
                            }
                        })
                        .catch(function (err) {
                            response.json({success: false, message: err.errors[0].message})
                        })
                } else {
                    response.json({success: false, message: 'user not found'})
                }
            }).catch((err) => {
                response.json({success: false, error: err.message})
            })
        }).catch((err) => {
            response.json({success: false, error: err.message})
        })
    } catch (exception) {
        response.json({success: false, error: exception.message})
    }
})

/*
 * Update  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
adminController.route('/users/:id').delete((request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.checkSessionKey(request.headers.session_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            }
            db.user.find({where: {id: request.params.id, role: '1',is_active: '1'}})
                .then(function (user) {
                    try {
                        if (user) {
                            user.updateAttributes({is_active: '0',updatedBy: request.body.updated_by || 0})
                                .then(function (result) {
                                    try {
                                        if (result) {
                                            Auth.removeAllSesstion(request.params.id,'1').then((result) => {
                                                response.json({success: true, message: 'successfully deleted'})
                                            }).catch(function (err) {
                                                response.json({success: false, message: err.errors[0].message})
                                            })
                                        }else{
                                            response.json({success: false, message: 'Not deleted'})
                                        }
                                    } catch (exception) {
                                        response.json({success: false, error: exception.message})
                                    }
                                })
                                .catch(function (err) {
                                    response.json({success: false, message: err.errors[0].message})
                                })
                        } else {
                            response.json({success: false, message: 'user not found'})
                        }
                    } catch (exception) {
                        response.json({success: false, error: exception.message})
                    }
                }).catch(function (err) {
                response.json({success: false, message: err.message})
            })
        }).catch((err) => {
            response.json({success: false, message: 'Session token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, error: exception.message})
    }
})


/*
 * Update  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
adminController.route('/logout').post((request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.destorySessionKey(request.headers.session_token, request.body.userId).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            } else {
                response.json({success: true, message: 'successfully updated'})
            }
        }).catch((err) => {
            response.json({success: false, message: 'Session token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, error: exception.message})
    }
})

module.exports = adminController