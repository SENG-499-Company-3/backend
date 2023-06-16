module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      email: String,
      password: String,
      name: String,
      role: String,
      token: String
    },
    { timestamps: true, unique: true }
  );

  schema.method('toJSON', function () {
    // eslint-disable-next-line no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model('user', schema);
  return User;
};
