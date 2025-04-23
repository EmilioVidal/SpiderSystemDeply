const bcrypt = require('bcryptjs');

const password = 'Santos_2008';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error generando hash:", err);
  } else {
    console.log("Hash generado:", hash);
  }
});