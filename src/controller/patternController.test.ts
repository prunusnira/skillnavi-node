import request from 'supertest'
import app from '../index'

describe('PatternController', () => {
    it('/list/:ver/:order/:page/:hot', done => {
        request(app)
            .get('/list/26/titleasc/1/a')
            .expect(200, done)
    })

    it('/ptrank/:mid/:ptcode/:page/:version', done => {
        request(app)
            .get('/ptrank/1546/12/1/28')
            .expect(200, done)
    })

    it('/cntrank/:page', done => {
        request(app)
            .get('/cntrank/1')
            .expect(200, done)
    })
})