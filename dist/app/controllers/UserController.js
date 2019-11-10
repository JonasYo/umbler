"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable camelcase */
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _UserRole = require('../models/UserRole'); var _UserRole2 = _interopRequireDefault(_UserRole);

var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class UserController {
  async create(req, res) {
    const userExists = await _User2.default.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        message: 'Usuário com este email já está cadastrado.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const { id, name, email } = await _User2.default.create(req.body);

    const userRole = await _UserRole2.default.create({
      user_id: id,
      role_id: req.body.role_id,
    });

    if (!userRole) {
      return res.status(400).json({
        message: 'Erro ao definir o perfil para este usuário.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    _Mail2.default.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `${email}`,
      subject: `I'maria - Seja Bem-vindo`,
      template: 'subscription',
      context: {
        user: `${name}`,
      },
      attachments: [
        {
          filename: 'image.png',
          path: `${process.cwd()}/src/resources/images/logo.png`,
          cid: 'logo',
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
    });
  }

  async createAlternative(req, res) {
    req.body.password = '$12sdw123ad675';

    const userExists = await _User2.default.findOne({
      where: { email: req.body.email, alias: req.body.alias },
      include: { association: 'userRoles' },
    });

    if (userExists) {
      return userExists;
    }

    const user = await _User2.default.create(req.body);

    const userRole = await _UserRole2.default.create({
      user_id: user.id,
      role_id: req.body.role_id,
      is_actived: 1,
    });

    user.userRoles = [];
    user.userRoles.push(userRole);

    if (!user.userRoles) {
      return res.status(400).emit({
        message: 'Erro ao definir o perfil para este usuário.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    _Mail2.default.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `${user.email}`,
      subject: `I'maria - Seja Bem-vindo`,
      template: 'subscription',
      context: {
        user: `${user.name}`,
      },
      attachments: [
        {
          filename: 'image.png',
          path: `${process.cwd()}/src/resources/images/logo.png`,
          cid: 'logo',
        },
      ],
    });

    return user;
  }

  async update(req, res) {
    const { flag } = req.params;
    const user = await _User2.default.findByPk(req.userId);

    if (flag === 'userPassword') {
      const { oldPassword, password } = req.body;

      if (!oldPassword || !password) {
        return res.status(400).json({
          message:
            'Você não pode deixar os campos de Senha atual, Nova senha e Confirma nova senha vazios.',
          code: 'ERROR_BAD_REQUEST',
        });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({
          message: 'A senha sua senha antiga parece estar incorreta.',
          code: 'ERROR_BAD_REQUEST',
        });
      }

      await user.update(req.body);
    } else if (flag === 'userInfomation') {
      const { name, phone, date_birth } = req.body;

      if (!name || !phone || !date_birth) {
        return res.status(400).json({
          message:
            'Você não pode deixar os campos de nome, telefone ou data de nascimento vazios.',
          code: 'ERROR_BAD_REQUEST',
        });
      }

      await user.update(req.body);
    } else {
      return res.status(400).json({
        message: 'Houve um erro ao processar flag informada',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const { id, name, email, date_birth, phone } = await _User2.default.findByPk(
      req.userId
    );

    return res.json({
      id,
      name,
      email,
      date_birth,
      phone,
    });
  }
}

exports. default = new UserController();
