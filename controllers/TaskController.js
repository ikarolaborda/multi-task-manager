const { Task, Project } = require('../models');

class TaskController {
    // Visualize tasks for a project
    static async getAll(req, res) {
        try {
            const { projectId } = req.params;
            const project = await Project.findOne({ where: { id: projectId, userId: req.userId } });

            if (!project) {
                return res.status(404).json({ message: 'Project not found or unauthorized' });
            }

            const tasks = await Task.findAll({ where: { projectId } });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add a task
    static async add(req, res) {
        try {
            const { projectId } = req.params;
            const project = await Project.findOne({ where: { id: projectId, userId: req.userId } });

            if (!project) {
                return res.status(404).json({ message: 'Project not found or unauthorized' });
            }

            const { description, finishDate } = req.body;
            const task = await Task.create({ description, projectId, finishDate });
            res.status(201).json(task);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Edit a task
    static async edit(req, res) {
        try {
            const { taskId } = req.params;
            const { description, finishDate } = req.body;
            await Task.update({ description, finishDate }, { where: { id: taskId } });
            res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Remove a task
    static async remove(req, res) {
        try {
            const { taskId } = req.params;
            await Task.destroy({ where: { id: taskId } });
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mark task as completed
    static async markAsCompleted(req, res) {
        try {
            const { taskId } = req.params;
            await Task.update({ status: 'completed' }, { where: { id: taskId } });
            res.status(200).json({ message: 'Task marked as completed' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TaskController;