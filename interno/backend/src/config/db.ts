import mongoose from mongoose;

export async function connect(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI || mongodb://127.0.0.1:27017/interno;
  mongoose.set(strictQuery, true);
  return mongoose.connect(uri);
}
