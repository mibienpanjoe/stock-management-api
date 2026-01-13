const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');
const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Access from Android emulator: http://10.0.2.2:${PORT}`);
  console.log(`🌐 Access from localhost: http://localhost:${PORT}`);
  console.log(`💻 Access from network: http://<your-local-ip>:${PORT}`);
});