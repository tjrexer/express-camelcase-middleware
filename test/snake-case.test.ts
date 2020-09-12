import request from 'supertest'
import express from 'express'

import { snakeCaseHandler } from '../src/snake-case-handler'
import { snakeKeys, camelKeys, listCamel, listSnake, snakeParams, camelParams } from './fixtures'

// Dummy server for testing
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(snakeCaseHandler({deep: true}))

const func = {
    testFunc(_object: {}){
        return
    },
    testFunc2(_object: {}){
        return
    }
}

app.get('/query', function(req, res){
    func.testFunc2(req.body)
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

describe('snake-case middleware', () => {    
    let tests: request.Test
    const spy = jest.spyOn(func, 'testFunc')

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('POST /data snakecase', async () => {
        tests = request(app).post('/data')
        await tests.send(snakeKeys)
        expect(spy).toHaveBeenCalledWith(camelKeys)
    })

    it('POST /data snakecase list', async() => {
        tests = request(app).post('/data')
        await tests.send(listSnake)
        expect(spy).toHaveBeenCalledWith(listCamel)
    })
    
    it('GET /data snakecase', async () => {
        tests = request(app).get('/data')
        await tests.send(camelKeys)
            .then(
                res => {
                    expect(res.body).toEqual(snakeKeys)
                }
            )
    })

    it('GET /data/list snakecase', async () => {
        tests = request(app).get('/data/list')
        await tests.send(listCamel)
            .then(
                res => {
                    expect(res.body).toEqual(listSnake)
                }
            )
    })

    it('GET /query snakecase params', async () => {
        tests = request(app).get('/query')
        const spy2 = jest.spyOn(func, 'testFunc2')
        await tests.send(snakeParams)
        expect(spy2).toHaveBeenCalledWith(camelParams)
    })
})