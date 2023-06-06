export class TodoService {
  constructor(options) {
    this.options = options;
    this.Model = options.Model; // Access the Mongoose model
  }

  async find(params) {
    try {
      const { userId } = params.user;
      const todos = await this.Model.find({ user: userId });

      if (todos.length === 0) {
        throw new Error('No TODOs found for the user.');
      }

      return todos;
    } catch (error) {
      throw new Error('Error occurred while finding TODOs.');
    }
  }

  async get(id, _params) {
    try {
      const { userId } = _params.user;

      return await this.Model.findOne({ _id: id, user: userId });
    } catch (error) {
      throw new Error('Error occurred while getting the TODO.');
    }
  }

  async create(data, params) {
    try {
      const { userId } = params.user;
      data.user = userId;
      return await this.Model.create(data);
    } catch (error) {
      throw new Error('Error occurred while creating the TODO.');
    }
  }

  async update(id, data, _params) {
    try {
      const { userId } = _params.user;
      const todo = await this.Model.findOne({ _id: id, user: userId });

      if (!todo) {
        throw new Error('TODO not found or user is not the owner.');
      }

      return await this.Model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error('Error occurred while updating the TODO.');
    }
  }

  async patch(id, data, _params) {
    try {
      const { userId } = _params.user;
      const todo = await this.Model.findOne({ _id: id, user: userId });

      if (!todo) {
        throw new Error('TODO not found or user is not the owner.');
      }

      return await this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (error) {
      throw new Error('Error occurred while patching the TODO.');
    }
  }

  async remove(id, _params) {
    console.log(_params)
    try {
      const { userId } = _params.user;
      const todo = await this.Model.findOne({ _id: id, user: userId });

      if (!todo) {
        throw new Error('TODO not found or user is not the owner.');
      }

      return await this.Model.findByIdAndRemove(id);
    } catch (error) {
      throw new Error('Error occurred while removing the TODO.');
    }
  }
}

export const getOptions = (app) => {
  return { app };
};
