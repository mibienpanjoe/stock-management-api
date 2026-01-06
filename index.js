const express = require('express');

const app = express();

const PORT = 3000;

app.get('/api/health', (req, res) => { res.status(200).json({
status: 'API is running'});
});

app.listen(PORT, () => {
console.log('Server running on port ' + PORT); });