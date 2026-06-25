import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, Users, CreditCard, Send, ClipboardList, BookOpen, 
  Settings, ShieldAlert, Award, FileSpreadsheet, Bell, 
  HelpCircle, ChevronRight, Menu, X, Sun, Moon, Sparkles, LogIn, LogOut,
  Cloud, RefreshCw, Globe
} from 'lucide-react';
import { ParabarLogo } from './ParabarLogo';

interface SidenavProps {
  onExitERP?: () => void;
}

export const Sidenav: React.FC<SidenavProps> = ({ onExitERP }) => {
  const { 
    language, setLanguage, 
    theme, setTheme, 
    activeTab, setActiveTab,
    currentAdmin, admins, setCurrentAdmin,
    notifications, t, currentUser, logout,
    isCloudSyncing
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [selectedAdminToSwitch, setSelectedAdminToSwitch] = useState<any>(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const getRoleLabel = (role: string, lang: 'bn' | 'en') => {
    if (role === 'Super Admin') return lang === 'bn' ? 'পারাবার পরিচালক' : 'Parabar Director';
    if (role === 'Sub Admin') return lang === 'bn' ? 'শাখা পরিচালক' : 'Branch Director';
    if (role === 'Sub Admin 2') return lang === 'bn' ? 'বিভাগীয় পরিচালক' : 'Departmental Director';
    return role;
  };

  const isStudent = currentUser?.role === 'student';

  const menuItems = isStudent
    ? [
        { id: 'studentDashboard', labelBn: 'আমার পোর্টাল', labelEn: 'My Student Portal', icon: Users },
        { id: 'notifications', labelBn: 'বিজ্ঞপ্তি কেন্দ্র', labelEn: 'Notice Board', icon: Bell },
      ]
    : [
        { id: 'dashboard', labelBn: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: BarChart3 },
        { id: 'artists', labelBn: 'শিল্পী তালিকা', labelEn: 'Artists Directory', icon: Users },
        { id: 'fees', labelBn: 'বেতন ও ফি সংগ্রহ', labelEn: 'Fees & Invoicing', icon: CreditCard },
        { id: 'whatsapp', labelBn: 'হোয়াটসঅ্যাপ এসএমএস', labelEn: 'WhatsApp Blast', icon: Send },
        { id: 'attendance', labelBn: 'উপস্থিতি রেজিস্টার', labelEn: 'Attendance Ledger', icon: ClipboardList },
        { id: 'classes', labelBn: 'ক্লাস ব্যবস্থাপনা', labelEn: 'Class Schedules', icon: BookOpen },
        { id: 'trainers', labelBn: 'প্রশিক্ষকবৃন্দ', labelEn: 'Trainer Office', icon: Award },
        { id: 'accounting', labelBn: 'হিসাব ও ব্যয়', labelEn: 'Accounting Hub', icon: FileSpreadsheet },
        { id: 'supporters', labelBn: 'সমর্থক ও অনুদান', labelEn: 'Academy Supporters', icon: Users },
        { id: 'responsible', labelBn: 'দায়িত্বপ্রাপ্ত ব্যক্তি', labelEn: 'Colleague Roles', icon: ShieldAlert },
        { id: 'notifications', labelBn: 'বিজ্ঞপ্তি কেন্দ্র', labelEn: 'Announcements', icon: Bell },
        { id: 'adminPanel', labelBn: 'অ্যাডমিন প্যানেল', labelEn: 'Admin Control', icon: ShieldAlert },
      ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleAdminSwitchAttempt = (admin: any) => {
    setSelectedAdminToSwitch(admin);
    setShowAdminPinModal(true);
    setEnteredPin('');
    setPinError('');
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Predefined pins for ease of validation (Super Admin: 1234, Sub Admins: 4321, 0000)
    const pins: { [key: string]: string } = {
      'ADM-001': '1234',
      'ADM-002': '4321',
      'ADM-003': '0000'
    };

    if (pins[selectedAdminToSwitch.id] === enteredPin) {
      setCurrentAdmin(selectedAdminToSwitch);
      setShowAdminPinModal(false);
      setAdminMenuOpen(false);
    } else {
      setPinError(language === 'bn' ? 'সঠিক পিন কোড টাইপ করুন!' : 'Incorrect PIN entered!');
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-slate-200/90 px-4 py-3.5 text-[#222222] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <button 
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-[#222222] transition"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-2">
            <ParabarLogo size={34} />
            <div>
              <h1 className="font-sans font-black tracking-tight text-xs text-brand-red uppercase leading-tight">
                {language === 'bn' ? 'পারাবার' : 'PARABAR'}
              </h1>
              <p className="text-[7.5px] text-slate-800 dark:text-slate-300 font-sans tracking-[0.02em] font-black uppercase leading-none mt-0.5">
                {language === 'bn' ? 'সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম' : 'Sahittya Sangskriti Sangshad Chattogram'}
              </p>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 lg:gap-3 text-xs md:text-sm">
          {/* Cloud Sync Status Indicator */}
          <div 
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/60 dark:bg-slate-800 dark:border-slate-700/80 border border-slate-200 rounded-full px-3 py-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 transition-all cursor-default shadow-xs"
            title={language === 'bn' ? 'ফায়ারবেস ক্লাউড সিনক্রোনাইজেশন সচল' : 'Firebase Cloud Sync Active'}
          >
            {isCloudSyncing ? (
              <RefreshCw size={11} className="text-indigo-500 animate-spin" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
            )}
            <Cloud size={12} className="text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400 tracking-wider uppercase text-[8px] font-mono">
              {isCloudSyncing ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে' : 'Saving') : (language === 'bn' ? 'সুরক্ষিত' : 'Synced')}
            </span>
          </div>

          {/* Language Toggle */}
          <button
            id="lang-toggle-btn"
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer"
          >
            <span className={language === 'en' ? 'text-brand-red' : 'text-slate-400'}>EN</span>
            <span className="text-slate-300">/</span>
            <span className={language === 'bn' ? 'text-brand-red' : 'text-slate-400'}>BN</span>
          </button>

          {/* Active Administrator Switcher */}
          {isStudent ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-lg text-xs font-sans text-slate-700">
                <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>
                <span className="font-bold truncate max-w-[80px]">{currentUser?.name}</span>
              </div>
              <button
                onClick={logout}
                className="bg-brand-red hover:bg-[#991d1d] border border-brand-red/10 py-1.5 px-3 rounded-lg text-xs text-white font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
                title={language === 'bn' ? 'লগআউট' : 'Sign Out'}
              >
                <LogIn size={13} className="rotate-180" />
                <span className="hidden sm:inline">{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                id="admin-switcher-btn"
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 font-medium py-1.5 px-3 rounded-lg border border-slate-200 text-slate-800 transition shadow-sm"
              >
                <img 
                  src={currentAdmin.avatar} 
                  alt="avatar" 
                  className="w-5 h-5 rounded-full object-cover border border-brand-red/20" 
                />
                <span className="hidden sm:inline max-w-[125px] truncate font-semibold text-xs">{currentAdmin.name}</span>
                <span className="bg-brand-green text-white font-bold px-1.5 py-0.5 rounded text-[9px] uppercase">
                  {currentAdmin.role === 'Super Admin' 
                    ? (language === 'bn' ? 'পরিচালক' : 'Director') 
                    : currentAdmin.role === 'Sub Admin' 
                      ? (language === 'bn' ? 'শাখা' : 'Branch') 
                      : (language === 'bn' ? 'বিভাগীয়' : 'Dept')}
                </span>
              </button>

              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 text-[#222222] animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-150 text-[10px] text-slate-400 font-mono tracking-wider uppercase font-bold">
                    {language === 'bn' ? 'সিস্টেম অ্যাডমিন সুইচ করুন' : 'Switch System Administrator'}
                  </div>
                  {admins.map(admin => (
                    <button
                      key={admin.id}
                      onClick={() => handleAdminSwitchAttempt(admin)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 hover:bg-slate-100 transition text-xs text-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <img src={admin.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-800">{admin.name}</p>
                          <p className="text-[9px] text-[#6B6B6B]">{getRoleLabel(admin.role, language)}</p>
                        </div>
                      </div>
                      {currentAdmin.id === admin.id && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      )}
                    </button>
                  ))}
                  
                  {/* System Logout Divider & Button */}
                  <div className="border-t border-slate-100 mt-1 pt-1.5 px-1 font-sans">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 text-brand-red hover:bg-red-50 rounded px-3 py-2 transition text-xs font-bold text-left cursor-pointer"
                    >
                      <LogOut size={13} className="text-brand-red" />
                      <span>{language === 'bn' ? 'সিস্টেম লগআউট' : 'Logout System'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Container Scaffolding: Sidenav is persistent on big screens, responsive drawer on small screen */}
      <nav className={`fixed inset-y-0 left-0 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static z-35 w-64 bg-brand-green border-r border-brand-green/10 flex flex-col justify-between transition-transform duration-300 ease-in-out text-slate-100 shrink-0 h-[calc(100vh-53px)] shadow-lg`}>
        {/* Navigation list */}
        <div className="py-5 overflow-y-auto grow custom-scrollbar">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-emerald-200/60 uppercase">
              {language === 'bn' ? 'প্রধান মডিউলসমূহ' : 'MAIN OPERATIONS'}
            </p>
          </div>
          <ul className="space-y-1 px-3">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    id={`nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs tracking-wide transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-white/10 border-l-[4px] border-brand-red text-white font-bold shadow-inner' 
                        : 'text-emerald-100/85 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-brand-red' : 'text-emerald-300/60'} />
                      <span className="font-sans font-medium">{language === 'bn' ? item.labelBn : item.labelEn}</span>
                    </div>
                    {item.id === 'notifications' && unreadCount > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isActive ? 'bg-brand-red text-white' : 'bg-brand-red text-white'}`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}

            {/* Exit ERP to Public Website Option */}
            {onExitERP && (
              <li className="mt-2">
                <button
                  id="nav-exit-erp"
                  onClick={onExitERP}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs tracking-wide transition-all text-emerald-100 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Globe size={15} className="text-emerald-300/60 shrink-0" />
                    <span className="font-sans font-medium">{language === 'bn' ? 'পাবলিক ওয়েবসাইট' : 'Public Website'}</span>
                  </div>
                </button>
              </li>
            )}

            {/* Direct Logout Option */}
            <li className="mt-4 pt-3 border-t border-white/10">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs tracking-wide transition-all text-red-200 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={15} className="text-white/60 shrink-0" />
                  <span className="font-sans font-medium">{language === 'bn' ? 'লগআউট করুন' : 'Sign Out'}</span>
                </div>
              </button>
            </li>
          </ul>
        </div>

        {/* Footer Credit Line */}
        <div className="p-4 border-t border-white/5 bg-black/10 text-[10px] text-emerald-200/50">
          <div className="flex items-center gap-1.5 font-sans font-bold text-emerald-200 mb-1 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
            <span>{isStudent ? (language === 'bn' ? 'শিল্পী প্যানেল' : 'Artist Panel') : (language === 'bn' ? 'একাডেমি প্যানেল' : 'Academy Panel')} v2.4</span>
          </div>
          <p className="leading-relaxed">{t('developerCredit')}</p>
          <p className="text-[9px] text-[#a7f3d0]/35 mt-1">© {language === 'bn' ? 'পারাবার চট্টগ্রাম' : 'Parabar Chattogram'}</p>
        </div>
      </nav>

      {/* Admin Access Switch Pin Verification Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-sm w-full text-slate-900 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-sky-600 mb-4">
              <ShieldAlert size={28} />
              <h3 className="font-sans font-bold text-lg">
                {language === 'bn' ? 'নিরাপত্তা নিশ্চিতকরণ' : 'Security Check'}
              </h3>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">
              {language === 'bn' 
                ? `প্রশাসক "${selectedAdminToSwitch?.name}" হিসেবে লগইন করার জন্য সিকিউরিটি পিন দিন।`
                : `Enter the security passcode to login as Admin "${selectedAdminToSwitch?.name}".`
              }
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans text-slate-500 mb-1">
                  {language === 'bn' ? 'সিকিউরিটি পিন দিন' : 'Security Pin'}
                </label>
                <input
                  type="password"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-center text-xl font-mono tracking-widest text-sky-600 focus:outline-none focus:border-sky-500"
                  autoFocus
                />
                {pinError && <p className="text-rose-500 text-xs mt-1">{pinError}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition font-medium text-sm text-slate-700"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition font-semibold text-sm"
                >
                  {language === 'bn' ? 'যাচাই করুন' : 'Authenticate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
