const jwt = require('jsonwebtoken')
const {Token} = require('../models/auth')


class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where: {userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({userId, refreshToken})
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }

    async findToken(refreshToken){
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
      }
    
}

module.exports  = new TokenService()