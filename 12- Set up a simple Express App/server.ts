import express from 'express';
import Joi from 'joi';
import dotenv from 'dotenv'
import pgPromise from 'pg-promise';

const db = pgPromise()("postgres://postgres:250394@localhost:5432/esercizio")

const setupDb = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        );
    `)

    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)

    const planets = await db.many(`SELECT * FROM planets;`)
    console.log(planets);
}
setupDb()

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

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* Middleware di validazione per Joi */
const validatePlanet = (planet: Planet) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().required(),
    });

    return schema.validate(planet);
};

/* Routes */

app.get('/api/planets', async (req, res) => {
    const dbPlanets = await db.many(`SELECT * FROM planets;`);
    res.json(dbPlanets);
});

app.get('/api/planets/:id', async (req, res) => {
    const planetId = parseInt(req.params.id);

    try {
        const dbPlanet = await db.oneOrNone('SELECT * FROM planets WHERE id = $1', [planetId]);

        if (!dbPlanet) {
            return res.status(404).json({ error: 'Planet not found' });
        }

        res.json(dbPlanet);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/planets', async (req, res) => {
    const newPlanet: Planet = req.body;
    const { error } = validatePlanet(newPlanet);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        await db.none('INSERT INTO planets (name) VALUES ($1)', [newPlanet.name]);
        res.status(201).json({ msg: 'Planet created successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/planets/:id', async (req, res) => {
    const planetId = parseInt(req.params.id);
    const updatedPlanet: Planet = req.body;

    const { error } = validatePlanet(updatedPlanet);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        await db.none('UPDATE planets SET name=$1 WHERE id=$2', [updatedPlanet.name, planetId]);
        res.json({ msg: 'Planet updated successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/planets/:id', async (req, res) => {
    const planetId = parseInt(req.params.id);

    try {
        await db.none('DELETE FROM planets WHERE id=$1', [planetId]);
        res.json({ msg: 'Planet deleted successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});