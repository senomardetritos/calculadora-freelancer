import { MongoDB } from "@/lib/mongodb";
import { model, models, Schema } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const expenseModel = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// 2. Create a Model.
if (!models.Expense) model('Expense', expenseModel);
const mongoose = await MongoDB()
export default mongoose.model('Expense')