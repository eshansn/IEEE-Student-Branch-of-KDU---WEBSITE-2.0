import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export const connectDatabase = async (): Promise<void> => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    // If no MongoDB URI is provided or it's localhost, use in-memory MongoDB
    if (!mongoUri || mongoUri.includes('localhost')) {
      console.log('🔄 Starting MongoDB Memory Server...');
      
      // Start in-memory MongoDB server
      mongoServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'kdu_ieee',
          port: 27017,
        },
      });
      
      mongoUri = mongoServer.getUri();
      console.log('✅ MongoDB Memory Server started');
    }

    // Connect to MongoDB
    const connection = await mongoose.connect(mongoUri);
    
    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    console.log(`📊 Database Name: ${connection.connection.name}`);

    // Create indexes for better performance
    await createIndexes();

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Create indexes for projects collection
    await db.collection('projects').createIndex({ title: 'text', description: 'text' });
    await db.collection('projects').createIndex({ category: 1 });
    await db.collection('projects').createIndex({ createdAt: -1 });
    
    // Create indexes for memories collection
    await db.collection('memories').createIndex({ title: 'text', description: 'text' });
    await db.collection('memories').createIndex({ createdAt: -1 });
    
    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.log('⚠️  Index creation warning:', error.message);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    
    if (mongoServer) {
      await mongoServer.stop();
      console.log('✅ MongoDB Memory Server stopped');
    }
    
    console.log('✅ Database disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🔄 Gracefully shutting down...');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Gracefully shutting down...');
  await disconnectDatabase();
  process.exit(0);
});
