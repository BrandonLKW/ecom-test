const productdb = require("../db");

const getAllTypes = async (req, res) => {
    try {
        const queryStr = "SELECT DISTINCT product_type FROM product ORDER BY product_type ASC";
        const response = await productdb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllProductByTypes = async (req, res) => {
    try{
        const { product_type } = req.body;
        const queryStr = `SELECT * FROM product WHERE product_type = '${product_type}' ORDER BY name ASC`;
        const response = await productdb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error){
        res.status(500).json({ error });
    }
}

const getProductStock = async (req, res) => {
    try {
        const { product_id } = req.body;
        const queryStr = `SELECT stock_quantity FROM public.product WHERE public.product.product_id = ${product_id}`;
        const response = await productdb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error){
        res.status(500).json({ error });
    }
} 

const updateProductStock = async (req, res) => {
    try{
        const { product_id, new_quantity } = req.body;
        const queryStr = `UPDATE public.product SET stock_quantity = ${new_quantity} WHERE public.product.product_id = ${product_id}`;
        const response = await productdb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error){
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllTypes, 
    getAllProductByTypes,
    getProductStock,
    updateProductStock
};