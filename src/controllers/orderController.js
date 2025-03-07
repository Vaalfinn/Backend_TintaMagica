const orderProcess = require("../processes/orderProcess");

// OBTENER TODAS LAS ÓRDENES
const getOrders = async (req, res) => {
    try {
        const orders = await orderProcess.getOrders();
        if(!orders) {
            return res.status(404).json({ success: false, message: "No Hay Ordenes" });
        }
        res.status(200).json({ success: true, message: "Ordenes Obtenidas", orders });
    } catch (error) {
        console.error("Error Al Obtener Las Ordenes:", error);
        res.status(500).json({ success: false, message: "Error Interno Del Servidor" });
    }
};

// OBTENER ORDEN POR ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderProcess.getOrderById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Orden No Encontrada" });
        }
        res.status(200).json({ success: true, message: "Orden Obtenida", order });
    } catch (error) {
        console.error("Error Al Obtener La Orden:", error);
        res.status(500).json({ success: false, message: "Error Interno Del Servidor" });
    }
};

// CREAR ORDEN
const createOrder = async (req, res) => {
    try {
        const { metodoPago } = req.body;
        const userId = req.user.id;

        if (!metodoPago) {
            return res.status(400).json({ 
                success: false, 
                message: "El método de pago es obligatorio" 
            });
        }

        const order = await orderProcess.createOrder(userId, metodoPago);
        
        res.status(201).json({ 
            success: true, 
            message: "Orden creada exitosamente", 
            order 
        });
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Error interno del servidor" 
        });
    }
};

// ACTUALIZAR ESTADO DE ORDEN
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "El Estado Es Obligatorio" });
        }

        const updatedOrder = await orderProcess.updateOrderStatus(id, status);
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Orden No Encontrada" });
        }

        res.status(200).json({ success: true, message: "Estado Actualizado", updatedOrder });
    } catch (error) {
        console.error("Error Al Actualizar Estado De Orden:", error);
        res.status(500).json({ success: false, message: "Error Interno Del Servidor" });
    }
};

// ELIMINAR ORDEN
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await orderProcess.deleteOrder(id);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Orden No Encontrada" });
        }
        res.status(200).json({ success: true, message: "Orden Eliminada Correctamente" });
    } catch (error) {
        console.error("Error Al Eliminar La Orden:", error);
        res.status(500).json({ success: false, message: "Error Interno Del Servidor" });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
};