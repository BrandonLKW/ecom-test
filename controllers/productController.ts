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

module.exports = {
    getAllTypes, 
    getAllProductByTypes
};