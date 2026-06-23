import { Admin, Artist, Trainer, ClassSchedule, AttendanceRecord, Payment, Expense, Supporter, Donation, SystemNotification, ActivityLog, ResponsiblePerson } from '../types';

export const INITIAL_ADMINS: Admin[] = [
  {
    id: 'ADM-001',
    name: 'Asaduzzaman Rana',
    role: 'Super Admin',
    email: 'rana@parabar.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    permissions: { view: true, edit: true, delete: true, export: true, messaging: true }
  },
  {
    id: 'ADM-002',
    name: 'Sultana Razia',
    role: 'Sub Admin',
    email: 'razia@parabar.org',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
    permissions: { view: true, edit: true, delete: false, export: true, messaging: true }
  },
  {
    id: 'ADM-003',
    name: 'Monirul Islam',
    role: 'Sub Admin',
    email: 'monir@parabar.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    permissions: { view: true, edit: true, delete: false, export: false, messaging: true }
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'PAR-2026-001',
    name: 'অর্ণব সেনগুপ্ত',
    nameEn: 'Arnab Sengupta',
    fatherName: 'প্রদীপ সেনগুপ্ত',
    motherName: 'সীমা সেনগুপ্ত',
    dob: '2014-04-12',
    bloodGroup: 'O+',
    mobile: '01712345678',
    address: 'মিরপুর ২, ঢাকা',
    institution: 'মিরপুর হাই স্কুল',
    grade: 'Class 6',
    departments: ['Fine Arts', 'Music'],
    status: 'Active',
    photo: '',
    createdAt: '2026-01-10'
  },
  {
    id: 'PAR-2026-002',
    name: 'নুসরাত জাহান মিম',
    nameEn: 'Nusrat Jahan Mim',
    fatherName: 'আনোয়ার হোসেন',
    motherName: 'মরিয়ম বেগম',
    dob: '2015-08-25',
    bloodGroup: 'A+',
    mobile: '01823456789',
    address: 'ধানমন্ডি ১৫, ঢাকা',
    institution: 'লালমাটিয়া বালিকা বিদ্যালয়',
    grade: 'Class 5',
    departments: ['Dance'],
    status: 'Active',
    photo: '',
    createdAt: '2026-01-15'
  },
  {
    id: 'PAR-2026-003',
    name: 'তাহমিদ হাসান',
    nameEn: 'Tahmid Hasan',
    fatherName: 'কামরুল হাসান',
    motherName: 'ফারহানা ইয়াসমিন',
    dob: '2012-11-03',
    bloodGroup: 'B+',
    mobile: '01534567890',
    address: 'উত্তরা সেক্টর ৭, ঢাকা',
    institution: 'উত্তরা হাই স্কুল',
    grade: 'Class 8',
    departments: ['Recitation', 'Music'],
    status: 'Active',
    photo: '',
    createdAt: '2026-02-05'
  },
  {
    id: 'PAR-2026-004',
    name: 'ঐশী দেবনাথ',
    nameEn: 'Oishee Debnath',
    fatherName: 'সুভাষ দেবনাথ',
    motherName: 'গীতা দেবনাথ',
    dob: '2013-02-18',
    bloodGroup: 'AB+',
    mobile: '01945678901',
    address: 'মোহাম্মদপুর, ঢাকা',
    institution: 'মোহাম্মদপুর বালিকা উচ্চ বিদ্যালয়',
    grade: 'Class 7',
    departments: ['Fine Arts'],
    status: 'Inactive',
    photo: '',
    createdAt: '2026-02-10'
  },
  {
    id: 'PAR-2026-005',
    name: 'সাদমান আরিফ',
    nameEn: 'Sadman Arif',
    fatherName: 'রফিকুল ইসলাম',
    motherName: 'শাহানাজ পারভীন',
    dob: '2011-09-30',
    bloodGroup: 'O-',
    mobile: '01656789012',
    address: 'বনশ্রী, ঢাকা',
    institution: 'আইডিয়াল স্কুল',
    grade: 'Class 9',
    departments: ['Music', 'Recitation'],
    status: 'Active',
    photo: '',
    createdAt: '2026-03-01'
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'TRN-2026-01',
    name: 'প্রীতম চক্রবর্তী',
    mobile: '01798765432',
    address: 'রামপুরা, ঢাকা',
    departments: ['Music'],
    joiningDate: '2025-01-01',
    status: 'Active',
    salary: 15000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 'TRN-2026-02',
    name: 'উর্মিলা সেন',
    mobile: '01887654321',
    address: 'খিলগাঁও, ঢাকা',
    departments: ['Fine Arts'],
    joiningDate: '2025-03-10',
    status: 'Active',
    salary: 12000,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 'TRN-2026-03',
    name: 'মাহমুদ আলম',
    mobile: '01987654321',
    address: 'ফার্মগেট, ঢাকা',
    departments: ['Recitation', 'Theatre'],
    joiningDate: '2025-06-15',
    status: 'Active',
    salary: 10000,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
  }
];

