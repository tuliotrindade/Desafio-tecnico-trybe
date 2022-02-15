const { ObjectID } = require('mongodb');
const connection = require('./connect');

const createTask = async (name, description, status) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('tasks').insertOne({ name, description, status }));
  return { _id: insertedId, name, status, description };
};


const getTasks = async () => {
  const find = await connection()
    .then((db) => db.collection('tasks').find({}).toArray());
  return find;
};

const updateTask = async (id, infos) => {
  const { name, description, status } = infos;
  await connection()
    .then((db) => db
      .collection('tasks')
      .updateOne({ _id: ObjectID(id) }, { $set: { name, description, status } }));
  return { _id: id, name, description, status };
};

const deleteTask = async (id) => {
  if (ObjectID.isValid(id)) {
    const deletedTask = await connection()
      .then((db) => db
        .collection('tasks')
        .deleteOne({ _id: ObjectID(id) }));
    return deletedTask;
  }
  return null;
};

module.exports = { createTask, getTasks, updateTask, deleteTask };