import request from 'supertest'
import express from 'express'
import { CREATED }from 'http-status-codes'

import { snakeCaseHandler } from '../src/snake-case-handler'
import { snakeKeys, camelKeys, listCamel, listSnake } from './fixtures'

// Dummy server for testing
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(snakeCaseHandler({deep: true}))

app.get('/data', function(_req, res) {
    res.status(200).send(camelKeys)
})

app.post('/data', function(req, res) {
    if(JSON.stringify(req.body) == JSON.stringify(camelKeys)) res.status(201).send()
    res.status(404).send()
})

app.get('/data/list', function(_req, res) {
    res.status(200).send(listCamel)
})

describe('snake-case middleware', () => {    
    describe('integration', () => {
        let tests: request.Test

        it('POST /data snakecase', async () => {
            tests = request(app).post('/data')
            await tests.send(snakeKeys)  
                .expect(CREATED)
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
    })
})