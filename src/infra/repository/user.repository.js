const { ObjectId } = require("mongoose").Types;

class UserRepository {
  userModel = {};

  constructor(userModel) {
    this.userModel = userModel;
  }

  async findById(id) {
    return this.userModel.findOne({ _id: ObjectId(id) });
  }

  async findAll() {
    return this.userModel.find();
  }

  async findByEmail(email) {
    return this.userModel.findOne({ email });
  }

  async save(user) {
    const result = await this.userModel.create(user);
    return result.save();
  }

  async update(user) {
    return this.userModel.findByIdAndUpdate({ _id: ObjectId(user._id) }, user);
  }

  async delete(id) {
    return this.userModel.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = UserRepository;
