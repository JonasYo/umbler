'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable camelcase */


var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../../config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _Mail = require('../../lib/Mail');

var _Mail2 = _interopRequireDefault(_Mail);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Tokens = require('../models/Tokens');

var _Tokens2 = _interopRequireDefault(_Tokens);

var _UserController = require('./UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: 'singin',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, email, password, user, passwordMatch, id, name, phone, date_birth, createdAt, userRoles, expiresIn, secret;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.next = 3;
                return _User2.default.findOne({
                  where: { email: email },
                  include: { association: 'userRoles' }
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({
                  message: 'Usu\xE1rio com email ' + email + ' n\xE3o foi encontrado.',
                  code: 'ERROR_USER_NOT_FOUND'
                }));

              case 6:
                _context.next = 8;
                return user.checkPassword(password);

              case 8:
                passwordMatch = _context.sent;

                if (passwordMatch) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({
                  message: 'Senha incorreta, tente novamente.',
                  code: 'ERROR_UNATHORIZED'
                }));

              case 11:
                id = user.id, name = user.name, phone = user.phone, date_birth = user.date_birth, createdAt = user.createdAt, userRoles = user.userRoles;
                expiresIn = _auth2.default.expiresIn, secret = _auth2.default.secret;
                return _context.abrupt('return', res.json({
                  user: {
                    id: id,
                    name: name,
                    email: email,
                    phone: phone,
                    date_birth: date_birth,
                    createdAt: createdAt,
                    userRoles: userRoles
                  },
                  token: _jsonwebtoken2.default.sign({ id: id }, secret, {
                    expiresIn: expiresIn
                  })
                }));

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function singin(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return singin;
    }()
  }, {
    key: 'singinAlternative',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user, id, name, email, phone, date_birth, createdAt, userRoles, expiresIn, secret;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _UserController2.default.createAlternative(req);

              case 2:
                user = _context2.sent;

                if (user) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(401).json({
                  message: 'N\xE3o foi possivel realizar o login com ' + req.body.alias + '.',
                  code: 'ERROR_LOGIN_ALIAS'
                }));

              case 5:
                id = user.id, name = user.name, email = user.email, phone = user.phone, date_birth = user.date_birth, createdAt = user.createdAt, userRoles = user.userRoles;
                expiresIn = _auth2.default.expiresIn, secret = _auth2.default.secret;
                return _context2.abrupt('return', res.json({
                  user: {
                    id: id,
                    name: name,
                    email: email,
                    phone: phone,
                    date_birth: date_birth,
                    createdAt: createdAt,
                    userRoles: userRoles
                  },
                  token: _jsonwebtoken2.default.sign({ id: id }, secret, {
                    expiresIn: expiresIn
                  })
                }));

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function singinAlternative(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return singinAlternative;
    }()
  }, {
    key: 'forgot',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var email, user, id, token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = req.body.email;
                _context3.next = 3;
                return _User2.default.findOne({
                  where: { email: email }
                });

              case 3:
                user = _context3.sent;

                if (user) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', res.status(401).json({
                  message: 'Usu\xE1rio com email ' + email + ' n\xE3o foi encontrado.',
                  code: 'ERROR_USER_NOT_FOUND'
                }));

              case 6:
                id = user.id;
                _context3.next = 9;
                return _Tokens2.default.update({
                  is_revoked: 1
                }, {
                  where: {
                    user_id: user.id,
                    is_revoked: 0
                  }
                });

              case 9:
                token = Math.random().toString(36).substring(4);
                _context3.next = 12;
                return _Tokens2.default.create({
                  user_id: id,
                  token: token,
                  type: 'forgotPassword'
                });

              case 12:

                _Mail2.default.sendMail({
                  from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
                  to: '' + email,
                  subject: 'I\'maria - Recupera\xE7\xE3o de senha',
                  template: 'forgotPassword',
                  context: {
                    user: '' + user.name,
                    token: '' + token
                  },
                  attachments: [{
                    filename: 'image.png',
                    path: process.cwd() + '/src/resources/images/logo.png',
                    cid: 'logo'
                  }]
                });

                return _context3.abrupt('return', res.json('Sucesso no envio do token'));

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function forgot(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return forgot;
    }()
  }, {
    key: 'reset',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$body2, token, password, confirmPassword, tokens, currentDate, tokenDate, result, diffHrs, user;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$body2 = req.body, token = _req$body2.token, password = _req$body2.password, confirmPassword = _req$body2.confirmPassword;
                _context4.next = 3;
                return _Tokens2.default.findOne({
                  where: {
                    token: token
                  }
                });

              case 3:
                tokens = _context4.sent;

                if (tokens) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', res.status(401).json({
                  message: 'Token informado \xE9 inv\xE1lido.',
                  code: 'ERROR_TOKEN_NOT_FOUND'
                }));

              case 6:
                currentDate = new Date();
                tokenDate = new Date(tokens.createdAt);
                result = currentDate - tokenDate;
                diffHrs = Math.floor(result % 86400000 / 3600000);

                if (!(diffHrs > 1)) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt('return', res.status(401).json({
                  message: 'Token expirado, tente novamente.',
                  code: 'ERROR_PASSWORDS_NOT_EQUALS'
                }));

              case 12:
                if (!(password !== confirmPassword)) {
                  _context4.next = 14;
                  break;
                }

                return _context4.abrupt('return', res.status(401).json({
                  message: 'As senhas n\xE3o s\xE3o iguais.',
                  code: 'ERROR_PASSWORDS_NOT_EQUALS'
                }));

              case 14:
                _context4.next = 16;
                return _User2.default.findByPk(tokens.user_id);

              case 16:
                user = _context4.sent;


                user.password = password;

                user.save();

                return _context4.abrupt('return', res.json('Recuperação de senha realizado com sucesso.'));

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function reset(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return reset;
    }()
  }]);

  return AuthController;
}();

exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map