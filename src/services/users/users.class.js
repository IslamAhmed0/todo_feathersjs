export class UsersService {
  constructor(options) {
    this.options = options;
    this.Model = options.Model; // Access the Mongoose model
  }

  async find(_params) {
    try {
      return await this.Model.find({});
    } catch (error) {
      console.error('Error occurred while finding users:', error);
      throw new Error('Failed to retrieve users');
    }
  }

  async get(id, _params) {
    try {
      return await this.Model.findById(id);
    } catch (error) {
      console.error('Error occurred while getting user:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  async create(data, params) {
    console.log(data);
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    try {
      const createdData = await this.Model.create(data);
      return createdData.toObject();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create data');
    }
  }

  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    };
  }

  async patch(id, data, _params) {
    try {
      const updatedData = await this.Model.findByIdAndUpdate(id, data, { new: true });
      return updatedData.toObject();
    } catch (error) {
      console.error(`Error occurred while updating user with ID ${id}:`, error);
      throw new Error('Failed to update user');
    }
  }

  async remove(id, _params) {
    try {
      const user = await this.Model.findById(id);

      if (!user) {
        return `User with ID ${id} not found.`
      }

      return await this.Model.findByIdAndRemove(id);

    } catch (error) {
      console.error(`Error occurred while removing user with ID ${id}:`, error);
      throw new Error('Failed to remove user');
    }
  }


}

export const getOptions = (app) => {
  return { app };
};
