import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConnection/db.js';
import managementRoutes from './routes/managementRoutes.js';
import BeneficiaryRoutes from './routes/beneficiaryRoutes.js';
import cors from 'cors'

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to the Saylani server');
})
app.use('/management', managementRoutes)
app.use('/beneficiary', BeneficiaryRoutes)




const PORT = process.env.PORT || 3000;
connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})