import db from '../db.js';

export async function createGame(req, res) {
    const game = req.body;
    console.log(game)

    try {
        const result = await db.query(`
        SELECT * FROM games
            WHERE name=$1
        `, [game.name]);
        if (result.rowCount > 0) {
            return res.status(409).send('Jogo já criado');
        }
        await db.query(`
        INSERT INTO
            games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)
        `, [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay]);

        res.sendStatus(201); 

    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }  

}

export async function getGames(req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM games`)

        console.log(result.rows)
        res.send(result.rows)

    } catch (err) {
        res.status(500).send(err);
    }
}