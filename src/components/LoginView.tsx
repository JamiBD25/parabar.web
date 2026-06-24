import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Shield, User, Lock, ArrowRight, Sun, Moon, CheckCircle, BookOpen, Smartphone, MapPin, Award, Heart } from 'lucide-react';
import { ParabarLogo } from './ParabarLogo';

const getDeptLabel = (dept: string, lang: 'bn' | 'en') => {
  if (dept === 'Music') return lang === 'bn' ? 'সঙ্গীত' : 'Music';
  if (dept === 'Music (Khude Parabar)') return lang === 'bn' ? 'সঙ্গীত - খুদে পারাবার' : 'Music (Khude Parabar)';
  if (dept === 'Music (Kishore Parabar)') return lang === 'bn' ? 'সঙ্গীত - কিশোর পারাবার' : 'Music (Kishore Parabar)';
  if (dept === 'Fine Arts') return lang === 'bn' ? 'চারুকলা' : 'Fine Arts';
  if (dept === 'Dance') return lang === 'bn' ? 'নৃত্য' : 'Dance';
  if (dept === 'Recitation') return lang === 'bn' ? 'আবৃত্তি' : 'Recitation';
  if (dept === 'Theatre') return lang === 'bn' ? 'নাট্যকলা' : 'Theatre';
  return dept;
};

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
      alert(language === 'bn' ? 'দুঃখিত, কোনো ভুল হয়েছে!' : 'Sorry, something went wrong!');
    }
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-cream to-warm-secondary text-[#222222] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Decorative subtle patterns */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brand-green/3 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-brand-red/3 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Floating bar */}
      <header className="z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shadow-xs">
        <div className="flex items-center gap-2.5">
          <ParabarLogo size={36} />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wide text-brand-red font-sans uppercase leading-tight">
              {language === 'bn' ? 'পারাবার' : 'PARABAR'}
            </span>
            <span className="text-[7.5px] text-slate-850 font-sans tracking-[0.02em] font-black uppercase leading-none mt-0.5">
              {language === 'bn' ? 'সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম' : 'Sahittya Sangskriti Sangshad Chattogram'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggler */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded bg-slate-50 border border-slate-200 text-[#222222]"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Lang toggler */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="text-xs font-bold border border-slate-200 px-3 py-1.5 rounded bg-slate-50 text-text-gray hover:border-slate-350 hover:text-[#222222] select-none cursor-pointer"
          >
            {language === 'bn' ? 'ENGLISH' : 'বাংলা'}
          </button>
        </div>
      </header>

      {/* Main card */}
      <main className="z-10 flex-1 flex items-center justify-center p-4">
        {registeredStudent ? (
          <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-md text-center relative z-20 font-sans">
            <div className="inline-flex bg-emerald-50 p-4 rounded-full border border-emerald-200 text-brand-green mb-4 shadow-xs">
              <CheckCircle size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#222222] tracking-tight font-sans">
              {language === 'bn' ? 'নিবন্ধন সফল হয়েছে!' : 'Registration Completed!'}
            </h2>
            <p className="text-xs text-text-gray mt-2 font-medium">
              {language === 'bn' 
                ? 'পারাবার কালচারাল একাডেমিতে আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে।' 
                : 'Your student profile has been successfully compiled.'}
            </p>

            <div className="my-6 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 text-center">
              <p className="text-[10px] text-text-gray uppercase font-black tracking-widest leading-none font-sans">
                {language === 'bn' ? 'আপনার লগইন আইডি' : 'YOUR DIGITAL SCHOOL ID'}
              </p>
              <p className="text-2xl font-black text-brand-red tracking-widest font-mono select-all">
                {registeredStudent.id}
              </p>
              <p className="text-[10px] text-text-gray pt-1 border-t border-slate-100 mt-2 font-mono">
                {language === 'bn' ? `পাসওয়ার্ড/পিন: ${registeredStudent.password || 'student'}` : `Password/PIN: ${registeredStudent.password || 'student'}`}
              </p>
            </div>

            <p className="text-[11px] text-brand-red bg-red-50 py-2.5 px-3 rounded-lg border border-red-100 mb-6 font-semibold font-sans">
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
              className="w-full bg-brand-red hover:bg-[#991d1d] text-white font-sans font-bold text-xs tracking-wider py-3.5 rounded-xl cursor-pointer shadow transition"
            >
              {language === 'bn' ? 'এখনই লগইন করুন' : 'Proceed to Sign In Now'}
            </button>
          </div>
        ) : isRegistering ? (
          <div className="w-full max-w-lg bg-white border border-slate-200/95 rounded-2xl p-6 sm:p-8 shadow-md relative">
            <div className="absolute right-0 top-0 w-[150px] h-[150px] bg-brand-green/3 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="text-center mb-6">
              <div className="inline-flex bg-warm-cream p-3 rounded-full border border-slate-100 mb-2.5 text-brand-red shadow-inner font-sans">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#222222] tracking-tight font-sans">
                {language === 'bn' ? 'শিল্পী নিবন্ধন ফর্ম' : 'Artist Enrollment Register'}
              </h2>
              <p className="text-[11px] text-text-gray mt-0.5 font-sans font-semibold">
                {language === 'bn' 
                  ? 'পারাবার একাডেমিতে নতুন শিল্পী হিসেবে যোগ দিতে নিচের ফর্মটি পূরণ করুন' 
                  : 'Enroll and generate your digital academy profile in seconds'
                }
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'বাংলা নাম *' : 'Name in Bengali *'}
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="উদা: আরিয়ান রহমান"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'ইংরেজি নাম *' : 'Name in English *'}
                  </label>
                  <input
                    type="text"
                    value={regNameEn}
                    onChange={(e) => setRegNameEn(e.target.value)}
                    placeholder="e.g. Aryan Rahman"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'পিতার নাম' : "Father's Name"}
                  </label>
                  <input
                    type="text"
                    value={regFather}
                    onChange={(e) => setRegFather(e.target.value)}
                    placeholder="উদা: মো: আব্দুর রহমান"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none focus:border-brand-green shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'মাতার নাম' : "Mother's Name"}
                  </label>
                  <input
                    type="text"
                    value={regMother}
                    onChange={(e) => setRegMother(e.target.value)}
                    placeholder="উদা: খাদিজা বেগম"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none focus:border-brand-green shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] font-mono focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'পাসওয়ার্ড / সিকিউরিটি পিন *' : 'Password / Security PIN *'}
                  </label>
                  <input
                    type="text"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="e.g. secret"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] font-mono focus:outline-none focus:border-brand-green"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'শিক্ষা প্রতিষ্ঠান' : 'Institution'}
                  </label>
                  <input
                    type="text"
                    value={regInstitution}
                    onChange={(e) => setRegInstitution(e.target.value)}
                    placeholder="উদা: আইডিয়াল হাই স্কুল"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'শ্রেণী' : 'Academic Grade'}
                  </label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs text-[#222222] focus:outline-none focus:border-brand-green"
                  >
                    {['Playgroup', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'HSC 1st Yr', 'HSC 2nd Yr'].map(gr => <option key={gr} value={gr}>{gr}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'জন্ম তারিখ *' : 'Birthdate *'}
                  </label>
                  <input
                    type="date"
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] font-mono focus:outline-none focus:border-brand-green shadow-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                    {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
                  </label>
                  <select
                    value={regBlood}
                    onChange={(e) => setRegBlood(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none focus:border-brand-green"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-1 font-sans">
                  {language === 'bn' ? 'বর্তমান ঠিকানা' : 'Current Address'}
                </label>
                <textarea
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="উদা: যাত্রাবাড়ী, ঢাকা"
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-[#222222] focus:outline-none focus:border-brand-green shadow-xs"
                />
              </div>

              {/* Departments checklist selection */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-text-gray tracking-wider mb-2 font-sans">
                  {language === 'bn' ? 'ভর্তি হতে ইচ্ছুক বিভাগ (কমপক্ষে ১টি সিলেক্ট করুন) *' : 'Ensemble Departments (Select min 1) *'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Music (Khude Parabar)', 'Music (Kishore Parabar)', 'Fine Arts', 'Dance', 'Recitation', 'Theatre'].map(dept => {
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
                            ? 'bg-brand-red/10 border-brand-red/40 text-brand-red'
                            : 'bg-slate-50 border-slate-200 text-text-gray hover:border-slate-350'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-md flex items-center justify-center border font-sans text-[8px] ${
                          isChecked ? 'bg-brand-red text-white border-brand-red font-black' : 'border-slate-300'
                        }`}>
                          {isChecked && '✓'}
                        </span>
                        {getDeptLabel(dept, language)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-[#222222] font-sans font-bold text-xs py-3 rounded-xl border border-slate-200 cursor-pointer transition"
                >
                  {language === 'bn' ? 'ফিরে যান' : 'Back to Login'}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0F6A4B] hover:bg-[#0c543b] text-white font-sans font-bold text-xs py-3 rounded-xl shadow cursor-pointer transition"
                >
                  {language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Confirm Sign Up'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-md relative">
            <div className="text-center mb-6">
              <div className="inline-flex mb-2">
                <ParabarLogo size={90} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#222222] tracking-tight font-sans">
                {language === 'bn' ? 'স্বাগতম' : 'Welcome'}
              </h2>
              <p className="text-xs text-text-gray mt-1 max-w-xs mx-auto font-sans font-semibold">
                {language === 'bn' 
                  ? 'পারাবার সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম পরিচালনা পোর্টালে লগইন করুন' 
                  : 'Sign in to Parabar Sahittya Sangskriti Songsod Chattogram System'
                }
              </p>
            </div>

            {/* Toggle Tab */}
            <div className="grid grid-cols-2 bg-slate-50 border border-slate-200 p-1 rounded-xl mb-6">
              <button
                onClick={() => {
                  setRole('student');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-extrabold tracking-wide transition-all ${
                  role === 'student'
                    ? 'bg-white text-brand-red border border-slate-200 shadow-xs'
                    : 'text-text-gray hover:text-slate-800'
                }`}
              >
                <User size={14} />
                {language === 'bn' ? 'শিল্পী লগইন' : 'Artist'}
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-extrabold tracking-wide transition-all ${
                  role === 'admin'
                    ? 'bg-white text-brand-red border border-slate-200 shadow-xs'
                    : 'text-text-gray hover:text-slate-800'
                }`}
              >
                <Shield size={14} />
                {language === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin'}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-extrabold text-[#222222] uppercase tracking-wider mb-1.5">
                  {role === 'admin' 
                    ? (language === 'bn' ? 'অ্যাডমিন ইমেইল' : 'Admin Email Address')
                    : (language === 'bn' ? 'শিল্পী আইডি বা মোবাইল নম্বর' : 'Artist ID or Registered Mobile')
                  }
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    {role === 'admin' ? <Shield size={15} /> : <User size={15} />}
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={role === 'admin' ? 'rana@parabar.org' : 'PAR-2026-001'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans tracking-wide text-[#222222] focus:outline-none focus:border-brand-green placeholder-slate-400 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold text-[#222222] uppercase tracking-wider mb-1.5">
                  {language === 'bn' ? 'পাসওয়ার্ড বা সিকিউরিটি পিন' : 'Password or PIN Code'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock size={15} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans tracking-widest text-[#222222] focus:outline-none focus:border-brand-green placeholder-slate-400 shadow-xs"
                  />
                </div>
              </div>

              {error && (
                <div className="text-brand-red text-xs bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-center font-bold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-red hover:bg-[#991d1d] text-white font-sans font-extrabold text-xs tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-205 shadow cursor-pointer text-center justify-center font-bold"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
                className="text-xs text-brand-green hover:text-brand-red font-extrabold underline transition select-none cursor-pointer font-sans"
              >
                {language === 'bn' ? 'নতুন শিল্পী অ্যাকাউন্ট রেজিস্টার করুন' : 'Register New Artist Account'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer credit */}
      <footer className="z-10 text-center py-4 text-[10px] text-text-gray border-t border-slate-200 bg-white">
        <p>© 2026 Parabar Sahittya Sangskriti Songsod Chattogram • {language === 'bn' ? 'সকল সত্ত্ব সংরক্ষিত' : 'All Rights Reserved'}</p>
      </footer>
    </div>
  );
};
