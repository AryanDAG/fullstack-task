const express = require('express');
const multer = require('multer');
const {
  handleProjectImageUpload,
  addProject,
  fetchAllProjects,
  editProject,
  deleteProject,
} = require('../../controllers/admin/projectController');

const router = express.Router();
const upload = multer();

// Route: POST /projects/upload — optional Cloudinary image upload
router.post('/upload', upload.single('file'), handleProjectImageUpload);

// Route: GET /projects — fetch all projects
router.get('/', fetchAllProjects);

// Route: POST /projects — add new project
router.post('/', addProject);

// Route: PUT /projects/:id — edit project by ID
router.put('/:id', editProject);

// Route: DELETE /projects/:id — delete project by ID
router.delete('/:id', deleteProject);

module.exports = router;
