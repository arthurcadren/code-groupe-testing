const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // temporaire

router.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  users.push({ email: req.body.email, password: hashed });
  res.status(201).json({ message: 'Utilisateur créé' });
});

router.post('/login', async (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ error: 'Identifiants invalides' });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;