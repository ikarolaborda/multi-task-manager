const { Project } = require('../models');

class ProjectController {
    // Visualize user projects
    static async getAll(req, res) {
        try {
            const userId = req.userId; // Get user ID from JWT middleware
            const projects = await Project.findAll({ where: { userId } });
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add a project
    static async add(req, res) {
        try {
            const userId = req.userId;
            const { name } = req.body;
            const project = await Project.create({ name, userId });
            res.status(201).json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Edit a project
    static async edit(req, res) {
        try {
            const { projectId } = req.params;
            const { name } = req.body;
            await Project.update({ name }, { where: { id: projectId, userId: req.userId } });
            res.status(200).json({ message: 'Project updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Remove a project
    static async remove(req, res) {
        try {
            const { projectId } = req.params;
            await Project.destroy({ where: { id: projectId, userId: req.userId } });
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectController;