export const INITIAL_RESPONSIBLE: ResponsiblePerson[] = [
  {
    id: 'RSP-01',
    name: 'মাসুদ রানা',
    designation: 'Academy Coordinator',
    mobile: '01711223344',
    roles: ['Coordinator', 'Admissions'],
    startDate: '2025-01-01',
    status: 'Active',
    attendance: { '2026-06-21': 'Present', '2026-06-19': 'Present' },
    collectedFeesSum: 14500
  },
  {
    id: 'RSP-02',
    name: 'আফরিন সুলতানা',
    designation: 'Finance Associate',
    mobile: '01811223344',
    roles: ['Cashier', 'Donor Relations'],
    startDate: '2025-04-01',
    status: 'Active',
    attendance: { '2026-06-21': 'Present', '2026-06-19': 'Leave' },
    collectedFeesSum: 23000
  }
];

export const INITIAL_CLASSES: ClassSchedule[] = [
  {
    id: 'CLS-001',
    className: 'Classical Vocal Session',
    department: 'Music',
    trainerId: 'TRN-2026-01',
    trainerName: 'প্রীতম চক্রবর্তী',
    day: 'Friday',
    time: '09:00 AM - 11:00 AM',
    isSpecial: false,
    conductedBy: 'প্রীতম চক্রবর্তী',
    date: '2026-06-19'
  },
  {
    id: 'CLS-002',
    className: 'Oil Painting Basics',
    department: 'Fine Arts',
    trainerId: 'TRN-2026-02',
    trainerName: 'উর্মিলা সেন',
    day: 'Friday',
    time: '11:00 AM - 01:00 PM',
    isSpecial: false,
    conductedBy: 'উর্মিলা সেন',
    date: '2026-06-19'
  },
  {
    id: 'CLS-003',
    className: 'Rabindra Sangeet Special',
    department: 'Music',
    trainerId: 'TRN-2026-01',
    trainerName: 'প্রীতম চক্রবর্তী',
    day: 'Special Class',
    time: '03:00 PM - 05:00 PM',
    isSpecial: true,
    conductedBy: 'প্রীতম চক্রবর্তী',
    date: '2026-06-21'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  // 2026-06-19 Friday Class
  { id: 'ATT-001', date: '2026-06-19', type: 'Friday Class', classId: 'CLS-001', artistId: 'PAR-2026-001', artistName: 'অর্ণব সেনগুপ্ত', status: 'Present' },
  { id: 'ATT-002', date: '2026-06-19', type: 'Friday Class', classId: 'CLS-001', artistId: 'PAR-2026-003', artistName: 'তাহমিদ হাসান', status: 'Present' },
  { id: 'ATT-003', date: '2026-06-19', type: 'Friday Class', classId: 'CLS-001', artistId: 'PAR-2026-005', artistName: 'সাদমান আরিফ', status: 'Late' },
  
  { id: 'ATT-004', date: '2026-06-19', type: 'Friday Class', classId: 'CLS-002', artistId: 'PAR-2026-001', artistName: 'অর্ণব সেনগুপ্ত', status: 'Present' },
  { id: 'ATT-005', date: '2026-06-19', type: 'Friday Class', classId: 'CLS-002', artistId: 'PAR-2026-004', artistName: 'ঐশী দেবনাথ', status: 'Absent' },

  // 2026-06-21 Special Class
  { id: 'ATT-006', date: '2026-06-21', type: 'Special Class', classId: 'CLS-003', artistId: 'PAR-2026-001', artistName: 'অর্ণব সেনগুপ্ত', status: 'Present' },
  { id: 'ATT-007', date: '2026-06-21', type: 'Special Class', classId: 'CLS-003', artistId: 'PAR-2026-003', artistName: 'তাহমিদ হাসান', status: 'Leave' },
  { id: 'ATT-008', date: '2026-06-21', type: 'Special Class', classId: 'CLS-003', artistId: 'PAR-2026-005', artistName: 'সাদমান আরিফ', status: 'Present' }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'PAY-2026-101',
    artistId: 'PAR-2026-001',
    artistName: 'অর্ণব সেনগুপ্ত',
    feeType: 'Admission Fee',
    amount: 2000,
    paymentDate: '2026-01-10',
    receiptNo: 'REC-2026-001',
    paymentMethod: 'Cash',
    status: 'Paid',
    collectedBy: 'Asaduzzaman Rana'
  },
  {
    id: 'PAY-2026-102',
    artistId: 'PAR-2026-001',
    artistName: 'অর্ণব সেনগুপ্ত',
    feeType: 'Monthly Fee',
    amount: 1000,
    paymentDate: '2026-06-10',
    month: 'June 2026',
    receiptNo: 'REC-2026-054',
    paymentMethod: 'bKash',
    status: 'Paid',
    collectedBy: 'Sultana Razia'
  },
  {
    id: 'PAY-2026-103',
    artistId: 'PAR-2026-002',
    artistName: 'নুসরাত জাহান মিম',
    feeType: 'Monthly Fee',
    amount: 1000,
    paymentDate: '2026-06-15',
    month: 'June 2026',
    receiptNo: 'REC-2026-055',
    paymentMethod: 'Nagad',
    status: 'Paid',
    collectedBy: 'Sultana Razia'
  },
  {
    id: 'PAY-2026-104',
    artistId: 'PAR-2026-003',
    artistName: 'তাহমিদ হাসান',
    feeType: 'Monthly Fee',
    amount: 1000,
    paymentDate: '',
    month: 'June 2026',
    receiptNo: 'REC-2026-056',
    paymentMethod: 'Cash',
    status: 'Due',
    collectedBy: ''
  },
  {
    id: 'PAY-2026-105',
    artistId: 'PAR-2026-004',
    artistName: 'ঐশী দেবনাথ',
    feeType: 'Monthly Fee',
    amount: 1000,
    paymentDate: '',
    month: 'June 2026',
    receiptNo: 'REC-2026-057',
    paymentMethod: 'Cash',
    status: 'Due',
    collectedBy: ''
  },
  {
    id: 'PAY-2026-106',
    artistId: 'PAR-2026-005',
    artistName: 'সাদমান আরিফ',
    feeType: 'Monthly Fee',
    amount: 1050,
    paymentDate: '2026-06-18',
    month: 'June 2026',
    receiptNo: 'REC-2026-058',
    paymentMethod: 'Rocket',
    status: 'Paid',
    collectedBy: 'Monirul Islam'
  },
  {
    id: 'PAY-2026-107',
    artistId: 'PAR-2026-002',
    artistName: 'নুসরাত জাহান মিম',
    feeType: 'Event Fee',
    amount: 500,
    paymentDate: '2026-05-12',
    receiptNo: 'REC-2026-029',
    paymentMethod: 'Cash',
    status: 'Paid',
    collectedBy: 'Asaduzzaman Rana'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'EXP-101', title: 'Trainer Honorarium - May', category: 'Trainer Honorarium', amount: 37000, date: '2026-05-31', description: 'Paid all trainers for May 2026' },
  { id: 'EXP-102', title: 'Academy Building Rent - June', category: 'Rent', amount: 20000, date: '2026-06-01', description: 'Art space lease' },
  { id: 'EXP-103', title: 'Electricity & Internet - June', category: 'Utility', amount: 4500, date: '2026-06-15', description: 'Bill for internet + electricity' },
  { id: 'EXP-104', title: 'Acrylic Color & Canvas Pads', category: 'Material purchase', amount: 3200, date: '2026-06-18', description: 'Supplies for fine arts class' }
];

