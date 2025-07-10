const Client = require('../../models/Models/Client');
const { imageUploadUtil } = require('../../helpers/cloudinary');

// Upload image for client
const handleClientImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
    });
  }
};

// Add a new client
const addClient = async (req, res) => {
  try {
    const { name, designation, description, image } = req.body;

    const newClient = new Client({
      name,
      designation,
      description,
      image,
    });

    await newClient.save();

    res.status(201).json({
      success: true,
      data: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred while adding client',
    });
  }
};

// Get all clients
const fetchAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred while fetching clients',
    });
  }
};

// Edit a client
const editClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description, image } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    client.name = name || client.name;
    client.designation = designation || client.designation;
    client.description = description || client.description;
    client.image = image || client.image;

    await client.save();

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred while editing client',
    });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred while deleting client',
    });
  }
};

module.exports = {
  handleClientImageUpload,
  addClient,
  fetchAllClients,
  editClient,
  deleteClient,
};
