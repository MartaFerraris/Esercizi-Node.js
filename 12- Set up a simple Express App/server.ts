import * as planetsController from './controllers/planets';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/planets', planetsController.getAll);
app.get('/api/planets/:id', planetsController.getOneById);
app.post('/api/planets', planetsController.create);
app.put('/api/planets/:id', planetsController.updateById);
app.delete('/api/planets/:id', planetsController.deleteById);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
