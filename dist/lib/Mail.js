"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _nodemailerexpresshandlebars = require('nodemailer-express-handlebars'); var _nodemailerexpresshandlebars2 = _interopRequireDefault(_nodemailerexpresshandlebars);

var _mail = require('../config/mail'); var _mail2 = _interopRequireDefault(_mail);

class Mail {
  constructor() {
    const { service, auth } = _mail2.default;

    this.transporter = _nodemailer2.default.createTransport({
      service,
      auth,
    });
  }

  configureTemplates(template) {
    const handlebarOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: 'src/resources/views/emails/',
        layoutsDir: 'src/resources/views/emails/',
        defaultLayout: `${template}.hbs`,
      },
      viewPath: 'src/resources/views/emails/',
      extName: '.hbs',
    };
    this.transporter.use('compile', _nodemailerexpresshandlebars2.default.call(void 0, handlebarOptions));
  }

  sendMail(mailOptions) {
    this.configureTemplates(mailOptions.template);
    return this.transporter.sendMail(mailOptions);
  }
}

exports. default = new Mail();
