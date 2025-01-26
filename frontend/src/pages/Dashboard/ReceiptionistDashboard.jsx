


import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendPortURL } from "../../config";

import { toast } from "react-toastify";


const ReceptionistView = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBeneficiary, setNewBeneficiary] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
    status: "pending",
  });

  useEffect(() => {
    // Fetch all beneficiaries
    axios
      .get(`${backendPortURL}/beneficiary`)
      .then((response) => {
        setBeneficiaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching beneficiaries data!", error);
      });
  }, []);

  const handleAddBeneficiary = () => {
    axios
      .post(`${backendPortURL}/beneficiary/register`, newBeneficiary)
      .then((response) => {
        setBeneficiaries([...beneficiaries, response.data]);
        setNewBeneficiary({
          cnic: "",
          name: "",
          phone: "",
          address: "",
          purpose: "",
          status: "pending",
        });
        toast.success("Beneficiary added successfully!");
      })
      .catch((error) => {
        console.error("Error adding the beneficiary!", error);
        toast.error("Error adding the beneficiary!");
      });
  };

  const filteredBeneficiaries = beneficiaries.filter(
    (beneficiary) =>
      beneficiary.cnic.includes(searchTerm) ||
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <header className="bg-[#126FB3] text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-center">Receptionist Dashboard</h1>
      </header>

      {/* Add Beneficiary Form */}
      <section className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-[#126FB3] mb-4">
          Add Beneficiary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["CNIC", "Name", "Phone", "Address", "Purpose"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              value={newBeneficiary[field.toLowerCase()]}
              onChange={(e) =>
                setNewBeneficiary({
                  ...newBeneficiary,
                  [field.toLowerCase()]: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#126FB3]"
            />
          ))}
        </div>
        <button
          onClick={handleAddBeneficiary}
          className="mt-4 px-4 py-2 bg-[#9AC747] text-white font-semibold rounded shadow hover:bg-green-600"
        >
          Add Beneficiary
        </button>
      </section>

      {/* Search Beneficiaries */}
      <section className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-[#126FB3] mb-4">
          Search Beneficiaries
        </h2>
        <input
          type="text"
          placeholder="Search by CNIC or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#126FB3]"
        />
      </section>

      {/* Beneficiary List */}
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-[#126FB3] mb-4">
          Beneficiary List
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-[#126FB3] text-white">
              <tr>
                {["CNIC", "Name", "Phone", "Purpose", "Status"].map((col) => (
                  <th key={col} className="p-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBeneficiaries.length > 0 ? (
                filteredBeneficiaries.map((beneficiary) => (
                  <tr
                    key={beneficiary._id}
                    className="even:bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="p-2">{beneficiary.cnic}</td>
                    <td className="p-2">{beneficiary.name}</td>
                    <td className="p-2">{beneficiary.phone}</td>
                    <td className="p-2">{beneficiary.purpose}</td>
                    <td className="p-2">{beneficiary.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No beneficiaries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReceptionistView;
