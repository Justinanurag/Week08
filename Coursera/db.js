import mongoose, { Schema } from "mongoose";

// ✅ Database Connection
export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI;

    if (!MONGO_URI) {
      throw new Error("❌ MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(`${MONGO_URI}/Coursera`);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); 
  }
};

const ObjectId = mongoose.Schema.Types.ObjectId;

// ✅ User Schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
});

// ✅ Admin Schema
const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
});

// ✅ Course Schema
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imageUrl: String,
  creatorId: mongoose.Schema.Types.ObjectId,
});

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" // optional if you need user details later
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course" // 🔥 this must match your course model name
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});


// ✅ Export Models
export const userModel = mongoose.model("user", userSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
