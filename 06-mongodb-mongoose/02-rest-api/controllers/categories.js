const Category = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx, next) {
  try {
    const categories = await Category.find({});
    const mappedCategories = categories.map((category) => mapCategory(category));
    ctx.body = {categories: mappedCategories};
  } catch (e) {
    ctx.status = 400;
    ctx.body = e.message;
  }
};
