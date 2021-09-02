import request from 'supertest'
import app from '../index'

describe('SearchController', () => {
    it('/search/:stype/:val/:page', done => {
        request(app)
            .get('/search/music/world/1')
            .expect(200, done)
    })
})