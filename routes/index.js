const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/user.js')
const { signup, login } = createUserController
const userAuth = require('../middleware/auth.js')

router.get('/', (req, res) => {
    res.send("I got you covered, hit me any time!! ");
})

router.post('/signup', userAuth.validateUser, signup)
router.post('/login', login )
//router.post('/users', createUserController);


module.exports = router