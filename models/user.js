import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, required: true },
  lastLogin: Date,
  createdOn: { type: Date, default: Date.now() },
});

UserSchema.pre('save', function (next) {
  const user = this;
  // if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next();
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
