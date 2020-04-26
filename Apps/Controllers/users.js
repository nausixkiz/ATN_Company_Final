const UserModel = require('../Models/users')
const mongoose = require("../connection.js");

function listUser(req, res)
{
    UserModel.UserModel.find((err, docs)=>{
        res.render('user', {data:{user:docs}})
    })
}
function addUser(req, res)
{
    res.render('add_user', {data:{}})
}
async function postAddUser(req, res) {
    let mail  = req.body.user_mail
    let name = req.body.user_full
    let  passw = req.body.user_pass
    let level = req.body.user_level
    let user = await UserModel.UserModel.find({user_mail:mail})
    if(user == 0 && passw==passw)
    {
        let addUser =  new UserModel.UserModel({
            user_full: name,
            user_mail: mail,
            user_pass: passw,
            user_level: level
        })
        addUser.save((err)=>{
            if(err){console.log(err)}
            else{res.redirect('/user/listUser')}
        })
    }
    else
    {
        error = "Email đã tồn tại !"
        res.render('admin/add_user', {data:{error:error}})
    }
}
function editUser(req, res)
{
    res.render('admin/edit_user')
}
function deleteUser(req, res)
{
    res.send('delete user')
}
module.exports = {
    listUser:listUser,
    addUser:addUser,
    editUser:editUser,
    deleteUser:deleteUser,
    postAddUser:postAddUser
}
