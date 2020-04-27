const ProductModel = require('../Models/products')
const CategoryModel = require('../Models/categories')
const path = require('path')
const formidable = require('formidable')
const mv = require('mv')
async function getList(req, res){
    let product = await ProductModel.find().populate('product_category')
    product = JSON.parse(JSON.stringify(product))
    res.render('list-product', {data:{product:product}})
}
function getAdd(req, res){
    CategoryModel.CategoryModel.find((err, docs)=>{
        res.render('add&edit-product', {data:{category:docs}})
    })
}
function postAdd(req, res) {

    var form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        // Upload
        var oldUrl = files.prd_image.path
        var newUrl = path.join(__dirname, "../../public/uploads", files.prd_image.name)
        mv(oldUrl, newUrl, (err) => {
            if (err) throw err
        })
        // Add Product
        delete fields.sbm
        fields.prd_image = files.prd_image.name
        let addProduct = new ProductModel(fields)
        addProduct.save()
        res.redirect("/admin/products")
    })
}
function getEdit(req, res){
    res.render('edit-product')
}
function getDelete(req, res){
    ProductModel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/products');
        }
        else { console.log('Error in employee delete :' + err); }
    });
}
module.exports = {
    getList:getList,
    getAdd:getAdd,
    getEdit:getEdit,
    getDelete:getDelete,
    postAdd:postAdd
}