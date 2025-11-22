import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, CheckCircle, Users, Award, TrendingUp, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Join = () => {
  const navigate = useNavigate();
  const { login, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions!");
      return;
    }

    // For demo purposes - in production, integrate with backend
    const success = await login(formData.email, formData.password);
    if (success) {
      // Update profile with name
      updateProfile({ name: formData.name });
      toast.success("Account created successfully! Welcome to LearnHub!");
      navigate("/dashboard");
    }
  };

  const benefits = [
    {
      icon: BookOpen,
      title: "Access to 500+ Courses",
      description: "Learn from industry experts across multiple domains"
    },
    {
      icon: Award,
      title: "Earn Certificates",
      description: "Get recognized certificates upon course completion"
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Connect with thousands of learners worldwide"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Advance your career with in-demand skills"
    }
  ];

  const features = [
    "Lifetime access to all courses",
    "Download course materials",
    "Mobile and desktop access",
    "Expert instructor support",
    "Progress tracking",
    "Certificate of completion",
    "30-day money-back guarantee",
    "Cancel anytime"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-background py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow animate-fade-up">
              Join LearnHub for Free
            </h1>
            <p className="text-xl text-foreground/80 mb-8 animate-fade-up-delay-1">
              Start your learning journey today. Access free courses and unlock your potential.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Signup Form */}
            <div className="lg:col-span-2">
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-glow">Create Your Free Account</CardTitle>
                  <CardDescription>
                    Join thousands of learners already on LearnHub
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreeToTerms: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full glow hover:glow-strong transition-all duration-300"
                    >
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary hover:underline font-medium">
                        Sign in
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
                <CardHeader>
                  <CardTitle className="text-glow">What You Get</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features List */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-2">
                <CardHeader>
                  <CardTitle className="text-glow">Free Account Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
              Join Thousands of Happy Learners
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our community has to say
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                role: "Web Developer",
                content: "LearnHub changed my career. The free courses got me started, and I've never looked back!",
                rating: 5
              },
              {
                name: "Michael T.",
                role: "Data Analyst",
                content: "Best decision I made. Free access to quality education is a game-changer.",
                rating: 5
              },
              {
                name: "Emily R.",
                role: "Designer",
                content: "The community support and free resources are incredible. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="glass neon-border hover:glow transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-foreground/80 max-w-2xl mx-auto">
            Join LearnHub today and get instant access to free courses. No credit card required.
          </p>
          <Link to="#signup">
            <Button size="lg" className="text-lg px-8 glow-strong hover:scale-105 transition-all duration-300">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;

