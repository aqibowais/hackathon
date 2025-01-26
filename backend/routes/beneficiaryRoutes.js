import express from 'express';
import { getAllBeneficiaries, getBeneficiaryByCNIC, registerBeneficiary } from '../controllers/benificiaryController.js';
import { protect,role } from '../middleware/verifyUser.js';
const BeneficiaryRoutes = express.Router();

BeneficiaryRoutes.get('/', getAllBeneficiaries);
BeneficiaryRoutes.get('/:cnic', getBeneficiaryByCNIC);
BeneficiaryRoutes.post('/register', registerBeneficiary);

export default BeneficiaryRoutes;

