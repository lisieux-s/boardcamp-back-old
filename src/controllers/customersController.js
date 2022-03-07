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

export async function updateCustomer(req, res) {
    const id = req.params.id;
    const customer = req.body;

    try {
        const result = await db.query(`
        SELECT customers
        WHERE cpf=$1
        `, [customer.cpf])
        if (result.rowCount > 0) {
            if (result.rows[0].id !== id) {
                return res.status(409).send('CPF já está em uso')
            }
        }


        await db.query(`
        UPDATE customers
            SET name=$1,
                phone=$2,
                cpf=$3,
                birthday=$4
        WHERE id=$5
        `, [customer.name, customer.phone, customer.cpf, customer.birthday, 
            id])
    } catch (err) {
        res.status(500).send(err)
    }
}

export async function createCustomer(req, res) {
    const customer = req.body;

    try {
        const result = await db.query(`
        SELECT * FROM customers
            WHERE cpf=$1
        `, [customer.cpf]);
        if (result.rowCount > 0) {
            return res.status(409).send('Cliente já existente');
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