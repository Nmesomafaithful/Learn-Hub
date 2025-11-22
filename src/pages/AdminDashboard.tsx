import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  BarChart3,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Bell // <--- Added missing Bell icon import for the Settings section
} from "lucide-react";
import { courses } from "@/data/courses";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in production, fetch from API
  const totalUsers = 52347;
  const totalCourses = courses.length;
  const totalRevenue = 1245678;
  const activeStudents = 45231;
  const monthlyRevenue = 234567;
  const monthlyGrowth = 12.5;

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-03-15", status: "active", courses: 3 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-03-14", status: "active", courses: 5 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", joined: "2024-03-13", status: "inactive", courses: 1 },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", joined: "2024-03-12", status: "active", courses: 7 },
    { id: 5, name: "David Brown", email: "david@example.com", joined: "2024-03-11", status: "active", courses: 2 },
  ];

  const recentEnrollments = [
    { id: 1, course: "Complete Web Development Bootcamp", student: "John Doe", date: "2024-03-15", amount: 89.99 },
    { id: 2, course: "Python for Data Science", student: "Jane Smith", date: "2024-03-14", amount: 99.99 },
    { id: 3, course: "UX/UI Design Essentials", student: "Mike Johnson", date: "2024-03-13", amount: 84.99 },
    { id: 4, course: "Digital Marketing Masterclass", student: "Sarah Williams", date: "2024-03-12", amount: 79.99 },
    { id: 5, course: "Mobile App Development", student: "David Brown", date: "2024-03-11", amount: 94.99 },
  ];

  const stats = [
    { icon: Users, label: "Total Users", value: totalUsers.toLocaleString(), change: "+12%", color: "text-blue-500" },
    { icon: BookOpen, label: "Total Courses", value: totalCourses.toString(), change: "+3", color: "text-green-500" },
    { icon: DollarSign, label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: `+${monthlyGrowth}%`, color: "text-green-500" },
    { icon: UserCheck, label: "Active Students", value: activeStudents.toLocaleString(), change: "+8%", color: "text-purple-500" },
  ];

  const handleLogout = () => {
    authLogout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDeleteCourse = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      toast.success("Course deleted successfully");
      // In production, call API to delete course
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      toast.success("User deleted successfully");
      // In production, call API to delete user
    }
  };

  // Ensure we have user data
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      {/* Header */}
      <section className="relative bg-background py-12 border-b neon-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-glow">Admin Dashboard</h1>
              <p className="text-foreground/80">Manage your learning platform</p>
            </div>
            <div className="flex gap-2">
              <Link to="/courses">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </Link>
              <Button variant="secondary" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass neon-border hover:glow transition-all duration-500 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color} glow`} />
                    <Badge variant="secondary" className={stat.color}>
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1 text-glow">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 glass neon-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Enrollments */}
                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recent Enrollments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEnrollments.slice(0, 5).map((enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-semibold text-sm">{enrollment.course}</div>
                            <div className="text-xs text-muted-foreground">{enrollment.student}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">${enrollment.amount}</div>
                            <div className="text-xs text-muted-foreground">{enrollment.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Users */}
                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Recent Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-semibold text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                          <div className="text-right">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">{user.courses} courses</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-glow">${monthlyRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                    <Badge variant="secondary" className="text-green-500">
                      +{monthlyGrowth}% from last month
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-glow">1,234</div>
                        <div className="text-sm text-muted-foreground">New Enrollments</div>
                      </div>
                      <BookOpen className="h-8 w-8 text-blue-500" />
                    </div>
                    <Badge variant="secondary" className="text-blue-500">
                      +15% from last month
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-glow">4.8</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                      <Award className="h-8 w-8 text-yellow-500" />
                    </div>
                    <Badge variant="secondary" className="text-yellow-500">
                      Based on 12,345 reviews
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <Card className="glass neon-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-glow">Course Management</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Link to="/courses">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Course
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses
                        .filter(course =>
                          searchQuery === "" ||
                          course.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>
                              <div className="font-semibold">{course.title}</div>
                              <div className="text-sm text-muted-foreground">{course.instructor}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{course.category}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold">${course.price}</TableCell>
                            <TableCell>{course.students.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span>{course.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="glass neon-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-glow">User Management</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button>
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers
                        .filter(user =>
                          searchQuery === "" ||
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="font-semibold">{user.name}</div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.joined}</TableCell>
                            <TableCell>{user.courses}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enrollments Tab */}
            <TabsContent value="enrollments" className="space-y-6">
              <Card className="glass neon-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-glow">Enrollment Management</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search enrollments..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentEnrollments
                        .filter(enrollment =>
                          searchQuery === "" ||
                          enrollment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          enrollment.student.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((enrollment) => (
                          <TableRow key={enrollment.id}>
                            <TableCell className="font-semibold">{enrollment.course}</TableCell>
                            <TableCell>{enrollment.student}</TableCell>
                            <TableCell>{enrollment.date}</TableCell>
                            <TableCell className="font-semibold">${enrollment.amount}</TableCell>
                            <TableCell>
                              <Badge variant="default">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Revenue Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Today</div>
                          <div className="text-xl font-bold">$12,345</div>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">This Week</div>
                          <div className="text-xl font-bold">$87,654</div>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">This Month</div>
                          <div className="text-xl font-bold">${monthlyRevenue.toLocaleString()}</div>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">New Users (Today)</div>
                          <div className="text-xl font-bold">234</div>
                        </div>
                        <UserCheck className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">New Users (This Week)</div>
                          <div className="text-xl font-bold">1,567</div>
                        </div>
                        <UserCheck className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">New Users (This Month)</div>
                          <div className="text-xl font-bold">5,432</div>
                        </div>
                        <UserCheck className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Course Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.slice(0, 5).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{course.title}</div>
                            <div className="text-xs text-muted-foreground">{course.students.toLocaleString()} students</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">${course.price}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Award className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              {course.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Activity Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Active Sessions</div>
                          <div className="text-xl font-bold">3,456</div>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Course Completions</div>
                          <div className="text-xl font-bold">1,234</div>
                        </div>
                        <Award className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Pending Reviews</div>
                          <div className="text-xl font-bold">89</div>
                        </div>
                        <AlertCircle className="h-8 w-8 text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Platform Name</Label>
                      <Input defaultValue="LearnHub" className="mt-1" />
                    </div>
                    <div>
                      <Label>Support Email</Label>
                      <Input defaultValue="support@learnhub.com" type="email" className="mt-1" />
                    </div>
                    <div>
                      <Label>Default Currency</Label>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground mt-1">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                    <Button className="w-full glow">Save Settings</Button>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="glass neon-border hover:glow transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-glow flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add content for notification settings here, e.g., checkboxes, toggles */}
                    <p className="text-muted-foreground">Notification settings content goes here...</p>
                    <Button className="w-full glow" variant="outline">Update Notifications</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;