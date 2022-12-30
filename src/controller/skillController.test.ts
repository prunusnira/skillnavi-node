import request from 'supertest'
import app from '../index'

describe('SkillController', () => {
    it('/rank/:gtype/:page', done => {
        request(app)
            .get('/rank/dm/1')
            .expect(200, done)
    })

    it('/skill/:ptype/:id/:gtype/:page/:order', done => {
        request(app)
            .get('/skill/2/18/dm/1/1')
            .expect(200, done)
    })

    it('/music/:mid/:id', done => {
        request(app)
            .get('/music/1468/18')
            .expect(200, done)
    })

    it('/exc/:gtype', done => {
        request(app)
            .get('/exc/dm')
            .expect(200, done)
    })

    it('/musiclist/:ver', done => {
        request(app)
            .get('/musiclist/29')
            .expect(200, done)
    })

    it('/getmusic/:mid', done => {
        request(app)
            .get('/getmusic/1')
            .expect(200, done)
    })

    it('/skill/snapshot/create/:uid/:gtype', () => {
        // 테스트 생략
        console.log('test skip')
    })

    it('/skill/snapshot/list/:uid', done => {
        request(app)
            .get('/skill/snapshot/list/18')
            .expect(200, done)
    })

    it('/skill/snapshot/load/:uid/:date/:gtype', done => {
        request(app)
        // 수정필요
            .get('/skill/snapshot/load/18/[date]/dm')
            .expect(200, done)
    })
})