import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, User, ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes - in production, integrate with email service
    toast.success("Thank you for subscribing to our newsletter!");
    setNewsletterEmail("");
  };

  const filteredPosts = blogPosts.filter(post =>
    (selectedCategory === "All" || post.category === selectedCategory) &&
    (searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-glow animate-fade-up">Our Blog</h1>
          <p className="text-xl max-w-2xl mx-auto text-foreground/80 animate-fade-up-delay-1">
            Insights, tips, and inspiration for your learning journey
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={selectedCategory === category ? "glow" : "neon-border hover:glow"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && selectedCategory === "All" && searchQuery === "" && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-glow">Featured Article</h2>
            <Card className="glass neon-border hover:glow transition-all duration-500 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto overflow-hidden relative">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary">{blogPosts[0].category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-2xl mb-3 line-clamp-2">{blogPosts[0].title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${blogPosts[0].id}`} className="mt-6">
                    <Button className="w-full glow hover:glow-strong transition-all duration-300">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <>
              <div className="mb-6 text-muted-foreground">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === "All" && searchQuery === "" ? filteredPosts.slice(1) : filteredPosts).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:glow transition-all duration-500 glass neon-border animate-fade-up">
                    <div className="aspect-video overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="outline" className="w-full neon-border hover:glow transition-all duration-300">Read More</Button>
                        </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No articles found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto glass neon-border hover:glow transition-all duration-500">
            <CardContent className="pt-6 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4 glow" />
              <h2 className="text-2xl font-bold mb-2 text-glow">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest articles, course updates, and learning tips delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="glow hover:glow-strong transition-all duration-300">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-glow">Popular Topics</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Web Development",
              "Data Science",
              "UI/UX Design",
              "Digital Marketing",
              "Mobile Development",
              "Business Strategy",
              "Machine Learning",
              "Cloud Computing"
            ].map((topic, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm neon-border hover:glow cursor-pointer transition-all duration-300"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
