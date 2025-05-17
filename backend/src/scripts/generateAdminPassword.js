const bcrypt = require('bcrypt');

async function generatePassword() {
  const password = 'adminYezu123';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);
}

generatePassword();

// INSERT INTO users (name, email, password, role)
// VALUES (
//   'Celia Ineza',
//   'admin@park.com',
//   '$2b$10$qSRacNTaBOEQRJZrt6C2auBKkgGCrvvzRQbQsnzpg.c1Pv4fm/cuO',
//   'admin'
// );