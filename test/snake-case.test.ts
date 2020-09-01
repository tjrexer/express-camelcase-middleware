import request from 'supertest'
import express from 'express'
import { snakeCaseHandler } from '../src/snake-case-handler'
import { snakeKeys, camelKeys } from './fixtures'

// Dummy server for testing
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(snakeCaseHandler({deep: true}))

app.get('/data', function(_req, res) {
    res.status(200).send(camelKeys)
})
app.post('/data', function(_req, res) {
    res.status(201)
})

describe('snake-case middleware', () => {   
    let tests: request.Test

    it('POST /data snakecase', async () => {
        tests = request(app).post('/data')
        await tests.send(JSON.stringify(snakeKeys))
            .then(
                req => {
                    expect(req.body).toEqual(camelKeys)
                }
            )
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
})
