'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('util');

var _auth = require('../../../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var authHeader, _authHeader$split, _authHeader$split2, token, decoded;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authHeader = req.headers.authorization;

            if (authHeader) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', res.status(401).json({
              message: 'Token não fornecido.',
              code: 'ERROR_UNAUTHORIZED'
            }));

          case 3:
            _authHeader$split = authHeader.split(' '), _authHeader$split2 = _slicedToArray(_authHeader$split, 2), token = _authHeader$split2[1];
            _context.prev = 4;
            _context.next = 7;
            return (0, _util.promisify)(_jsonwebtoken2.default.verify)(token, _auth2.default.secret);

          case 7:
            decoded = _context.sent;


            req.userId = decoded.id;

            return _context.abrupt('return', next());

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](4);
            return _context.abrupt('return', res.status(401).json({
              message: 'Token inválido',
              code: 'ERROR_UNAUTHORIZED'
            }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=auth.js.map