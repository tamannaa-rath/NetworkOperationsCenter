const userService = require("../services/user.service");

async function getUsers(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
}

async function getUser(req, res) {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) 
        return res.status(404).send("User not found");
    res.json(user);
}

async function createUser(req, res) {
    const user = req.body;
    const newUser = await userService.createNewUser(user);
    res.json(newUser);
}

async function updateUser(req, res) {
    const id = Number(req.params.id);
    const update = req.body;
    const updatedUser = await userService.updateUser(id, update);
    if(!updatedUser) 
        return res.status(404).send("User not found");
    res.json(updatedUser);
}

async function deleteUser(req, res) {
    const id = Number(req.params.id);
    const result = await userService.deleteUser(id);
    if (!result) 
        return res.status(404).send("User not found");
    res.send("User deleted");
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};