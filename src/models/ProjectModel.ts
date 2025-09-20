import { model, models, Schema } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const projectModel = new Schema({
    name: { type: String, required: true },
    months: { type: Number, required: true },
    value: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// 2. Create a Model.
export default models.Project || model('Project', projectModel);