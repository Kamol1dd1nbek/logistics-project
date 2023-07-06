const pool = require("../config/db");

// ===

const { currencyTypeValidation } = require("../validations/currencyType.validation");

// ===

const addStatus = async (req, res) => {
  try {
    const { error, value } = currencyTypeValidation(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
        name,
        description
    } = value;

    let query =
      "INSERT INTO status (name, description) VALUES ($1, $2) RETURNING *;";
    let values = [
        name,
        description
    ];

    const status = await pool.query(query, values);

    res.status(201).json(status.rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getAllStatus = async (req, res) => {
  try {
    let query = "SELECT * FROM status ORDER BY id;";
    const status = await pool.query(query, []);

    if (status.rows.length == 0) {
      return res.status(404).send({ message: "Statuses not added yet" });
    }

    res.status(200).json(status.rows);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getStatusById = async (req, res) => {
    try {
        const id = req.params.id;

        let query = "SELECT * FROM status WHERE id = $1;";
        const status = await pool.query(query, [id]);
      
        if (status.rows.length == 0) {
          return res.status(404).send({ message: "Status not found" });
        }
      
        res.status(200).json(status.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const updateStatus = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        const { error, value } = currencyTypeValidation(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
        name,
        description
    } = value;

    let query =
      "UPDATE status SET name = $1, description = $2 WHERE id = $3 RETURNING *;";
    let values = [
        name,
        description,
        id
    ];

    const status = await pool.query(query, values);

    if ( status.rows.length == 0 ) {
        return res.status(404).send({ message: "Status not found" });
    }

    res.status(201).json(status.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const removeStatus = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        let query =
      "DELETE FROM status WHERE id = $1 RETURNING *;";
    let values = [id];

    const status = await pool.query(query, values);

    if (status.rows.length == 0) {
        return res.status(404).send({ message: "Status not found" });
    }

    res.status(200).send({ id: status.rows[0].id });
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

module.exports = {
    getAllStatus,
    getStatusById,
    addStatus,
    updateStatus,
    removeStatus
};
