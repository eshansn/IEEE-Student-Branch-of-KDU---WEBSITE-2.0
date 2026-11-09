import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

// Load environment variables
dotenv.config();

const sampleProjects = [
  // Completed Projects
  {
    title: 'Envision 2.0',
    year: '2024',
    description: 'To imagine or expect something to happen or appear in a certain way in the future is to envision it. Envision 2.0 brought together students and industry professionals to explore future technologies and career opportunities.',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    category: 'Vision & Innovation',
    participants: '250+',
    images: ['/images/projects/envision.png'],
    galleryImages: ['/images/projects/envision.png'],
    detailedDescription: 'Envision 2.0 was a flagship event that brought together students, faculty, and industry professionals to explore emerging technologies and future career opportunities. The event featured keynote speeches, panel discussions, workshops, and networking sessions. Participants gained insights into cutting-edge technologies like AI, blockchain, IoT, and their applications in various industries.'
  },
  {
    title: 'IEEE Day 2024',
    year: '2024',
    description: 'Annual celebration of IEEE Day with various technical and cultural activities to promote IEEE values and achievements among students.',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    category: 'Cultural & Technical',
    participants: '400+',
    images: ['/images/projects/ideate360.jpg'],
    galleryImages: ['/images/projects/ideate360.jpg'],
    detailedDescription: 'IEEE Day 2024 was celebrated with great enthusiasm, featuring a variety of technical presentations, cultural performances, and interactive sessions. The event highlighted IEEE\'s contributions to technology and society. Activities included technical paper presentations, innovation showcases, cultural performances, and awards ceremonies.'
  },
  {
    title: 'Step into Industry 3.0',
    year: '2024',
    description: 'The latest iteration of our flagship industry connection program, bringing together students and industry professionals for meaningful networking.',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    category: 'Industry Connect',
    participants: '300+',
    images: ['/images/projects/stpeintoindustry3.0.png'],
    galleryImages: ['/images/projects/stpeintoindustry3.0.png'],
    detailedDescription: 'Step into Industry 3.0 successfully connected over 300 students with leading industry professionals from various sectors including software development, engineering, finance, and consulting. The program featured company presentations, one-on-one mentoring sessions, resume workshops, and interview preparation sessions.'
  },
  {
    title: 'Xtreme 18.0',
    year: '2024',
    description: 'IEEE Xtreme programming competition bringing together talented programmers to solve challenging algorithmic problems in a 24-hour marathon.',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    category: 'Competition',
    participants: '180+',
    images: ['/images/projects/jambor.png'],
    galleryImages: [
      '/images/projects/jambor.png',
      '/images/Exco/2024/G.W.Ravindu Gajasinghe.jpg',
      '/images/Exco/2024/pasindu.jpeg',
      '/images/Exco/2024/pulathisi.jpeg',
      '/images/Exco/2024/sahan_dankelewaththa.jpg'
    ],
    detailedDescription: 'IEEE Xtreme 18.0 was a thrilling 24-hour programming competition that challenged participants to solve complex algorithmic problems. Teams of up to 3 students competed globally, testing their programming skills, problem-solving abilities, and teamwork. Our KDU teams performed exceptionally well, with several teams ranking in the top percentile globally. The event fostered competitive programming culture and provided valuable experience for participants aspiring to excel in software development careers.'
  },

  // Ongoing Projects
  {
    title: 'SkillBridge 25 Phase 2',
    year: '2025',
    description: 'Ongoing intermediate-level peer mentoring program where senior students conduct online teaching sessions for junior students in various technical domains.',
    status: 'Ongoing',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    category: 'Education & Mentoring',
    participants: '150+',
    images: [],
    galleryImages: [],
    detailedDescription: 'SkillBridge 25 Phase 2 is currently in full swing, with senior students conducting regular online sessions covering intermediate-level topics in programming, web development, data structures, algorithms, and software engineering principles. The program includes weekly live sessions, recorded tutorials, practice assignments, and one-on-one mentoring. Participants receive certificates upon completion and have shown significant improvement in their technical skills. The program has been highly successful with positive feedback from both mentors and mentees.'
  },
  {
    title: 'Xtreme 19.0',
    year: '2025',
    description: 'Preparation and participation in the upcoming IEEE Xtreme 19.0 global programming competition with intensive training sessions.',
    status: 'Ongoing',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    category: 'Competition',
    participants: '200+',
    images: [],
    galleryImages: [],
    detailedDescription: 'Preparation for IEEE Xtreme 19.0 is underway with weekly training sessions focusing on algorithmic problem-solving, competitive programming techniques, and team coordination. The program includes practice contests, algorithm workshops, and mentoring by previous Xtreme participants. Teams are being formed and trained with the goal of achieving even better results than last year.'
  },

  // Upcoming Projects
  {
    title: 'SkillBridge 25 Phase 3',
    year: '2025',
    description: 'Advanced mentoring program where senior students teach and guide junior students in specialized technical skills through comprehensive online sessions.',
    status: 'Upcoming',
    gradient: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    category: 'Education & Mentoring',
    participants: '200+',
    images: [],
    galleryImages: [],
    detailedDescription: 'SkillBridge 25 Phase 3 is an innovative peer-to-peer learning initiative where experienced senior students serve as mentors and instructors for junior students. This phase focuses on advanced technical skills including advanced programming, system design, project management, and industry best practices. The program features structured online sessions, hands-on workshops, project-based learning, and career guidance. Mentors are carefully selected based on their academic performance and industry experience, ensuring high-quality knowledge transfer.'
  },
  {
    title: 'IEEE Day 2025',
    year: '2025',
    description: 'Next year\'s IEEE Day celebration with expanded technical sessions, innovation showcases, and community engagement activities.',
    status: 'Upcoming',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    category: 'Cultural & Technical',
    participants: '500+',
    images: [],
    galleryImages: [],
    detailedDescription: 'IEEE Day 2025 promises to be our biggest celebration yet, with an expanded program of technical sessions, innovation showcases, and community engagement activities. The event will feature international speakers, cutting-edge technology demonstrations, student research presentations, and cultural performances. We\'re planning interactive workshops on emerging technologies, career fairs with leading tech companies, and networking sessions for students, faculty, and industry professionals. The celebration aims to strengthen the IEEE community and inspire the next generation of engineers and technologists.'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to database...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kdu_ieee';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to database');

    // Clear existing data
    console.log('🗑️ Clearing existing projects...');
    await Project.deleteMany({});
    
    // Insert sample projects
    console.log('📝 Adding sample projects...');
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Added ${insertedProjects.length} projects`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Projects: ${insertedProjects.length}`);
    console.log(`   - Completed: ${insertedProjects.filter(p => p.status === 'Completed').length}`);
    console.log(`   - Ongoing: ${insertedProjects.filter(p => p.status === 'Ongoing').length}`);
    console.log(`   - Upcoming: ${insertedProjects.filter(p => p.status === 'Upcoming').length}`);

    console.log('\n🔗 Access your admin panel:');
    console.log('   URL: http://localhost:3002');
    console.log('   Email: admin@ieeekdu.org');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();
