import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, Users, CreditCard, Send, ClipboardList, BookOpen, 
  Settings, ShieldAlert, Award, FileSpreadsheet, Bell, 
  HelpCircle, ChevronRight, Menu, X, Sun, Moon, Sparkles, LogIn, LogOut
} from 'lucide-react';

export const Sidenav: React.FC = () => {
  const { 
    language, setLanguage, 
    theme, setTheme, 
    activeTab, setActiveTab,
    currentAdmin, admins, setCurrentAdmin,
    notifications, t, currentUser, logout
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [selectedAdminToSwitch, setSelectedAdminToSwitch] = useState<any>(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

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
      <header className="sticky top-0 z-40 flex items-center justify-between bg-[#0f172a] border-b border-slate-800 px-4 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <button 
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden p-1.5 rounded bg-slate-800 hover:bg-slate-700 transition"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-[#38bdf8] p-2 rounded-lg text-[#0f172a] font-bold shadow-md shadow-sky-400/10">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div>
              <h1 className="font-sans font-black tracking-tight text-xl text-[#38bdf8]">
                {language === 'bn' ? 'পারাবার' : 'PARABAR'}
              </h1>
              <p className="text-[10px] text-slate-400 font-sans tracking-[0.2em] uppercase font-semibold">
                {isStudent 
                  ? (language === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'STUDENT PORTAL')
                  : (language === 'bn' ? 'শিল্পী পোর্টাল' : 'ARTIST MANAGEMENT SYSTEM')
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 lg:gap-4 text-xs md:text-sm">
          {/* Quick Stats Banner */}
          <div className="hidden md:flex items-center gap-4 bg-slate-950/65 border border-slate-800/80 px-4 py-1.5 rounded-full font-mono text-[10px] text-slate-400 tracking-wider">
            <span>DATABASE: <span className="text-[#22c55e] font-bold">ONLINE</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>SYNCED: <span className="text-[#38bdf8] font-bold">OK</span></span>
          </div>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-sky-400 transition-colors border border-slate-800"
            title={t('theme')}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Language Toggle */}
          <button
            id="lang-toggle-btn"
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all cursor-pointer"
          >
            <span className={language === 'en' ? 'text-[#38bdf8]' : 'text-slate-500'}>EN</span>
            <span className="text-slate-700">/</span>
            <span className={language === 'bn' ? 'text-[#38bdf8]' : 'text-slate-500'}>BN</span>
          </button>

          {/* Active Administrator Switcher */}
          {isStudent ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 py-1.5 px-3 rounded-lg text-xs font-sans text-slate-350">
                <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full"></div>
                <span className="font-bold truncate max-w-[80px]">{currentUser?.name}</span>
              </div>
              <button
                onClick={logout}
                className="bg-rose-500 hover:bg-rose-600 border border-rose-600/50 py-1.5 px-3 rounded-lg text-xs text-white font-bold transition flex items-center gap-1 cursor-pointer"
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
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 font-medium py-1.5 px-3 rounded-lg border border-slate-700 transition"
              >
                <img 
                  src={currentAdmin.avatar} 
                  alt="avatar" 
                  className="w-5 h-5 rounded-full object-cover border border-sky-400" 
                />
                <span className="hidden sm:inline max-w-[120px] truncate">{currentAdmin.name}</span>
                <span className="bg-sky-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase">
                  {currentAdmin.role === 'Super Admin' ? 'Super' : 'Sub'}
                </span>
              </button>

              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-850 border border-slate-700 rounded-lg shadow-xl py-2 z-50 text-white animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-700 text-xs text-slate-400 font-mono tracking-wider uppercase">
                    {language === 'bn' ? 'সিস্টেম অ্যাডমিন সুইচ করুন' : 'Switch System Administrator'}
                  </div>
                  {admins.map(admin => (
                    <button
                      key={admin.id}
                      onClick={() => handleAdminSwitchAttempt(admin)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 hover:bg-slate-700 transition text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <img src={admin.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-200">{admin.name}</p>
                          <p className="text-[10px] text-slate-400">{admin.role}</p>
                        </div>
                      </div>
                      {currentAdmin.id === admin.id && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      )}
                    </button>
                  ))}
                  
                  {/* System Logout Divider & Button */}
                  <div className="border-t border-slate-700/80 mt-1 pt-1.5 px-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 text-rose-450 hover:text-rose-400 hover:bg-rose-500/10 rounded px-3 py-2 transition text-xs font-semibold text-left cursor-pointer"
                    >
                      <LogOut size={13} className="text-rose-400" />
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
      <nav className={`fixed inset-y-0 left-0 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static z-35 w-64 bg-[#0f172a] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out text-slate-300 shrink-0 h-[calc(100vh-53px)]`}>
        {/* Navigation list */}
        <div className="py-5 overflow-y-auto grow custom-scrollbar">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-slate-400 uppercase">
              {language === 'bn' ? 'প্রধান মডিউলসমূহ' : 'MAIN OPERATIONS'}
            </p>
          </div>
          <ul className="space-y-1.5 px-3">
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
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs tracking-wide transition-all ${
                      isActive 
                        ? 'bg-slate-800/70 border-l-[3px] border-[#38bdf8] text-[#38bdf8] font-bold' 
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-[#38bdf8]' : 'text-slate-500'} />
                      <span className="font-sans font-medium">{language === 'bn' ? item.labelBn : item.labelEn}</span>
                    </div>
                    {item.id === 'notifications' && unreadCount > 0 && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isActive ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-rose-500 text-white'}`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}

            {/* Direct Logout Option */}
            <li className="mt-4 pt-3 border-t border-slate-800/40">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs tracking-wide transition-all text-rose-500 hover:text-white hover:bg-rose-500/10 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={15} className="text-rose-550 shrink-0" />
                  <span className="font-sans font-medium">{language === 'bn' ? 'লগআউট করুন' : 'Sign Out'}</span>
                </div>
              </button>
            </li>
          </ul>
        </div>

        {/* Footer Credit Line */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/30 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5 font-sans font-bold text-slate-400 mb-1 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
            <span>{isStudent ? (language === 'bn' ? 'শিক্ষার্থী প্যানেল' : 'Student Panel') : (language === 'bn' ? 'একাডেমি প্যানেল' : 'Academy Panel')} v2.4</span>
          </div>
          <p className="leading-relaxed">{t('developerCredit')}</p>
          <p className="text-[9px] text-[#475569] dark:text-slate-600 lowercase mt-1">© Parabar Cultural Foundation</p>
        </div>
      </nav>

      {/* Admin Access Switch Pin Verification Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full text-white shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-sky-400 mb-4">
              <ShieldAlert size={28} />
              <h3 className="font-sans font-bold text-lg">
                {language === 'bn' ? 'নিরাপত্তা নিশ্চিতকরণ' : 'Security Check'}
              </h3>
            </div>
            
            <p className="text-sm text-slate-400 mb-4">
              {language === 'bn' 
                ? `প্রশাসক "${selectedAdminToSwitch?.name}" হিসেবে লগইন করার জন্য সিকিউরিটি পিন দিন।`
                : `Enter the security passcode to login as Admin "${selectedAdminToSwitch?.name}".`
              }
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  {language === 'bn' ? 'সিকিউরিটি পিন (যেমন: Super-এর জন্য 1234, Sub-এর জন্য 4321)' : 'Security Pin (e.g., 1234 for Super, 4321 for Sub)'}
                </label>
                <input
                  type="password"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-center text-xl font-mono tracking-widest text-sky-400 focus:outline-none focus:border-sky-500"
                  autoFocus
                />
                {pinError && <p className="text-rose-500 text-xs mt-1">{pinError}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition font-medium text-sm text-slate-300"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition font-semibold text-sm"
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
