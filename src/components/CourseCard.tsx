import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  image: string;
  instructor: string;
}

const CourseCard = ({ 
  id, 
  title, 
  description, 
  category, 
  price, 
  duration, 
  students, 
  rating,
  image,
  instructor 
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden neon-border hover:glow-strong transition-all duration-500 group animate-fade-up glass">
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{category}</Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary text-glow">
            {price === 0 ? "FREE" : `$${price}`}
          </span>
        </div>
        <Link to={`/courses/${id}`}>
          <Button className="glow hover:glow-strong transition-all duration-300">
            {price === 0 ? "Start Free" : "View Course"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
