import request from 'supertest'
import app from '../index'

describe('PatternController', () => {
    it('/rank/:gtype/:page', done => {
        request(app)
            .get('/rank/dm/1')
            .expect(200, done)
    })

    it('/pattern/:ver/:order/:page', done => {
        request(app)
            .get('/pattern/26/titleasc/1')
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