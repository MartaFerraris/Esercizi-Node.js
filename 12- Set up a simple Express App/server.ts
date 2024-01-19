import express from 'express';
import Joi from 'joi';
import dotenv from 'dotenv'
import pgPromise from 'pg-promise';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const db = pgPromise()("postgres://postgres:250394@localhost:5432/esercizio")

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const setupDb = async () => {
    await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        image BYTEA
    );
  `);

    await db.none(`INSERT INTO planets (name, image) VALUES ('Earth', NULL)`);
    await db.none(`INSERT INTO planets (name, image) VALUES ('Mars', NULL)`);

    const planets = await db.many(`SELECT * FROM planets;`);
    console.log(planets);
};
setupDb();

type Planet = {
    id: number;
    name: string;
    image?: Buffer; // Using Buffer to store image data
};

type Planets = Planet[];

app.use(express.json());

/* Middleware di validazione per Joi */
const validatePlanet = (planet: Planet) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().required(),
    });

    return schema.validate(planet);
};

app.post('/api/planets/:id/image', upload.single('image'), async (req: any, res) => {
    const planetId = parseInt(req.params.id);

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageBuffer = req.file.buffer;

        await db.none('UPDATE planets SET image=$1 WHERE id=$2', [imageBuffer, planetId]);
        res.json({ msg: 'Planet image uploaded successfully' });
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});