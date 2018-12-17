import handlers from './index.handlers';
import responseSender from '../../services/responseSender';

const routes = [{
    method: 'GET',
    path: '/api/data',
    handlers: [
        handlers.getData,
        responseSender.responseSender
    ]
}];

module.exports = routes;
