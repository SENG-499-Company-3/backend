const User = mongoose.model('user', {
  email: String,
  password: String,
  name: String,
  role: { type: String, enum: ['TEACHER', 'ADMIN'], default: 'TEACHER' },
  token: String
});

User.create(
  {
    email: '123@gmail.com',
    password: '$2b$10$S7I99H65bLTIlrbFxpG6MuElBAe8k.tcEe9SXAJdd7bK3DXA1Q1oC',
    name: 'John Doe',
    role: 'TEACHER',
    token: ''
  },
  function (err, users) {
    if (err) throw err;
    console.log(users + '\n-- users inserted successfully');
  }
);
