const userdb = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const queryStr = "SELECT * FROM public.user WHERE public.user.email=$1;";
        const queryValues = [email];
        const response = await userdb.query(queryStr, queryValues);
        if (response.rows[0]){
            //Check if password is the same
            const check = await bcrypt.compare(password, response.rows[0].password);
            if (!check) {
                res.status(401).json({ msg: "wrong password" });
                return;
            }
            const userObj = response.rows[0];
            const token = createJWT(userObj);
            userObj.token = token;
            res.status(201).json(userObj);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password, address, account_type } = req.body;
        //Check if existing email
        const queryEmailStr = "SELECT user_id FROM public.user WHERE public.user.email = $1;";
        const queryEmailValues = [email];
        const emailResponse = await userdb.query(queryEmailStr, queryEmailValues);
        if (emailResponse?.rows[0]?.user_id){
            res.status(204).json({ message: "Email already exists." });
            return;
        }
        //Hash password and add 
        const hashedPassword = await hashPassword(password);
        const queryStr = "INSERT INTO public.user(name, email, password, address, account_type) VALUES ($1, $2, $3, $4, $5) returning user_id;";
        const queryValues = [name, email, hashedPassword, address, account_type];
        const response = await userdb.query(queryStr, queryValues);
        if (response?.rows[0]?.user_id){
            const queryUserStr = "SELECT * FROM public.user WHERE public.user.user_id = $1;";
            const queryUserValues = [response.rows[0].user_id];
            const user = await userdb.query(queryUserStr, queryUserValues);
            if (user.rows[0]){
                const userObj = user.rows[0];
                const token = createJWT(userObj);
                userObj.token = token;
                res.status(201).json(userObj);
            } 
        } else{
            res.status(500).json({ message: "Error adding User" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getUserById = async (req, res) => {
    try {
        const { user_id } = req.body;
        const queryStr = `SELECT * FROM public.user WHERE public.user.user_id = $1;`;
        const queryValues = [user_id];
        const user = await userdb.query(queryStr, queryValues);
        res.status(201).json(user.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: "24h" }
    );
}

async function hashPassword(password){
    const SALT_ROUNDS = 10;
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return hashed;
}

module.exports = {
    login,
    signup,
    getUserById
};