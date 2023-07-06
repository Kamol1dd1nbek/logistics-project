const pool = require("../config/db");

// ===

const { operationValidate } = require("../validations/operation.validation");

// ===

const addOperation = async (req, res) => {
  try {
    const { error, value } = operationValidate(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
        order_id,
        status_id,
        operation_date,
        admin_id,
        description
    } = value;

    let query =
      "INSERT INTO operation (order_id, status_id, operation_date, admin_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    let values = [
        order_id,
        status_id,
        operation_date,
        admin_id,
        description
    ];

    const operation = await pool.query(query, values);

    res.status(201).json(operation.rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getAllOperations = async (req, res) => {
  try {
    let query = "SELECT * FROM operation;";
    const operation = await pool.query(query, []);

    if (operation.rows.length == 0) {
      return res.status(404).send({ message: "Operations not added yet" });
    }

    res.status(200).json(operation.rows);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getOperationById = async (req, res) => {
    try {
        const id = req.params.id;

        let query = "SELECT * FROM operation WHERE id = $1;";
        const operation = await pool.query(query, [id]);
      
        if (operation.rows.length == 0) {
          return res.status(404).send({ message: "Operation not found" });
        }
      
        res.status(200).json(operation.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const updateOperation = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        const { error, value } = operationValidate(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
        order_id,
        status_id,
        admin_id,
        description
    } = value;

    let query =
      "UPDATE operation SET order_id = $1, status_id = $2, admin_id = $3, description = $4 WHERE id = $5 RETURNING *;";
    let values = [
        order_id,
        status_id,
        admin_id,
        description,
        id
    ];

    const operation = await pool.query(query, values);

    if ( operation.rows.length == 0 ) {
        return res.status(404).send({ message: "Operation not found" });
    }

    res.status(201).json(operation.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const removeOperation = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        let query =
      "DELETE FROM operation WHERE id = $1 RETURNING *;";
    let values = [id];

    const operation = await pool.query(query, values);

    if (operation.rows.length == 0) {
        return res.status(404).send({ message: "Operation not found" });
    }

    res.status(200).send({ id: operation.rows[0].id });
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

module.exports = {
    getAllOperations,
    getOperationById,
    addOperation,
    updateOperation,
    removeOperation
};
