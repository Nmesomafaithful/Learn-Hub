import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      role: "Head of Education",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Instructor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    {
      name: "David Park",
      role: "Technology Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
      name: "Jennifer Martinez",
      role: "Community Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer"
    },
    {
      name: "Alex Turner",
      role: "Content Strategist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-background py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-glow animate-fade-up">About LearnHub</h1>
          <p className="text-xl max-w-3xl mx-auto text-foreground/80 animate-fade-up-delay-1">
            Empowering learners worldwide with accessible, high-quality education
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mb-4 glow" />
                <h3 className="text-xl font-bold mb-3 text-glow">Our Mission</h3>
                <p className="text-muted-foreground">
                  To democratize education by making high-quality learning accessible to everyone, everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
              <CardContent className="pt-6">
                <Eye className="h-12 w-12 text-primary mb-4 glow" />
                <h3 className="text-xl font-bold mb-3 text-glow">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the world's leading platform for lifelong learning and professional development.
                </p>
              </CardContent>
            </Card>

            <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-2">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mb-4 glow" />
                <h3 className="text-xl font-bold mb-3 text-glow">Our Values</h3>
                <p className="text-muted-foreground">
                  Excellence, accessibility, innovation, and community are at the heart of everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2020, LearnHub was born from a simple yet powerful idea: education should be accessible to everyone, regardless of their location, background, or financial situation.
              </p>
              <p>
                What started as a small team of passionate educators has grown into a thriving community of over 50,000 students and 100+ expert instructors from around the world. Our platform hosts more than 500 courses covering a wide range of topics, from technology and business to creative arts and personal development.
              </p>
              <p>
                Today, we're proud to be a leader in online education, continuously innovating to provide the best learning experience possible. Our commitment to quality, accessibility, and student success remains unwavering as we work towards our vision of empowering learners worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate professionals dedicated to transforming education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:glow transition-all duration-500 glass neon-border animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="h-32 w-32 rounded-full mx-auto mb-4 bg-muted"
                  />
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Why Choose LearnHub?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing the best learning experience possible
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of real-world experience"
              },
              {
                icon: Target,
                title: "Practical Learning",
                description: "Hands-on projects and real-world applications in every course"
              },
              {
                icon: Eye,
                title: "Flexible Schedule",
                description: "Learn at your own pace, anytime, anywhere with lifetime access"
              },
              {
                icon: Heart,
                title: "Community Support",
                description: "Join a vibrant community of learners and get help when you need it"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass neon-border hover:glow transition-all duration-500 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 glow" />
                  <h3 className="text-lg font-bold mb-2 text-glow">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-up">
              <div className="text-5xl font-bold mb-2 text-glow">500+</div>
              <div className="text-foreground/80">Courses</div>
            </div>
            <div className="animate-fade-up-delay-1">
              <div className="text-5xl font-bold mb-2 text-glow">50K+</div>
              <div className="text-foreground/80">Students</div>
            </div>
            <div className="animate-fade-up-delay-2">
              <div className="text-5xl font-bold mb-2 text-glow">100+</div>
              <div className="text-foreground/80">Instructors</div>
            </div>
            <div className="animate-fade-up-delay-3">
              <div className="text-5xl font-bold mb-2 text-glow">95%</div>
              <div className="text-foreground/80">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Our Core Values</h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Excellence",
                  description: "We strive for excellence in everything we do, from course content to student support. Our commitment to quality ensures you receive the best education possible."
                },
                {
                  title: "Accessibility",
                  description: "Education should be accessible to everyone. We break down barriers and make learning possible for people from all walks of life, regardless of location or background."
                },
                {
                  title: "Innovation",
                  description: "We continuously innovate our platform and teaching methods to stay at the forefront of online education, incorporating the latest technologies and pedagogical approaches."
                },
                {
                  title: "Community",
                  description: "Learning is better together. We foster a supportive community where students can connect, collaborate, and grow together on their educational journey."
                }
              ].map((value, index) => (
                <Card key={index} className="glass neon-border hover:glow transition-all duration-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 text-glow">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
