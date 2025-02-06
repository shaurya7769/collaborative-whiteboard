
// frontend/pages/api/getSession.js
import db from '../../backend/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get the session ID from the query parameters
    const { sessionId } = req.query;

    try {
      // Retrieve session data from the database
      const session = await db.get(
        'SELECT * FROM sessions WHERE session_id = ?',
        [sessionId]
      );

      if (session) {
        // Return the session data
        return res.status(200).json({ sessionId: session.session_id, data: JSON.parse(session.data) });
      } else {
        return res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving session', error: error.message });
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
