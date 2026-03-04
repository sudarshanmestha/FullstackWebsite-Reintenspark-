'use client';

import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'dsa',
      title: "Algorithms & Data Structures for Beginners",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
      slug: "dsa-for-beginners"
    },
    {
      id: 'data-science',
      title: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      slug: "data-science"
    },
    {
      id: 'agentic-ai',
      title: "Agentic AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      slug: "agentic-ai"
    },
    {
      id: 'django',
      title: "Python Django",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&q=80",
      slug: "python-django"
    }
  ];

  const courses = [
    // DSA Courses
    {
      id: 1,
      title: "Arrays & Hashing Fundamentals",
      slug: "arrays-hashing",
      description: "Master the fundamentals of arrays and hashing. Learn essential data structures including arrays, hash tables, and hash maps. Perfect for beginners starting their DSA journey.",
      difficulty: "Beginner",
      category: "dsa",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      id: 2,
      title: "Two Pointers Technique",
      slug: "two-pointers",
      description: "Learn the two pointers technique to solve array and string problems efficiently. Master patterns like sliding window, fast and slow pointers.",
      difficulty: "Beginner",
      category: "dsa",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"
    },
    {
      id: 3,
      title: "Binary Search Mastery",
      slug: "binary-search",
      description: "Deep dive into binary search algorithms. Learn to implement binary search and solve complex problems using this powerful technique.",
      difficulty: "Intermediate",
      category: "dsa",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      id: 4,
      title: "Dynamic Programming",
      slug: "dynamic-programming",
      description: "Master dynamic programming concepts from scratch. Learn memoization, tabulation, and solve complex optimization problems efficiently.",
      difficulty: "Advanced",
      category: "dsa",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80"
    },

    // Data Science Courses
    {
      id: 5,
      title: "Python for Data Science",
      slug: "python-data-science",
      description: "Learn Python programming specifically for data science. Master NumPy, Pandas, and essential libraries for data analysis and manipulation.",
      difficulty: "Beginner",
      category: "data-science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      id: 6,
      title: "Machine Learning Fundamentals",
      slug: "ml-fundamentals",
      description: "Introduction to machine learning concepts. Learn supervised and unsupervised learning, model training, and evaluation techniques.",
      difficulty: "Intermediate",
      category: "data-science",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
    },
    {
      id: 7,
      title: "Data Visualization with Python",
      slug: "data-visualization",
      description: "Master data visualization using Matplotlib, Seaborn, and Plotly. Create compelling visualizations to communicate insights effectively.",
      difficulty: "Beginner",
      category: "data-science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },

    // Agentic AI Courses
    {
      id: 8,
      title: "Introduction to Agentic AI",
      slug: "intro-agentic-ai",
      description: "Learn the fundamentals of agentic AI systems. Understand autonomous agents, decision-making, and AI-driven automation.",
      difficulty: "Intermediate",
      category: "agentic-ai",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      id: 9,
      title: "Building AI Agents with LangChain",
      slug: "langchain-agents",
      description: "Build powerful AI agents using LangChain. Learn to create autonomous systems that can reason, plan, and execute tasks.",
      difficulty: "Advanced",
      category: "agentic-ai",
      image: "https://images.unsplash.com/photo-1676277791608-ac3b5a78a4ed?w=800&q=80"
    },
    {
      id: 10,
      title: "Multi-Agent Systems",
      slug: "multi-agent-systems",
      description: "Design and implement multi-agent systems. Learn how multiple AI agents can collaborate and communicate to solve complex problems.",
      difficulty: "Advanced",
      category: "agentic-ai",
      image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80"
    },

    // Django Courses
    {
      id: 11,
      title: "Django for Beginners",
      slug: "django-beginners",
      description: "Start your Django journey from scratch. Learn the basics of Django framework and build your first web application step by step.",
      difficulty: "Beginner",
      category: "django",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80"
    },
    {
      id: 12,
      title: "Django REST Framework",
      slug: "django-rest-framework",
      description: "Master building RESTful APIs with Django REST Framework. Learn serializers, viewsets, authentication, and API best practices.",
      difficulty: "Intermediate",
      category: "django",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
    },
    {
      id: 13,
      title: "Advanced Django Patterns",
      slug: "advanced-django",
      description: "Learn advanced Django concepts including custom middleware, signals, caching strategies, and performance optimization techniques.",
      difficulty: "Advanced",
      category: "django",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      id: 14,
      title: "Django Deployment & DevOps",
      slug: "django-deployment",
      description: "Learn to deploy Django applications to production. Master Docker, CI/CD pipelines, monitoring, and scaling strategies.",
      difficulty: "Advanced",
      category: "django",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80"
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#fbbf24';
      case 'Advanced': return '#ef4444';
      default: return '#888888';
    }
  };

  return (
    <div style={{ backgroundColor: '#202225', minHeight: '100vh', color: '#e1e1e1' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#2f3136', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem' }}>
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/pricing" className="font-medium" style={{ color: '#c3c3c3' }}>Pricing</a>
              <a href="/login" className="font-medium" style={{ color: '#c3c3c3' }}>Login</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        {/* Page Header */}
        <div className="flex flex-col space-y-4 pt-6 pb-8">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: '#e1e1e1' }}>
            Courses
          </h1>
          <p className="text-xl" style={{ color: '#c3c3c3' }}>
            Master Data Structures & Algorithms from basics to advanced. Build strong problem-solving skills.
          </p>
        </div>

        {/* Course Category Cards Section */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '5px', marginBottom: '2rem', width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
          {/* All Courses Card */}
          <div
            onClick={() => setSelectedCategory('all')}
            className="cursor-pointer"
            style={{
              backgroundColor: selectedCategory === 'all' ? '#3a3a3a' : '#2f3136',
              borderRadius: '8px',
              overflow: 'hidden',
              minWidth: '280px',
              maxWidth: '280px',
              border: selectedCategory === 'all' ? '2px solid #627eff' : '1px solid #3a3a3a',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '208px'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== 'all') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p style={{ marginBottom: '0', fontWeight: 600, fontSize: '18px', color: '#e1e1e1', lineHeight: '1.4' }}>
                All Courses
              </p>
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#888888' }}>
                {courses.length} courses
              </p>
            </div>
          </div>

          {/* Category Cards */}
          {categories.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCategory(card.id)}
              className="cursor-pointer"
              style={{
                backgroundColor: selectedCategory === card.id ? '#3a3a3a' : '#2f3136',
                borderRadius: '8px',
                overflow: 'hidden',
                minWidth: '280px',
                maxWidth: '280px',
                border: selectedCategory === card.id ? '2px solid #627eff' : '1px solid #3a3a3a',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== card.id) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '10px', paddingTop: '8px', paddingBottom: '12px' }}>
                <p style={{ marginBottom: '0', fontWeight: 600, fontSize: '14px', color: '#e1e1e1', lineHeight: '1.4' }}>
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Filter Badge */}
        {selectedCategory !== 'all' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <span 
              style={{ 
                backgroundColor: '#2f3136', 
                color: '#627eff', 
                padding: '6px 12px', 
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                border: '1px solid #3a3a3a'
              }}
            >
              Showing {filteredCourses.length} {categories.find(c => c.id === selectedCategory)?.title} courses
            </span>
          </div>
        )}

        {/* Divider */}
        <hr style={{ borderColor: '#3a3a3a', margin: '2rem 0' }} />

        {/* Courses Grid */}
        <div className="grid gap-10">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <article key={course.id} className="flex flex-col space-y-2">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Course Info */}
                  <div>
                    <a href={`/courses/${course.slug}`}>
                      <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#e1e1e1' }}>
                        {course.title}
                      </h2>
                    </a>
                    <p className="mt-2" style={{ color: '#c3c3c3', lineHeight: '1.6' }}>
                      {course.description}
                    </p>
                    
                    {/* Difficulty Badge */}
                    <div className="mt-4 flex items-center space-x-2">
                      <BarChart3 
                        className="h-4 w-4" 
                        style={{ color: getDifficultyColor(course.difficulty) }} 
                      />
                      <span className="text-sm" style={{ color: '#c3c3c3' }}>
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Start Button */}
                    <div className="mt-4 flex items-center space-x-3">
                      <a 
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2"
                        style={{
                          backgroundColor: '#2f3136',
                          border: '1px solid #3a3a3a',
                          color: '#e1e1e1'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3a3a3a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#2f3136';
                        }}
                      >
                        Start
                      </a>
                    </div>
                  </div>

                  {/* Course Image */}
                  <div className="group relative">
                    <img
                      alt={course.title}
                      width="804"
                      height="452"
                      className="rounded-md border transition-colors"
                      src={course.image}
                      style={{ 
                        borderColor: '#3a3a3a',
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                      }}
                    />
                    <a 
                      href={`/courses/${course.slug}`}
                      className="absolute inset-0"
                    >
                      <span className="sr-only">View Course</span>
                    </a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#888888' }}>
              <p style={{ fontSize: '18px' }}>No courses found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;