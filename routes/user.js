const express = require('express');
const userController = require('@/controllers').user
const { userMiddleware } = require('@/middleware')

const router = express.Router();

router.post('/register', userController.createUser)
router.post('/login', userController.verifyUser)
router
  .route('/:id')
  .get(userMiddleware.validateUser, userController.getUser)
  .put(userMiddleware.validateUser, userController.updateUser)

router.put('/:id/password', userMiddleware.validateUser, userController.updatePassword)
//   .delete(userController.deleteUser);

module.exports = router;
