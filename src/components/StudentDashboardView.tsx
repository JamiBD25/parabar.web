import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Calendar, CreditCard, Bell, Sparkles, BookOpen, 
  MapPin, Award, CheckCircle, Clock, AlertTriangle, LogOut 
} from 'lucide-react';

interface StudentDashboardViewProps {
  initialTab?: 'overview' | 'attendance' | 'fees' | 'notices';
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ initialTab = 'overview' }) => {
  const { 
    currentUser, 
    attendance, 
    payments, 
    classes, 
    notifications, 
    language, 
    logout, 
    t,
    changeArtistPassword
  } = useApp();

  const student = currentUser?.studentData;
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'attendance' | 'fees' | 'notices'>(initialTab);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!newPassword) {
      setPasswordError(language === 'bn' ? 'পাসওয়ার্ডটি খালি হতে পারবে না!' : 'Password cannot be empty!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(language === 'bn' ? 'পাসওয়ার্ড দুটি মেলেনি!' : 'Passwords do not match!');
      return;
    }

    if (!student) return;

    const success = changeArtistPassword(student.id, newPassword);
    if (success) {
      setPasswordSuccess(language === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে!' : 'Failed to change password. Please retry.');
    }
  };

  useEffect(() => {
    setActiveSubTab(initialTab);
  }, [initialTab]);

  if (!currentUser || !student) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl max-w-md mx-auto text-white mt-10">
        <AlertTriangle className="mx-auto text-amber-500 mb-4" size={48} />
        <h3 className="text-xl font-bold font-sans">No Student Session Found</h3>
        <p className="text-xs text-slate-400 mt-2">Please go back and authenticate with valid student credentials.</p>
        <button onClick={logout} className="mt-4 px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded-lg text-xs">
          Return to Login
        </button>
      </div>
    );
  }

  // Filter student-specific records
  const myAttendance = attendance.filter(record => record.artistId === student.id);
  const myPayments = payments.filter(pay => pay.artistId === student.id);

  // Statistics calculation
  const totalClasses = myAttendance.length;
  const presentCount = myAttendance.filter(r => r.status === 'Present' || r.status === 'Late').length;
  const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 100;

  const totalPaid = myPayments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalDueAmount = myPayments
    .filter(p => p.status === 'Due' || p.status === 'Unpaid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingInvoices = myPayments.filter(p => p.status === 'Due' || p.status === 'Unpaid');

  return (
    <div className="space-y-6">
      {/* Immersive Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a] border border-slate-800/80 rounded-2xl p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#38bdf8]/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-[400px] h-[100px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            {/* Student Visual Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-0.5 shadow-lg">
                {student.photo ? (
                  <img 
                    src={student.photo} 
                    alt={student.nameEn} 
                    className="w-full h-full object-cover rounded-[14px]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center text-sky-400 font-sans font-black text-2xl">
                    {student.nameEn.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="absolute bottom-[-4px] right-[-4px] flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#22c55e]"></span>
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <span className="bg-sky-500/15 text-[#38bdf8] border border-sky-500/30 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">
                  {student.id}
                </span>
                <span className="bg-emerald-500/15 text-[#22c55e] border border-emerald-500/30 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                  {student.status === 'Active' ? (language === 'bn' ? 'সক্রিয় সদস্য' : 'Active Member') : (language === 'bn' ? 'নিষ্ক্রিয়' : 'Inactive')}
                </span>
              </div>
              <h2 className="font-sans font-black text-2xl lg:text-3xl text-white tracking-tight mt-1">
                {language === 'bn' ? student.name : student.nameEn}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium font-mono flex items-center gap-1 justify-center md:justify-start">
                <BookOpen size={13} className="text-indigo-400" />
                {language === 'bn' ? 'শ্রেণী: ' : 'Academic Level: '} {student.grade}
              </p>
            </div>
          </div>

          {/* Quick Stats Summary Widgets inside banner */}
          <div className="flex gap-4 self-stretch md:self-auto shrink-0 font-sans justify-center">
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 transition-colors duration-200 text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wider uppercase border border-rose-600/50 cursor-pointer w-full md:w-auto"
            >
              <LogOut size={14} />
              {language === 'bn' ? 'লগআউট' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Quick Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance widget */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-emerald-500 border-y border-r border-slate-200 dark:border-slate-800/80 p-5 rounded-r-xl flex flex-col justify-between hover:shadow-md transition">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {language === 'bn' ? 'মোট উপস্থিতি হার' : 'Attendance Percent'}
            </p>
            <h3 className="text-3xl font-black mt-2 text-slate-900 dark:text-slate-100 tracking-tight">{attendanceRate}%</h3>
          </div>
          <div className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {presentCount} / {totalClasses} {language === 'bn' ? 'দিন উপস্থিত' : 'Days Marked'}
          </div>
        </div>

        {/* Paid and clear fees */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-sky-400 border-y border-r border-slate-200 dark:border-slate-800/80 p-5 rounded-r-xl flex flex-col justify-between hover:shadow-md transition">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {language === 'bn' ? 'পরিশোধিত ফি' : 'Total Fees Paid'}
            </p>
            <h3 className="text-3xl font-black mt-2 text-[#38bdf8] tracking-tight">৳{totalPaid}</h3>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono">
            {myPayments.filter(p => p.status === 'Paid').length} {language === 'bn' ? 'টি সফল রশিদ' : 'Valid receipts'}
          </div>
        </div>

        {/* Pending dues */}
        <div className="bg-[#0f172a] text-white p-5 rounded-xl flex flex-col justify-between hover:shadow-lg transition relative overflow-hidden group border border-slate-800">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-white/5 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">
              {language === 'bn' ? 'চলতি বকেয়া ও ডিউ' : 'Dues & Pending Invoice'}
            </p>
            <h3 className="text-3xl font-black mt-2 text-rose-400 tracking-tight">৳{totalDueAmount}</h3>
          </div>
          <div className="text-[10px] font-bold mt-2 text-rose-400 flex items-center gap-1">
            <AlertTriangle size={12} />
            {pendingInvoices.length} {language === 'bn' ? 'টি চালান বকেয়া রয়েছে' : 'Unpaid items'}
          </div>
        </div>

        {/* Departments enrolled */}
        <div className="bg-white dark:bg-slate-900 border-l-4 border-indigo-500 border-y border-r border-slate-200 dark:border-slate-800/80 p-5 rounded-r-xl flex flex-col justify-between hover:shadow-md transition">
          <div>
            <p className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {language === 'bn' ? 'নিবন্ধিত বিভাগসমূহ' : 'Registered Ensembles'}
            </p>
            <div className="flex flex-wrap gap-1 mt-2.5">
              {student.departments.map(dept => (
                <span key={dept} className="bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-bold text-[9px] px-2 py-0.5 rounded border border-indigo-500/20">
                  {dept}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-semibold">
            {language === 'bn' ? 'পারাবার সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম' : 'Parabar Sahittya Sangskriti Songsod Chattogram'}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-1.5 rounded-xl gap-2 font-sans overflow-x-auto whitespace-nowrap md:flex-wrap scrollbar-none sm:scrollbar-default">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg tracking-wide transition-all shrink-0 ${
            activeSubTab === 'overview'
              ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-[#38bdf8] shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {language === 'bn' ? 'প্রোফাইল বিবরণী' : 'My Student Profile'}
        </button>
        <button
          onClick={() => setActiveSubTab('attendance')}
          className={`px-4 py-2 text-xs font-bold rounded-lg tracking-wide transition-all shrink-0 ${
            activeSubTab === 'attendance'
              ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-[#38bdf8] shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {language === 'bn' ? 'উপস্থিতির ইতিহাস' : 'Attendance logs'}
        </button>
        <button
          onClick={() => setActiveSubTab('fees')}
          className={`px-4 py-2 text-xs font-bold rounded-lg tracking-wide transition-all shrink-0 ${
            activeSubTab === 'fees'
              ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-[#38bdf8] shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {language === 'bn' ? 'বেতন ও পরিশোধ' : 'Fees & Ledger'}
        </button>
        <button
          onClick={() => setActiveSubTab('notices')}
          className={`px-4 py-2 text-xs font-bold rounded-lg tracking-wide transition-all shrink-0 flex items-center gap-1.5 relative ${
            activeSubTab === 'notices'
              ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-[#38bdf8] shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {language === 'bn' ? 'নোটিশ বোর্ড' : 'Announcements'}
          {notifications.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1 animate-pulse"></span>
          )}
        </button>
      </div>

      {/* Render sub-tabs */}
      <div className="space-y-6">
        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student metadata profiles card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-sans font-black text-sm uppercase text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <User size={16} className="text-[#38bdf8]" />
                {language === 'bn' ? 'ব্যক্তিগত বিবরণী' : 'Personal Dossier'}
              </h3>
              
              <div className="space-y-3 font-sans text-xs">
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'ইংরেজি নাম' : 'English Name'}</span>
                  <span className="col-span-2 font-semibold text-slate-800 dark:text-slate-200">{student.nameEn}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'বাংলা নাম' : 'Bengali Name'}</span>
                  <span className="col-span-2 font-bold text-slate-800 dark:text-slate-200">{student.name}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'পিতার নাম' : "Father's Name"}</span>
                  <span className="col-span-2 text-slate-700 dark:text-slate-300">{student.fatherName}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'মাতার নাম' : "Mother's Name"}</span>
                  <span className="col-span-2 text-slate-700 dark:text-slate-300">{student.motherName}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'জন্মদিন' : 'Date of Birth'}</span>
                  <span className="col-span-2 font-mono text-slate-700 dark:text-slate-300">{student.dob}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}</span>
                  <span className="col-span-2 font-bold text-rose-500">{student.bloodGroup || 'UNKNOWN'}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'মোবাইল' : 'Contact Mobile'}</span>
                  <span className="col-span-2 font-mono text-[#38bdf8] font-bold">{student.mobile}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2 border-b border-slate-50 dark:border-slate-800/60 pb-2">
                  <span className="text-slate-400">{language === 'bn' ? 'শিক্ষা প্রতিষ্ঠান' : 'Institution'}</span>
                  <span className="col-span-2 text-slate-700 dark:text-slate-300">{student.institution}</span>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-0.5 sm:gap-2">
                  <span className="text-slate-400">{language === 'bn' ? 'ঠিকানা' : 'Address'}</span>
                  <span className="col-span-2 text-slate-700 dark:text-slate-300 leading-relaxed">{student.address}</span>
                </div>
              </div>
            </div>

            {/* Password Change card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-sans font-black text-sm uppercase text-slate-[#0f172a] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <Clock size={16} className="text-[#38bdf8]" />
                {language === 'bn' ? 'সিকিউরিটি ও পাসওয়ার্ড পরিবর্তন' : 'Change Portal Password'}
              </h3>
              
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    {language === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Security PIN / Pass'}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={language === 'bn' ? 'নতুন পাসওয়ার্ড লিখুন' : 'Enter new password'}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/70 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={language === 'bn' ? 'আবার টাইপ করুন' : 'Retype password'}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/70 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                {passwordError && (
                  <p className="text-rose-500 text-[10px] bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded-lg">
                    {passwordError}
                  </p>
                )}

                {passwordSuccess && (
                  <p className="text-emerald-500 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
                    {passwordSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs rounded-lg transition duration-200 shadow"
                >
                  {language === 'bn' ? 'পাসওয়ার্ড আপডেট করুন' : 'Save New Credentials'}
                </button>
              </form>
            </div>

            {/* Sibling and Enrollment Details */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4 lg:col-span-2">
              <h3 className="font-sans font-black text-sm uppercase text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <Award size={16} className="text-indigo-500" />
                {language === 'bn' ? 'একাডেমিক এনরোলমেন্ট ও তথ্যাদি' : 'Academic Class Schedule'}
              </h3>

              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-[#0f172a] p-4 rounded-xl border border-slate-800/65 text-slate-300 flex items-start gap-3">
                <Sparkles className="text-[#38bdf8] shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-bold text-white mb-1">{language === 'bn' ? 'পারাবার সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম সেশন ২০২৬' : 'Parabar Sahittya Sangskriti Songsod Chattogram Session 2026'}</p>
                  <p>{language === 'bn' ? 'আপনি বর্তমানে পারাবার সংসদের পক্ষ থেকে বিশেষ বৃত্তির আওতায় তালিকাভুক্ত রয়েছেন। শুক্রবারের নিয়মিত ক্লাস ও বিশেষ মূল্যায়নে অংশ নেওয়া বাধ্যতামূলক।' : 'You are currently listed under academic and cultural development provisions. Regular presence in schedules and special seasonal evaluations is mandatory.'}</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <h4 className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {language === 'bn' ? 'আপনার ক্লাস রুটিন' : 'SCHEDULED TUTORIAL CLASSES'}
                </h4>
                
                {classes.filter(sc => student.departments.includes(sc.department)).length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">{language === 'bn' ? 'নিবন্ধিত কোনো ক্লাস সেশন শিডিউল নেই।' : 'No scheduled sessions match your enrolled ensembles currently.'}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {classes.filter(sc => student.departments.includes(sc.department)).map(sc => (
                      <div key={sc.id} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-sans font-bold text-xs text-slate-900 dark:text-slate-100">{sc.className}</span>
                            <span className="bg-indigo-500/15 text-indigo-400 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase">{sc.department}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 font-medium">{language === 'bn' ? 'শিক্ষক: ' : 'Instructor: '} {sc.trainerName}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500 border-t border-slate-200 dark:border-slate-800/60 pt-2 font-mono">
                          <span className="font-semibold text-sky-500">{sc.day}</span>
                          <span>•</span>
                          <span>{sc.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeSubTab === 'attendance' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-sans font-black text-sm uppercase text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-400" />
                  {language === 'bn' ? 'শ্রেণীকক্ষের উপস্থিতি লগ' : 'Classroom Attendance Timeline'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'bn' ? 'শিক্ষার্থীর শুক্রবার ও বিশেষ কার্যক্রমের উপস্থিতি বিস্তারিত তালিকা' : 'Complete historical ledger of marked attendance dates'}
                </p>
              </div>

              {/* Attendance metrics */}
              <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-4 font-mono text-center w-full sm:w-auto mt-3 sm:mt-0">
                <div className="bg-slate-50 dark:bg-slate-950 px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/60">
                  <span className="text-[9px] text-slate-400 block tracking-wider uppercase">{language === 'bn' ? 'উপস্থিত' : 'PRESENT'}</span>
                  <span className="text-xs font-bold text-emerald-500">{myAttendance.filter(r => r.status === 'Present').length}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/60">
                  <span className="text-[9px] text-slate-400 block tracking-wider uppercase">{language === 'bn' ? 'ছুটি' : 'LEAVE'}</span>
                  <span className="text-xs font-bold text-sky-400">{myAttendance.filter(r => r.status === 'Leave').length}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/60">
                  <span className="text-[9px] text-slate-400 block tracking-wider uppercase">{language === 'bn' ? 'অনুপস্থিত' : 'ABSENT'}</span>
                  <span className="text-xs font-bold text-rose-500">{myAttendance.filter(r => r.status === 'Absent').length}</span>
                </div>
              </div>
            </div>

            {myAttendance.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs italic">
                {language === 'bn' ? 'এখনো কোনো উপস্থিতির তথ্য নথিভুক্ত করা হয়নি।' : 'No marked school attendance days found in the database.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-sans font-bold">
                      <th className="py-3 px-4">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                      <th className="py-3 px-4">{language === 'bn' ? 'উপস্থিতির ধরণ' : 'Category'}</th>
                      <th className="py-3 px-4">{language === 'bn' ? 'পোর্টালে রুটিন' : 'Routine/Class'}</th>
                      <th className="py-3 px-4 text-right">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                    {myAttendance.map(record => (
                      <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition">
                        <td className="py-3.5 px-4 font-mono font-medium">{record.date}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold px-2 py-0.5 rounded text-[9px] tracking-wide text-slate-500 uppercase">
                            {record.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-350">
                          {classes.find(c => c.id === record.classId)?.className || record.classId}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`font-sans font-bold px-2.5 py-1 rounded-full text-[9px] uppercase ${
                            record.status === 'Present' 
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                              : record.status === 'Leave'
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-400/20'
                              : record.status === 'Late'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Fees Ledger Tab */}
        {activeSubTab === 'fees' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-sans font-black text-sm uppercase text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <CreditCard size={16} className="text-[#38bdf8]" />
                {language === 'bn' ? 'বেতন ও পরিশোধ হিসাবখাতা' : 'Fees & Accounts Invoicing Ledger'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn' ? 'আপনার পরিশোধিত অর্থ রসিদ ও বকেয়ার সামগ্রিক ব্যাংক ইনভয়েস হিসেব' : 'View payments made, dynamic receipts list, and monthly outstanding invoices'}
              </p>
            </div>

            {/* Pending payments alert */}
            {pendingInvoices.length > 0 && (
              <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                <div className="text-xs">
                  <p className="font-bold">{language === 'bn' ? 'আপনার বকেয়া ফি রয়েছে!' : 'Pending Unpaid Dues Detected!'}</p>
                  <p className="mt-1">{language === 'bn' ? `বর্তমানে আপনার মোট ৳${totalDueAmount} বকেয়া রয়েছে। অনুগ্রহ করে দ্রুত একাডেমী ক্যাশ কাউন্টার অথবা নির্ধারিত মোবাইল ব্যাংকিং এ ফি জমা দিন।` : `You have ${pendingInvoices.length} outstanding invoices totaling BDT ৳${totalDueAmount}. Please clear outstanding payments via executive desk or official bKash/Nagad routes.`}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400">
                {language === 'bn' ? 'লেনদেনের বিস্তারিত ইতিহাস' : 'COMPLETE TRANSACTION LEDGER RECORDS'}
              </h4>

              {myPayments.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs italic">
                  {language === 'bn' ? 'কোনো লেনদেন রেকর্ড পাওয়া যায়নি।' : 'No billing or payments historical logs found.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[650px]">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-sans font-bold">
                        <th className="py-3 px-4">{language === 'bn' ? 'রশিদ নং' : 'Receipt No.'}</th>
                        <th className="py-3 px-4">{language === 'bn' ? 'ফি বিবরণী' : 'Particulars'}</th>
                        <th className="py-3 px-4">{language === 'bn' ? 'সময়কাল' : 'Fiscal Term'}</th>
                        <th className="py-3 px-4">{language === 'bn' ? 'তারিখ' : 'Payment Date'}</th>
                        <th className="py-3 px-4">{language === 'bn' ? 'উৎস' : 'Method'}</th>
                        <th className="py-3 px-4 text-right">{language === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                        <th className="py-3 px-4 text-right">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                      {myPayments.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">{p.receiptNo}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">{p.feeType}</td>
                          <td className="py-3.5 px-4 text-slate-500">{p.month || '-'}</td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono">{p.paymentDate || '-'}</td>
                          <td className="py-3.5 px-4 font-mono uppercase font-semibold text-[10px] text-[#38bdf8]">
                            {p.paymentMethod || 'CASH'}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-right text-slate-900 dark:text-slate-100">
                            ৳{p.amount}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className={`font-sans font-bold px-2 py-0.5 rounded text-[9px] uppercase ${
                              p.status === 'Paid' 
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                : p.status === 'Due'
                                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notices Bulletin Tab */}
        {activeSubTab === 'notices' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-sans font-black text-sm uppercase text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <Bell size={16} className="text-amber-500" />
                {language === 'bn' ? 'একাডেমী নোটিশ ও ঘোষণা বোর্ড' : 'Academy Notices & Bulletin Board'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn' ? 'পারাবার সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম এর পক্ষ থেকে জারি করা জরুরি বিজ্ঞপ্তি ও নোটিশ' : 'Important notifications, evaluation timetables, and updates from the executive council'}
              </p>
            </div>

            {notifications.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs italic">
                {language === 'bn' ? 'নোটিশ বোর্ডে কোনো তথ্য নেই।' : 'No bulletins currently posted.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notifications.map(not => (
                  <div key={not.id} className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2.5">
                        <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                          not.type === 'due' 
                            ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                            : not.type === 'birthday'
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                            : 'bg-sky-500/10 text-[#38bdf8] border border-sky-400/20'
                        }`}>
                          {not.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{not.date}</span>
                      </div>
                      <h4 className="font-sans font-black text-sm text-slate-900 dark:text-slate-100 leading-snug">
                        {language === 'bn' ? not.titleBn : not.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {language === 'bn' ? not.messageBn : not.messageEn}
                      </p>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/50 flex items-center justify-between text-[10px] text-slate-450 font-sans tracking-wide">
                      <span>{language === 'bn' ? 'দপ্তর সম্পাদক, পারাবার সংসদ' : 'Office Secretary, Parabar Songsod'}</span>
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle size={12} />
                        {language === 'bn' ? 'ভ্যালিড নোটিশ' : 'Verified Notice'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
