import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student',
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this; // doc

  // hashing the password and save into db
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set password empty string after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// set password empty string after findOne password
userSchema.post('findOne', function (doc, next) {
  if (doc) {
    doc.password = '';
  }
  next();
});

// set password empty string after find password
userSchema.post('find', function (docs, next) {
  if (docs && docs.length) {
    docs.forEach((doc: TUser) => {
      doc.password = '';
    });
  }
  next();
});

export const UserModel = model<TUser>('User', userSchema);
