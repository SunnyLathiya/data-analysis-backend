import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: "config.env" });

const populationData = async (req: Request, res: Response) => {

  try {
    const {selectedCountry, selectedYear} = req.query || "India";
    const url = `${process.env.POPULATION_URL}${selectedYear}/${selectedCountry}`

    const response = await axios.get(url);

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message,
    });
  }
};

export default populationData;
