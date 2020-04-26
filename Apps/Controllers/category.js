const CategoryModel = require('../Models/categories')
const productModel = require('../Models/products')
const mongoose = require('../connection')()
async function listCategory (req, res) {
    let category = await CategoryModel.CategoryModel.find().populate('category_product')
    var lsCategory = JSON.parse(JSON.stringify(category))
    res.render('list-category', {data:{category:lsCategory}})
}
function addCategory(req, res)
{
    res.render('add-category', {data:{}})
}
async function postAddCategory(req, res)
{
    let name = req.body.cate_name
    let catName = await CategoryModel.CategoryModel.find({cat_name: name})
    if(catName == 0)
    {
        newCategory = new CategoryModel.CategoryModel({cat_name:name})
        newCategory.save((err)=>{
            if(err){res.render('add-category', {data:{}})}
            else{res.redirect('/category/listCategory')}
        })
    }
    else
    {
        error = "Errors!"
        res.render('add-category', {data:{error:error}})
    }
}
function editCategory (req, res, next)
{
    res.render('edit-category')
}
function deleteCategory(req, res)
{
    res.send('delete category')
}
module.exports = {
    listCategory:listCategory,
    addCategory:addCategory,
    editCategory:editCategory,
    deleteCategory:deleteCategory,
    postAddCategory:postAddCategory
}

