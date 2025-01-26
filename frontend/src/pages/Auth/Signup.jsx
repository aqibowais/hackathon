import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { backendPortURL } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Signup validation schema using Yup
const signupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff",
  });
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${backendPortURL}/management/register`, values);
      toast.success(`Success: ${response.data.message}`, {});
      
      const role = values.role; // Get the role from the form data
      if (role === "Admin") {
        navigate("/admin"); // Navigate to Admin Dashboard
      } else if (role === "Receptionist") {
        navigate("/receptionist"); // Navigate to Receptionist Dashboard
      } else {
        navigate("/"); // Navigate to default dashboard
      }
  
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Something went wrong"}`, {});
      console.error("Error details:", error);
    }
  };
  

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={signupValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <Field
              type="text"
              name="name"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#9AC747] focus:outline-none"
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="div" className="text-red-600 text-xs" />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-black">Role</label>
            <Field as="select" name="role" className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#9AC747] focus:outline-none">
              <option value="Admin">Admin</option>
              <option value="Receptionist">Receptionist</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-600 text-xs" />
          </div>

          <button
            type="submit"
            className="w-full bg-[#126FB3] text-white font-semibold py-2 rounded-lg hover:bg-[#1270b3ce] transition duration-200"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
      
      {/* ToastContainer is required to display the toast notifications */}
      <ToastContainer />
    </>
  );
};

export { Signup };
