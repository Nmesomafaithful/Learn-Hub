import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-background py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-glow animate-fade-up">Get In Touch</h1>
          <p className="text-xl max-w-2xl mx-auto text-foreground/80 animate-fade-up-delay-1">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-glow">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How do I enroll in a course?",
                  answer: "Simply browse our course catalog, select a course that interests you, and click 'Enroll Now'. You can pay securely and start learning immediately."
                },
                {
                  question: "Do I get a certificate?",
                  answer: "Yes! Upon completing a course, you'll receive a certificate of completion that you can share on LinkedIn and add to your resume."
                },
                {
                  question: "Can I access courses on mobile?",
                  answer: "Absolutely! LearnHub is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Learn anywhere, anytime."
                },
                {
                  question: "What if I'm not satisfied?",
                  answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your course, contact us within 30 days for a full refund."
                },
                {
                  question: "How long do I have access to courses?",
                  answer: "You have lifetime access to all courses you enroll in. Learn at your own pace and revisit materials whenever you need."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass neon-border">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 text-glow">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-primary mb-3 glow" />
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground text-sm">
                    123 Learning Street<br />
                    Education District<br />
                    San Francisco, CA 94102
                  </p>
                </CardContent>
              </Card>

              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-primary mb-3 glow" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground text-sm">
                    +1 (555) 123-4567<br />
                    Mon-Fri: 9am - 6pm PST
                  </p>
                </CardContent>
              </Card>

              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-2">
                <CardContent className="pt-6">
                  <Mail className="h-8 w-8 text-primary mb-3 glow" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm">
                    support@learnhub.com<br />
                    info@learnhub.com
                  </p>
                </CardContent>
              </Card>

              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-3">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-glow">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full glow hover:glow-strong transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="mt-6 glass neon-border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0197478630514!2d-122.41941168468177!3d37.77492927975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="glass neon-border">
              <CardHeader>
                <CardTitle className="text-glow text-center">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Customer Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p className="text-sm text-muted-foreground mb-2">Saturday: 10:00 AM - 4:00 PM PST</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Technical Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">Available 24/7 via email</p>
                    <p className="text-sm text-muted-foreground mb-2">Response time: Within 24 hours</p>
                    <p className="text-sm text-muted-foreground">Emergency support: Available for enrolled students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
