import express from 'express';
import userData from './../../db/users.json' assert { type: 'json' };
import route from './route.json' assert { type: 'json' };
import fs from 'fs';
import {
  isNameValidate,
  isEmailValidate,
  isMobileNumber,
  isAvatarValid
} from '../utils/validate.js';
import ApiError from '../utils/ApiError.js';
const usersRouter = express.Router();

usersRouter
  .route(route.ROOT)
  .get((req, res) => {
    res.json(userData);
  })
  .post((req, res) => {
    const { first_name, last_name, email, mobile, avatar } = req.body;
    if (
      first_name &&
      isNameValidate(first_name) &&
      last_name &&
      isNameValidate(last_name) &&
      email &&
      isEmailValidate(email) &&
      mobile &&
      isMobileNumber(mobile)
    ) {
      const id = userData[userData.length - 1].id + 1;
      const user = {
        id,
        first_name,
        last_name,
        email,
        mobile
      };
      if (avatar && isAvatarValid(avatar)) user.avatar = avatar;
      userData.push(user);
      fs.writeFile('db/users.json', JSON.stringify(userData), (err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json(new ApiError('file operation failed', 500));
        }
        res.status(201).send(user);
      });
    } else {
      res
        .status(400)
        .send(new ApiError('data missing or validation failed', 400));
    }
  });

usersRouter
  .route('/:userId')
  .get((req, res) => {
    const { userId } = req.params;
    const user = userData.find((user) => user.id === +userId);
    console.log(user);
    if (user && Object.keys(user).length > 0) {
      res.json(user);
    } else {
      res.status(404).json(new ApiError('user not found', 404));
    }
  })
  .delete((req, res) => {
    const { userId } = req.params;
    const index = userData.findIndex((user) => user.id === +userId);
    userData.splice(index, 1);
    if (index != -1) {
      fs.writeFile('db/users.json', JSON.stringify(userData), (err) => {
        if (err) {
          console.log('error');
          return res
            .status(500)
            .send(new ApiError('file operation failed', 500));
        }
        res.status(204).send();
      });
    } else {
      res.status(404).json(new ApiError('user not found', 404));
    }
  })
  .put((req, res) => {
    const { first_name, last_name, email, mobile, avatar } = req.body;
    const { userId } = req.params;
    const modifyUser = {};
    if (first_name && isNameValidate(first_name))
      modifyUser.first_name = first_name;
    if (last_name && isNameValidate(last_name))
      modifyUser.last_name = last_name;
    if (email && isEmailValidate(email)) modifyUser.email = email;
    if (mobile && isMobileNumber(mobile)) modifyUser.mobile = mobile;
    if (avatar && isAvatarValid(avatar)) modifyUser.avatar = avatar;

    const userindex = userData.findIndex((user) => user.id === +userId);

    if (userindex !== -1 && Object.keys(modifyUser).length > 0) {
      userData[userindex] = { ...userData[userindex], ...modifyUser };
      fs.writeFile('db/users.json', JSON.stringify(userData), (err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json(new ApiError('file operation failed', 500));
        }
        res.send(userData[userindex]);
      });
    } else {
      res.status(404).send(new ApiError('user not found', 404));
    }
  });

export default usersRouter;

/* 
PATH- /api/users/{userId}
1.Read the single object
2.delete single object:delete method
3.modify single object :PUT method
4.creation of new object:POST method
*/
