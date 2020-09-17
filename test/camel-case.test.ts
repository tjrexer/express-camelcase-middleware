import request from 'supertest'
import express from 'express'

import { camelCaseHandler } from '../src/camel-case-handler'
import { snakeKeys, camelKeys, listCamel, listSnake, camelQueryString, camelQueryConverted } from './fixtures'

// Dummy server for testing
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(camelCaseHandler({deep: true}))

const func = {
    testFunc(_object: {}){
        return
    }
}

app.get('/query', function(req, res){
    func.testFunc(req.query)
    res.status(200).send()
})

app.get('/data', function(_req, res) {
    res.status(200).send(camelKeys)
})

app.post('/data', function(req, res) {
    func.testFunc(req.body)
    res.status(201).send()
})

app.get('/data/list', function(_req, res) {
    res.status(200).send(listCamel)
})

describe('camel-case middleware', () => {    
    let tests: request.Test
    let spy: jest.SpyInstance
    

    beforeEach(() => {
        spy = jest.spyOn(func, 'testFunc')
    })
    
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('POST /data camelcase', async () => {
        tests = request(app).post('/data')
        await tests.send(camelKeys)
        expect(spy).toHaveBeenCalledWith(snakeKeys)
    })

    it('POST /data camelcase list', async() => {
        tests = request(app).post('/data')
        await tests.send(listCamel)
        expect(spy).toHaveBeenCalledWith(listSnake)
    })
    
    it('GET /data camelcase', async () => {
        tests = request(app).get('/data')
        await tests.send(snakeKeys)
            .then(
                res => {
                    expect(res.body).toEqual(camelKeys)
                }
            )
    })

    it('GET /data/list snakecase', async () => {
        tests = request(app).get('/data/list')
        await tests.send(listSnake)
            .then(
                res => {
                    expect(res.body).toEqual(listCamel)
                }
            )
    })

    it('GET /query snakecase query', async() => {
        tests = request(app).get(`/query?${camelQueryString}`)
        await tests.send()
        expect(spy).toHaveBeenCalledWith(camelQueryConverted)
    })
})