export const INITIAL_SUPPORTERS: Supporter[] = [
  { id: 'SUP-01', name: 'Al-Haj Noman Ahmed', mobile: '01711556677', email: 'noman@gmail.com', address: 'বনানী, ঢাকা', regularContribution: 5000, status: 'Active' },
  { id: 'SUP-02', name: 'Dr. Shahila Parveen', mobile: '01911556677', email: 'sparveen@icddrb.org', address: 'গুলশান ২, ঢাকা', regularContribution: 10000, status: 'Active' },
  { id: 'SUP-03', name: 'Sayed Tasnim', mobile: '01511556677', email: 'tasnim@tech.io', address: 'উত্তরা, ঢাকা', regularContribution: 3000, status: 'Inactive' }
];

export const INITIAL_DONATIONS: Donation[] = [
  { id: 'DON-201', supporterId: 'SUP-01', supporterName: 'Al-Haj Noman Ahmed', amount: 5000, date: '2026-06-05', paymentMethod: 'Bank Transfer', receiptNo: 'DON-REC-8901', purpose: 'General Academic Funding' },
  { id: 'DON-202', supporterId: 'SUP-02', supporterName: 'Dr. Shahila Parveen', amount: 10000, date: '2026-06-12', paymentMethod: 'bKash Merchant', receiptNo: 'DON-REC-8902', purpose: 'Acoustic Ceiling Equipment' },
  { id: 'DON-203', supporterId: 'SUP-01', supporterName: 'Al-Haj Noman Ahmed', amount: 5000, date: '2026-05-05', paymentMethod: 'Bank Transfer', receiptNo: 'DON-REC-8876', purpose: 'General Academic Funding' }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  { id: 'NOT-1', titleEn: 'Admission Target Approaching', titleBn: 'ভর্তির লক্ষ্যমাত্রা অর্জিত হতে চলেছে', messageEn: 'We are 2 lists away from completing June fine arts targets.', messageBn: 'আমরা জুন মাসের চারুকলা লক্ষ্যমাত্রা অর্জন থেকে মাত্র ২টি ভর্তি দূরে আছি।', type: 'announcement', date: '2026-06-20', isRead: false },
  { id: 'NOT-2', titleEn: 'Birthday Reminder: Tahmid Hasan', titleBn: 'জন্মদিন স্মারক: তাহমিদ হাসান', messageEn: 'Tahmid has his birthday on June 25. Send him greetings!', messageBn: 'আজ ২৫শে জুন তাহমিদের জন্মদিন! একাডেমির পক্ষ থেকে শুভেচ্ছা বার্তা প্রেরণ করুন।', type: 'birthday', date: '2026-06-22', isRead: false },
  { id: 'NOT-3', titleEn: 'Fee Due Notice: Oishee Debnath', titleBn: 'বকেয়া বেতন নোটিশ: ঐশী দেবনাথ', messageEn: 'Oishee has monthly fee of ৳1000 due for June 2026.', messageBn: 'ঐশী দেবনাথের জুন ২০২৬-এর ১০০০ টাকা বেতন বকেয়া আছে।', type: 'due', date: '2026-06-18', isRead: true }
];

