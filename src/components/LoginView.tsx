import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Shield, User, Lock, ArrowRight, Sun, Moon, CheckCircle, BookOpen, Smartphone, MapPin, Award, Heart } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginUser, addArtist, language, setLanguage, theme, setTheme, t } = useApp();

  const [role, setRole] = useState<'admin' | 'student'>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Registration form states
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regNameEn, setRegNameEn] = useState('');
  const [regFather, setRegFather] = useState('');
  const [regMother, setRegMother] = useState('');
  const [regDob, setRegDob] = useState('2015-01-01');
  const [regBlood, setRegBlood] = useState('O+');
  const [regMobile, setRegMobile] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regInstitution, setRegInstitution] = useState('');
  const [regGrade, setRegGrade] = useState('Class 5');
  const [regDepts, setRegDepts] = useState<string[]>([]);
  const [regPassword, setRegPassword] = useState('student');
  const [registeredStudent, setRegisteredStudent] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError(
        language === 'bn'
          ? 'অনুগ্রহ করে আইডি/ইমেইল এবং পাসওয়ার্ড দিন'
          : 'Please enter ID/Email & Password'
      );
      return;
    }

    setLoading(true);
    setError('');

    // Small delay to simulate nice authorization handshake
    setTimeout(() => {
      const res = loginUser(identifier, password);
      setLoading(false);
      if (!res.success) {
        setError(language === 'bn' ? res.errorBn || '' : res.errorEn || '');
      }
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regNameEn.trim() || !regMobile.trim()) {
      alert(language === 'bn' ? 'দয়া করে আপনার বাংলা নাম, ইংরেজি নাম এবং মোবাইল নম্বর দিন।' : 'Please enter your Bengali Name, English Name, and Mobile Number.');
      return;
    }
    if (regDepts.length === 0) {
      alert(language === 'bn' ? 'অনুগ্রহ করে অন্তত একটি বিভাগ নির্বাচন করুন।' : 'Please select at least one department.');
      return;
    }

    const payload = {
      name: regName,
      nameEn: regNameEn,
      fatherName: regFather,
      motherName: regMother,
      dob: regDob,
      bloodGroup: regBlood,
      mobile: regMobile,
      address: regAddress,
      institution: regInstitution,
      grade: regGrade,
      departments: regDepts,
      status: 'Active' as const,
      password: regPassword || 'student',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces'
    };

    try {
      const newArtist = addArtist(payload);
      setRegisteredStudent(newArtist);
      // Reset fields
      setRegName('');
      setRegNameEn('');
      setRegFather('');
      setRegMother('');
      setRegDob('2015-01-01');
      setRegBlood('O+');
      setRegMobile('');
      setRegAddress('');
      setRegInstitution('');
      setRegGrade('Class 5');
      setRegDepts([]);
      setRegPassword('student');
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'দুঃখিত, কোনো ত্রুটি ঘটেছে।' : 'An error occurred during sign up.');
    }
  };

  const handleFillDemo = (id: string, pass: string, sampleRole: 'admin' | 'student') => {
    setRole(sampleRole);
    setIdentifier(id);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Decorative blurry backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Floating bar */}
      <header className="z-10 flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950/20 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#38bdf8] p-1.5 rounded text-[#0f172a] font-bold">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="text-sm font-black tracking-wider text-[#38bdf8]">PARABAR</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggler */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-sky-400"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Lang toggler */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="text-xs font-bold border border-slate-800 px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:border-slate-700 select-none cursor-pointer"
          >
            {language === 'bn' ? 'ENGLISH' : 'বাংলা'}
          </button>
        </div>
      </header>

      {/* Main card */}
      <main className="z-10 flex-1 flex items-center justify-center p-4">
        {registeredStudent ? (
          <div className="w-full max-w-md bg-[#0f172a]/95 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl text-center backdrop-blur-xl relative z-20 font-sans">
            <div className="inline-flex bg-emerald-500/15 p-4 rounded-full border border-emerald-500/30 text-emerald-400 mb-4 shadow-inner">
              <CheckCircle size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              {language === 'bn' ? 'নিবন্ধন সফল হয়েছে!' : 'Registration Completed!'}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              {language === 'bn' 
                ? 'পারাবার কালচারাল একাডেমিতে আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে।' 
                : 'Your student profile has been successfully compiled.'}
            </p>

            <div className="my-6 bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-2">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none font-sans">
                {language === 'bn' ? 'আপনার লগইন আইডি' : 'YOUR DIGITAL SCHOOL ID'}
              </p>
              <p className="text-2xl font-black text-[#38bdf8] tracking-widest font-mono select-all">
                {registeredStudent.id}
              </p>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-900 mt-2 font-mono">
                {language === 'bn' ? `পাসওয়ার্ড/পিন: ${registeredStudent.password || 'student'}` : `Password/PIN: ${registeredStudent.password || 'student'}`}
              </p>
            </div>

            <p className="text-[11px] text-rose-400 bg-rose-500/5 py-2 px-3 rounded-lg border border-rose-500/10 mb-6 font-medium font-sans">
              ⚠️ {language === 'bn' ? 'অনুগ্রহ করে আইডিটি লিখে রাখুন। এই আইডি দিয়ে আপনাকে লগইন করতে হবে।' : 'IMPORTANT: Please copy your ID immediately. You will need this ID to log in.'}
            </p>

            <button
              onClick={() => {
                // Pre-fill the login form with the newly registered credentials
                setIdentifier(registeredStudent.id);
                setPassword(registeredStudent.password || 'student');
                setRole('student');
                setRegisteredStudent(null);
                setIsRegistering(false);
              }}
              className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-sans font-bold text-xs tracking-wider py-3.5 rounded-xl cursor-pointer shadow-lg shadow-sky-500/10 transition"
            >
              {language === 'bn' ? 'এখনই লগইন করুন' : 'Proceed to Sign In Now'}
            </button>
          </div>
        ) : isRegistering ? (
          <div className="w-full max-w-lg bg-[#0f172a]/95 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            <div className="absolute right-0 top-0 w-[150px] h-[150px] bg-[#38bdf8]/5 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="text-center mb-6">
              <div className="inline-flex bg-slate-950/80 p-3 rounded-full border border-slate-805 mb-2.5 text-[#38bdf8] shadow-inner font-sans">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight font-sans">
                {language === 'bn' ? 'শিক্ষার্থী নিবন্ধন ফর্ম' : 'Student Enrollment Register'}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                {language === 'bn' 
                  ? 'পারাবার একাডেমিতে নতুন শিক্ষার্থী হিসেবে যোগ দিতে নিচের ফর্মটি পূরণ করুন' 
                  : 'Enroll and generate your digital academy profile in seconds'
                }
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'বাংলা নাম *' : 'Name in Bengali *'}
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="উদা: আরিয়ান রহমান"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-[#38bdf8] focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'ইংরেজি নাম *' : 'Name in English *'}
                  </label>
                  <input
                    type="text"
                    value={regNameEn}
                    onChange={(e) => setRegNameEn(e.target.value)}
                    placeholder="e.g. Aryan Rahman"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-[#38bdf8] focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'পিতার নাম' : "Father's Name"}
                  </label>
                  <input
                    type="text"
                    value={regFather}
                    onChange={(e) => setRegFather(e.target.value)}
                    placeholder="উদা: মো: আব্দুর রহমান"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-sky-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'মাতার নাম' : "Mother's Name"}
                  </label>
                  <input
                    type="text"
                    value={regMother}
                    onChange={(e) => setRegMother(e.target.value)}
                    placeholder="উদা: খাদিজা বেগম"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-sky-500 shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-[#38bdf8] font-mono focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'পাসওয়ার্ড / সিকিউরিটি পিন *' : 'Password / Security PIN *'}
                  </label>
                  <input
                    type="text"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="e.g. secret"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-[#38bdf8] font-mono focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'শিক্ষা প্রতিষ্ঠান' : 'Institution'}
                  </label>
                  <input
                    type="text"
                    value={regInstitution}
                    onChange={(e) => setRegInstitution(e.target.value)}
                    placeholder="উদা: আইডিয়াল হাই স্কুল"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'শ্রেণী' : 'Academic Grade'}
                  </label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 text-xs text-slate-300 focus:outline-none"
                  >
                    {['Playgroup', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'HSC 1st Yr', 'HSC 2nd Yr'].map(gr => <option key={gr} value={gr}>{gr}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'জন্ম তারিখ *' : 'Birthdate *'}
                  </label>
                  <input
                    type="date"
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 font-mono focus:outline-none shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
                  </label>
                  <select
                    value={regBlood}
                    onChange={(e) => setRegBlood(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                  {language === 'bn' ? 'বর্তমান ঠিকানা' : 'Current Address'}
                </label>
                <textarea
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="উদা: যাত্রাবাড়ী, ঢাকা"
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none shadow-inner"
                />
              </div>

              {/* Departments checklist selection */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 font-sans">
                  {language === 'bn' ? 'ভর্তি হতে ইচ্ছুক বিভাগ (কমপক্ষে ১টি সিলেক্ট করুন) *' : 'Ensemble Departments (Select min 1) *'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Music', 'Fine Arts', 'Dance', 'Recitation', 'Theatre'].map(dept => {
                    const isChecked = regDepts.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            setRegDepts(regDepts.filter(d => d !== dept));
                          } else {
                            setRegDepts([...regDepts, dept]);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold uppercase transition select-none cursor-pointer ${
                          isChecked
                            ? 'bg-sky-500/10 border-sky-450 text-[#38bdf8]'
                            : 'bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-md flex items-center justify-center border font-sans text-[8px] ${
                          isChecked ? 'bg-sky-500 text-slate-950 border-sky-400 font-black' : 'border-slate-800'
                        }`}>
                          {isChecked && '✓'}
                        </span>
                        {dept}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-sans font-bold text-xs py-3 rounded-xl border border-slate-800 cursor-pointer transition"
                >
                  {language === 'bn' ? 'ফিরে যান' : 'Back to Login'}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-450 hover:to-indigo-455 text-slate-950 font-sans font-bold text-xs py-3 rounded-xl shadow-lg shadow-sky-500/10 cursor-pointer transition"
                >
                  {language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Confirm Sign Up'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-md bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            <div className="text-center mb-6">
              <div className="inline-flex bg-slate-950/80 p-3 rounded-full border border-slate-805 mb-4 text-[#38bdf8] shadow-inner">
                <Sparkles size={24} className="animate-pulse" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                {language === 'bn' ? 'স্বাগতম' : 'Welcome'}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto font-sans">
                {language === 'bn' 
                  ? 'পারাবার শিল্পী উন্নয়ন ও একাডেমী পরিচালনা পোর্টালে লগইন করুন' 
                  : 'Sign in to Parabar Artist Development & Academy System'
                }
              </p>
            </div>

            {/* Toggle Tab */}
            <div className="grid grid-cols-2 bg-slate-950 border border-slate-800/60 p-1.5 rounded-xl mb-6">
              <button
                onClick={() => {
                  setRole('student');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  role === 'student'
                    ? 'bg-slate-800 text-[#38bdf8] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User size={14} />
                {language === 'bn' ? 'শিক্ষার্থী লগইন' : 'Student'}
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  role === 'admin'
                    ? 'bg-slate-800 text-[#38bdf8] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield size={14} />
                {language === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin'}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {role === 'admin' 
                    ? (language === 'bn' ? 'অ্যাডমিন ইমেইল' : 'Admin Email Address')
                    : (language === 'bn' ? 'শিক্ষার্থী আইডি বা মোবাইল নম্বর' : 'Student ID or Registered Mobile')
                  }
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    {role === 'admin' ? <Shield size={15} /> : <User size={15} />}
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={role === 'admin' ? 'rana@parabar.org' : 'PAR-2026-001'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans tracking-wide text-[#38bdf8] focus:outline-none focus:border-sky-500 placeholder-slate-600 font-mono shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'bn' ? 'পাসওয়ার্ড বা সিকিউরিটি পিন' : 'Password or PIN Code'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock size={15} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans tracking-widest text-[#38bdf8] focus:outline-none focus:border-sky-500 placeholder-slate-600 font-mono shadow-inner"
                  />
                </div>
              </div>

              {error && (
                <div className="text-rose-500 text-xs bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-sans font-bold text-xs tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-sky-500/10 cursor-pointer text-center justify-center"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    {language === 'bn' ? 'পোর্টালে প্রবেশ করুন' : 'Sign In Now'}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                }}
                className="text-xs text-sky-400 hover:text-sky-300 font-bold underline transition select-none cursor-pointer font-sans"
              >
                {language === 'bn' ? 'নতুন শিক্ষার্থী অ্যাকাউন্ট রেজিস্টার করুন' : 'Register New Student Account'}
              </button>
            </div>

            {/* Quick Demo Assist details */}
            <div className="mt-6 pt-5 border-t border-slate-900">
              <p className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-widest text-center mb-3">
                {language === 'bn' ? 'পরীক্ষামূলক ডেমো ক্রেডেনশিয়াল' : 'QUICK TESTING ACCOUNTS'}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleFillDemo('rana@parabar.org', '1234', 'admin')}
                  className="w-full flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg text-[10px] text-slate-400 border border-slate-900 hover:border-slate-800 transition font-mono"
                >
                  <span>🔑 Admin: <span className="text-[#38bdf8] font-bold">rana@parabar.org</span></span>
                  <span className="bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded uppercase font-black font-mono">PIN: 1234</span>
                </button>
                <button
                  onClick={() => handleFillDemo('PAR-2026-001', 'student', 'student')}
                  className="w-full flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg text-[10px] text-slate-400 border border-slate-900 hover:border-slate-800 transition font-mono"
                >
                  <span>🎓 Student: <span className="text-[#38bdf8] font-bold font-mono">PAR-2026-001</span></span>
                  <span className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-black font-mono">PASS: student</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer credit */}
      <footer className="z-10 text-center py-4 text-[10px] text-slate-600 border-t border-slate-950">
        <p>© 2026 Parabar Cultural Foundation • {language === 'bn' ? 'সকল সত্ত্ব সংরক্ষিত' : 'All Rights Reserved'}</p>
      </footer>
    </div>
  );
};
