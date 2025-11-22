import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      const isAdmin = loginData.email.toLowerCase() === "admin@learnhub.com" || loginData.email.toLowerCase() === "admin";
      toast.success(isAdmin ? "Admin login successful!" : "Login successful!");
      navigate(isAdmin ? "/admin" : "/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const success = await login(signupData.email, signupData.password);
    if (success) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      <div className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-md relative">
          <div className="text-center mb-8 animate-fade-up">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-foreground mb-2 group">
              <BookOpen className="h-8 w-8 text-primary glow group-hover:glow-strong transition-all duration-300" />
              <span className="text-glow">LearnHub</span>
            </Link>
            <p className="text-muted-foreground">Welcome back! Please login to your account.</p>
          </div>

          <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
            <CardHeader>
              <CardTitle>Account Access</CardTitle>
              <CardDescription>Login or create a new account to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Button type="submit" className="w-full glow hover:glow-strong transition-all duration-300" size="lg">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full glow hover:glow-strong transition-all duration-300" size="lg">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
