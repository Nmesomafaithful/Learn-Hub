import { useState, useMemo, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { courses, categories } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Star } from "lucide-react";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  
  // Get max price for slider
  const maxPrice = useMemo(() => Math.max(...courses.map(c => c.price)), []);

  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [durationFilter, setDurationFilter] = useState("all");

  // Update price range when maxPrice is calculated
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // Parse duration to hours for filtering
  const parseDuration = (duration: string): number => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const getDurationCategory = (hours: number): string => {
    if (hours <= 20) return "short";
    if (hours <= 40) return "medium";
    return "long";
  };

  const filteredCourses = courses
    .filter(course => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
      const matchesRating = course.rating >= minRating;
      
      let matchesDuration = true;
      if (durationFilter !== "all") {
        const hours = parseDuration(course.duration);
        const category = getDurationCategory(hours);
        matchesDuration = category === durationFilter;
      }

      return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesDuration;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default: // popular
          return b.students - a.students;
      }
    });

  const activeFiltersCount = [
    selectedCategory !== "All",
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    minRating > 0,
    durationFilter !== "all"
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setDurationFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Header */}
      <section className="relative bg-background py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow animate-fade-up">Explore Our Courses</h1>
          <p className="text-xl text-foreground/80 animate-fade-up-delay-1">
            Discover your next skill with our comprehensive course catalog
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b neon-border glass">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-3 items-center">
                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="neon-border hover:glow"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <Card className="glass neon-border animate-fade-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-glow">Filter Courses</CardTitle>
                    <div className="flex gap-2">
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-xs"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear All
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Price Range</Label>
                      <div className="space-y-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={maxPrice}
                          min={0}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Minimum Rating</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[minRating]}
                          onValueChange={(value) => setMinRating(value[0])}
                          max={5}
                          min={0}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{minRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Duration</Label>
                      <div className="flex flex-col gap-2">
                        {[
                          { value: "all", label: "All Durations" },
                          { value: "short", label: "Short (≤20 hours)" },
                          { value: "medium", label: "Medium (21-40 hours)" },
                          { value: "long", label: "Long (40+ hours)" }
                        ].map((option) => (
                          <Button
                            key={option.value}
                            variant={durationFilter === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setDurationFilter(option.value)}
                            className="justify-start"
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
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

      {/* Course Grid */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <>
              <div className="mb-6 text-muted-foreground">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No courses found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
