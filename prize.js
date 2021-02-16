var Prize = require('./schema/Prize');

exports.isValidPrizeQuantity = function(req, res, next) {
    Prize.findById(req.params.id)
    .then(prize => {
        if (prize.quantity <= 0) {
            err = new Error('Cannot Redeem Prize if quantity is less than or equal to zero');
            err.status = 400;
            return next(err);
        }

        return next();
    });
};