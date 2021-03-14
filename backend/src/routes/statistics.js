import { Router } from 'express';
import controller from '../controllers/statisticsController.js'

export default () => {
    const api = Router();

    api.get('/', controller.getStatistics);

    return api;
}