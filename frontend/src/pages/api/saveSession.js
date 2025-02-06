// frontend/pages/api/saveSession.js
import db from '../../backend/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle saving session data
    const { sessionId, whiteboardData } = req.body;

    try {
      // Save the session to the database
      const result = await db.run(
        'INSERT INTO sessions (session_id, data) VALUES (?, ?)',
        [sessionId, JSON.stringify(whiteboardData)]
      );

      return res.status(200).json({ message: 'Session saved successfully', id: result.lastID });
    } catch (error) {
      return res.status(500).json({ message: 'Error saving session', error: error.message });
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
