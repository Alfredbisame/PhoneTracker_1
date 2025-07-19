import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/api/phone-validate', async (req, res) => {
  const { phone } = req.query;
  const apiKey = process.env.VITE_IPQS_API_KEY;
  if (!phone || !apiKey) {
    return res.status(400).json({ error: 'Missing phone or API key' });
  }
  try {
    const url = `https://www.ipqualityscore.com/api/json/phone/${apiKey}/${encodeURIComponent(phone)}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from IPQualityScore' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});