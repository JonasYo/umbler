"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable camelcase */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _Tokens = require('../models/Tokens'); var _Tokens2 = _interopRequireDefault(_Tokens);
var _UserController = require('./UserController'); var _UserController2 = _interopRequireDefault(_UserController);

class AuthController {
  async singin(req, res) {
    const { email, password } = req.body;

    const user = await _User2.default.findOne({
      where: { email },
      include: { association: 'userRoles' },
    });

    if (!user) {
      return res.status(401).json({
        message: `Usuário com email ${email} não foi encontrado.`,
        code: 'ERROR_USER_NOT_FOUND',
      });
    }

    const passwordMatch = await user.checkPassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Senha incorreta, tente novamente.',
        code: 'ERROR_UNATHORIZED',
      });
    }

    const { id, name, phone, date_birth, createdAt, userRoles } = user;

    const { expiresIn, secret } = _auth2.default;

    return res.json({
      user: {
        id,
        name,
        email,
        phone,
        date_birth,
        createdAt,
        userRoles,
      },
      token: _jsonwebtoken2.default.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }

  async singinAlternative(req, res) {
    const user = await _UserController2.default.createAlternative(req);

    if (!user) {
      return res.status(401).json({
        message: `Não foi possivel realizar o login com ${req.body.alias}.`,
        code: 'ERROR_LOGIN_ALIAS',
      });
    }

    const { id, name, email, phone, date_birth, createdAt, userRoles } = user;

    const { expiresIn, secret } = _auth2.default;

    return res.json({
      user: {
        id,
        name,
        email,
        phone,
        date_birth,
        createdAt,
        userRoles,
      },
      token: _jsonwebtoken2.default.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }

  async forgot(req, res) {
    const { email } = req.body;

    const user = await _User2.default.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: `Usuário com email ${email} não foi encontrado.`,
        code: 'ERROR_USER_NOT_FOUND',
      });
    }

    const { id } = user;

    await _Tokens2.default.update(
      {
        is_revoked: 1,
      },
      {
        where: {
          user_id: user.id,
          is_revoked: 0,
        },
      }
    );

    const token = Math.random()
      .toString(36)
      .substring(4);

    await _Tokens2.default.create({
      user_id: id,
      token,
      type: 'forgotPassword',
    });

    _Mail2.default.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `${email}`,
      subject: `I'maria - Recuperação de senha`,
      template: 'forgotPassword',
      context: {
        user: `${user.name}`,
        token: `${token}`,
      },
      attachments: [
        {
          filename: 'image.png',
          path: `${process.cwd()}/src/resources/images/logo.png`,
          cid: 'logo',
        },
      ],
    });

    return res.json('Sucesso no envio do token');
  }

  async reset(req, res) {
    const { token, password, confirmPassword } = req.body;

    const tokens = await _Tokens2.default.findOne({
      where: {
        token,
      },
    });

    if (!tokens) {
      return res.status(401).json({
        message: `Token informado é inválido.`,
        code: 'ERROR_TOKEN_NOT_FOUND',
      });
    }

    const currentDate = new Date();
    const tokenDate = new Date(tokens.createdAt);
    const result = currentDate - tokenDate;
    const diffHrs = Math.floor((result % 86400000) / 3600000);

    if (diffHrs > 1) {
      return res.status(401).json({
        message: `Token expirado, tente novamente.`,
        code: 'ERROR_PASSWORDS_NOT_EQUALS',
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        message: `As senhas não são iguais.`,
        code: 'ERROR_PASSWORDS_NOT_EQUALS',
      });
    }

    const user = await _User2.default.findByPk(tokens.user_id);

    user.password = password;

    user.save();

    return res.json('Recuperação de senha realizado com sucesso.');
  }
}

exports. default = new AuthController();
