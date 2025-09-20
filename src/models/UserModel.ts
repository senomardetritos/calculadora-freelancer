import { model, models, Schema } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hours_per_day: Number,
    days_per_week: Number,
    profit: Number,
    avatar: String
});

// 2. Create a Model.
export default models.User || model('User', userSchema);