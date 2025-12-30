import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/clientPages/HomePage';
import ProductsPage from './pages/clientPages/ProductsPage';
import SolutionsPage from './pages/clientPages/SolutionsPage';
import ServicesPage from './pages/clientPages/ServicesPage';
import ContactPage from './pages/clientPages/ContactPage';
import AboutPage from './pages/clientPages/AboutPage';
import ProjectsPage from './pages/clientPages/ProjectsPage';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import './styles/global.css';
import { defineCustomElements } from '@esri/calcite-components/loader';
import AdminLogin from './pages/adminPages/LoginPage';
import RecentActivity from './pages/adminPages/RecentActivity';
import Settings from './pages/adminPages/Settings';
import { trackPageView } from './utils/analytics';
import ProtectedRoute from './components/ProtectedRoute';
import ContactViewPage from './pages/adminPages/ContactViewPage';
import ChangePassword from './pages/adminPages/ChangePassword';
import { PermissionProvider } from './context/PermissionContext';

// Service Management Pages
import ProfessionalServicesList from './pages/adminPages/ProfessionalServicesList';
import ProfessionalServiceAdd from './pages/adminPages/ProfessionalServiceAdd';
import EventsList from './pages/adminPages/EventsList';
import EventAdd from './pages/adminPages/EventAdd';
import NotificationsList from './pages/adminPages/NotificationsList';
import NotificationAdd from './pages/adminPages/NotificationAdd';

// Project Management Pages
import ProjectsList from './pages/adminPages/ProjectsList';
import ProjectAdd from './pages/adminPages/ProjectAdd';

// Analytics Tracker Component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change, but only for public pages
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (!isAdminRoute) {
      trackPageView();
    }
  }, [location]);

  return null;
}

function App() {
  // Initialize Calcite Components
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <PermissionProvider>
      <Router>
        <AnalyticsTracker />
        <div className="App">
          <Routes>
            {/* ============================================
            CLIENT SIDE ROUTES (Public - No Protection)
            ============================================ */}

            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />

            {/* ============================================
            ADMIN AUTHENTICATION (Public Route)
            ============================================ */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            <Route
              path="/admin/change-password"
              element={<ChangePassword />}
            />

            {/* ============================================
            PROTECTED ADMIN ROUTES
            ============================================ */}

            {/* Dashboard & Activity */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recent-activity"
              element={
                <ProtectedRoute>
                  <RecentActivity />
                </ProtectedRoute>
              }
            />

            {/* Contact View */}
            <Route
              path="/admin/contact-view"
              element={
                <ProtectedRoute>
                  <ContactViewPage />
                </ProtectedRoute>
              }
            />

            {/* ============================================
            SERVICE MANAGEMENT ROUTES
            ============================================ */}

            {/* Professional Services */}
            <Route
              path="/admin/services/professional"
              element={
                <ProtectedRoute>
                  <ProfessionalServicesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services/professional/add"
              element={
                <ProtectedRoute>
                  <ProfessionalServiceAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services/professional/edit/:id"
              element={
                <ProtectedRoute>
                  <ProfessionalServiceAdd />
                </ProtectedRoute>
              }
            />



            {/* Events */}
            <Route
              path="/admin/services/events"
              element={
                <ProtectedRoute>
                  <EventsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services/events/add"
              element={
                <ProtectedRoute>
                  <EventAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services/events/edit/:id"
              element={
                <ProtectedRoute>
                  <EventAdd />
                </ProtectedRoute>
              }
            />

            {/* ============================================
            PROJECT MANAGEMENT ROUTES
            ============================================ */}

            {/* Projects */}
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <ProjectsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/add"
              element={
                <ProtectedRoute>
                  <ProjectAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/edit/:id"
              element={
                <ProtectedRoute>
                  <ProjectAdd />
                </ProtectedRoute>
              }
            />

            {/* Notifications */}
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications/add"
              element={
                <ProtectedRoute>
                  <NotificationAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications/edit/:id"
              element={
                <ProtectedRoute>
                  <NotificationAdd />
                </ProtectedRoute>
              }
            />

            {/* Settings */}
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </PermissionProvider>
  );
}

export default App;