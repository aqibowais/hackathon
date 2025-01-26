
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected the import to match jwt-decode's export style
import { backendPortURL } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Login validation schema using Yup
const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Send login request
      const response = await axios.post(`${backendPortURL}/management/login`, values);
      console.log("Response data:", response.data);
    
      // Extract JWT token from the response
      const token = response.data.data;
      
      // Ensure token is valid and a string
      if (!token || typeof token !== "string") {
        throw new Error("Invalid token received from the server.");
      }
  
      console.log('Token:', token);
      localStorage.setItem("token", token); // Store the token for future API calls
    
      // Decode the JWT token to get role
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role; // Ensure the token contains a "role" claim
    
      console.log(`Role: ${role}`);
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Receptionist") {
navigate("/receptionist");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Something went wrong"}`, {});
      console.error("Error details:", error);
    }
  };
  



  return (
    <Formik
      initialValues={formData}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black">Email</label>
          <Field
            type="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#9AC747] focus:outline-none"
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Password</label>
          <Field
            type="password"
            name="password"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#9AC747] focus:outline-none"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
        </div>

        <button
          type="submit"
          className="w-full bg-[#126FB3] text-white font-semibold py-2 rounded-lg hover:bg-[#1270b3d2] transition duration-200"
        >
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export { Login };
