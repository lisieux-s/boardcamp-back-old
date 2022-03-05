import db from '../db.js'

export async function createCategory(req, res) {
    const category = req.body;

    try {
        const result = await db.query(`
        SELECT * FROM categories
            WHERE name=$1
        `, [category.name]);
        if (result.rowCount > 0) {
            return res.status(409).send('Categoria já criada');
        }
        await db.query(`
        INSERT INTO
            categories (name)
            VALUES ($1)
        `, [category.name]);

        res.sendStatus(201); 

    } catch (err) {
        res.status(500).send(err);
    }  

}

export async function getCategories(req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM categories`)

        res.send(result.rows)

    } catch (err) {
        res.status(500).send(err);
    }
}