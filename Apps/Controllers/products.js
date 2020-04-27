const ProductModel = require('../Models/products')
const  CategoryModel = require('../Models/categories')
const path = require('path')
const formidable = require('formidable')
const mv = require('mv')
async function getList(req, res){
    let product = await ProductModel.ProductModel.find().populate('product_category')
    product = JSON.parse(JSON.stringify(product))
    res.render('list-product', {data:{product:product}})
}
function getAdd(req, res){
    CategoryModel.CategoryModel.find((err, docs)=>{
        res.render('add-product', {data:{category:docs}})
    })
}
async function postAdd(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let old_url = files.prd_image.path
        let new_url = path.join(__dirname, '../../public/uploads', files.prd_image.name)
        mv(old_url, new_url, function(err){
            if(err) throw err
            files.prd_image = files.prd_image.name
            let new_product = new ProductModel(fields, {versionKey: false})
            new_product.save();
            res.redirect('/admin/product');
        })
    })
}
function getEdit(req, res){
    res.render('edit-product')
}
function getDelete(req, res){
    res.send('Delete Product')
}
module.exports = {
    getList:getList,
    getAdd:getAdd,
    getEdit:getEdit,
    getDelete:getDelete,
    postAdd:postAdd
}