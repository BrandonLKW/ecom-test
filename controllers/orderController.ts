const orderdb = require("../db");

const addOrder = async (req, res) => {
    let success = true;
    try{
        const order = req.body;
        const queryStr = "INSERT INTO public.order(user_id, transaction_date, total_cost, status) VALUES ($1, $2, $3, $4) RETURNING order_id;";
        const queryValues = [order.user_id, order.transaction_date, order.total_cost, order.status];
        const response = await orderdb.query(queryStr, queryValues);
        if (response?.rows[0]){
            const orderId = response.rows[0].order_id;
            for (const orderItem of order.orderItemList){
                const itemQueryStr = "INSERT INTO public.order_item(order_id, unit_price, quantity, product_id) VALUES ($1, $2, $3, $4);"
                const itemQueryValues = [orderId, orderItem.unit_price, orderItem.quantity, orderItem.product_id];
                const itemResponse = await orderdb.query(itemQueryStr, itemQueryValues);
                if (!itemResponse){
                    success = false;
                }
            }
        } else{
            throw "Error adding Order";
        }
        if (success){
            res.status(201).json({ message: "Completed"});
        } 
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    addOrder
};