import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';

type Planet = {
    id: number,
    name: string,
};

type Planets = Planet[];

let planets: Planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];

dotenv.config()
const app = express()
const port = process.env.PORT || 3000;

/* middleware posizionati prima delle routes */

app.use(express.json());
app.use(morgan('dev'));
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'internal error 500' });
});

/* Routes */

app.get('/planets', (req, res) => {
    res.json(planets)
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})