module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: String,
      password: String,
      token: String
    },
    { timestamps: true }
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
