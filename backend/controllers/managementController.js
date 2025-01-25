import Management from "../models/managementModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"




dotenv.config() 
const secret = process.env.JWT_SECRET_KEY


const getManagement = async (req, res) => {
    try {
        const data = await Management.find()
        return res.status(200).send({ status: 200, message: "Users fetched successfully", data: data })
    } catch (error) {

    }
}

const register = async (req, res) => {
    try {
        const data = req.body;
        const { name, email, password  } = data

        // check unique user name
        const existingUser = await Management.findOne({ name });

        if (existingUser) {
            return res.status(404).send({ status: 404, message: "User name already exists" });
        }

        // check unique email
        const existingUserEmail = await Management.findOne({ email });

        if (existingUserEmail) {
            return res.status(404).send({ status: 404, message: "Email already exists" });
        }

        if (password.length < 8) {
            return res.status(400).send({ status: 400, message: "Password must be at least 8 characters long" });
        }

          // hash password
          const encryptPSW = await bcrypt.hash(password, 10);
          data.password = encryptPSW;

        // create new user
        const response = await Management.create(data)
        res.status(201).send({ status: 201, message: "User registered successfully", data: response })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await Management.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).send({ status: 401, message: "Invalid credentials" })
        };

        const token = jwt.sign({ id: existingUser._id , name: existingUser.name , role: existingUser.role}, secret);

        res.status(200).send({ status: 200, message: "Login Successfully", data: token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
}

const deleteAllUser = async (req, res) => {
    try {
        await Management.deleteMany({});
        res.status(200).send({ status: 200, message: "All users deleted successfully" })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
}

const deleteManagement = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Management.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "User not found" })
        };
        res.status(200).send({ status: 200, message: "User deleted successfully", data: user })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
}




export { getManagement, register , deleteAllUser , login , deleteManagement}