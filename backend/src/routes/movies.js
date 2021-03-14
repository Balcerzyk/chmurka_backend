import { Router } from 'express';
import controller from '../controllers/moviesController.js'

export default () => {
    const api = Router();

    api.get('/:id', controller.findOne);
    api.get('/', controller.findAll);
    api.post('/',controller.create);
    api.put('/:id', controller.update);
    api.delete('/:id', controller.delete);
    

    return api;
}