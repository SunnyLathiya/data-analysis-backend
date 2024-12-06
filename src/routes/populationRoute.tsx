import express from 'express';
import populationData from '../controllers/populationController';

const router = express.Router();

router.get('/population-data', populationData);

export default router;
