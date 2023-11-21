import FAQModel from "../models/faq.js";

export const getAllFAQ = async (req, res) => {
  try {
    const faq  = await FAQModel.find();
    res.status(200).json(faq);
  } catch (error) {
    console.error('Error fetching faq:', error.message);
    res.status(500).json({ message: 'Error fetching faq' });
  }
};