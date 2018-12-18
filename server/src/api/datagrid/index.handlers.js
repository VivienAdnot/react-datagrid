import bigBatch from './data.json';
import smallBatch from './data_small.json';

exports.getBigBatch = (req, res, next) => {

    res.data = bigBatch;
    next();

};

exports.getSmallBatch = (req, res, next) => {

    res.data = smallBatch;
    next();

};
