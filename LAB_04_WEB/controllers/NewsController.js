import NewsModel from "../models/news.js";

export const getAllNews = async (req, res) => {
  try {
    const news  = await NewsModel.find();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Error fetching news' });
  }
};