const router = require('express').Router()

const { checkAuthenticated, checkNotAuthenticated } = require('../Config/Auth-config');

const products = require('../Apps/Controllers/products')
const admin = require('../Apps/Controllers/admin')
const users = require('../Apps/Controllers/users')
const category = require('../Apps/Controllers/category')
const auth = require('../Apps/Controllers/auth')
const passport = require('passport')
require('../Config/passport-config')(passport)


router.get('/login', checkNotAuthenticated, auth.getLogin)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/store',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});
router.get('/register', checkNotAuthenticated, auth.getRegister)
router.post('/register', auth.postRegister)


router.get('/admin/dashboard', admin.dashboard)

router.get('/user/listUser', users.listUser)
router.get('/user/addUser', users.addUser)
router.post('/user/addUser', users.postAddUser)
router.get('/user/editUser', users.editUser)
router.get('/user/deleteUser', users.deleteUser)

router.get('/category/listCategory', checkAuthenticated, category.listCategory)
router.get('/category/addCategory', category.addCategory)
router.post('/category/addCategory', category.postAddCategory)
router.get('/category/editCategory', category.editCategory)
router.get('/category/deleteCategory', category.deleteCategory)

router.get('/admin/products', checkAuthenticated, products.getList)
router.get('/admin/products/Add', products.getAdd)
router.post('/admin/products/Add', products.postAdd)
router.get('/admin/products/Edit', products.getEdit)
router.get('/admin/products/Delete', products.getDelete)

module.exports = router