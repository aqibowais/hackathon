import express from 'express';
import { deleteAllUser, deleteManagement, getManagement, login, register } from '../controllers/managementController.js';
import { protect, role } from '../middleware/verifyUser.js';



const managementRoutes = express.Router();




managementRoutes.post('/register', register)
managementRoutes.post('/login', login)
managementRoutes.get('/get-all-management',protect, getManagement)
managementRoutes.delete('/delete-all-management',protect, deleteAllUser)
managementRoutes.delete('/delete-management/:id',protect, deleteManagement)



export default managementRoutes;