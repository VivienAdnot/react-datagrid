import handlers from './index.handlers';
import responseSender from '../../services/responseSender';

const routes = [{
    method: 'GET',
    path: '/api/data/bigbatch',
    handlers: [
        handlers.getBigBatch,
        responseSender.responseSender
    ]
}, {
    method: 'GET',
    path: '/api/data/smallbatch',
    handlers: [
        handlers.getSmallBatch,
        responseSender.responseSender
    ]
}];

module.exports = routes;
