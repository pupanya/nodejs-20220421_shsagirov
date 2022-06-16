const Product = require('../models/Product');
const mapProduct = require('../mappers/product');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  ctx.body = {};
};

module.exports.productList = async function productList(ctx, next) {
  ctx.body = {};
};

module.exports.productById = async function productById(ctx, next) {
  try {
    const id = ctx.request.params.id;
    if (!ObjectId.isValid(id)) {
      throw new Error();
    }
    const product = await Product.findById(id);
    if (product) {
      ctx.body = {product: mapProduct(product)};
    } else {
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e.message;
  }
};

