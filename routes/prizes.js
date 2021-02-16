var express = require('express');
var router = express.Router();
var Prize = require('../schema/Prize');
const authenticate = require('../authenticate');
const prize = require('../prize');

// Get All Prizes
router.get('/', (req, res) => {
    Prize.find({})
    .then(prize => {
        res.json(prize);
    })
    .catch(err => {
        res.status(404).json({isSuccess: false, result: err.json})
    })
});

// Get Specific Prize
router.get('/:id', (req, res) => {
    Prize.findById(req.params.id)
        .then(prize => res.json(prize))
        .catch(err => res.status(404).json({isSuccess: false, result: err.json}))
});

// Create New Prize
router.post('/', authenticate.verifyUser, (req, res) => {
    const newPrize = new Prize({
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        quantity: req.body.quantity
    });

    newPrize.save()
        .then(prize => {
            res.json(prize)
        })
        .catch(err => {
            res.status(404).json(err)
        });
});

// Remove Prize
router.delete('/:id', authenticate.verifyUser, (req, res) => {
    Prize.findById(req.params.id)
        .then(prize => {
            prize.remove()
            .then(() => {
                res.json({isSuccess: true})
            })
            .catch(() => {
                res.json({isSuccess: false})
            })
        }).catch(() => {
            res.status(404).json({isSuccess: false})
        })
});

// Update Prize 
router.put('/:id', authenticate.verifyUser, (req, res) => {
    Prize.updateOne(
        { _id: req.params.id }, 
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                image_url: req.body.image_url,
                quantity: req.body.quantity
            }
        })
        .then(() => {
            Prize.findById(req.params.id)
            .then(prize => res.json(prize))
            .catch(err => {
                res.status(404).json({isSuccess: false, result: err.json})
            })
        }).catch(err => {
            res.status(404).json({isSuccess: false, result: err})
        });
});

// Redeem Prize 
router.put('/:id/redeem', authenticate.verifyUser, prize.isValidPrizeQuantity, (req, res) => {
    Prize.updateOne(
        { _id: req.params.id }, 
        {
            $inc: {
                quantity: -1
            }
        })
    .then(() => {
        Prize.findById(req.params.id)
        .then(prize => res.json(prize))
        .catch(err => {
            res.status(404).json({isSuccess: false, result: err.json})
        })
    }).catch(err => {
        res.status(404).json({isSuccess: false, result: err})
    });
});

module.exports = router;