export const INITIAL_ACTIVITY: ActivityLog[] = [
  { id: 'LOG-001', adminName: 'Asaduzzaman Rana', action: 'System Setup', details: 'Initialized database records for PARABAR ERP', timestamp: '2026-06-22 10:00:00' },
  { id: 'LOG-002', adminName: 'Sultana Razia', action: 'Fee Collected', details: 'Collected ৳1000 for Nusrat Jahan (June Monthly)', timestamp: '2026-06-22 14:32:00' },
  { id: 'LOG-003', adminName: 'Asaduzzaman Rana', action: 'New Artist Registered', details: 'Registered artist Arnab Sengupta to Fine Arts', timestamp: '2026-06-22 16:15:00' }
];

export const TRANSLATIONS: { [lang: string]: { [key: string]: string } } = {
  bn: {
    // Top Navbar / Header
    systemName: 'পারাবার আর.পি সিস্টেম',
    searchPlaceholder: 'যেকোনো ডেটা অনুসন্ধান করুন...',
    dashboard: 'ড্যাশবোর্ড',
    artists: 'শিল্পী তালিকা',
    fees: 'বেতন ও ফি',
    whatsapp: 'হোয়াটসঅ্যাপ বার্তা',
    attendance: 'উপস্থিতি',
    trainers: 'প্রশিক্ষকবৃন্দ',
    responsible: 'দায়িত্বপ্রাপ্ত ব্যক্তি',
    classes: 'ক্লাস ব্যাবস্থাপনা',
    accounting: 'হিসাব রক্ষণ',
    supporters: 'সমর্থক/পৃষ্ঠপোষক',
    notifications: 'নোটিফিকেশন',
    settings: 'সেটিংস',
    adminPanel: 'অ্যাডমিন প্যানেল',
    reports: 'প্রতিবেদন',
    logout: 'প্রস্থান',
    pinRequired: 'অনুগ্রহ করে অ্যাডমিন পিন টাইপ করুন',

    // Language Labels
    language: 'ভাষা',
    toggleLanguage: 'English',
    theme: 'থিম',
    light: 'আলোকিত',
    dark: 'অন্ধকার',

    // Dashboard Cards
    totalArtists: 'মোট শিল্পী',
    todayClasses: 'আজকের ক্লাস',
    todayAttendance: 'আজকের উপস্থিতি',
    currentMonthIncome: 'চলতি মাসের আয়',
    currentMonthExpense: 'চলতি মাসের ব্যয়',
    dueFeesCount: 'বকেয়া বেতন',
    quickActions: 'সহজ নেভিগেশন',
    recentActivities: 'সাম্প্রতিক কার্যক্রম',
    incomeVsExpense: 'আয় বনাম ব্যয় বিবরণী',
    attendanceAnalytics: 'উপস্থিতি বিশ্লেষণ',

    // Buttons
    addNew: 'নতুন যুক্ত করুন',
    edit: 'সম্পাদনা',
    delete: 'মুছে ফেলুন',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    print: 'প্রিন্ট রশিদ',
    downloadPdf: 'পিডিএফ ডাউনলোড',
    downloadExcel: 'এক্সেল ডাউনলোড',
    search: 'খুঁজুন',
    filter: 'ফিল্টার',
    sort: 'সাজান',
    export: 'রপ্তানি করুন',
    send: 'বার্তা পাঠান',
    restore: 'পুনরুদ্ধার',

    // Artist Management
    artistId: 'শিল্পী আইডি',
    artistName: 'শিল্পীর নাম',
    artistNameEn: 'শিল্পীর নাম (ইংরেজিতে)',
    parentName: 'পিতা/মাতার নাম',
    dob: 'জন্ম তারিখ',
    bloodGroup: 'রক্তের গ্রুপ',
    mobile: 'মোবাইল নম্বর',
    address: 'ঠিকানা',
    institution: 'শিক্ষা প্রতিষ্ঠান',
    gradeClass: 'শ্রেণী/গ্রেড',
    department: 'বিভাগ',
    enrollMultiple: 'একাধিক বিভাগে তালিকাভুক্তি',
    status: 'অবস্থা',
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    allDepartments: 'সকল বিভাগ',
    photoUpload: 'ছবি আপলোড',
    qrCode: 'কিউআর কোড',

    // Fee Management
    admissionFee: 'ভর্তি ফি',
    monthlyFee: 'মাসিক ফি',
    formFee: 'ফরম ফি',
    examFee: 'পরীক্ষা ফি',
    eventFee: 'অনুষ্ঠান ফি',
    otherIncome: 'অন্যান্য আয়',
    receiptNo: 'রশিদ নম্বর',
    paymentMethod: 'পেমেন্ট মাধ্যম',
    cash: 'নগদ',
    bkash: 'বিকাশ',
    nagad: 'নগদ',
    rocket: 'রকেট',
    bank: 'ব্যাংক',
    paymentStatus: 'পেমেন্ট তথ্য',
    paid: 'পরিশোধিত',
    due: 'বকেয়া',
    partial: 'আংশিক',
    paymentDate: 'পরিশোধের তারিখ',
    amount: 'টাকার পরিমাণ',
    selectArtist: 'শিল্পী নির্বাচন করুন',
    receiptGen: 'স্বয়ংক্রিয় রশিদ',
    history: 'পেমেন্ট ইতিহাস',
    dueList: 'বকেয়ার তালিকা',

    // WhatsApp Automation
    whatsappAutomation: 'হোয়াটসঅ্যাপ অটোমেশন সিমুলেটর',
    selectTemplate: 'বার্তা টেমপ্লেট নির্বাচন করুন',
    payConfirmTemplate: 'পেমেন্ট নিশ্চিতকরণ বার্তা',
    dueReminderTemplate: 'বকেয়া বেতন রিমাইন্ডার',
    customMessage: 'কাস্টম বার্তা',
    bulkSend: 'বাল্ক মেসেজ',
    sendSuccess: 'হোয়াটসঅ্যাপে বার্তা প্রেরণ সফল হয়েছে!',
    previewText: 'বার্তার প্রাকদর্শন',

    // Attendance System
    attendanceSystem: 'উপস্থিতি ট্র্যাকিং',
    selectDate: 'তারিখ নির্বাচন',
    present: 'উপস্থিত',
    absent: 'অনুপস্থিত',
    leave: 'ছুটি',
    late: 'বিলম্বিত',
    saveAttendance: 'উপস্থিতি তালিকা সংরক্ষণ',
    stats: 'পরিসংখ্যান',

    // Trainer Management
    joiningDate: 'যোগদানের তারিখ',
    salaryHonorarium: 'সম্মানি/ভাতা',
    assignedDept: 'বরাদ্দকৃত বিভাগ',

    // Responsible Person
    designation: 'পদবী',
    responsibilities: 'দায়িত্বসমূহ',

    // Accounting System
    accountingTitle: 'আয়-ব্যয় হিসাব রক্ষণ',
    donationRecords: 'পৃষ্ঠপোষক অনুদান',
    supporterContributions: 'নিয়মিত অবদানের তালিকা',
    recycleBin: 'রিসাইকেল বিন (৩০ দিন পর স্বয়ংক্রিয় অপসারণ)',
    profitAndLoss: 'লাভ বনাম লোকসান বিবরণী',
    netProfit: 'নিট মুনাফা',

    // Notifications
    notificationCenter: 'বার্তা ও নোটিফিকেশন সেন্টার',
    announcements: 'পাবলিক নোটিশ বা ঘোষণা',
    birthdayReminder: 'জন্মদিন স্মারক',

    // Admin Panel Info
    rolePermission: 'রোল অ্যান্ড পারমিশন',
    activityLogTitle: 'সিস্টেম কার্যক্রম লগ',
    developerCredit: 'পরিচালনা পোর্টাল | পারাবার সংসদ',
    securePinPrompt: 'এই প্যানেল পরিচালনা করতে একটি পাসকোড/পিন প্রয়োজন:'
  },
  en: {
    // Top Navbar / Header
    systemName: 'Parabar songsod',
    searchPlaceholder: 'Search across system...',
    dashboard: 'Dashboard',
    artists: 'Artists',
    fees: 'Fees & Payments',
    whatsapp: 'WhatsApp SMS',
    attendance: 'Attendance',
    trainers: 'Trainers',
    responsible: 'Responsible Persons',
    classes: 'Class Management',
    accounting: 'Accounting',
    supporters: 'Supporters',
    notifications: 'Notifications',
    settings: 'Settings',
    adminPanel: 'Admin Space',
    reports: 'Reports',
    logout: 'Log Out',
    pinRequired: 'Please type your admin pin to proceed',

    // Language Labels
    language: 'Language',
    toggleLanguage: 'বাংলা',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',

    // Dashboard Cards
    totalArtists: 'Total Artists',
    todayClasses: 'Classes Today',
    todayAttendance: 'Present Today',
    currentMonthIncome: 'Current Month Income',
    currentMonthExpense: 'Current Month Expense',
    dueFeesCount: 'Due Payments',
    quickActions: 'Quick Navigation',
    recentActivities: 'Recent Actions Log',
    incomeVsExpense: 'Income vs Expense Analytics',
    attendanceAnalytics: 'Attendance Breakdown',

    // Buttons
    addNew: 'Add New Record',
    edit: 'Edit Details',
    delete: 'Delete Record',
    save: 'Save Record',
    cancel: 'Cancel',
    print: 'Print Receipt',
    downloadPdf: 'Download PDF',
    downloadExcel: 'Download Excel',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort By',
    export: 'Export Data',
    send: 'Send SMS',
    restore: 'Restore',

    // Artist Management
    artistId: 'Artist ID',
    artistName: 'Artist Name',
    artistNameEn: 'Artist Name (En)',
    parentName: 'Parent Name',
    dob: 'Date of Birth',
    bloodGroup: 'Blood Group',
    mobile: 'Mobile Number',
    address: 'Address',
    institution: 'School / College',
    gradeClass: 'Grade/Class',
    department: 'Department',
    enrollMultiple: 'Multiple Departments',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    allDepartments: 'All Departments',
    photoUpload: 'Upload Photo',
    qrCode: 'QR Code',

    // Fee Management
    admissionFee: 'Admission Fee',
    monthlyFee: 'Monthly Fee',
    formFee: 'Form Fee',
    examFee: 'Exam Fee',
    eventFee: 'Event Fee',
    otherIncome: 'Other Income',
    receiptNo: 'Receipt Number',
    paymentMethod: 'Payment Option',
    cash: 'Cash',
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    bank: 'Bank',
    paymentStatus: 'Payment Status',
    paid: 'Paid',
    due: 'Due',
    partial: 'Partial Payment',
    paymentDate: 'Payment Date',
    amount: 'Amount (BDT)',
    selectArtist: 'Select Academy Artist',
    receiptGen: 'Receipt Generator',
    history: 'Payment Logs',
    dueList: 'Dues Directory',

    // WhatsApp Automation
    whatsappAutomation: 'WhatsApp Blast & Automation',
    selectTemplate: 'Choose SMS Template',
    payConfirmTemplate: 'Payment Confirmation Sms',
    dueReminderTemplate: 'Due Payment Reminders',
    customMessage: 'Custom Blast Text',
    bulkSend: 'Send Bulk SMS',
    sendSuccess: 'WhatsApp Messages sent to recipients successfully!',
    previewText: 'SMS Body Preview',

    // Attendance System
    attendanceSystem: 'Attendance Log',
    selectDate: 'Set Date',
    present: 'Present',
    absent: 'Absent',
    leave: 'Leave approved',
    late: 'Late Check-in',
    saveAttendance: 'Commit Attendance',
    stats: 'Metrics',

    // Trainer Management
    joiningDate: 'Date of Joining',
    salaryHonorarium: 'Monthly Honorarium',
    assignedDept: 'Assigned Department',

    // Responsible Person
    designation: 'Designation',
    responsibilities: 'Responsibilities',

    // Accounting System
    accountingTitle: 'Accounts Ledger',
    donationRecords: 'Supporter Donations',
    supporterContributions: 'Committed Funding',
    recycleBin: 'Recycle Bin (30-day Retention Cache)',
    profitAndLoss: 'Profit and Loss Summary',
    netProfit: 'Net Balance',

    // Notifications
    notificationCenter: 'Notification Alert Center',
    announcements: 'Academy Announcements',
    birthdayReminder: 'Birthday Reminder Alerts',

    // Admin Panel Info
    rolePermission: 'Permissions Matrix',
    activityLogTitle: 'System Audit Logs',
    developerCredit: 'Admin Portal | Parabar Songsod',
    securePinPrompt: 'Super privileges require security authentication pin:'
  }
};
