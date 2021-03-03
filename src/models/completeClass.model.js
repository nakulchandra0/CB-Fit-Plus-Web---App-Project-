import { Schema, model } from "mongoose";

const completeClassSchema = new Schema(
  {
    classId: { type: Schema.Types.ObjectId, ref: "Classes" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date },
    classType: { type: String, enum: ["COMPLETE", "BOOK"] },
  },
  { versionKey: false, timestamps: true }
);

const completeClass = model("CompleteClass", completeClassSchema);

export default completeClass;
