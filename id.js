import pool from '@/lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  if (req.method === 'PATCH') {
    const { status } = req.body;  // Status (Pending, In Progress, Delivered)

    // Update the status of the order
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length > 0) {
      // Return the updated order
      res.status(200).json(result.rows[0]);
    } else {
      // If order not found, return 404
      res.status(404).json({ message: 'Order not found' });
    }
  }
}
