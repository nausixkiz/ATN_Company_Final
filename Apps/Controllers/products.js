const ProductModel = require('../Models/products')
const  CategoryModel = require('../Models/categories')
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
    var addPr = await new ProductModel.ProductModel({
        prd_name: req.body.prd_name,
        cat_id: req.body.cat,
        prd_price: req.body.prd_price,       
        prd_image: req.body.prd_image,
        prd_details: req.body.prd_details,
    })
    addPr.save((err)=>{
        if(err){console.log(err)}
        else{res.redirect('')}
    })
    //console.log(addPr)
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