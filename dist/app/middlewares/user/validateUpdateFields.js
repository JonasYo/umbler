'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var schema;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schema = Yup.object().shape({
              name: Yup.string(),
              email: Yup.string().email(),
              password: Yup.string().min(6),
              passwordConfirmation: Yup.string().when('password', function (password, field) {
                return password ? field.required().oneOf([Yup.ref('password')]) : field;
              }),
              oldPassword: Yup.string().when('password', function (password, field) {
                return password ? field.required() : field;
              })
            });
            _context.next = 3;
            return schema.isValid(req.body);

          case 3:
            if (_context.sent) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', res.status(400).json({
              message: 'Parece que você não forneceu todos os dados necessários corretamente.',
              code: 'ERROR_BAD_REQUEST'
            }));

          case 5:
            return _context.abrupt('return', next());

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=validateUpdateFields.js.map