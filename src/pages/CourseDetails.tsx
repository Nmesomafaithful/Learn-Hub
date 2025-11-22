import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Users, Star, CheckCircle, BookOpen, Award, CreditCard, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === Number(id));
  const [enrollmentStep, setEnrollmentStep] = useState<"info" | "payment" | "success">("info");
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    agreeToTerms: false
  });

  const handleEnrollClick = () => {
    setShowEnrollmentDialog(true);
    setEnrollmentStep("info");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate payment data
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardName) {
      toast.error("Please fill in all payment details");
      return;
    }
    if (!paymentData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    // Simulate payment processing
    setTimeout(() => {
      setEnrollmentStep("success");
      toast.success("Payment processed successfully!");
    }, 1500);
  };

  const handleEnrollmentComplete = () => {
    setShowEnrollmentDialog(false);
    setEnrollmentStep("info");
    toast.success(`Successfully enrolled in ${course?.title}!`);
    navigate("/dashboard");
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <Link to="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-background py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-up">
              <Badge variant="secondary" className="mb-4 glow">{course.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">{course.title}</h1>
              <p className="text-xl mb-6 text-foreground/80">{course.fullDescription}</p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 animate-fade-up-delay-1">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                  alt={course.instructor}
                  className="h-12 w-12 rounded-full glow"
                />
                <div>
                  <div className="font-semibold">Instructor</div>
                  <div className="text-foreground/80">{course.instructor}</div>
                </div>
              </div>
            </div>

            <Card className="lg:sticky lg:top-24 glass neon-border hover:glow-strong transition-all duration-500 animate-fade-up-delay-2">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-4 text-glow">
                  {course.isFree ? "FREE" : `$${course.price}`}
                </div>
                {course.isFree ? (
                  <Link to={`/learn/${course.id}`}>
                    <Button 
                      size="lg" 
                      className="w-full mb-3 glow hover:glow-strong transition-all duration-300"
                    >
                      Start Learning Free
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full mb-3 glow hover:glow-strong transition-all duration-300"
                      onClick={handleEnrollClick}
                    >
                      Enroll Now
                    </Button>
                    <Button size="lg" variant="outline" className="w-full neon-border hover:glow transition-all duration-300">Add to Wishlist</Button>
                  </>
                )}
                
                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">All Levels</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">English</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary glow" />
                    <span className="text-glow">What You'll Learn</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary glow" />
                    <span className="text-glow">Course Curriculum</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.curriculum.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium">{item.module}</span>
                        </div>
                        <Badge variant="secondary">{item.lessons} lessons</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-2">
                <CardHeader>
                  <CardTitle className="text-glow">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Instructor Info */}
            <div className="space-y-6">
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-glow">About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                      alt={course.instructor}
                      className="h-16 w-16 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-lg">{course.instructor}</div>
                      <div className="text-sm text-muted-foreground">Expert Instructor</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Industry professional with over 10 years of experience. Passionate about teaching and helping students achieve their goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
                <CardHeader>
                  <CardTitle className="text-glow">Share this course</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Facebook</Button>
                    <Button variant="outline" size="sm" className="flex-1">Twitter</Button>
                    <Button variant="outline" size="sm" className="flex-1">LinkedIn</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollmentDialog} onOpenChange={setShowEnrollmentDialog}>
        <DialogContent className="sm:max-w-[600px] glass neon-border">
          {enrollmentStep === "info" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-glow">Enroll in {course.title}</DialogTitle>
                <DialogDescription>
                  Review your course details and proceed to payment
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Course</span>
                      <span className="font-semibold">{course.title}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Instructor</span>
                      <span className="font-semibold">{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary text-glow">${course.price}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Lifetime access to course materials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Access to course community</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEnrollmentDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => setEnrollmentStep("payment")}
                  className="glow hover:glow-strong"
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}

          {enrollmentStep === "payment" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-glow">Payment Information</DialogTitle>
                <DialogDescription>
                  Secure payment powered by industry-leading encryption
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      className="pl-10"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        className="pl-10"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="paymentTerms"
                    checked={paymentData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setPaymentData({ ...paymentData, agreeToTerms: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="paymentTerms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the payment terms and conditions
                  </label>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${course.price}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary text-glow">${course.price}</span>
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEnrollmentStep("info")}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    className="glow hover:glow-strong"
                  >
                    Complete Enrollment
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}

          {enrollmentStep === "success" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-glow">Enrollment Successful!</DialogTitle>
                <DialogDescription>
                  You're all set! Start learning right away.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-6 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Welcome to {course.title}!</h3>
                <p className="text-muted-foreground mb-6">
                  You now have lifetime access to all course materials. Start your learning journey today!
                </p>
                
                <div className="space-y-2 mb-6 text-left bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Course materials unlocked</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Access to course community</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Certificate available upon completion</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  onClick={handleEnrollmentComplete}
                  className="w-full glow hover:glow-strong"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CourseDetails;
