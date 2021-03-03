import { Schema, model } from "mongoose";
import videoSchema from "./schema/video.schema";

const classesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    date: { type: Date },
    recordingDate: { type: Date },
    songAndArtist: { type: String },
    staffComments: { type: String },
    videoForAiring: { type: String },
    videoForSneakPeek: { type: String },
    sdate: { type: String },
    duration: { type: String },
    difficulty: { type: String },
    tags: { type: [String] },
    description: { type: String },
    status: { type: String },
    videos: { type: [videoSchema] },
    previewVideos: { type: [videoSchema] },
    classType: { type: String },
    danceClassType: { type: String },
    isFeatured: { type: Boolean, default: false },
    bookmarkedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    completedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
    isTransCoding: { type: Boolean, default: false },
    isTransCodingSneakPeek: { type: Boolean, default: false },
    videoForAiringThumbUrl: { type: String },
    videoForSneakPeekThumbUrl: { type: String },
    videoForAiringFile: { type: Object },
    videoForSneakPeekFile: { type: Object },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);
const Classes = new model("Classes", classesSchema);

export default Classes;
