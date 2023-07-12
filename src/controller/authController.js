const userService = require('../service/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../handler/apiError')

class AuthController {
    
    async register (req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('Некорректные данные!', errors.array()))
            }

            let {name, password, role} = req.body
            //  if (!role)
            //     role = 1
            const userData = await userService.registaton(name, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            return next(e)
        }
    }

    async login (req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('Некорректные данные!', errors.array()))
            }

            const {name, password} = req.body
            const userData = await userService.login(name, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch(e){
            return next(e)
        }
    }

    async logout (req, res, next) {
        try{
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(e){
            return next(e)
        }
    }

    async refresh (req, res, next) {
        try{
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch(e){

        }
    }

    
}

module.exports = new AuthController()