import { Request, Response, NextFunction } from 'express'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys, { Options as camelOptions } from 'camelcase-keys'
import unless from 'express-unless'

export const camelCaseHandler = (options: camelOptions) => {
    const camelCaseResHandler = (_req: Request, res: Response, next: NextFunction) => {
        const send = res.send
        res.send = function(body?: Buffer | String | Boolean | Array<any>){
            if ((typeof body === 'object') && body != null){
                body = camelcaseKeys(body, options)
            }
            send.call(this, body)
            return res
        }

        next()
    }

    const camelCaseReqHandler = (req: Request, _res: Response, next: NextFunction) => {
        req.body = snakecaseKeys(req.body, options)
        req.params = snakecaseKeys(req.params, options)
        req.query = snakecaseKeys(req.query, options)

        next()
    }
    camelCaseResHandler.unless = unless
    camelCaseReqHandler.unless = unless
    return [camelCaseResHandler, camelCaseReqHandler]
}
