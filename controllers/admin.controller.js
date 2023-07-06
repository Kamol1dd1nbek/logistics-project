const { adminValidation } = require("../validations/admin.validation");
const pool = require("../config/db");
const bcrypt = require("bcrypt");
// ===

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
      full_name,
      user_name,
      phone_number,
      email,
      tg_link,
      description,
      password,
    } = value;

    const hashedPassword = await bcrypt.hash(password, 10);

    let query =
      "INSERT INTO admin (full_name, user_name, phone_number, email, tg_link, description, hashed_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
    let values = [
      full_name,
      user_name,
      phone_number,
      email,
      tg_link,
      description,
      hashedPassword,
    ];

    const admin = await pool.query(query, values);
    res.status(201).json(admin.rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getAlladmins = async (req, res) => {
  try {
    let query = "SELECT * FROM admin;";
    const admins = await pool.query(query, []);

    if (admins.rows.length == 0) {
      return res.status(404).send({ message: "Admins not added yet" });
    }

    res.status(200).json(admins.rows);
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik!" });
    console.log(error);
  }
};

const getAdminById = async (req, res) => {
    try {
        const id = req.params.id;

        let query = "SELECT * FROM admin WHERE id = $1;";
        const admins = await pool.query(query, [id]);
      
        if (admins.rows.length == 0) {
          return res.status(404).send({ message: "Admin not found" });
        }
      
        res.status(200).json(admins.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const updateAdminForAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        const { error, value } = adminValidation(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
      full_name,
      user_name,
      phone_number,
      email,
      tg_link,
      description,
      password,
    } = value;

    const hashedPassword = await bcrypt.hash(password, 10);

    let query =
      "UPDATE admin SET full_name = $1, user_name = $2, phone_number = $3, email = $4, tg_link = $5, description = $6, hashed_password = $7 WHERE id = $8 RETURNING *;";
    let values = [
      full_name,
      user_name,
      phone_number,
      email,
      tg_link,
      description,
      hashedPassword,
      id
    ];

    const admin = await pool.query(query, values);

    if ( admin.rows.length == 0 ) {
        return res.status(404).send({ message: "Admin not found" });
    }

    res.status(201).json(admin.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const updateAdminForCreator = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        const { error, value } = adminValidation(req.body);

    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }

    const {
      full_name,
      user_name,
      phone_number,
      email,
      tg_link,
      description,
      password,
    } = value;

    const { is_creator, is_active } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let query =
      "UPDATE admin SET full_name = $1, user_name = $2, phone_number = $3, email = $4, tg_link = $5, description = $6, hashed_password = $7, is_creator = $8, is_active = $9 WHERE id = $10 RETURNING *;";
    let values = [
      full_name,
      user_name,
      phone_number,
      email,
      tg_link,
      description,
      hashedPassword,
      is_creator,
      is_active,
      id
    ];

    const admin = await pool.query(query, values);

    if ( admin.rows.length == 0 ) {
        return res.status(404).send({ message: "Admin not found" });
    }

    res.status(201).json(admin.rows[0]);
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

const removeAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(404).send({ message: "Invalid Id" });
        }

        let query =
      "DELETE FROM admin WHERE id = $1 RETURNING *;";
    let values = [id];

    const admin = await pool.query(query, values);

    if (admin.rows.length == 0) {
        return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send({ id: admin.rows[0].id });
    } catch (error) {
        res.status(500).send({ message: "Serverda xatolik!" });
        console.log(error);
    }
};

module.exports = {
  addAdmin,
  getAlladmins,
  getAdminById,
  updateAdminForAdmin,
  updateAdminForCreator,
  removeAdmin,
};
