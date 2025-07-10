const express = require('express');
const multer = require('multer');
const { editClient, handleClientImageUpload, addClient, fetchAllClients, deleteClient } = require('../../controllers/admin/clientController');


const router = express.Router();
const upload = multer();

// Route: POST /clients/upload — upload image for client (e.g., to Cloudinary)
router.post('/upload', upload.single('file'), handleClientImageUpload);

// Route: POST /clients — create a new client
router.post('/', addClient);

// Route: GET /clients — fetch all clients
router.get('/', fetchAllClients);

// Route: PUT /clients/:id — update a client by ID
router.put('/:id', editClient);

// Route: DELETE /clients/:id — delete a client by ID
router.delete('/:id', deleteClient);

module.exports = router;
