import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertificateDocument extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  certificateId: string;
  grade: string;
  issuedAt: Date;
}

const CertificateSchema = new Schema<ICertificateDocument>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    certificateId: { type: String, required: true, unique: true },
    grade: { type: String, default: "A" },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

CertificateSchema.index({ student: 1, course: 1 }, { unique: true });

export const Certificate: Model<ICertificateDocument> =
  mongoose.models.Certificate ||
  mongoose.model<ICertificateDocument>("Certificate", CertificateSchema);
