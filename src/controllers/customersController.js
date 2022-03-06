import db from '../db.js'

export async function getCustomer(req, res) {
    const id = req.params.id;
    try {
        const result = await db.query(`
            SELECT * FROM customers WHERE id=$1
        `, [id]);
        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }
        res.send(result.rows[0])

    } catch (err) {
        res.status(500).send(err);
    }
}

export async function updateCustomer() {}

export async function createCustomer(req, res) {
    const customer = req.body;

    try {
        const result = await db.query(`
        SELECT * FROM customers
            WHERE cpf=$1
        `, [customer.cpf]);
        if (result.rowCount > 0) {
            return res.status(409).send('Jogo já criado');
        }
        await db.query(`
        INSERT INTO
            customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)
        `, [customer.name, customer.phone, customer.cpf, customer.birthday]);

        res.sendStatus(201); 

    } catch (err) {
        res.status(500).send(err);
    }  

}

export async function getCustomers(req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM customers`)

        res.send(result.rows)

    } catch (err) {
        res.status(500).send(err);
    }
}