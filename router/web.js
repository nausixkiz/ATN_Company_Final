const router = require('express').Router()

const { checkAuthenticated, checkNotAuthenticated } = require('../Config/Auth-config');

const products = require('../Apps/Controllers/products')
const admin = require('../Apps/Controllers/admin')
const users = require('../Apps/Controllers/users')
const category = require('../Apps/Controllers/category')
const auth = require('../Apps/Controllers/auth')
const store = require('../Apps/Controllers/store')
const passport = require('passport')


require('../Config/passport-config')(passport)

router.get('/login', checkNotAuthenticated, auth.getLogin)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)


router.get('/admin/dashboard',admin.dashboard)

router.get('/admin/users', users.listUser)
router.get('/admin/users/Add', users.addUser)
router.post('/admin/users/Add', users.postAddUser)
router.get('/admin/users/edit/:id', users.editUser)
router.post('/admin/users/edit/:id', users.postUser)
router.get('/admin/users/delete/:id', users.deleteUser)

router.get('/admin/categories/', category.listCategory)
router.get('/admin/categories/Add', category.addCategory)
router.post('/admin/categories/Add', category.postAddCategory)
router.get('/admin/categories/edit/:id', category.getEditCategory)
router.post('/admin/categories/edit/:id', category.postEditCategory)
router.get('/admin/categories/delete/:id', category.deleteCategory)

router.get('/admin/products', products.getList)
router.get('/admin/products/Add',  products.getAdd)
router.post('/admin/products/Add', products.postAdd)
router.get('/admin/products/edit/:id', products.getEdit)
router.post('/admin/products/edit/:id', products.postEdit)
router.get('/admin/products/delete/:id', products.getDelete)

router.get('/store', store.getStore)
router.get('/', store.getStore)


module.exports = router