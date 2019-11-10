'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable camelcase */


var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _UserRole = require('../models/UserRole');

var _UserRole2 = _interopRequireDefault(_UserRole);

var _Mail = require('../../lib/Mail');

var _Mail2 = _interopRequireDefault(_Mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var userExists, _ref2, id, name, email, userRole;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User2.default.findOne({ where: { email: req.body.email } });

              case 2:
                userExists = _context.sent;

                if (!userExists) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  message: 'Usuário com este email já está cadastrado.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 5:
                _context.next = 7;
                return _User2.default.create(req.body);

              case 7:
                _ref2 = _context.sent;
                id = _ref2.id;
                name = _ref2.name;
                email = _ref2.email;
                _context.next = 13;
                return _UserRole2.default.create({
                  user_id: id,
                  role_id: req.body.role_id
                });

              case 13:
                userRole = _context.sent;

                if (userRole) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  message: 'Erro ao definir o perfil para este usuário.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 16:

                _Mail2.default.sendMail({
                  from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
                  to: '' + email,
                  subject: 'I\'maria - Seja Bem-vindo',
                  template: 'subscription',
                  context: {
                    user: '' + name
                  },
                  attachments: [{
                    filename: 'image.png',
                    path: process.cwd() + '/src/resources/images/logo.png',
                    cid: 'logo'
                  }]
                });

                return _context.abrupt('return', res.json({
                  id: id,
                  name: name,
                  email: email
                }));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var flag, user, _req$body, oldPassword, password, _req$body2, _name, _phone, _date_birth, _ref4, id, name, email, date_birth, phone;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                flag = req.params.flag;
                _context2.next = 3;
                return _User2.default.findByPk(req.userId);

              case 3:
                user = _context2.sent;

                if (!(flag === 'userPassword')) {
                  _context2.next = 19;
                  break;
                }

                _req$body = req.body, oldPassword = _req$body.oldPassword, password = _req$body.password;

                if (!(!oldPassword || !password)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({
                  message: 'Você não pode deixar os campos de Senha atual, Nova senha e Confirma nova senha vazios.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 8:
                _context2.t0 = oldPassword;

                if (!_context2.t0) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 12;
                return user.checkPassword(oldPassword);

              case 12:
                _context2.t0 = !_context2.sent;

              case 13:
                if (!_context2.t0) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('return', res.status(401).json({
                  message: 'A senha sua senha antiga parece estar incorreta.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 15:
                _context2.next = 17;
                return user.update(req.body);

              case 17:
                _context2.next = 28;
                break;

              case 19:
                if (!(flag === 'userInfomation')) {
                  _context2.next = 27;
                  break;
                }

                _req$body2 = req.body, _name = _req$body2.name, _phone = _req$body2.phone, _date_birth = _req$body2.date_birth;

                if (!(!_name || !_phone || !_date_birth)) {
                  _context2.next = 23;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({
                  message: 'Você não pode deixar os campos de nome, telefone ou data de nascimento vazios.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 23:
                _context2.next = 25;
                return user.update(req.body);

              case 25:
                _context2.next = 28;
                break;

              case 27:
                return _context2.abrupt('return', res.status(400).json({
                  message: 'Houve um erro ao processar flag informada',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 28:
                _context2.next = 30;
                return _User2.default.findByPk(req.userId);

              case 30:
                _ref4 = _context2.sent;
                id = _ref4.id;
                name = _ref4.name;
                email = _ref4.email;
                date_birth = _ref4.date_birth;
                phone = _ref4.phone;
                return _context2.abrupt('return', res.json({
                  id: id,
                  name: name,
                  email: email,
                  date_birth: date_birth,
                  phone: phone
                }));

              case 37:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return UserController;
}();

exports.default = new UserController();
//# sourceMappingURL=DeviceController.js.map