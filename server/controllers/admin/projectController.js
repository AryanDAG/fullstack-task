const Project = require('../../models/Models/Project');
const { imageUploadUtil } = require('../../helpers/cloudinary');

// Upload image (if needed)
const handleProjectImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
    });
  }
};

// Create a new project
const addProject = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const newProject = new Project({
      name,
      description,
      image,
    });

    await newProject.save();
    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to add project',
    });
  }
};

// Get all projects
const fetchAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
};

// Edit a project
const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.image = image || project.image;

    await project.save();
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
    });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
    });
  }
};

module.exports = {
  handleProjectImageUpload,
  addProject,
  fetchAllProjects,
  editProject,
  deleteProject,
};
