export const userRoleSchema = { type: String, enum: ['TEACHER', 'ADMIN'], default: 'TEACHER' };

export const userSchema = {
  email: String,
  password: String,
  name: String,
  role: userRoleSchema,
  token: { type: String, default: '' }
};

module.exports = (mongoose) => {
  var schema = mongoose.Schema(userSchema, { timestamps: true, unique: true });

  schema.method('toJSON', function () {
    // eslint-disable-next-line no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model('user', schema);
  return User;
};
