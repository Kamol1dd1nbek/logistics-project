const pool = require("../config/db");

// ===

const { currencyTypeValidation } = require("../validations/currencyType.validation");

// ===

const addCurrencyType = async (req, res) => {
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
      "INSERT INTO currency_type (name, description) VALUES ($1, $2) RETURNING *;";
    let values = [
        name,
        description
    ];

    const currencyType = await pool.query(query, values);

    res.status(201).json(currencyType.rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getAllCurrencyTypes = async (req, res) => {
  try {
    let query = "SELECT * FROM currency_type ORDER BY id;";
    const currencyType = await pool.query(query, []);

    if (currencyType.rows.length == 0) {
      return res.status(404).send({ message: "Currecy types not added yet" });
    }

    res.status(200).json(currencyType.rows);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getCurrencyTypeById = async (req, res) => {
    try {
        const id = req.params.id;

        let query = "SELECT * FROM currency_type WHERE id = $1;";
        const currencyType = await pool.query(query, [id]);
      
        if (currencyType.rows.length == 0) {
          return res.status(404).send({ message: "Currency type not found" });
        }
      
        res.status(200).json(currencyType.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const updateCurrencyType = async (req, res) => {
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
      "UPDATE currency_type SET name = $1, description = $2 WHERE id = $3 RETURNING *;";
    let values = [
        name,
        description,
        id
    ];

    const currencyType = await pool.query(query, values);

    if ( currencyType.rows.length == 0 ) {
        return res.status(404).send({ message: "Currency type not found" });
    }

    res.status(201).json(currencyType.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const removeCurrencyType = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        let query =
      "DELETE FROM currency_type WHERE id = $1 RETURNING *;";
    let values = [id];

    const currencyType = await pool.query(query, values);

    if (currencyType.rows.length == 0) {
        return res.status(404).send({ message: "Currency type not found" });
    }

    res.status(200).send({ id: currencyType.rows[0].id });
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

module.exports = {
    getAllCurrencyTypes,
    getCurrencyTypeById,
    addCurrencyType,
    updateCurrencyType,
    removeCurrencyType
};
