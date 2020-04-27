const CategoryModel = require('../Models/categories')
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
            else{res.redirect('/admin/categories')}
        })
    }
    else
    {
        error = "Errors!"
        res.render('add-category', {data:{error:error}})
    }
}
function postEditCategory (req, res, next)
{
    CategoryModel.CategoryModel.findOneAndUpdate({ _id: req.body._id }, {cat_name: req.body.cate_name}, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/admin/categories'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("edit-category", {
                    category: req.body
                });
            }
        }
    });
}
function getEditCategory (req, res, next)
{
    CategoryModel.CategoryModel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("edit-category", {data:{
                category: doc
            }});
        }
    });
}
function deleteCategory(req, res)
{
    CategoryModel.CategoryModel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/categories');
        }
    });
}
module.exports = {
    listCategory:listCategory,
    addCategory:addCategory,
    getEditCategory:getEditCategory,
    postEditCategory:postEditCategory,
    deleteCategory:deleteCategory,
    postAddCategory:postAddCategory
}

