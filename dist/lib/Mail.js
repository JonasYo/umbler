'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerExpressHandlebars = require('nodemailer-express-handlebars');

var _nodemailerExpressHandlebars2 = _interopRequireDefault(_nodemailerExpressHandlebars);

var _mail = require('../config/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mail = function () {
  function Mail() {
    _classCallCheck(this, Mail);

    var service = _mail2.default.service,
        auth = _mail2.default.auth;


    this.transporter = _nodemailer2.default.createTransport({
      service: service,
      auth: auth
    });
  }

  _createClass(Mail, [{
    key: 'configureTemplates',
    value: function configureTemplates(template) {
      var handlebarOptions = {
        viewEngine: {
          extName: '.hbs',
          partialsDir: 'src/resources/views/emails/',
          layoutsDir: 'src/resources/views/emails/',
          defaultLayout: template + '.hbs'
        },
        viewPath: 'src/resources/views/emails/',
        extName: '.hbs'
      };
      this.transporter.use('compile', (0, _nodemailerExpressHandlebars2.default)(handlebarOptions));
    }
  }, {
    key: 'sendMail',
    value: function sendMail(mailOptions) {
      this.configureTemplates(mailOptions.template);
      return this.transporter.sendMail(mailOptions);
    }
  }]);

  return Mail;
}();

exports.default = new Mail();
//# sourceMappingURL=Mail.js.map