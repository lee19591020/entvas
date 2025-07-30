import mongoose from "mongoose"


const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  userData: {
    name: { type: String, required: true }
  },
  dateAdded: {
    type: Number,
    default: () => Date.now(),
  },
});

const locationCollection = mongoose.model("Location", locationSchema);
export default locationCollection;
