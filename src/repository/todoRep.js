import api from "../services/api.js";

const TodoRepository = {
  async getAll() {
    return await api('/todo');
  },
  async getById(id) {
    return await api(`/todo/${id}`);
  },
  async create(data) {
    return await api('/todo', {
      method: 'POST',
      body: JSON.stringify({
        description: data
      })
    });
  },
  async update(id, complete) {
    return await api(`/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed: complete
      })
    });
  },
  async remove(id) {
    return await api(`/todo/${id}`, {
      method: 'DELETE'
    });
  }
};

export default TodoRepository;