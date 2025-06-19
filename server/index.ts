import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/generate-game', (req, res) => {
  const data = req.body;
  const html = `<html><body><h1>Generated Game</h1><pre>${JSON.stringify(data)}</pre></body></html>`;
  res.json({ html });
});

app.post('/api/preview', (req, res) => {
  const data = req.body;
  const html = `<html><body><h1>Preview</h1><pre>${JSON.stringify(data)}</pre></body></html>`;
  res.json({ html });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
