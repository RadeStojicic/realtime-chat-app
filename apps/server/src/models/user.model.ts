import moongose from "mongoose";

const userSchema = new moongose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlegth: 8,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

const User = moongose.model("User", userSchema);

export default User;