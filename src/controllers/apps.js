"use strict";

const appsController = require('express').Router();

const bodyParser = require('body-parser');
const multer = require('multer')
const db = require('./../models');
const useSession = require('./../lib/usersession');
const md5 = require('md5');
const Op = require('sequelize').Op;
const ApiAccess = require('./../middleware/access')
const UserInputValidator = require("../lib/input_validation");
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        let Auth = new ApiAccess(req)
        Auth.checkSessionKey(req.headers.session_token).then((result) => {
            //console.log(result)
            if (!result) {
                cb(new Error('Session token required or expired'),'./uploads/')
            } else {
                cb(null,'./uploads/')
            }
        }).catch(function (err) {
            //let er = new ValidationError(message, [err])
            cb(new Error('Session token required or expired'),'./uploads/')
        })

    },
    filename:function (req,file,cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, '/'+req.body.userId+ '_' + new Date().getTime() + '_'+ req.body.updated_by +'.'+ extension)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png') {
        cb(null,true)
    } else {
        cb(new Error('Only jpg or png image are allow'),false)
    }
}

const upload = multer({
    storage:storage,
    /*limits: {
        fileSize: 1024*1024*5
    },*/
    fileFilter: fileFilter
})

appsController.use(bodyParser.urlencoded({extended: true}));
appsController.use(bodyParser.json());




appsController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    response.append('Access-Control-Allow-Headers', ['session_token']);
    next();
});

appsController.route('/upload').post(upload.single('billboard_image'),(request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.checkSessionKey(request.headers.session_token).then((result) => {
            console.log(result)
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            } else {
                console.log(request.file)
                let file_path = '';
                let get_path = request.file.path.split('\\');
                file_path = get_path[0]+'/'+get_path[1];
                let new_resource = {
                    billboard_id: request.body.billboard_id,
                    res_path: file_path,
                    createdBy: request.body.updated_by || null,
                    updatedBy: request.body.updated_by || null,
                    createdAt: new Date() || null,
                    updatedAt: new Date() || null
                }
                db.resources.create(new_resource).then(function (res) {
                    console.log(res)
                    try {
                        if (res) {
                            response.json(
                                {
                                    success: true,
                                    data: {
                                        userId: request.body.userId,
                                        file_path: file_path,
                                        message: 'File Successfully Stored'
                                    }
                                }
                            )
                        } else {
                            response.json({
                                success: false,
                                data: {
                                    userId: request.body.userId,
                                    message: 'File is not Stored'
                                }
                            })
                        }
                    } catch
                        (exception) {
                        response.json({success: false, error: exception.message})
                    }
                })
                    .catch(function (err) {
                        //let er = new ValidationError(message, [err])
                        response.json({success: false, error: err.message})
                    })

            }
        }).catch(function (err) {
            //let er = new ValidationError(message, [err])
            response.json({success: false, error: err.message})
        })


    } catch(exception) {
            response.json({success: false, error: exception.message})
    }
})

appsController.route('/appSetting').get((request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.checkSessionKey(request.headers.session_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            } else {

                db.master_info.all({
                    attributes: ['id', 'upazillas_id', 'upazillas_name', 'upazillas_bn_name',  'districts_id', 'districts_name', 'districts_bn_name',  'divisions_id', 'divisions_name', 'divisions_bn_name']
                }).then(info => {
                    try {
                        response.json({success: true, data: info})
                    } catch (exception) {
                        response.json({success: false, 'error': exception.message})
                    }
                }).catch((err) => {
                    response.json({success: false, error: err.errors[0].message})
                })

            }
        }).catch(function (err) {
            //let er = new ValidationError(message, [err])
            response.json({success: false, error: err.message})
        })


    } catch(exception) {
        response.json({success: false, error: exception.message})
    }
})


module.exports = appsController;