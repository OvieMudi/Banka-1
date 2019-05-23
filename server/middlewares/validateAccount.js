import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class accountValidate {
  static createAccount(req, res, next) {
    const { firstname, lastname } = req.user;
    const { type } = req.body;
    const createAccount = { firstname, lastname, type };

    const createAccountProperties = {
      firstname: 'required|alpha|min:2|max:50',
      lastname: 'required|alpha|min:2|max:50',
      type: 'required|in:savings,current',
    };

    const validator = new Validator(createAccount,
      createAccountProperties,
      customErrorMsgs);

    validator.passes(() => next());

    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
  }

  static changeStatus(req, res, next) {
    const createAccount = req.body;

    const createAccountProperties = {
      status: 'required|in:active,dormant',
    };

    const validator = new Validator(createAccount,
      createAccountProperties,
      customErrorMsgs);

    validator.passes(() => next());

    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
  }
}
