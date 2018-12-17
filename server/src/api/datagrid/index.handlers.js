import data from './data';

exports.getData = (req, res, next) => {

    res.data = data;
    next();

};
