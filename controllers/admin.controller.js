const { adminValidation } = require("../../Chala/itInfo/validations/admin.validation")
const pool = require("../config/db");
// ===

const addAdmin = async (req, res) => {
    const { error, value } = adminValidation(req.body);

    if ( error ) {
        return res.status(404).send({ message: error.details[0].message });
    }

    const {
        full_name,
        user_name,
        phone_number,
        email,
        tg_link,
        description,
        password
    } = value;

    console.log(full_name);
}

const getAlladmins = async (req, res) => {
    let query = "SELECT * FROM admin;";
    const admins = await pool.query(query, []);

    if ( admins.rows.length == 0 ) {
        return res.status(404).send({ message: "Admins not added yet" });
    }

    res.status(200).json(admins.rows);
}

const getAdminById = async (req, res) => {
    const id = req.params.id;

    let query = "SELECT * FROM admin WHERE id = $1;";
    const admins = await pool.query(query, [id]);

    if ( admins.rows.length == 0 ) {
        return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).json(admins.rows[0]);
}

const updateAdmin = async (req, res) => {

}

const removeAdmin = async (req, res) => {

}

module.exports = {
    addAdmin,
    getAlladmins,
    getAdminById,
    updateAdmin,
    removeAdmin
}