const mongoose = require('../connection')()
const productModel = require('../Models/products')
const schemaCategory = new mongoose.Schema({
    _id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        auto: true
    },
    cat_name: String,
},)
const CategoryModel = mongoose.model("Category", schemaCategory, "Category")
module.exports = {
    CategoryModel: CategoryModel
}