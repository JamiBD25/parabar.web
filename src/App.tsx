import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidenav } from './components/Sidenav';
import { DashboardView } from './components/DashboardView';
import { ArtistView } from './components/ArtistView';
import { FeeView } from './components/FeeView';
import { WhatsAppSMSView } from './components/WhatsAppSMSView';
import { AttendanceView } from './components/AttendanceView';
import { ClassView } from './components/ClassView';
import { TrainerView } from './components/TrainerView';
import { AccountingView } from './components/AccountingView';
import { SupporterView } from './components/SupporterView';
import { ResponsibleView } from './components/ResponsibleView';
import { NotificationView } from './components/NotificationView';
import { AdminPanelView } from './components/AdminPanelView';
import { LoginView } from './components/LoginView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { PublicView } from './components/PublicView';
import { ShieldAlert } from 'lucide-react';
import { isTabAllowedForAdmin } from './utils/adminLevels';

const AppContent: React.FC = () => {
  const { activeTab, currentUser, currentAdmin, language } = useApp();
  const [isViewingERP, setIsViewingERP] = useState(false);
  const [activePublicTab, setActivePublicTab] = useState<'home' | 'about' | 'committee' | 'branches' | 'activities' | 'login'>('home');

  // Automatically adjust view based on user authentication state
  useEffect(() => {
    if (currentUser) {
      setIsViewingERP(true);
    } else {
      setIsViewingERP(false);
      setActivePublicTab('home');
    }
  }, [currentUser]);

  // If we are browsing the public website, return the PublicView landing page
  if (!isViewingERP) {
    return (
      <PublicView 
        onEnterERP={() => setIsViewingERP(true)}
        activePublicTab={activePublicTab}
        setActivePublicTab={setActivePublicTab}
      />
    );
  }

  // Sub Admin level-based verification filter block
  const canViewModule = currentUser.role === 'admin' ? isTabAllowedForAdmin(currentAdmin.id, activeTab) : false;

  const renderActiveView = () => {
    // If logged in as student, they get access purely to their own Student Portal View
    if (currentUser.role === 'student') {
      if (activeTab === 'notifications') {
        return <StudentDashboardView initialTab="notices" />;
      }
      return <StudentDashboardView initialTab="overview" />;
    }

    // Administrative permission checks
    if (!canViewModule && activeTab !== 'dashboard') {
      return (
        <div id="access-denied-panel" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-12 shadow-2xl space-y-4">
          <div className="mx-auto p-4 bg-rose-500/10 text-rose-450 w-fit rounded-full">
            <ShieldAlert size={40} className="animate-bounce" />
          </div>
          <h3 className="font-sans font-black text-lg text-slate-900 dark:text-slate-100">
            {language === 'bn' ? 'অ্যাক্সেস অনুমোদিত নয়' : 'Access Restricted'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {language === 'bn' 
              ? 'আপনার বর্তমান অ্যাকাউন্ট রোল এই মডিউলটি দেখার অনুমতি দেয় না। অনুগ্রহ করে সুপার অ্যাডমিনের সাথে যোগাযোগ করুন।' 
              : 'As a Sub Administrator, your active profile privileges do not permit reading this module. Consult Super Admin.'}
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'artists':
        return <ArtistView />;
      case 'fees':
        return <FeeView />;
      case 'whatsapp':
        return <WhatsAppSMSView />;
      case 'attendance':
        return <AttendanceView />;
      case 'classes':
        return <ClassView />;
      case 'trainers':
        return <TrainerView />;
      case 'accounting':
        return <AccountingView />;
      case 'supporters':
        return <SupporterView />;
      case 'responsible':
        return <ResponsibleView />;
      case 'notifications':
        return <NotificationView />;
      case 'adminPanel':
        return <AdminPanelView />;
      default:
        return <DashboardView />;
    }
  };

  const currentTab = currentUser.role === 'student' ? 'studentDashboard' : activeTab;

  return (
    <div className="flex flex-col min-h-screen bg-warm-cream border-8 border-brand-green">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar block */}
        <Sidenav onExitERP={() => setIsViewingERP(false)} />

        {/* Main viewport flow */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-95px)] lg:max-h-[calc(100vh-73px)] bg-warm-cream">
          <div key={currentTab} className="max-w-7xl mx-auto animate-fade-in">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
