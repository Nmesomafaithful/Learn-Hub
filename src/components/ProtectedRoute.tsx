import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, user, isInitialized } = useAuth();

  // Wait for auth to initialize
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If admin required but user is not admin, redirect to dashboard
  if (requireAdmin && !isAdmin) {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/dashboard" replace />;
  }

  // Render the protected content
  return <>{children}</>;
};

