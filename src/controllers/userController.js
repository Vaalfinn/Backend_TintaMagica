const userProcess = require("../processes/userProcess");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await userProcess.getAllUsers();
    if(!users) {
      res.status(404).json({ success: false, message: "No Hay Usuarios" })
    }
    res.status(200).json({ success: true, message: "Usuarios Obtenidos", users });
  } catch (error) {
    console.error("Error Al Obtener Los Usuarios", error);
    res.status(500).json({ successs: false, message: "Error Interno Del Servidor" });
  }
};

// GET USER BY ID
const getOneUser = async (req, res) => {
  try {
    const user = await userProcess.getOneUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario No Encontrado" });
    }
    res.status(200).json({ successs: true, message: "Usuario Obtenido", user});
  } catch (error) {
    console.error("Error Al Obtener El Usuario", error);
    res.status(500).json({ successs: false, message: "Error Interno Del Servidor" });
  }
};

// CREATE USER SIN HASHEAR LA CONTRASEÑA
const createUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const newUser = await userProcess.createUser(nombre, email, password);
    res.status(201).json({ successs: true,  message: "Usuario Creado", newUser });
  } catch (error) {
    console.error("Error Al Crear El Usuario", error);
    res.status(500).json({ successs: false, message: "Error Interno Del Servidor" });
  }
};

// UPDATE USER BY ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const updatedUser = await userProcess.updateUser(id, nombre, email, password);
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "Usuario No Encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario Actualizado", updatedUser});
  } catch (error) {
    console.error("Error Al Actualizar El Usuario", error);
    res.status(500).json({ success: false, message: "Error Interno Del Servidor" });
  }
};

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userProcess.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Usuario No Encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario Eliminado", deletedUser});
  } catch (error) {
    console.error("Error Al Eliminar El Usuario", error);
    res.status(500).json({ success: false, message: "Error Interno Del Servidor" });
  }
};

// Obtener perfil
const getProfile = async (req, res) => {
  try {
      const userId = req.user.id;
      const profile = await userService.getUserProfile(userId);
      res.status(200).json({
          success: true,
          message: "Perfil Obtenido",
          profile
      });
  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      });
  }
};

// Actualizar perfil
const updateProfile = async (req, res) => {
  try {
      const userId = req.user.id;
      const updatedProfile = await userService.updateUserProfile(userId, req.body);
      res.status(200).json({
          success: true,
          message: "Perfil Actualizado",
          profile: updatedProfile
      });
  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
};