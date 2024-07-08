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

const getOrdersByUserId = async (req, res) => {
    try {
        const queryStr = "SELECT * FROM public.order WHERE user_id = $1 ORDER BY transaction_date DESC";
        const queryValues = [req.body.user_id];
        const response = await orderdb.query(queryStr, queryValues);
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getOrderItemsByOrderId = async (req, res) => {
    try {
        const queryStr = "SELECT * FROM public.order_item oi JOIN public.product p ON p.product_id = oi.product_id WHERE order_id = $1 ORDER BY p.product_id";
        const queryValues = [req.body.order_id];
        const response = await orderdb.query(queryStr, queryValues);
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getActiveOrders = async (req, res) => {
    try {
        const queryStr = "SELECT * FROM public.order WHERE public.order.status = 'PENDING' ORDER BY public.order.transaction_date ASC";
        const response = await orderdb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const queryStr = "UPDATE public.order SET status = $1 WHERE order_id = $2 RETURNING 'DONE';";
        const queryValues = [req.body.status, req.body.order_id];
        const response = await orderdb.query(queryStr, queryValues);
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    addOrder,
    getOrdersByUserId,
    getOrderItemsByOrderId,
    getActiveOrders,
    updateOrderStatus
};