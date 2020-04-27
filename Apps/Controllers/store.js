const CategoryModel = require('../Models/categories')
const ProductModel = require('../Models/products')

async function getStore(req, res)
{
    let product = await ProductModel.find().populate('product_category')
    product = JSON.parse(JSON.stringify(product))
    let category = await CategoryModel.CategoryModel.find().populate('category_product')
    var lsCategory = JSON.parse(JSON.stringify(category))
    res.render('store-ui', {
        data:{
            product:product,
            lsCategory:lsCategory
        }
    })
}
module.exports = {
    getStore:getStore,
}
