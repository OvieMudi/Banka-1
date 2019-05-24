import debug from 'debug';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import otpVerify from 'jsonwebtoken';
import User from '../models/userModel';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/auth';

dotenv.config();
const log = debug('dev');

export default class UsersController {
  static async signUp(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }
    let newUser;
    try {
      newUser = await user.signUp();
    } catch (error) {
      return error.message;
    }

    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
    });

    const response = {
      token, id, firstname, lastname, email,
    };
    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async createStaff(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }

    let newUser;
    try {
      newUser = await user.createStaff();
    } catch (error) {
      return error.message;
    }

    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
    });

    const response = {
      token, id, firstname, lastname, email,
    };

    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async createAdmin(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }

    let newUser;
    try {
      newUser = await user.createAdmin();
    } catch (error) {
      return error.message;
    }
    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
    });

    const response = {
      token, id, firstname, lastname, email,
    };

    return res.status(201).json({
      status: 201,
      data: response,
    });
  }
  static async signin(req, res) {
    const {email, password} = req.body;
    try {
      let user = await User.signin(email);
      if (!user) {
        res.status(404).json({
          status: 404,
          message: 'No account found for this user'
        })
      } else {
        const hashedPassword = user.password;
        if(!comparePassword(password, hashedPassword)) {
          res.status(409).json({
            status: 409,
            message: 'Incorrect email/password provided',
          })
        } else {
          const payload = {
            email: user.email,
            isAdmin: user.isAdmin,
            type: user.type,
            firstname: user.firstname,
          };

          const token  = await Jwt.generateToken(payload);
          req.user = user;
          const userResponse = {
            ...user, password: null
          };
          res.status(200).json({
            status: 200,
            message: 'Log in successfully',
            data: {
              token,
              user: userResponse
            }
          })
        }
      }
    } catch(err){
        res.status(400).json({
          status: 400,
          error: err,
        })
    }
  }

  static async allUserAccounts(req, res) {
    const { email } = req.params;

    const userExists = await User.getUserByEmail(email);
    if (!userExists) {
      return res.status(404).json({
        status: 404,
        error: 'User not found.',
      });
    }
    let result;
    try {
      result = await User.allUserAccounts(email);
    } catch (error) {
      return error.message;
    }
    if (!result.length) {
      return res.status(404).json({
        status: 404,
        error: 'User has no account.',
      });
    }
    const results = result.map((rest) => {
      const {
        createdon, accountnumber, type, status, balance,
      } = rest;
      return {
        createdon, accountnumber, type, status, balance,
      };
    });
    return res.status(200).json({
      status: 200,
      accounts: results,
    });
  }

  static async sendResetMail(req, res) {
    const { email } = req.body;

    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'The email you entered did not match our records. Please double-check and try again.',
      });
    }

    const payload = { id: user.id, email };
    const secret = user.password;
    const token = await Jwt.getOneTimeToken(payload, secret);
    const link = `<a href="https://deferall-banka-app.herokuapp.com/api/v1/auth/passwordreset/${user.id}/${token}">Reset password</a>`;
    UsersController.notify(UsersController.generateLinkMail(user, link));
    return res.status(200).json({
      status: res.statusCode,
      message: 'A password reset link has been sent to your email',
    });
  }

  static async passwordReset(req, res) {
    const { id, token } = req.params;
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Invalid password reset link',
      });
    }
    const payload = otpVerify.verify(token, user.password, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          status: res.statusCode,
          error: 'Invalid password reset link',
        });
      }
      return decoded;
    });

    UsersController.notify(UsersController.generateResetMail(payload, token));
    return res.status(200).json({
      status: res.statusCode,
      message: 'Kindly check your email to reset your password',
    });
  }

  static async resetPassword(req, res) {
    const { id, token, password } = req.body;
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Invalid password reset link',
      });
    }
    otpVerify.verify(token, user.password, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          status: res.statusCode,
          error: 'Invalid password reset link',
        });
      }
      return decoded;
    });

    User.updatePassword(hashPassword(password), id);
    return res.status(201).json({
      status: res.statusCode,
      message: 'Password reset successfully',
    });
  }

  static async generateLinkMail(user, link) {
    const subject = 'Password Reset';
    const body = `
    <p>
      Hi <em style="text-transform: capitalize">${user.firstname}</em> <br>
      You recently requested to reset the password for your Banka account. 
      Please click the link below to reset it. <br>
      ${link} <br>
      If you did not request a password reset, please ignore this email or reply to let us know.
      The link is only valid for the next 30mins. <br>
      Thanks,<br>
      Chux and the Banka Team
    </p>`;
    return { subject, body, email: user.email };
  }

  static async generateResetMail(payload, token) {
    const subject = 'Password Reset';
    const body = `
    <h1>Password Reset Form</h1>
    <p>Enter a new password</p>
    <form action="https://deferall-banka-app.herokuapp.com/api/v1/auth/resetpassword" method="POST">
      <input type="hidden" name="id" value="${payload.id}" />
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="password" value="" placeholder="Enter your new password..."/>
      <input type="submit" value="Reset Password"/>
    </form>`;
    return { subject, body, email: payload.email };
  }

  static async notify(message) {
    const response = await message;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SERVER_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SERVER_MAIL,
      to: response.email,
      subject: response.subject,
      html: response.body,
    };

    transporter.sendMail(mailOptions, (err, info) => (err ? log(err) : log(info)));
  }
}
