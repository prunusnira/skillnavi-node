import request from 'supertest'
import app from '../index'

describe('ProfileController', () => {
    it('/gettoken', done => {
        request(app)
            .get('/gettoken')
            .expect(404, done)
    })

    it('/getuser/:token', done => {
        request(app)
            .get('/getuser/test_token')
            .expect(200, done)
    })

    it('/getuserid/:id', done => {
        request(app)
            .get('/getuserid/18')
            .expect(200, done)
    })

    it('/skillrecord/:id', done => {
        request(app)
            .get('/skillrecord/18')
            .expect(200, done)
    })

    it('/cleartable/:gtype/:id', done => {
        request(app)
            .get('/cleartable/dm/18')
            .expect(200, done)
    })

    it('/mybest/:id', done => {
        request(app)
            .get('/mybest/18')
            .expect(200, done)
    })

    it('/setopencount', done => {
        request(app)
            .post('/setopencount')
            .expect(200, done)
    })

    it('/setcomment', done => {
        request(app)
            .post('/setcomment')
            .expect(200, done)
    })

    it('/notplayed/:gtype/:id/:vertype/:page', done => {
        request(app)
            .get('/notplayed/dm/18/28/1')
            .expect(200, done)
    })

    it('/resetdata', () => {
        console.log('no real test here -- dangerous work')
    })

    it('/profile/towerupdate/:id', done => {
        request(app)
            .get('/profile/towerupdate/18')
            .expect(200, done)
    })

    it('/profile/towerstatus/tower/:id', done => {
        request(app)
            .get('/profile/towerstatus/tower/18')
            .expect(200, done)
    })

    it('/profile/towerstatus/floor/:id', done => {
        request(app)
            .get('/profile/towerstatus/floor/18')
            .expect(200, done)
    })

    it('/profile/countupdate/:id', done => {
        request(app)
            .get('/profile/countupdate/18')
            .expect(200, done)
    })
})