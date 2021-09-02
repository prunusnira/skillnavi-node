import request from 'supertest'
import app from '../index'

describe('RecentController', () => {
    it('/recent 라우팅 테스트', done => {
        request(app)
            .get('/recent')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect(res => {
                expect(res.body.recent).not.toHaveLength(0)
            })
    })
})