import express from 'express';
import Joi from 'joi';
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

app.get('/api/planets', (req, res) => {
    res.json(planets);
});

app.get('/api/planets/:id', (req, res) => {
    const planetId = parseInt(req.params.id);
    const planet = planets.find(p => p.id === planetId);

    console.log(planetId);
    console.log(planet);

    if (!planet) {
        return res.status(404).json({ error: 'Planet not found' });
    }

    res.json(planet);
});

app.post('/api/planets', (req, res) => {
    const newPlanet: Planet = req.body;

    const { error } = validatePlanet(newPlanet);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    planets.push(newPlanet);
    res.status(201).json({ msg: 'Planet created successfully' });
});

app.put('/api/planets/:id', (req, res) => {
    const planetId = parseInt(req.params.id);
    const planetIndex = planets.findIndex(p => p.id === planetId);

    if (planetIndex === -1) {
        return res.status(404).json({ error: 'Planet not found' });
    }

    const updatedPlanet: Planet = req.body;

    const { error } = validatePlanet(updatedPlanet);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    planets[planetIndex] = updatedPlanet;
    res.json({ msg: 'Planet updated successfully' });
});

app.delete('/api/planets/:id', (req, res) => {
    const planetId = parseInt(req.params.id);
    const planetIndex = planets.findIndex(p => p.id === planetId);

    if (planetIndex === -1) {
        return res.status(404).json({ error: 'Planet not found' });
    }

    planets.splice(planetIndex, 1);
    res.json({ msg: 'Planet deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});