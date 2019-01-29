const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const ApiAccess = require('./middleware/access');

const loginController = require('./controllers/login')
const adminController = require('./controllers/admin')
const appsController = require('./controllers/apps')

let router = express.Router();

/*
 * CORS
 * */
router.use(cors());
let app = express();

app.use(morgan('dev'))
/*app.use(boydParser.urlencoded({extended: false}))
app.use(boydParser.json())*/

router.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type, Accept, Authorization'
    )
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
    }
    next()
})

router.use(function (request, resposne, next) {
    resposne.append('Access-Control-Allow-Headers', ['Content-Type, APP_KEY']);
    resposne.append('Connection','close');
    let access = new ApiAccess(request);
    if (access.checkAppKey()) {
        next();
    }
    else {
        resposne.json('access denied')
    }
});

//api main route
app.use('/api', router);

// roues
router.use('/user',loginController)
router.use('/admin',adminController)
router.use('/apps',appsController)

router.use((req, res, next) => {
    const error = new Error('Route Not found')
    error.status = 404
    next(error)
})

router.use((error,req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})


module.exports = app