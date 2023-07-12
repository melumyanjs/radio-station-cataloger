const { User, Role } = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenService = require("./tokenService");
const apiError = require("../handler/apiError");

class UserService {
  async registaton(name, password, role) {
    const candidate = await User.findOne({where: {name: name}, include: {model: Role} });

    if (candidate) {
      throw apiError.badRequest(`Пользователь с именем ${name} уже существует`);
    }
    
    const hashPas = await bcrypt.hash(password, 10);
    await User.create({ name, password: hashPas, roleId: role })
    const user = await User.findOne({where: {name: name}, include:[{model: Role}]});

    const tokens = tokenService.generateTokens({ 
      name: user.name,
      roleId: user.role.roleId,
      roleName: user.role.name
    });

    tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      name,
      role,
    };
  }

  async login(name, password) {
    const candidate = await User.findOne({where: {name: name}, include:[{model: Role}]});

    if (!candidate) {
      throw apiError.badRequest(`Пользователь с именем ${name} не найден`);
    } 
   
    const isPassEquals = await bcrypt.compare(password, candidate.password);
    if (!isPassEquals) {
      throw apiError.badRequest(`Неверный пароль`);
    }

    const tokens = tokenService.generateTokens({  
      name: candidate.name,
      roleId: candidate.roleId,
      roleName: candidate.role.name
    });

    tokenService.saveToken(candidate.id, tokens.refreshToken);

    return {
      ...tokens,
      name: candidate.name,
      roleId: candidate.roleId,
    };
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      throw apiError.unauthorized();
    }

    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw apiError.unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if(!userData || !tokenFromDb){
        throw apiError.unauthorized()
    }
    
    const user = await User.findByPk(userData.id)
    const tokens = tokenService.generateTokens({
        name: user.name,
        roleId: user.roleId,
      });
  
      tokenService.saveToken(user.id, tokens.refreshToken);
  
      return {
        ...tokens,
        name: user.name,
        roleId: user.roleId,
      };

  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new UserService();
