//const  CategoryModel = require('../Models/categories')
const mongoose =require('../connection')()
const schemaProduct = new mongoose.Schema({
    _id: {type:mongoose.Schema.ObjectId, auto: true},
    cat_id:mongoose.Schema.Types.ObjectId,
    prd_name: String,
    prd_image: String,
    prd_price: Number,
    prd_details: String
}, 
{
    toJSON:{ virtuals: true}
})
schemaProduct.virtual('product_category', {
    ref: 'Category',
    localField: 'cat_id',
    foreignField: '_id'
})
const ProductModel = mongoose.model("Product", schemaProduct, "Product")

module.exports = ProductModel
