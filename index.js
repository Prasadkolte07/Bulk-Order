import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all orders from the database
    const { rows } = await pool.query('SELECT * FROM orders');
    res.status(200).json(rows);
  }
}
