import express, { Request, Response } from 'express';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Assuming you've set up resolveJsonModule in tsconfig.json

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

app.use(express.json());

// Sample route to test server
app.get('/', (req: Request, res: Response) => {
  res.send('Node.js backend for Health App is running');
});

// Protected route using Firebase authentication
app.post('/api/protected', async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ message: 'Protected data', uid: decodedToken.uid });
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
