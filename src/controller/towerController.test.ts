import request from 'supertest'
import app from '../index'

describe('TowerController', () => {
    it('/towerdata/:towername/:userid', done => {
        request(app)
            .get('/towerdata/towerDMLPedal/18')
            .expect(200, done)
    })

    it('/towerlist', done => {
        request(app)
            .get('/towerlist')
            .expect(200, done)
    })

    it('/towertitle/:userid', done => {
        request(app)
            .get('/towertitle/18')
            .expect(200, done)
    })

    it('/towertitleapply/:userid/:title', () => {
        // post여서 일단 보류
        console.log('temp skip as it is post')
    })
})