const express = require('express');
const Contact = require('../../models/Models/Contact');

const router = express.Router();

// Route: POST /contacts — Add a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route: GET /contacts — Fetch all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
