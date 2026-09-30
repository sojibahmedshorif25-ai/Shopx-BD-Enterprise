import mongoose from 'mongoose';
import dns from 'dns';

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore DNS config warnings
}

export const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ [MongoDB] Connected successfully: ${conn.connection.host}`);
    
    // Ensure Super Admin sojibahmedshorif25@gmail.com exists with password Sojibboss@321946##
    try {
      const { User } = await import('../models/User.js');
      const adminEmail = 'sojibahmedshorif25@gmail.com';
      let admin = await User.findOne({ email: adminEmail }).select('+password');
      if (!admin) {
        admin = await User.create({
          name: 'Sojib Ahmed (Super Admin)',
          email: adminEmail,
          password: 'Sojibboss@321946##',
          role: 'admin',
          phone: '01942791004',
          isVerified: true,
          isActive: true,
          loyaltyCoins: 10000,
        });
        console.log(`👑 [Super Admin] Initialized primary Super Admin account: ${adminEmail}`);
      } else {
        admin.role = 'admin';
        admin.password = 'Sojibboss@321946##';
        admin.isVerified = true;
        admin.isActive = true;
        await admin.save();
        console.log(`👑 [Super Admin] Verified and updated credentials for: ${adminEmail}`);
      }
    } catch (e: any) {
      console.warn(`⚠️ [Super Admin Init] ${e.message}`);
    }
  } catch (error: any) {
    console.error(`❌ [MongoDB] Connection error: ${error.message}`);
  }
};
