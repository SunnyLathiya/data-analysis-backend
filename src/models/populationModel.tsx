import { Schema, Document, model } from "mongoose";

export interface Population extends Document {
    females: number;
    country: string;
    age: number;
    males: number;
    year: number;
    total: number;
}

const populationSchema: Schema = new Schema({
    females: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      males: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
});

export default model<Population>("Population", populationSchema);