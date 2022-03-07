import db from '../db.js';

export async function createGame(req, res) {
    const game = req.body;

    try {
        const result = await db.query(`
        SELECT * FROM games
            WHERE name=$1
        `, [game.name]);
        if (result.rowCount > 0) {
            return res.status(409).send('Jogo já criado');
        }

        const existingCategory = await db.query(`
        SELECT * FROM categories
            WHERE id=$1
        `, [game.categoryId])
        if (existingCategory.rowCount === 0) return res.sendStatus(400)

        await db.query(`
        INSERT INTO
            games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)
        `, [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay]);

        res.sendStatus(201); 

    } catch (err) {
        res.status(500).send(err);
    }  

}

export async function getGames(req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM games`)

        res.send(result.rows)

    } catch (err) {
        res.status(500).send(err);
    }
}