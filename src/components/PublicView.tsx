import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ParabarLogo } from './ParabarLogo';
import { LoginView } from './LoginView';
import { 
  BookOpen, Users, MapPin, Compass, ArrowRight, CheckCircle, 
  Award, Heart, Phone, Mail, Globe, Menu, X, Sparkles, GraduationCap,
  Calendar, Shield, Play, HelpCircle, ChevronRight, Facebook, Youtube, Clock
} from 'lucide-react';

interface PublicViewProps {
  onEnterERP: () => void;
  activePublicTab: 'home' | 'about' | 'committee' | 'branches' | 'activities' | 'login';
  setActivePublicTab: (tab: 'home' | 'about' | 'committee' | 'branches' | 'activities' | 'login') => void;
}

export const PublicView: React.FC<PublicViewProps> = ({
  onEnterERP,
  activePublicTab,
  setActivePublicTab
}) => {
  const { language, setLanguage, theme, setTheme, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState('');
  const [branchFilterActivity, setBranchFilterActivity] = useState('');

  // Committee data (Bilingual)
  const committeeMembers = [
    {
      nameBn: 'ড. আকমল হোসেন',
      nameEn: 'Dr. Akmal Hossain',
      roleBn: 'সভাপতি',
      roleEn: 'President',
      phone: '+880 1711-234567',
      email: 'akmal@parabar.org',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    {
      nameBn: 'অধ্যাপক মোস্তফা রানা',
      nameEn: 'Prof. Mostafa Rana',
      roleBn: 'সহ-সভাপতি',
      roleEn: 'Vice President',
      phone: '+880 1819-345678',
      email: 'rana@parabar.org',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    },
    {
      nameBn: 'মাহবুবুর রহমান',
      nameEn: 'Mahbubur Rahman',
      roleBn: 'সাধারণ সম্পাদক',
      roleEn: 'General Secretary',
      phone: '+880 1552-456789',
      email: 'mahbub@parabar.org',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    {
      nameBn: 'আরিফুল ইসলাম',
      nameEn: 'Ariful Islam',
      roleBn: 'সহ-সাধারণ সম্পাদক',
      roleEn: 'Joint General Secretary',
      phone: '+880 1911-567890',
      email: 'ariful@parabar.org',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop'
    },
    {
      nameBn: 'ওমর ফারুক',
      nameEn: 'Omar Faruq',
      roleBn: 'অর্থ সম্পাদক',
      roleEn: 'Treasurer / Finance Secretary',
      phone: '+880 1675-678901',
      email: 'faruq@parabar.org',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop'
    },
    {
      nameBn: 'সাজ্জাদুল ইসলাম',
      nameEn: 'Sajjadul Islam',
      roleBn: 'সাংগঠনিক সম্পাদক',
      roleEn: 'Organizing Secretary',
      phone: '+880 1712-789012',
      email: 'sajjad@parabar.org',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop'
    },
    {
      nameBn: 'মঈনুল হাসান',
      nameEn: 'Moinul Hasan',
      roleBn: 'সাংস্কৃতিক সম্পাদক',
      roleEn: 'Cultural Secretary',
      phone: '+880 1812-890123',
      email: 'moinul@parabar.org',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
    }
  ];

  // Branches data (Bilingual)
  const branches = [
    {
      id: 'dewanhat',
      nameBn: '১) পারাবার শিল্পীগোষ্ঠী (প্রধান কার্যালয় - দেওয়ানহাট)',
      nameEn: '1) Parabar Shilpigoshthi (Head Office - Dewanhat)',
      addressBn: 'ডি.টি. রোড, দেওয়ানহাট, চট্টগ্রাম-৪১০০।',
      addressEn: 'D.T. Road, Dewanhat, Chattogram-4100',
      established: '2012',
      phone: '01836-776227',
      managerBn: 'পরিচালনা পর্ষদ',
      managerEn: 'Executive Board',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
      scheduleBn: 'শুক্রবার ও শনিবার: সকাল ০৮:৩০ – ১১:৩০',
      scheduleEn: 'Friday & Saturday: 08:30 AM - 11:30 AM',
      activitiesBn: 'কণ্ঠসঙ্গীত, চারুকলা অঙ্কন, শুদ্ধ উচ্চারণ ও আবৃত্তি, শিশু নাট্যকলা',
      activitiesEn: 'Vocal, Fine Arts, Recitation, Children\'s Theatre',
      facebook: 'Parabar Shilpigoshthi',
      facebookUrl: 'https://www.facebook.com/share/1cKiiEBNWu/'
    },
    {
      id: 'patenga',
      nameBn: '২) সৈকত সাহিত্য সাংস্কৃতিক সংসদ (পতেঙ্গা শাখা)',
      nameEn: '2) Soikat Sahittya Sangskriti Sangshad (Patenga Branch)',
      addressBn: 'কাঠগড়, পতেঙ্গা, চট্টগ্রাম।',
      addressEn: 'Kathgora, Patenga, Chattogram',
      established: '2015',
      phone: '01862-065224',
      managerBn: 'পরিচালনা পর্ষদ',
      managerEn: 'Executive Board',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=400&fit=crop',
      scheduleBn: 'শুক্রবার: সকাল ০৯:০০ – ১২:০০, শনিবার: বিকাল ০৩:৩০ – ০৫:৩০',
      scheduleEn: 'Friday: 09:00 AM - 12:00 PM, Saturday: 03:30 PM - 05:30 PM',
      activitiesBn: 'কণ্ঠসঙ্গীত, চারুকলা অঙ্কন, শুদ্ধ উচ্চারণ',
      activitiesEn: 'Vocal, Fine Arts, Standard Pronunciation',
      facebook: 'সৈকত সাহিত্য সাংস্কৃতিক সংসদ চট্টগ্রাম',
      facebookUrl: 'https://www.facebook.com/share/1BPg8KWrbt/',
      youtube: 'Soikat TV'
    },
    {
      id: 'halishahar',
      nameBn: '৩) হালিশহর শাখা (কিশলয় আর্ট এন্ড কালচারাল একাডেমি)',
      nameEn: '3) Halishahar Branch (Kisholoy Art & Cultural Academy)',
      addressBn: 'গ্রিনল্যান্ড স্কুল এন্ড কলেজ, এল ব্লক, হালিশহর, চট্টগ্রাম।',
      addressEn: 'Greenland School & College, L-Block, Halishahar, Chattogram',
      established: '2016',
      phone: '01862-849913',
      managerBn: 'আরিফুল ইসলাম',
      managerEn: 'Ariful Islam',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
      scheduleBn: 'শুক্রবার: সকাল ০৯:০০ – ১২:০০, শনিবার: বিকাল ০৩:০০ – ০৫:০০',
      scheduleEn: 'Friday: 09:00 AM - 12:00 PM, Saturday: 03:00 PM - 05:00 PM',
      activitiesBn: 'কণ্ঠসঙ্গীত, চারুকলা অঙ্কন, ক্যালিগ্রাফি, সুন্দর হাতের লেখা',
      activitiesEn: 'Vocal, Drawing, Calligraphy, Beautiful Handwriting',
      facebook: 'কিশলয় আর্ট এন্ড কালচারাল একাডেমি',
      facebookUrl: 'https://www.facebook.com/share/1CJcUwwqTo/'
    },
    {
      id: 'chawkbazar',
      nameBn: '৪) চকবাজার শাখা (কলকাকলি সুর ও চিত্রাঙ্কন একাডেমি)',
      nameEn: '4) Chawkbazar Branch (Kolkakoli Sur & Chitrankon Academy)',
      addressBn: 'কেয়ারী প্লাজা সংলগ্ন রোড, চকবাজার, চট্টগ্রাম।',
      addressEn: 'Near Qaree Plaza, Chawkbazar, Chattogram',
      established: '2018',
      phone: '01712-789012',
      managerBn: 'সাজ্জাদুল ইসলাম',
      managerEn: 'Sajjadul Islam',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
      scheduleBn: 'শুক্রবার: সকাল ০৮:৩০ – ১১:৩০, শনিবার: বিকাল ০৪:০০ – ০৬:০০',
      scheduleEn: 'Friday: 08:30 AM - 11:30 AM, Saturday: 04:00 PM - 06:00 PM',
      activitiesBn: 'চারুকলা অঙ্কন, ক্যালিগ্রাফি, শুদ্ধ উচ্চারণ',
      activitiesEn: 'Fine Arts, Calligraphy, Standard Pronunciation',
      facebook: 'কলকাকলি সুর ও চিত্রাঙ্কন একাডেমি',
      facebookUrl: 'https://www.facebook.com/'
    },
    {
      id: 'agrabad',
      nameBn: '৫) আগ্রাবাদ শাখা (বর্ণমালা শিশু কানন)',
      nameEn: '5) Agrabad Branch (Bornomala Shishu Kanon)',
      addressBn: 'সিডিএ আবাসিক এলাকা, রোড নং-০৩, আগ্রাবাদ, চট্টগ্রাম।',
      addressEn: 'CDA Residential Area, Road-03, Agrabad, Chattogram',
      established: '2020',
      phone: '01812-890123',
      managerBn: 'মঈনুল হাসান',
      managerEn: 'Moinul Hasan',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop',
      scheduleBn: 'শুক্রবার: সকাল ০৯:০০ – ১২:০০, রবিবার: বিকাল ০৩:৩০ – ০৫:৩০',
      scheduleEn: 'Friday: 09:00 AM - 12:00 PM, Sunday: 03:30 PM - 05:30 PM',
      activitiesBn: 'কণ্ঠসঙ্গীত, চারুকলা অঙ্কন, শিশু নাট্যকলা, ক্যালিগ্রাফি',
      activitiesEn: 'Vocal, Fine Arts, Theatre, Calligraphy',
      facebook: 'বর্ণমালা শিশু কানন',
      facebookUrl: 'https://www.facebook.com/'
    }
  ];

  // Activities / Work data (Bilingual)
  const activities = [
    {
      titleBn: 'সঙ্গীত একাডেমি (কণ্ঠসঙ্গীত)',
      titleEn: 'Music Academy (Vocal)',
      descBn: 'শিশু-কিশোরদের কণ্ঠশীলন, রবীন্দ্র-নজরুল সঙ্গীত, দেশাত্মবোধক গান এবং ঐতিহ্যবাহী লোক সঙ্গীতের বিশেষ প্রশিক্ষণ দেয়া হয়।',
      descEn: 'Specialized training in vocals, Rabindra Sangeet, Nazrul Geeti, patriotic tracks, and traditional folk music.',
      icon: <GraduationCap className="text-[#0F6A4B] dark:text-emerald-400 w-8 h-8" />
    },
    {
      titleBn: 'চারুকলা ও অঙ্কন কর্মশালা',
      titleEn: 'Fine Arts & Drawing Workshops',
      descBn: 'শিশুদের মননশীলতা বাড়াতে জলরং, স্কেচ, পেন্সিল স্কেচ, এবং পেস্টেল কালারের মাধ্যমে ক্যানভাসে ছবি আঁকার আধুনিক কলাকৌশল শেখানো হয়।',
      descEn: 'Modern painting techniques, watercolor, canvas sketching, and pastel drawing workshops designed to unleash children’s creative expressions.',
      icon: <BookOpen className="text-[#B22222] dark:text-red-400 w-8 h-8" />
    },
    {
      titleBn: 'শুদ্ধ উচ্চারণ ও আবৃত্তি প্রশিক্ষণ',
      titleEn: 'Elocution & Recitation Training',
      descBn: 'বাংলা শব্দের সঠিক ও প্রমিত উচ্চারণ, বাচনভঙ্গি উন্নয়ন, জড়তা দূরীকরণ এবং দেশবরেণ্য কবিদের কালজয়ী কবিতার আবৃত্তি প্রশিক্ষণ দেওয়া হয়।',
      descEn: 'Correct and standardized Bengali pronunciation, voice modulation, stage performance confidence building, and recitation of timeless classical poems.',
      icon: <Compass className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
    },
    {
      titleBn: 'সৃজনশীল শিশু নাট্যকলা',
      titleEn: 'Creative Children’s Theatre',
      descBn: 'অভিনয় কুশলতা, চরিত্র ফুটিয়ে তোলার নান্দনিক কৌশল এবং শিক্ষণীয় ও সচেতনতামূলক নাটক নাটক মঞ্চায়নের জন্য বিশেষ দলগত প্রশিক্ষণ দেওয়া হয়।',
      descEn: 'Acting techniques, screenplays, character execution, and creative stage plays designed to increase awareness and boost artistic intellect.',
      icon: <Users className="text-[#0F6A4B] dark:text-emerald-400 w-8 h-8" />
    }
  ];

  const featuresList = [
    {
      bn: 'প্রমিত উচ্চারণ শিক্ষা প্রদান।',
      en: 'Providing standard pronunciation tutoring.'
    },
    {
      bn: 'দক্ষ প্রশিক্ষক দ্বারা নিয়মিত প্রশিক্ষণ প্রদান।',
      en: 'Regular training sessions conducted by highly skilled instructors.'
    },
    {
      bn: '৩ বছর মেয়াদি নিজস্ব চিত্রাঙ্কন সিলেবাস।',
      en: 'A 3-year proprietary syllabus specifically designed for painting.'
    },
    {
      bn: 'জেলা শিল্পকলা একাডেমি/ শিশু-একাডেমির দক্ষ শিল্পী দ্বারা চিত্রাঙ্কন ক্লাস পরিচালনা।',
      en: 'Art classes facilitated by expert artists from District Shilpakala Academy and Shishu Academy.'
    },
    {
      bn: 'হাতে ধরে ধরে চিত্রাঙ্কন প্রশিক্ষণ প্রদান।',
      en: 'Hands-on personalized guidance for painting training.'
    },
    {
      bn: 'নিয়মিত একক ও দলীয় প্রোডাকশন তৈরী।',
      en: 'Creating regular solo and group cultural productions.'
    },
    {
      bn: 'বিভিন্ন জাতীয় প্রতিযোগিতায় অংশগ্রহণ করানো।',
      en: 'Facilitating participation in various national-level competitions.'
    },
    {
      bn: 'নিয়মিত বিভিন্ন সাংস্কৃতিক প্রতিযোগিতার আয়োজন।',
      en: 'Organizing regular cultural competitions to foster healthy rivalry.'
    },
    {
      bn: 'মঞ্চ ও টিভি প্রোগ্রামে অংশগ্রহণের সুযোগ।',
      en: 'Opportunities to perform on prestigious stage and television programs.'
    },
    {
      bn: 'সংগীত, আবৃত্তি ও অভিনয়সহ বিভিন্ন বিষয়ে কর্মশালার সুযোগ ও সনদপত্র প্রদান',
      en: 'Offering training workshops in music, recitation, acting, and awarding certificates.'
    },
    {
      bn: 'বিভিন্ন সামাজিক অনুষ্ঠানে মনোজ্ঞ সাংস্কৃতিক পরিবেশনা করা হয়।',
      en: 'Presenting beautiful cultural performances at various social ceremonies.'
    }
  ];

  const handleTabClick = (tab: 'home' | 'about' | 'committee' | 'branches' | 'activities' | 'login') => {
    setActivePublicTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} font-sans antialiased flex flex-col justify-between transition-colors duration-250`}>
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('home')}>
            <ParabarLogo size={42} />
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wide text-[#B22222] font-sans uppercase leading-tight">
                {language === 'bn' ? 'পারাবার' : 'PARABAR'}
              </span>
              <span className="text-[8.5px] text-slate-600 dark:text-slate-400 font-sans tracking-[0.01em] font-black uppercase leading-none mt-0.5">
                {language === 'bn' ? 'শিল্পীগোষ্ঠী' : 'SHILPIGOSTI'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs lg:text-sm font-extrabold font-sans">
            <button
              id="menu-home-btn"
              onClick={() => handleTabClick('home')}
              className={`px-3 py-2 rounded-xl transition ${
                activePublicTab === 'home'
                  ? 'bg-emerald-500/10 text-[#0F6A4B] dark:text-emerald-400 dark:bg-emerald-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'নীড়পাতা' : 'Home'}
            </button>
            <button
              id="menu-about-btn"
              onClick={() => handleTabClick('about')}
              className={`px-3 py-2 rounded-xl transition ${
                activePublicTab === 'about'
                  ? 'bg-emerald-500/10 text-[#0F6A4B] dark:text-emerald-400 dark:bg-emerald-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'পরিচিতি' : 'About'}
            </button>
            <button
              id="menu-committee-btn"
              onClick={() => handleTabClick('committee')}
              className={`px-3 py-2 rounded-xl transition ${
                activePublicTab === 'committee'
                  ? 'bg-emerald-500/10 text-[#0F6A4B] dark:text-emerald-400 dark:bg-emerald-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'পরিচালনা পরিষদ' : 'Committee'}
            </button>
            <button
              id="menu-branches-btn"
              onClick={() => handleTabClick('branches')}
              className={`px-3 py-2 rounded-xl transition ${
                activePublicTab === 'branches'
                  ? 'bg-emerald-500/10 text-[#0F6A4B] dark:text-emerald-400 dark:bg-emerald-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'শাখা সমূহ' : 'Our Branches'}
            </button>
            <button
              id="menu-activities-btn"
              onClick={() => handleTabClick('activities')}
              className={`px-3 py-2 rounded-xl transition ${
                activePublicTab === 'activities'
                  ? 'bg-emerald-500/10 text-[#0F6A4B] dark:text-emerald-400 dark:bg-emerald-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'কার্যক্রম' : 'Work'}
            </button>
          </nav>

          {/* Action buttons (Theme, Lang, Login) */}
          <div className="hidden md:flex items-center gap-3">
            {/* ERP / Log In Button */}
            {currentUser ? (
              <button
                id="header-erp-btn"
                onClick={onEnterERP}
                className="bg-[#0F6A4B] hover:bg-[#0b4f38] text-white font-sans font-bold text-xs tracking-wider px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 shadow-sm transition"
              >
                <span>{language === 'bn' ? 'ড্যাশবোর্ডে প্রবেশ' : 'Go to ERP Portal'}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => handleTabClick('login')}
                className={`font-sans font-extrabold text-xs tracking-wider px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition ${
                  activePublicTab === 'login'
                    ? 'bg-[#B22222] hover:bg-[#991d1d] text-white'
                    : 'bg-[#B22222] hover:bg-[#991d1d] text-white shadow-sm'
                }`}
              >
                <span>{language === 'bn' ? 'লগ ইন / পোর্টালে যান' : 'Log In / Portal'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 absolute top-20 w-full z-30 shadow-lg px-4 py-6 space-y-3.5 transition-all duration-200 font-sans font-extrabold text-sm">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between ${
              activePublicTab === 'home' ? 'bg-emerald-50 text-[#0F6A4B] dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{language === 'bn' ? 'নীড়পাতা' : 'Home'}</span>
            <ChevronRight size={15} />
          </button>
          <button
            onClick={() => handleTabClick('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between ${
              activePublicTab === 'about' ? 'bg-emerald-50 text-[#0F6A4B] dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{language === 'bn' ? 'পরিচিতি' : 'About'}</span>
            <ChevronRight size={15} />
          </button>
          <button
            onClick={() => handleTabClick('committee')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between ${
              activePublicTab === 'committee' ? 'bg-emerald-50 text-[#0F6A4B] dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{language === 'bn' ? 'পরিচালনা পরিষদ' : 'Committee'}</span>
            <ChevronRight size={15} />
          </button>
          <button
            onClick={() => handleTabClick('branches')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between ${
              activePublicTab === 'branches' ? 'bg-emerald-50 text-[#0F6A4B] dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{language === 'bn' ? 'শাখা সমূহ' : 'Our Branches'}</span>
            <ChevronRight size={15} />
          </button>
          <button
            onClick={() => handleTabClick('activities')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between ${
              activePublicTab === 'activities' ? 'bg-emerald-50 text-[#0F6A4B] dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{language === 'bn' ? 'কার্যক্রম' : 'Activities'}</span>
            <ChevronRight size={15} />
          </button>
          <hr className="border-slate-100 dark:border-slate-800" />
          {currentUser ? (
            <button
              onClick={onEnterERP}
              className="w-full bg-[#0F6A4B] text-white py-3 rounded-lg text-center font-bold tracking-wider"
            >
              {language === 'bn' ? 'ড্যাশবোর্ডে প্রবেশ করুন' : 'Go to ERP Portal'}
            </button>
          ) : (
            <button
              onClick={() => handleTabClick('login')}
              className="w-full bg-[#B22222] text-white py-3 rounded-lg text-center font-bold tracking-wider"
            >
              {language === 'bn' ? 'লগ ইন / নিবন্ধন' : 'Log In / Register'}
            </button>
          )}
        </div>
      )}

      {/* VIEW CONDITIONAL RENDERING */}
      <div className="flex-1">

        {/* 1. HOME TAB */}
        {activePublicTab === 'home' && (
          <div className="animate-fade-in space-y-16 pb-16">
            
            {/* Hero Interactive Banner Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-[#0F6A4B]/5 to-rose-500/5 dark:from-slate-900 dark:via-[#0F6A4B]/10 dark:to-slate-950 py-16 md:py-24 border-b border-slate-250/50 dark:border-slate-800">
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0F6A4B]/5 dark:bg-[#0F6A4B]/10 blur-[100px] pointer-events-none"></div>
              <div className="absolute right-10 bottom-10 w-96 h-96 rounded-full bg-brand-red/5 dark:bg-red-900/5 blur-[120px] pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
                
                <div className="inline-flex bg-white dark:bg-slate-900 hover:scale-105 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-sm transition">
                  <ParabarLogo size={80} />
                </div>

                <div className="space-y-3.5 max-w-4xl mx-auto">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white font-sans">
                    {language === 'bn' ? (
                      <>
                         শিশু-কিশোরের মেধা বিকাশে <br />
                        <span className="text-[#B22222]">পারাবার শিল্পীগোষ্ঠী</span>
                      </>
                    ) : (
                      <>
                        Nurturing Young Talents at <br />
                        <span className="text-[#B22222]">Parabar SHILPIGOSTI</span>
                      </>
                    )}
                  </h1>
                  <div className="py-3">
                    <p className="text-lg sm:text-xl md:text-2xl text-[#0F6A4B] dark:text-emerald-400 font-extrabold max-w-3xl mx-auto leading-relaxed tracking-wide font-sans">
                      {language === 'bn' 
                        ? '“সুস্থ সংস্কৃতির পায়রা উড়ৃক নিলীমার দশ দিগন্তে।”' 
                        : '“Let the pigeon of healthy culture fly in the ten horizons of the blue sky.”'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                  <button
                    onClick={() => handleTabClick('login')}
                    className="w-full sm:w-auto bg-[#B22222] hover:bg-[#991d1d] text-white font-sans font-bold text-xs tracking-wider px-7 py-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'ভর্তি হতে আবেদন করুন' : 'Apply for Enrollment'}</span>
                    <Sparkles size={14} className="animate-pulse" />
                  </button>
                  <button
                    onClick={() => handleTabClick('about')}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-sans font-bold text-xs tracking-wider px-7 py-4 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'আমাদের সম্পর্কে জানুন' : 'Learn About Us'}</span>
                  </button>
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
                  <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-4 rounded-2xl shadow-xs text-center">
                    <p className="text-2xl font-black text-[#0F6A4B] dark:text-emerald-400 font-mono">২২+</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider mt-1">{language === 'bn' ? 'বছরের সফলতা' : 'Years of Success'}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-4 rounded-2xl shadow-xs text-center">
                    <p className="text-2xl font-black text-[#B22222] dark:text-red-400 font-mono">৫টি</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider mt-1">{language === 'bn' ? 'সক্রিয় শাখা' : 'Active Branches'}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-4 rounded-2xl shadow-xs text-center">
                    <p className="text-2xl font-black text-[#0F6A4B] dark:text-emerald-400 font-mono">২০০০+</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider mt-1">{language === 'bn' ? 'নিবন্ধিত শিল্পী' : 'Total Artists'}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-4 rounded-2xl shadow-xs text-center">
                    <p className="text-2xl font-black text-[#B22222] dark:text-red-400 font-mono">৩০+</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider mt-1">{language === 'bn' ? 'দক্ষ শিক্ষক' : 'Trainer Faculty'}</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Introductory Statement Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-sm">
                <div className="space-y-5">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 w-fit rounded-xl border border-emerald-100 dark:border-emerald-900/60 text-[#0F6A4B] dark:text-emerald-400">
                    <Award size={28} />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                    {language === 'bn' ? 'কেন আপনার সন্তানকে পারাবারে ভর্তি করবেন?' : 'Why Enroll Your Child at Parabar?'}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                    {language === 'bn' 
                      ? 'আজকের ডিজিটাল যুগে শিশুরা মোবাইল গেমস ও সোশ্যাল মিডিয়ার ক্ষতিকর আসক্তিতে নিমজ্জিত হচ্ছে। পারাবার একাডেমি তাদের হাত থেকে শিশুদের ফিরিয়ে এনে সৃজনশীল সাহিত্য, শিল্প, গান ও অভিনয়ের সুস্থ ধারায় ফিরিয়ে আনে।' 
                      : 'In modern times of screen exposure, screen addictions damage focus. Parabar organizes children to find joy in traditional values, voice culture, painting landscapes, poetry, drama, and collective discipline.'}
                  </p>
                  
                  <div className="space-y-3.5 text-xs sm:text-sm font-bold">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-[#0F6A4B] shrink-0 mt-0.5" />
                      <span>{language === 'bn' ? 'জাতীয় সাংস্কৃতিক সিলেবাস অনুসরণ' : 'Follows structured national cultural curriculums.'}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-[#0F6A4B] shrink-0 mt-0.5" />
                      <span>{language === 'bn' ? 'জাতীয় ও আন্তর্জাতিক পর্যায়ে অংশগ্রহণের সুযোগ' : 'Encouraging participations in national competitions.'}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-[#0F6A4B] shrink-0 mt-0.5" />
                      <span>{language === 'bn' ? 'অভিজ্ঞ ও দক্ষ প্রশিক্ষক মণ্ডলী দ্বারা নিয়মিত ক্লাস' : 'Taught by professional musicians, actors, and artists.'}</span>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop" 
                    alt="Creative Art Workshop" 
                    className="rounded-2xl border border-slate-250 dark:border-slate-700 shadow-md group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl flex items-end p-5">
                    <span className="text-xs font-bold text-white tracking-wide">
                      {language === 'bn' ? 'সাপ্তাহিক চারুকলা অঙ্কন ক্লাস' : 'Weekly Fine Arts & Drawing Class Session'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Academy Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-emerald-50/45 dark:bg-slate-900/40 border border-emerald-100/60 dark:border-slate-800/80 p-8 sm:p-12 rounded-3xl space-y-8">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F6A4B] dark:text-emerald-400 font-mono">
                    {language === 'bn' ? 'আমাদের অনন্যতা' : 'Our Uniqueness'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F6A4B] dark:text-emerald-400 font-sans tracking-tight">
                    {language === 'bn' ? 'আমাদের বৈশিষ্টসমূহ:' : 'Our Key Features:'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {featuresList.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 shadow-xs hover:shadow-md transition duration-250 hover:scale-[1.01]">
                      <span className="text-[#0F6A4B] dark:text-emerald-400 text-base shrink-0 mt-0.5 select-none">◑</span>
                      <span className="leading-relaxed">{language === 'bn' ? feature.bn : feature.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Overview of Departments / activities */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                  {language === 'bn' ? 'আমাদের একাডেমির মডিউল ও কার্যক্রম' : 'Academy Creative Activities'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-semibold">
                  {language === 'bn' 
                    ? 'কোমলমতি শিশুদের প্রতিভা বিকাশের জন্য নিচে উল্লিখিত পাঁচটি বিভাগে প্রশিক্ষণ পরিচালনা করা হয়' 
                    : 'We run regular weekend coaching blocks in five specialized cultural faculties'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((act, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-6 rounded-2xl shadow-xs hover:shadow transition space-y-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 w-fit rounded-xl border border-slate-100 dark:border-slate-800">
                      {act.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-sans">
                      {language === 'bn' ? act.titleBn : act.titleEn}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-semibold">
                      {language === 'bn' ? act.descBn : act.descEn}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => handleTabClick('activities')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#0F6A4B] dark:text-emerald-400 hover:underline"
                >
                  <span>{language === 'bn' ? 'সকল কার্যক্রমের বিস্তারিত দেখুন' : 'Explore Detailed Activities'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </section>

            {/* Quick Branch Directory */}
            <section className="bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-widest text-[#B22222] bg-red-100/60 dark:bg-red-950/20 px-3 py-1 rounded-full uppercase">
                    {language === 'bn' ? 'শাখা সমুহ' : 'Our Branches'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                    {language === 'bn' ? 'চট্টগ্রামের প্রধান শাখা সমূহ' : 'Regional Branch Centers'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                    {language === 'bn' 
                      ? 'চট্টগ্রামের বিভিন্ন গুরুত্বপূর্ণ এলাকায় পারবারের শাখা সমূহ বিস্তৃত। আপনার নিকটস্থ শাখায় আজই যোগাযোগ করে ভর্তি সম্পন্ন করুন।' 
                      : 'Parabar branches operate in multiple prime neighborhoods inside Chattogram City to make weekend academy accessible.'}
                  </p>
                  <button
                    onClick={() => handleTabClick('branches')}
                    className="bg-[#0F6A4B] hover:bg-[#0b4f38] text-white font-sans font-bold text-xs tracking-wider px-5 py-3 rounded-xl transition shadow-sm cursor-pointer"
                  >
                    {language === 'bn' ? 'শাখার ঠিকানা ও বিস্তারিত' : 'View Addresses & Managers'}
                  </button>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {branches.slice(0, 3).map((br, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-2 shadow-xs">
                      <div className="flex items-center gap-2 text-[#B22222]">
                        <MapPin size={16} />
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-sans">
                          {language === 'bn' ? br.nameBn : br.nameEn}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                        {language === 'bn' ? br.addressBn : br.addressEn}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-100 dark:border-slate-800/50">
                        {language === 'bn' ? 'যোগাযোগ:' : 'Tel:'} {br.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* 2. ABOUT (পরিচিতি) TAB */}
        {activePublicTab === 'about' && (
          <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex bg-red-100/60 dark:bg-red-950/25 text-[#B22222] p-3 rounded-2xl mb-1 border border-red-200/50">
                <Compass size={28} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                {language === 'bn' ? 'পারাবার পরিচিতি' : 'About Parabar'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider font-mono">
                {language === 'bn' ? 'সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম' : 'Sahittya Sangskriti Sangshad Chattogram'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl space-y-8 shadow-sm">
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-black text-[#0F6A4B] dark:text-emerald-400 font-sans border-b pb-2 border-slate-100 dark:border-slate-800">
                  {language === 'bn' ? 'প্রতিষ্ঠার ইতিহাস ও পটভূমি' : 'Our Story & Background'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {language === 'bn' ? (
                    <>
                      পারাবার সাহিত্য সংস্কৃতি সংসদ চট্টগ্রাম ২০১২ সালে প্রতিষ্ঠিত একটি সৃজনশীল ও মননশীল শিশু-কিশোর একাডেমি। চট্টগ্রামের একদল নিবেদিতপ্রাণ শিক্ষাবিদ, সাংস্কৃতিক ব্যক্তিত্ব এবং সমাজসেবকের যৌথ উদ্যোগে এই একাডেমির যাত্রা শুরু হয়। শিশুদের যান্ত্রিক ও মোবাইল আসক্তি থেকে দূরে রেখে শিল্পকলা, শুদ্ধ সঙ্গীত, মননশীল আবৃত্তি এবং দেশপ্রেমমূলক কর্মকাণ্ডে সম্পৃক্ত করাই ছিল এই প্রতিষ্ঠানের মূল লক্ষ্য।
                    </>
                  ) : (
                    <>
                      Established in 2012, Parabar Sahittya Sangskriti Sangshad is a pioneer weekend creative academy in Chattogram. It was established by a collective panel of leading academicians, writers, and cultural activists to save child innocence, rescue kids from early exposure to screens/harmful visual items, and redirect their mental energy towards literature, music, recitation, fine arts, and traditional values.
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-sans flex items-center gap-2">
                    <CheckCircle className="text-[#0F6A4B] size={18}" />
                    <span>{language === 'bn' ? 'লক্ষ্য ও ভিশন' : 'Our Vision'}</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    {language === 'bn' 
                      ? 'একটি নৈতিক গুণসম্পন্ন, দেশপ্রেমিক ও সাংস্কৃতিকভাবে মননশীল শিশু-কিশোর প্রজন্ম গড়ে তোলা, যারা আগামী দিনে দেশের নেতৃত্ব দেবে।'
                      : 'To build a robust, morally sound, creative, and patriotic generation of kids and youths capable of serving the nation with empathy, skills, and outstanding aesthetic intelligence.'}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-sans flex items-center gap-2">
                    <CheckCircle className="text-[#B22222] size={18}" />
                    <span>{language === 'bn' ? 'আমাদের মূলনীতি' : 'Core Principles'}</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    {language === 'bn' 
                      ? 'সুস্থ সংস্কৃতির বিকাশ, নৈতিক মূল্যবোধ জাগ্রতকরণ, মেধার সুষ্ঠু বিকাশ এবং সামাজিক দায়বদ্ধতার মাধ্যমে সুস্থ সমাজ বিনির্মাণ।'
                      : 'Nurture constructive talents, awaken artistic hunger, eliminate digital addiction, and instill continuous moral values through weekly interactive physical workshops.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-lg sm:text-xl font-black text-[#0F6A4B] dark:text-emerald-400 font-sans border-b pb-2 border-slate-100 dark:border-slate-800">
                  {language === 'bn' ? 'আমাদের অর্জিত সাফল্য' : 'Key Milestones & Achievements'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-1">
                    <p className="text-xl font-black text-[#B22222]">৫০০০+</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-wide">{language === 'bn' ? 'প্রশিক্ষিত শিক্ষার্থী' : 'Alumni Students'}</p>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-1">
                    <p className="text-xl font-black text-[#0F6A4B] dark:text-emerald-400">৫০+</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-wide">{language === 'bn' ? 'জাতীয় স্তরের পুরষ্কার' : 'National Gold Medals'}</p>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-1">
                    <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">১০০%</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-wide">{language === 'bn' ? 'অভিভাবকের সন্তুষ্টি' : 'Guardian Trust'}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. COMMITTEE (পরিচালনা পরিষদ) TAB */}
        {activePublicTab === 'committee' && (
          <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex bg-[#0F6A4B]/10 text-[#0F6A4B] p-3 rounded-2xl mb-1">
                <Users size={28} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                {language === 'bn' ? 'পরিচালনা পরিষদ' : 'Managing Executive Committee'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-semibold">
                {language === 'bn' 
                  ? 'পারাবার একাডেমি ও সংসদের সুষ্ঠু পরিচালনা ও দিকনির্দেশনা প্রদানকারী সম্মানীত কার্যনির্বাহী পরিষদ সদস্যবৃন্দ।' 
                  : 'Meet our respected executive committee members guiding Parabar’s operational decisions and academic curriculum.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {committeeMembers.map((member, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition text-center space-y-4">
                  <div className="relative inline-block">
                    <img 
                      src={member.photo} 
                      alt={member.nameEn} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800 mx-auto shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#0F6A4B] dark:bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                      <Shield size={12} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-sans">
                      {language === 'bn' ? member.nameBn : member.nameEn}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-black text-[#B22222] dark:text-red-400 uppercase tracking-wider font-mono">
                      {language === 'bn' ? member.roleBn : member.roleEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <p className="flex items-center justify-center gap-1.5">
                      <Phone size={12} />
                      <span>{member.phone}</span>
                    </p>
                    <p className="flex items-center justify-center gap-1.5">
                      <Mail size={12} />
                      <span>{member.email}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BRANCHES (শাখা সমুহ) TAB */}
        {activePublicTab === 'branches' && (
          <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-3xl mb-1 border border-emerald-500/20 shadow-sm animate-pulse">
                <MapPin size={32} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight">
                {language === 'bn' ? 'আমাদের সক্রিয় শাখা সমূহ' : 'Our Active Branches'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-semibold leading-relaxed">
                {language === 'bn' 
                  ? 'শিশু-কিশোরের মেধা ও নান্দনিক সুকুমার বৃত্তি বিকাশে চট্টগ্রাম শহরের ৫টি গুরুত্বপূর্ণ কেন্দ্রে আমাদের নিয়মিত ক্লাস ও কার্যক্রম পরিচালিত হয়।' 
                  : 'Parabar weekend academy operates 5 highly vibrant regional learning centers inside Chattogram City. Select your nearest center.'}
              </p>
            </div>

            {/* Bento Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-slate-900/60 dark:to-slate-900/30 p-5 rounded-2xl border border-emerald-100/40 dark:border-slate-800 text-center space-y-1 hover:scale-[1.02] transition-transform duration-250">
                <span className="text-2xl sm:text-3xl font-black text-[#0F6A4B] dark:text-emerald-400 font-mono">০৫টি</span>
                <p className="text-[10px] sm:text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {language === 'bn' ? 'সক্রিয় শাখা কেন্দ্র' : 'Active Branches'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100/40 dark:from-slate-900/60 dark:to-slate-900/30 p-5 rounded-2xl border border-red-100/40 dark:border-slate-800 text-center space-y-1 hover:scale-[1.02] transition-transform duration-250">
                <span className="text-2xl sm:text-3xl font-black text-[#B22222] dark:text-red-400 font-mono">৫০০+</span>
                <p className="text-[10px] sm:text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {language === 'bn' ? 'নিয়মিত শিক্ষার্থী' : 'Active Students'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/40 dark:from-slate-900/60 dark:to-slate-900/30 p-5 rounded-2xl border border-indigo-100/40 dark:border-slate-800 text-center space-y-1 hover:scale-[1.02] transition-transform duration-250">
                <span className="text-2xl sm:text-3xl font-black text-indigo-700 dark:text-indigo-400 font-mono">২৫+</span>
                <p className="text-[10px] sm:text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {language === 'bn' ? 'দক্ষ মেন্টর ও শিক্ষক' : 'Expert Trainers'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 dark:from-slate-900/60 dark:to-slate-900/30 p-5 rounded-2xl border border-amber-100/40 dark:border-slate-800 text-center space-y-1 hover:scale-[1.02] transition-transform duration-250">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">১৫+</span>
                <p className="text-[10px] sm:text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {language === 'bn' ? 'জাতীয় ও বিভাগীয় সম্মাননা' : 'National Awards'}
                </p>
              </div>
            </div>

            {/* Interactive Control Filter Dashboard */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Compass size={16} className="animate-spin-slow" />
                  </span>
                  <input
                    type="text"
                    value={branchSearch}
                    onChange={(e) => setBranchSearch(e.target.value)}
                    placeholder={language === 'bn' ? 'শাখার নাম, ঠিকানা বা প্রধান খুঁজুন...' : 'Search branch name, area or head...'}
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 font-medium placeholder-slate-400 transition"
                  />
                  {branchSearch && (
                    <button
                      onClick={() => setBranchSearch('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Reset Filters / Counters */}
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                  <span>
                    {language === 'bn' 
                      ? `প্রাপ্ত ফলাফল: ${branches.filter(br => {
                          const query = branchSearch.toLowerCase();
                          const matchesSearch = br.nameBn.toLowerCase().includes(query) || br.nameEn.toLowerCase().includes(query) || br.addressBn.toLowerCase().includes(query) || br.addressEn.toLowerCase().includes(query) || br.managerBn.toLowerCase().includes(query) || br.managerEn.toLowerCase().includes(query);
                          const matchesActivity = !branchFilterActivity || br.activitiesBn.includes(branchFilterActivity) || br.activitiesEn.toLowerCase().includes(branchFilterActivity.toLowerCase());
                          return matchesSearch && matchesActivity;
                        }).length} টি কেন্দ্র`
                      : `Found: ${branches.filter(br => {
                          const query = branchSearch.toLowerCase();
                          const matchesSearch = br.nameBn.toLowerCase().includes(query) || br.nameEn.toLowerCase().includes(query) || br.addressBn.toLowerCase().includes(query) || br.addressEn.toLowerCase().includes(query) || br.managerBn.toLowerCase().includes(query) || br.managerEn.toLowerCase().includes(query);
                          const matchesActivity = !branchFilterActivity || br.activitiesBn.includes(branchFilterActivity) || br.activitiesEn.toLowerCase().includes(branchFilterActivity.toLowerCase());
                          return matchesSearch && matchesActivity;
                        }).length} centers`
                    }
                  </span>
                  {(branchSearch || branchFilterActivity) && (
                    <button
                      onClick={() => {
                        setBranchSearch('');
                        setBranchFilterActivity('');
                      }}
                      className="text-[#B22222] hover:underline cursor-pointer ml-2"
                    >
                      {language === 'bn' ? '[ফিল্টার মুছুন]' : '[Clear Filters]'}
                    </button>
                  )}
                </div>
              </div>

              {/* Subject Category Filtering Chips */}
              <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-slate-200/50 dark:border-slate-900">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">
                  {language === 'bn' ? 'কার্যক্রম বিভাগ:' : 'Subject Area:'}
                </span>
                
                {[
                  { bn: 'সব বিষয়', key: '' },
                  { bn: 'কণ্ঠসঙ্গীত', key: 'কণ্ঠসঙ্গীত' },
                  { bn: 'চারুকলা অঙ্কন', key: 'চারুকলা' },
                  { bn: 'ক্যালিগ্রাফি', key: 'ক্যালিগ্রাফি' },
                  { bn: 'সুন্দর হাতের লেখা', key: 'সুন্দর হাতের লেখা' },
                  { bn: 'আবৃত্তি', key: 'আবৃত্তি' },
                  { bn: 'শিশু নাট্যকলা', key: 'নাট্যকলা' }
                ].map((chip) => {
                  const isActive = branchFilterActivity === chip.key;
                  return (
                    <button
                      key={chip.bn}
                      onClick={() => setBranchFilterActivity(chip.key)}
                      className={`text-[11px] font-black px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {language === 'bn' ? chip.bn : chip.key || 'All Subjects'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Branches Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branches
                .filter(br => {
                  const query = branchSearch.toLowerCase();
                  const matchesSearch = 
                    br.nameBn.toLowerCase().includes(query) || 
                    br.nameEn.toLowerCase().includes(query) ||
                    br.addressBn.toLowerCase().includes(query) ||
                    br.addressEn.toLowerCase().includes(query) ||
                    br.managerBn.toLowerCase().includes(query) ||
                    br.managerEn.toLowerCase().includes(query);
                  
                  const matchesActivity = !branchFilterActivity || 
                    br.activitiesBn.includes(branchFilterActivity) || 
                    br.activitiesEn.toLowerCase().includes(branchFilterActivity.toLowerCase());

                  return matchesSearch && matchesActivity;
                })
                .map((br, index) => {
                  const isHeadOffice = br.id === 'dewanhat';
                  return (
                    <div 
                      key={br.id} 
                      className={`bg-white dark:bg-slate-900 border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 ${
                        isHeadOffice 
                          ? 'border-amber-400/80 dark:border-amber-500 ring-2 ring-amber-400/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800'
                      }`}
                    >
                      {/* Branch Header with Image & Overlay */}
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={br.image} 
                          alt={br.nameEn} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Gradient shade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        
                        {/* Top floating badges */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${
                            isHeadOffice 
                              ? 'bg-amber-500 text-slate-950 border-amber-300' 
                              : 'bg-emerald-600 text-white border-emerald-500'
                          }`}>
                            {language === 'bn' ? `প্রতিষ্ঠা: ${br.established} খ্রি:` : `Estd. ${br.established}`}
                          </span>
                          
                          <div className="flex gap-1.5">
                            {isHeadOffice && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded-full shadow-xs border border-red-500">
                                {language === 'bn' ? 'প্রধান কার্যালয়' : 'Head Office'}
                              </span>
                            )}
                            <span className="text-[9px] font-black uppercase tracking-wider bg-slate-900/90 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-950/40">
                              {language === 'bn' ? 'সক্রিয়' : 'Active'}
                            </span>
                          </div>
                        </div>

                        {/* Title inside the card header for visual integration */}
                        <div className="absolute bottom-3.5 left-4 right-4">
                          <h2 className="text-sm sm:text-base font-black text-white leading-tight font-sans drop-shadow-md">
                            {language === 'bn' ? br.nameBn : br.nameEn}
                          </h2>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        
                        <div className="space-y-3">
                          {/* Location details */}
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
                              {language === 'bn' ? 'ঠিকানা ও অবস্থান:' : 'Location Address:'}
                            </span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed flex items-start gap-1.5">
                              <MapPin size={14} className="text-[#B22222] shrink-0 mt-0.5" />
                              <span>{language === 'bn' ? br.addressBn : br.addressEn}</span>
                            </p>
                          </div>

                          {/* Routine / schedule */}
                          <div className="bg-amber-50/45 dark:bg-slate-950/40 p-3 rounded-2xl border border-amber-100/40 dark:border-slate-800/80 space-y-1">
                            <span className="text-[9px] font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                              <Clock size={12} className="animate-pulse" />
                              {language === 'bn' ? 'ক্লাস সময়সূচি:' : 'Class Schedule:'}
                            </span>
                            <p className="text-[11px] text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                              {language === 'bn' ? br.scheduleBn : br.scheduleEn}
                            </p>
                          </div>

                          {/* Dynamic features / Activities tags */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
                              {language === 'bn' ? 'প্রশিক্ষণ বিষয়সমূহ:' : 'Subjects Offered:'}
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {br.activitiesBn.split(',').map((act: string, i: number) => (
                                <span 
                                  key={i} 
                                  className="text-[10px] bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg font-sans font-bold border border-slate-200/50 dark:border-slate-800 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-950/10 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:border-emerald-100/50 dark:group-hover:border-emerald-900/30 transition duration-300"
                                >
                                  {act.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Social, manager, helpline */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          
                          {/* Manager & helpline panel */}
                          <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px]">
                            <div>
                              <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-bold mb-0.5">
                                {language === 'bn' ? 'শাখা প্রধান:' : 'Center Head:'}
                              </span>
                              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                                {language === 'bn' ? br.managerBn : br.managerEn}
                              </span>
                            </div>
                            <div>
                              <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-bold mb-0.5">
                                {language === 'bn' ? 'যোগাযোগ নম্বর:' : 'Helpline:'}
                              </span>
                              <a href={`tel:${br.phone}`} className="font-extrabold text-[#B22222] dark:text-red-400 hover:underline flex items-center gap-1">
                                <Phone size={10} />
                                <span>{br.phone}</span>
                              </a>
                            </div>
                          </div>

                          {/* Social handles block */}
                          <div className="flex gap-2 justify-end">
                            {br.facebookUrl && (
                              <a
                                href={br.facebookUrl}
                                target="_blank"
                                referrerPolicy="no-referrer"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 text-blue-700 dark:text-blue-300 transition border border-blue-100/40 dark:border-blue-900/40 cursor-pointer"
                              >
                                <Facebook size={12} />
                                <span>{br.facebook || 'Facebook'}</span>
                              </a>
                            )}
                            {'youtube' in br && br.youtube && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100/40 dark:border-red-900/40">
                                <Youtube size={12} />
                                <span>{(br as any).youtube}</span>
                              </div>
                            )}
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Empty filter outcome state */}
            {branches.filter(br => {
              const query = branchSearch.toLowerCase();
              const matchesSearch = br.nameBn.toLowerCase().includes(query) || br.nameEn.toLowerCase().includes(query) || br.addressBn.toLowerCase().includes(query) || br.addressEn.toLowerCase().includes(query) || br.managerBn.toLowerCase().includes(query) || br.managerEn.toLowerCase().includes(query);
              const matchesActivity = !branchFilterActivity || br.activitiesBn.includes(branchFilterActivity) || br.activitiesEn.toLowerCase().includes(branchFilterActivity.toLowerCase());
              return matchesSearch && matchesActivity;
            }).length === 0 && (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg mx-auto">
                <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
                  {language === 'bn' 
                    ? 'দুঃখিত! আপনার অনুসন্ধান অনুযায়ী কোনো সক্রিয় শাখা কেন্দ্র পাওয়া যায়নি।' 
                    : 'No active branch centers match your search criteria.'}
                </p>
                <button
                  onClick={() => {
                    setBranchSearch('');
                    setBranchFilterActivity('');
                  }}
                  className="mt-3 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {language === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                </button>
              </div>
            )}

          </div>
        )}

        {/* 5. ACTIVITIES (কার্যক্রম) TAB */}
        {activePublicTab === 'activities' && (
          <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex bg-indigo-500/10 text-indigo-600 p-3 rounded-2xl mb-1">
                <Compass size={28} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                {language === 'bn' ? 'কার্যক্রম ও কর্মশালা' : 'Our Work & Activities'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-semibold">
                {language === 'bn' 
                  ? 'আমরা সাহিত্য ও সুস্থ সংস্কৃতির প্রসারে নিয়মিত সেমিনার, কর্মশালা, ও শিশু বিকাশমূলক সাপ্তাহিক ক্লাস পরিচালনা করে আসছি।' 
                  : 'Explore our weekend cultural classes, workshops, poetry/recitation camps, and annual physical sports/creative festivals.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activities.map((act, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-5 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                      {act.icon}
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-sans">
                      {language === 'bn' ? act.titleBn : act.titleEn}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-semibold">
                    {language === 'bn' ? act.descBn : act.descEn}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0F6A4B] dark:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      {language === 'bn' ? 'সাপ্তাহিক ক্লাস' : 'Weekly Session Included'}
                    </span>
                    <button
                      onClick={() => handleTabClick('login')}
                      className="text-slate-500 hover:text-brand-red text-[11px] font-black uppercase tracking-wide flex items-center gap-1 hover:underline"
                    >
                      <span>{language === 'bn' ? 'আবেদন করুন' : 'Enroll Now'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. LOGIN (লগ ইন) TAB */}
        {activePublicTab === 'login' && (
          <div className="animate-fade-in relative">
            <LoginView />
          </div>
        )}

      </div>

      {/* FOOTER CREDIT SECTION */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <ParabarLogo size={36} />
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-wide text-brand-red uppercase">
                  {language === 'bn' ? 'পারাবার' : 'PARABAR'}
                </span>
                <span className="text-[7.5px] text-slate-500 dark:text-slate-400 tracking-wider font-black uppercase">
                  {language === 'bn' ? 'শিল্পীগোষ্ঠী' : 'SHILPIGOSTI'}
                </span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed font-semibold">
              {language === 'bn' 
                ? 'সুস্থ ও প্রগতিশীল সমাজ বিনির্মাণে কোমলমতি শিশুদের সৃজনশীল মনন গঠনে একটি নির্ভরযোগ্য আলোকবর্তিকা।' 
                : 'A premium, weekend cultural academy dedicated to safeguarding youth from screen traps and nurturing creative leadership.'}
            </p>
            <div className="pt-1">
              <a
                href="https://www.facebook.com/share/1cKiiEBNWu/"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition border border-blue-100 dark:border-blue-900/50 cursor-pointer"
              >
                <Facebook size={14} />
                <span>{language === 'bn' ? 'ফেইসবুক পেইজ' : 'Facebook Page'}</span>
              </a>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider font-sans">
              {language === 'bn' ? 'দ্রুত লিঙ্ক সমূহ' : 'Navigation Links'}
            </h3>
            <div className="grid grid-cols-2 gap-2 font-bold text-[11px]">
              <button onClick={() => handleTabClick('home')} className="text-left hover:text-[#B22222] transition">{language === 'bn' ? 'নীড়পাতা' : 'Home'}</button>
              <button onClick={() => handleTabClick('about')} className="text-left hover:text-[#B22222] transition">{language === 'bn' ? 'পরিচিতি' : 'About'}</button>
              <button onClick={() => handleTabClick('committee')} className="text-left hover:text-[#B22222] transition">{language === 'bn' ? 'পরিচালনা পরিষদ' : 'Committee'}</button>
              <button onClick={() => handleTabClick('branches')} className="text-left hover:text-[#B22222] transition">{language === 'bn' ? 'শাখা সমূহ' : 'Branches'}</button>
              <button onClick={() => handleTabClick('activities')} className="text-left hover:text-[#B22222] transition">{language === 'bn' ? 'কার্যক্রম' : 'Work'}</button>
              <button onClick={() => handleTabClick('login')} className="text-left hover:text-[#B22222] transition">{language === 'bn' ? 'লগ ইন' : 'Log In'}</button>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider font-sans">
              {language === 'bn' ? 'যোগাযোগ ও তথ্য' : 'General Helplines'}
            </h3>
            <div className="space-y-2 font-mono text-[11px]">
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-[#0F6A4B]" />
                <span>+880 1836-776227</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-[#B22222]" />
                <span className="select-all">info@parabar.org</span>
              </p>
              <p className="flex items-center gap-2 font-sans">
                <MapPin size={13} className="text-[#0F6A4B] shrink-0" />
                <span className="leading-tight">{language === 'bn' ? 'ডি.টি. রোড, দেওয়ানহাট, চট্টগ্রাম-৪১০০' : 'D.T. Road, Dewanhat, Chattogram-4100'}</span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-400 font-sans">
          <p>© 2026 Parabar SHILPIGOSTI • {language === 'bn' ? 'সকল সত্ত্ব সংরক্ষিত।' : 'All Rights Reserved.'}</p>
        </div>
      </footer>

    </div>
  );
};
