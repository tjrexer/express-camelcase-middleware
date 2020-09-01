import { Request, Response, NextFunction } from 'express'
import { Options as snakeOptions } from 'snakecase-keys'
import unless from 'express-unless'
const snakecaseKeys = require('snakecase-keys')
const camelcaseKeys = require('camelcase-keys')

export const snakeCaseHandler = (options: snakeOptions) => {
    const snakeCaseResHandler = (_req: Request, res: Response, next: NextFunction) => {
        const send = res.send
        res.send = function(body?: Buffer | String | Boolean | Array<any>){
            if ((typeof body === 'object') && body != null){
                body = snakecaseKeys(body, options)
            }
            send.call(this, body)
            return res
        }
        next()
    }
    const snakeCaseReqHandler = (req: Request, _res: Response, next: NextFunction) => {
        console.log(`called keys: ${req.body}, typeof: ${typeof req.body}`)
        req.body = camelcaseKeys(req.body)
        next()
    }
    snakeCaseResHandler.unless = unless
    snakeCaseReqHandler.unless = unless
    return [snakeCaseResHandler, snakeCaseReqHandler]
}