const express = require('express')

let router = express.Router()

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling get'
    })
})

router.post('/',(req, res, next) => {
    const product = {
        productName: req.body.productName,
        price: req.body.price
    }
    res.status(200).json({
        message: "Handling post products",
        product: product
    })
})

router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message:'Handling special',
            id: id
        })
    } else {
        res.status(200).json({
            message:'Handling not special'
        })
    }

})

router.patch('/:productId',(req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message:'Handling patch',
            id: id
        })
    } else {
        res.status(200).json({
            message:'Handling not patch'
        })
    }

})

router.delete('/:productId',(req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message:'Handling delete',
            id: id
        })
    } else {
        res.status(200).json({
            message:'Handling not delete'
        })
    }

})

module.exports = router;