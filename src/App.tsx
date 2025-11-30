import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout, AuthLayout } from '@/components/layout';
import {
  DashboardPage,
  AnalyticsPage,
  UsersPage,
  SettingsPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  NotificationsPage,
  HelpPage,
  ProductsPage,
  OrdersPage,
  CustomersPage,
  CalendarPage,
  EmailPage,
  ChatPage,
  FilesPage,
} from '@/pages';
import { useAuthStore } from '@/stores/auth.store';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route wrapper (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="help" element={<HelpPage />} />
          
          {/* E-commerce Routes */}
          <Route path="ecommerce/products" element={<ProductsPage />} />
          <Route path="ecommerce/orders" element={<OrdersPage />} />
          <Route path="ecommerce/customers" element={<CustomersPage />} />
          
          {/* Apps Routes */}
          <Route path="apps/calendar" element={<CalendarPage />} />
          <Route path="apps/email" element={<EmailPage />} />
          <Route path="apps/chat" element={<ChatPage />} />
          <Route path="apps/files" element={<FilesPage />} />
          
          {/* Components Routes - placeholder */}
          <Route path="components/*" element={<DashboardPage />} />
        </Route>

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
