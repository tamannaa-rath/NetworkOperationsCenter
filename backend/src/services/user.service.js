const pool = require("../config/db");

async function getAllUsers() {
    const users = await pool.query("SELECT * FROM users");
    return users.rows;
}

async function getUserById(id) {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows[0];
}

async function createNewUser(user){
    const result = await pool.query(
        "INSERT INTO users(name, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING *",
        [user.name, user.email, user.password_hash, user.role]
    );
    return result.rows[0];
}

async function updateUser(id, update) {
    const user = await getUserById(id);
    if (!user) {
        return null;
    }
    const updatedUser = { ...user, ...update };
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2, password_hash = $3, role = $4 WHERE id = $5 RETURNING *",
        [updatedUser.name, updatedUser.email, updatedUser.password_hash, updatedUser.role, id]
    );
    return result.rows[0];
}

async function deleteUser(id){
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rowCount > 0;
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};