import express from 'express';
import countriesData from '../controllers/countryController';

const router = express.Router();

router.get('/countries-data', countriesData);

export default router;
