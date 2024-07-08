const productExpress = require("express");
const productRouter = productExpress.Router();
const productController = require("../controllers/productController");

productRouter.get("/type", productController.getAllTypes);
productRouter.post("/type/product", productController.getAllProductByTypes);
productRouter.post("/stockquantity", productController.getProductStock);
productRouter.post("/update/quantity", productController.updateProductStock);
productRouter.post("/add", productController.addProduct);

module.exports = productRouter;