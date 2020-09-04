import { Request, Response, NextFunction } from 'express'
import snakecaseKeys, { Options as snakeOptions } from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'
import unless from 'express-unless'

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
        req.body = camelcaseKeys(req.body, options)
        req.params = camelcaseKeys(req.params, options)
        
        next()
    }
    snakeCaseResHandler.unless = unless
    snakeCaseReqHandler.unless = unless
    return [snakeCaseResHandler, snakeCaseReqHandler]
}
