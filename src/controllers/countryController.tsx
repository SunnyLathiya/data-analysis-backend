import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: "config.env" });

const countriesData = async (req: Request, res: Response) => {

  const url: any = process.env.COUNTRIES_URL
  try {
    const response = await axios.get(url);

    res.status(200).json({
      success: true,
      data: response.data,
    });
    console.log("res", res)
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message,
    });
  }
};

export default countriesData;
