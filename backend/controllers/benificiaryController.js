import Beneficiary from '../models/beneficiaryModel.js';

import crypto from 'crypto';

export const registerBeneficiary = async (req, res) => {
  try {
    const { cnic, name, phone, address, purpose } = req.body;
    
    const token = crypto.randomBytes(20).toString('hex');
  



    // const token = `TOKEN-${Math.floor(Math.random() * 1000000)}`;


    const beneficiary = await Beneficiary.create({ cnic, name, phone, address, purpose,token });
    res.status(201).json(beneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all beneficiaries
export const getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find();
    res.status(200).json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve beneficiaries', error: error.message });
  }
};

// Get beneficiary by CNIC
export const getBeneficiaryByCNIC = async (req, res) => {
  try {
    const { cnic } = req.params;
    const beneficiary = await Beneficiary.findOne({ cnic });

    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }

    res.status(200).json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve beneficiary', error: error.message });
  }
};
