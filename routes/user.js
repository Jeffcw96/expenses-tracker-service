const express = require('express');
const userController = require('@/controllers').user

const router = express.Router();

router.post('/register', userController.createUser)
router.post('/login', userController.verifyUser)
router
  .route('/:id')
  .get(userController.validateUser, userController.getUser)
  .put(userController.validateUser, userController.updateUser)

router.put('/:id/password', userController.validateUser, userController.updatePassword)
//   .delete(userController.deleteUser);

module.exports = router;
