const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        });
        
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit with failure
    }
}

module.exports = connectDB;