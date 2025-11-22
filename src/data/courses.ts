export const courses = [
  {
    id: 0,
    title: "Introduction to Web Development - FREE",
    description: "Start your coding journey with this free introductory course. Learn HTML, CSS, and JavaScript basics to build your first website!",
    category: "Web Development",
    price: 0,
    duration: "8 hours",
    students: 45230,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    instructor: "Sarah Johnson",
    fullDescription: "This FREE course is perfect for absolute beginners who want to start their web development journey. You'll learn the fundamentals of HTML, CSS, and JavaScript by building real projects. No prior experience needed!",
    isFree: true,
    whatYouWillLearn: [
      "HTML5 structure and semantic elements",
      "CSS styling and layout techniques",
      "JavaScript basics and DOM manipulation",
      "Building your first responsive website",
      "Best practices for clean code",
      "Introduction to modern web development tools"
    ],
    requirements: [
      "No prior experience required",
      "A computer with internet connection",
      "A text editor (we'll show you free options)",
      "Enthusiasm to learn!"
    ],
    curriculum: [
      { module: "Getting Started with HTML", lessons: 4 },
      { module: "Styling with CSS", lessons: 5 },
      { module: "JavaScript Fundamentals", lessons: 6 },
      { module: "Building Your First Project", lessons: 3 }
    ],
    lessons: [
      {
        id: 1,
        title: "Welcome to Web Development",
        type: "video",
        duration: "15 min",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video - replace with actual
        description: "Introduction to web development and what you'll learn in this course."
      },
      {
        id: 2,
        title: "HTML Basics: Structure Your Content",
        type: "video",
        duration: "20 min",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Learn HTML tags, elements, and how to structure a webpage."
      },
      {
        id: 3,
        title: "HTML Practice: Build a Simple Page",
        type: "reading",
        duration: "30 min",
        content: "Practice building your first HTML page with hands-on exercises.",
        readingMaterial: "Complete HTML5 Reference Guide - Chapter 1-3"
      },
      {
        id: 4,
        title: "CSS Basics: Make It Beautiful",
        type: "video",
        duration: "25 min",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Introduction to CSS, selectors, and styling your HTML."
      },
      {
        id: 5,
        title: "CSS Layouts and Flexbox",
        type: "video",
        duration: "30 min",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Learn modern CSS layout techniques with Flexbox."
      },
      {
        id: 6,
        title: "JavaScript: Adding Interactivity",
        type: "video",
        duration: "35 min",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Introduction to JavaScript and making your pages interactive."
      },
      {
        id: 7,
        title: "JavaScript Practice: Interactive Elements",
        type: "reading",
        duration: "45 min",
        content: "Practice JavaScript with interactive exercises and mini-projects.",
        readingMaterial: "JavaScript Basics Workbook - Exercises 1-10"
      },
      {
        id: 8,
        title: "Build Your First Website: Portfolio Project",
        type: "project",
        duration: "2 hours",
        content: "Combine everything you've learned to build a personal portfolio website.",
        readingMaterial: "Project Guide: Building Your Portfolio Website"
      }
    ]
  },
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master web development from scratch with HTML, CSS, JavaScript, React, and Node.js",
    category: "Web Development",
    price: 89.99,
    duration: "40 hours",
    students: 15420,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    instructor: "Sarah Johnson",
    fullDescription: "This comprehensive bootcamp will take you from beginner to advanced in web development. Learn modern technologies and build real-world projects.",
    whatYouWillLearn: [
      "HTML5, CSS3, and JavaScript fundamentals",
      "Modern React.js development",
      "Node.js and Express backend",
      "Database design with MongoDB",
      "RESTful API development",
      "Deployment and DevOps basics"
    ],
    requirements: [
      "Basic computer skills",
      "Willingness to learn",
      "A computer with internet connection"
    ],
    curriculum: [
      { module: "Introduction to Web Development", lessons: 8 },
      { module: "HTML & CSS Fundamentals", lessons: 12 },
      { module: "JavaScript Essentials", lessons: 15 },
      { module: "React.js Development", lessons: 20 },
      { module: "Backend with Node.js", lessons: 18 },
      { module: "Final Project", lessons: 5 }
    ]
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, email campaigns, and content strategy",
    category: "Marketing",
    price: 79.99,
    duration: "30 hours",
    students: 12350,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    instructor: "Michael Chen",
    fullDescription: "Master digital marketing strategies that drive real results. Learn from industry experts and apply your skills to real campaigns.",
    whatYouWillLearn: [
      "SEO optimization techniques",
      "Social media marketing strategies",
      "Email marketing campaigns",
      "Content marketing fundamentals",
      "Analytics and reporting",
      "Paid advertising on Google and Facebook"
    ],
    requirements: [
      "Basic understanding of marketing concepts",
      "Access to social media platforms",
      "Willingness to experiment and learn"
    ],
    curriculum: [
      { module: "Digital Marketing Foundations", lessons: 6 },
      { module: "SEO Mastery", lessons: 10 },
      { module: "Social Media Marketing", lessons: 12 },
      { module: "Email Marketing", lessons: 8 },
      { module: "Content Strategy", lessons: 10 },
      { module: "Analytics & Optimization", lessons: 8 }
    ]
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Comprehensive Python course covering data analysis, visualization, and machine learning",
    category: "Data Science",
    price: 99.99,
    duration: "50 hours",
    students: 18900,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    instructor: "Dr. Emily Rodriguez",
    fullDescription: "Dive deep into Python for data science. Learn to analyze data, create visualizations, and build machine learning models.",
    whatYouWillLearn: [
      "Python programming fundamentals",
      "NumPy and Pandas for data manipulation",
      "Data visualization with Matplotlib and Seaborn",
      "Statistical analysis techniques",
      "Machine learning with Scikit-learn",
      "Real-world data science projects"
    ],
    requirements: [
      "Basic programming knowledge helpful but not required",
      "Computer with Python installed",
      "Interest in data and analytics"
    ],
    curriculum: [
      { module: "Python Basics", lessons: 10 },
      { module: "Data Manipulation with Pandas", lessons: 15 },
      { module: "Data Visualization", lessons: 12 },
      { module: "Statistical Analysis", lessons: 10 },
      { module: "Machine Learning Fundamentals", lessons: 18 },
      { module: "Capstone Project", lessons: 8 }
    ]
  },
  {
    id: 4,
    title: "UX/UI Design Essentials",
    description: "Learn user experience design, interface design, and prototyping with industry tools",
    category: "Design",
    price: 84.99,
    duration: "35 hours",
    students: 10200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    instructor: "Alex Turner",
    fullDescription: "Master the art and science of UX/UI design. Create beautiful, user-friendly interfaces that delight users.",
    whatYouWillLearn: [
      "UX research and user testing",
      "Wireframing and prototyping",
      "UI design principles",
      "Figma and Adobe XD mastery",
      "Design systems and components",
      "Mobile and responsive design"
    ],
    requirements: [
      "Interest in design",
      "Computer with design software",
      "Creative mindset"
    ],
    curriculum: [
      { module: "UX Fundamentals", lessons: 8 },
      { module: "User Research", lessons: 10 },
      { module: "Wireframing & Prototyping", lessons: 12 },
      { module: "Visual Design Principles", lessons: 10 },
      { module: "Design Tools Mastery", lessons: 15 },
      { module: "Portfolio Project", lessons: 6 }
    ]
  },
  {
    id: 5,
    title: "Business Management Fundamentals",
    description: "Essential skills for managing teams, projects, and growing businesses",
    category: "Business",
    price: 69.99,
    duration: "25 hours",
    students: 8750,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    instructor: "David Park",
    fullDescription: "Learn the core principles of business management. From team leadership to strategic planning, this course covers it all.",
    whatYouWillLearn: [
      "Leadership and team management",
      "Strategic planning and execution",
      "Financial management basics",
      "Project management methodologies",
      "Communication and negotiation",
      "Business growth strategies"
    ],
    requirements: [
      "Interest in business and management",
      "No prior experience required",
      "Openness to learning new concepts"
    ],
    curriculum: [
      { module: "Management Foundations", lessons: 6 },
      { module: "Leadership Skills", lessons: 8 },
      { module: "Strategic Planning", lessons: 10 },
      { module: "Financial Management", lessons: 8 },
      { module: "Project Management", lessons: 10 },
      { module: "Growth Strategies", lessons: 6 }
    ]
  },
  {
    id: 6,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android using React Native",
    category: "Mobile Development",
    price: 94.99,
    duration: "45 hours",
    students: 13600,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    instructor: "Jennifer Martinez",
    fullDescription: "Create native mobile applications for both iOS and Android using React Native. Build real apps and publish them to app stores.",
    whatYouWillLearn: [
      "React Native fundamentals",
      "Mobile UI/UX patterns",
      "Navigation and routing",
      "API integration and data management",
      "Native modules and plugins",
      "App deployment to stores"
    ],
    requirements: [
      "Basic JavaScript knowledge",
      "Familiarity with React is helpful",
      "Computer with development environment"
    ],
    curriculum: [
      { module: "React Native Basics", lessons: 10 },
      { module: "Components & Styling", lessons: 12 },
      { module: "Navigation", lessons: 8 },
      { module: "State Management", lessons: 10 },
      { module: "API Integration", lessons: 12 },
      { module: "Deployment", lessons: 6 }
    ]
  }
];

export const categories = [
  "All",
  "Web Development",
  "Marketing",
  "Data Science",
  "Design",
  "Business",
  "Mobile Development"
];
