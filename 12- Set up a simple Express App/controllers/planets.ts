import { Request, Response } from 'express';
import {db} from "../db";

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

export const getAll = (req: Request, res: Response) => {
    res.json(planets);
};

export const getOneById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);
    const planet = planets.find(p => p.id === planetId);

    if (!planet) {
        return res.status(404).json({ error: 'Planet not found' });
    }

    res.json(planet);
};

export const create = (req: Request, res: Response) => {
    const newPlanet: Planet = req.body;

    if (!newPlanet.id || !newPlanet.name) {
        return res.status(400).json({ error: 'Invalid planet data' });
    }

    planets.push(newPlanet);
    res.status(201).json({ msg: 'Planet created successfully' });
};

export const createImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fileName = req.file?.path;

    if (fileName) {
        db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
        res.status(201).json({ msg: "Planet image uploaded" });
    } else {
        res.status(400).json({ msg: "Planet uploading failed" });
    }
}


export const updateById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);
    const updatedPlanet: Planet = req.body;

    const index = planets.findIndex(p => p.id === planetId);

    if (index === -1) {
        return res.status(404).json({ error: 'Planet not found' });
    }

    planets[index] = { ...planets[index], ...updatedPlanet };
    res.json({ msg: 'Planet updated successfully' });
};

export const deleteById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);

    planets = planets.filter(p => p.id !== planetId);
    res.json({ msg: 'Planet deleted successfully' });
};