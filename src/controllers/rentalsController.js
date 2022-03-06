import dayjs from 'dayjs';
import db from '../db.js';

export async function createRental(req, res) {
  const rental = req.body;

  try {
    const gameData = await db.query(`
    SELECT * FROM games WHERE id=$1
    `, [rental.gameId])
    
    const originalPrice = gameData.rows[0].pricePerDay*rental.daysRented
    await db.query(
      `
        INSERT INTO
            rentals (
                "customerId", 
                "gameId", 
                "rentDate", 
                "daysRented", 
                "returnDate", 
                "originalPrice",
                "delayFee"
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
      [
          rental.customerId, 
          rental.gameId,
          dayjs().format('DD/MM/YYYY'), 
          rental.daysRented,
          rental.returnDate,
          originalPrice,
          rental.delayFee
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

export async function getRentals(req, res) {
  try {
    const result = await db.query(`
        SELECT * FROM rentals`);

    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateRental() {}

export async function deleteRental() {}
