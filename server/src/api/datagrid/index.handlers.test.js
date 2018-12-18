import request from 'supertest';
import app from '../../app';

describe('datagrid routes', () => {

    test('big batch should return 100000 rows', () => {

        return request(app)
        .get('/api/data/bigbatch')
        .expect(200)
        .expect((res) => {

            expect(res.body.length).toBe(100000);

        });

    });

    test('small batch should return 1000 rows', () => {

        return request(app)
        .get('/api/data/smallbatch')
        .expect(200)
        .expect((res) => {

            expect(res.body.length).toBe(1000);

        });

    });

});
