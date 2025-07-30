import mongoose from "mongoose"


const usersSchema = new mongoose.Schema({
    username: { type: String, required: false},
    password: { type: String, required: false},
    email: { type: String, required: true},
    fname: { type: String, required: true},
    lname: { type: String, required: true},
    imageData: { type: String, required: true },
    ext: { type: String, required: true },
});

const adminCollection = mongoose.model('Admin', usersSchema);

export default adminCollection

