import mongoose from 'mongoose'
const connectDB  = async()=>{
     try {
    const con = await mongoose.connect('mongodb://localhost:27017/Monitoring', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
export default connectDB;