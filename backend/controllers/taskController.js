const taskModels = require('../models/taskModel')

const createTask = async (req, res) => {
  const { name, description, status } = req.body;
  const create = await taskModels.createTask(name, description, status);
  if (create.err) {
    return res
      .status(422)
      .json({ err: { code: create.err.code, message: create.err.message } });
  }
  return res.status(201).json(create);
};

const getTasks = async (_req, res) => {
  const allProducts = await taskModels.getTasks();
  return res.status(200).json({ tasks: allProducts });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const itens = { name, description, status };
  const updated = await taskModels.updateTask(id, itens);
  return res.status(200).json(updated);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await taskModels.deleteTask(id);
  if (deleted.err) {
    return res
      .status(422)
      .json({ err: { code: deleted.err.code, message: deleted.err.message } });
  }
  return res.status(200).json(deleted);
};

module.exports = { createTask, getTasks, updateTask, deleteTask }