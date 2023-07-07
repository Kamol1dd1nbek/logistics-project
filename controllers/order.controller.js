const pool = require("../config/db");
const {v4} = require('uuid');
// ===

const { orderValidation } = require("../validations/order.validation");

// ===

const addOrder = async (req, res) => {
  try {
    const { error, value } = orderValidation(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
      full_name,
      phone_number,
      product_link,
      summa,
      currency_type_id,
      truck,
      email,
      description
    } = value;

    const order_unique_id = v4();

    let query =
      "INSERT INTO orders (order_unique_id,full_name,phone_number,product_link,summa,currency_type_id,truck,email,description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;";
    let values = [
      order_unique_id,
      full_name,
      phone_number,
      product_link,
      summa,
      currency_type_id,
      truck,
      email,
      description
    ];

    const order = await pool.query(query, values);

    res.status(201).json(order.rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    let query = "SELECT * FROM orders ORDER BY id;";
    const order = await pool.query(query, []);

    if (order.rows.length == 0) {
      return res.status(404).send({ message: "Orders not added yet" });
    }

    res.status(200).json(order.rows);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;

        let query = "SELECT * FROM orders WHERE id = $1;";
        const order = await pool.query(query, [id]);
      
        if (order.rows.length == 0) {
          return res.status(404).send({ message: "Order not found" });
        }
      
        res.status(200).json(order.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        const { error, value } = orderValidation(req.body);

        if (error) {
          return res.status(404).send({ message: error.details[0].message });
        }
    
        const {
          full_name,
          phone_number,
          product_link,
          summa,
          currency_type_id,
          truck,
          email,
          description
        } = value;

      if (error) {
        return res.status(404).send({ message: error.details[0].message });
      }

      let query =
        "UPDATE orders SET full_name = $1, phone_number = $2, product_link = $3, summa = $4, currency_type_id = $5, truck = $6, email = $7, description = $8 WHERE id = $9 RETURNING *;";
      let values = [
        full_name,
        phone_number,
        product_link,
        summa,
        currency_type_id,
        truck,
        email,
        description,
        id
      ];

    const order = await pool.query(query, values);

    if ( order.rows.length == 0 ) {
        return res.status(404).send({ message: "Order not found" });
    }

    res.status(201).json(order.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const removeOrder = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        let query =
      "DELETE FROM orders WHERE id = $1 RETURNING *;";
    let values = [id];

    const order = await pool.query(query, values);

    if (order.rows.length == 0) {
        return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send({ id: order.rows[0].id });
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    removeOrder
};
