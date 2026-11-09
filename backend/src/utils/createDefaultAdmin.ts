import User from '../models/User';

export const createDefaultAdmin = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminUser = await User.create({
        username: 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@ieeekdu.org',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin',
        isActive: true
      });
      
      console.log('✅ Default admin user created');
      console.log('📧 Email:', adminUser.email);
      console.log('🔐 Password: Check your .env file');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin user:', error);
  }
};
