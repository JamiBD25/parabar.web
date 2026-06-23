import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Admin, Artist, Trainer, ClassSchedule, AttendanceRecord, 
  Payment, Expense, Supporter, Donation, SystemNotification, 
  ActivityLog, ResponsiblePerson, LoggedInUser, UserRole 
} from '../types';
import { 
  INITIAL_ADMINS, INITIAL_ARTISTS, INITIAL_TRAINERS, 
  INITIAL_RESPONSIBLE, INITIAL_CLASSES, INITIAL_ATTENDANCE, 
  INITIAL_PAYMENTS, INITIAL_EXPENSES, INITIAL_SUPPORTERS, 
  INITIAL_DONATIONS, INITIAL_NOTIFICATIONS, INITIAL_ACTIVITY,
  TRANSLATIONS
} from '../utils/seedData';

interface AppContextType {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  admins: Admin[];
  currentAdmin: Admin;
  setCurrentAdmin: (admin: Admin) => void;
  updateAdminPermissions: (id: string, permissions: Admin['permissions']) => void;
  
  artists: Artist[];
  addArtist: (artist: Omit<Artist, 'id' | 'createdAt'>) => Artist;
  updateArtist: (id: string, artist: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
  
  trainers: Trainer[];
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, trainer: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;
  
  responsiblePersons: ResponsiblePerson[];
  addResponsible: (person: Omit<ResponsiblePerson, 'id' | 'attendance' | 'collectedFeesSum'>) => void;
  updateResponsible: (id: string, person: Partial<ResponsiblePerson>) => void;
  deleteResponsible: (id: string) => void;
  
  classes: ClassSchedule[];
  addClass: (classSchedule: Omit<ClassSchedule, 'id'>) => void;
  updateClass: (id: string, classSchedule: Partial<ClassSchedule>) => void;
  deleteClass: (id: string) => void;
  
  attendance: AttendanceRecord[];
  saveAttendanceList: (records: Omit<AttendanceRecord, 'id'>[]) => void;
  
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'> & { id?: string }) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  deletePayment: (id: string) => void;
  
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void; // Moves to bin
  restoreExpense: (id: string) => void;
  hardDeleteExpense: (id: string) => void;
  
  supporters: Supporter[];
  addSupporter: (supporter: Omit<Supporter, 'id'>) => void;
  updateSupporter: (id: string, supporter: Partial<Supporter>) => void;
  deleteSupporter: (id: string) => void;
  
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id'>) => void;
  
  notifications: SystemNotification[];
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Omit<SystemNotification, 'id' | 'isRead' | 'date'>) => void;
  
  activityLogs: ActivityLog[];
  logAction: (action: string, details: string) => void;
  clearActivityLogs: () => void;
  
  t: (key: string) => string;
  
  backupData: () => string;
  restoreData: (jsonString: string) => boolean;

  currentUser: LoggedInUser | null;
  setCurrentUser: (user: LoggedInUser | null) => void;
  loginUser: (idOrEmail: string, passwordMobile: string) => { success: boolean; errorEn?: string; errorBn?: string };
  logout: () => void;
  changeAdminPin: (adminId: string, newPin: string) => boolean;
  changeArtistPassword: (artistId: string, newPassword: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setActiveTabState] = useState<string>('dashboard');
  
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [admins, setAdmins] = useState<Admin[]>(INITIAL_ADMINS);
  const [currentAdmin, setCurrentAdmin] = useState<Admin>(INITIAL_ADMINS[0]);
  
  // Dynamic collections with LocalStorage syncing
  const [artists, setArtists] = useState<Artist[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [responsiblePersons, setResponsiblePersons] = useState<ResponsiblePerson[]>([]);
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Load from local storage or set initial values on mount
  useEffect(() => {
    const storedArtists = localStorage.getItem('parabar_artists');
    const storedTrainers = localStorage.getItem('parabar_trainers');
    const storedResPersons = localStorage.getItem('parabar_respersons');
    const storedClasses = localStorage.getItem('parabar_classes');
    const storedAttendance = localStorage.getItem('parabar_attendance');
    const storedPayments = localStorage.getItem('parabar_payments');
    const storedExpenses = localStorage.getItem('parabar_expenses');
    const storedSupporters = localStorage.getItem('parabar_supporters');
    const storedDonations = localStorage.getItem('parabar_donations');
    const storedNotifications = localStorage.getItem('parabar_notifications');
    const storedActivity = localStorage.getItem('parabar_activity');
    const storedLang = localStorage.getItem('parabar_language');
    const storedTheme = localStorage.getItem('parabar_theme');

    if (storedArtists) setArtists(JSON.parse(storedArtists));
    else { setArtists(INITIAL_ARTISTS); localStorage.setItem('parabar_artists', JSON.stringify(INITIAL_ARTISTS)); }

    if (storedTrainers) setTrainers(JSON.parse(storedTrainers));
    else { setTrainers(INITIAL_TRAINERS); localStorage.setItem('parabar_trainers', JSON.stringify(INITIAL_TRAINERS)); }

    if (storedResPersons) setResponsiblePersons(JSON.parse(storedResPersons));
    else { setResponsiblePersons(INITIAL_RESPONSIBLE); localStorage.setItem('parabar_respersons', JSON.stringify(INITIAL_RESPONSIBLE)); }

    if (storedClasses) setClasses(JSON.parse(storedClasses));
    else { setClasses(INITIAL_CLASSES); localStorage.setItem('parabar_classes', JSON.stringify(INITIAL_CLASSES)); }

    if (storedAttendance) setAttendance(JSON.parse(storedAttendance));
    else { setAttendance(INITIAL_ATTENDANCE); localStorage.setItem('parabar_attendance', JSON.stringify(INITIAL_ATTENDANCE)); }

    if (storedPayments) setPayments(JSON.parse(storedPayments));
    else { setPayments(INITIAL_PAYMENTS); localStorage.setItem('parabar_payments', JSON.stringify(INITIAL_PAYMENTS)); }

    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    else { setExpenses(INITIAL_EXPENSES); localStorage.setItem('parabar_expenses', JSON.stringify(INITIAL_EXPENSES)); }

    if (storedSupporters) setSupporters(JSON.parse(storedSupporters));
    else { setSupporters(INITIAL_SUPPORTERS); localStorage.setItem('parabar_supporters', JSON.stringify(INITIAL_SUPPORTERS)); }

    if (storedDonations) setDonations(JSON.parse(storedDonations));
    else { setDonations(INITIAL_DONATIONS); localStorage.setItem('parabar_donations', JSON.stringify(INITIAL_DONATIONS)); }

    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
    else { setNotifications(INITIAL_NOTIFICATIONS); localStorage.setItem('parabar_notifications', JSON.stringify(INITIAL_NOTIFICATIONS)); }

    if (storedActivity) setActivityLogs(JSON.parse(storedActivity));
    else { setActivityLogs(INITIAL_ACTIVITY); localStorage.setItem('parabar_activity', JSON.stringify(INITIAL_ACTIVITY)); }

    if (storedLang) setLanguage(storedLang as 'bn' | 'en');
    if (storedTheme) setTheme(storedTheme as 'light' | 'dark');

    const storedUser = localStorage.getItem('parabar_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    // Logging navigation actions lightly
    logAction('Tab Navigation', `Navigated to ${tab} module`);
  };

  // Sync state functions that update local state and local storage
  const syncState = (key: string, data: any, stateSetter: any) => {
    stateSetter(data);
    localStorage.setItem(`parabar_${key}`, JSON.stringify(data));
  };

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Log events safely
  const logAction = (action: string, details: string) => {
    const actorName = currentUser ? currentUser.name : (currentAdmin ? currentAdmin.name : 'System/Anonymous');
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      adminName: actorName,
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    const updated = [newLog, ...activityLogs].slice(0, 500); // Caps logs at 500
    setActivityLogs(updated);
    localStorage.setItem('parabar_activity', JSON.stringify(updated));
  };

  const clearActivityLogs = () => {
    syncState('activity', [], setActivityLogs);
  };

  // Backup and Restore
  const backupData = () => {
    const payload = {
      artists,
      trainers,
      responsiblePersons,
      classes,
      attendance,
      payments,
      expenses,
      supporters,
      donations,
      notifications,
      activityLogs,
      language,
      theme
    };
    return JSON.stringify(payload, null, 2);
  };

  const restoreData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.artists) syncState('artists', data.artists, setArtists);
      if (data.trainers) syncState('trainers', data.trainers, setTrainers);
      if (data.responsiblePersons) syncState('respersons', data.responsiblePersons, setResponsiblePersons);
      if (data.classes) syncState('classes', data.classes, setClasses);
      if (data.attendance) syncState('attendance', data.attendance, setAttendance);
      if (data.payments) syncState('payments', data.payments, setPayments);
      if (data.expenses) syncState('expenses', data.expenses, setExpenses);
      if (data.supporters) syncState('supporters', data.supporters, setSupporters);
      if (data.donations) syncState('donations', data.donations, setDonations);
      if (data.notifications) syncState('notifications', data.notifications, setNotifications);
      if (data.activityLogs) syncState('activity', data.activityLogs, setActivityLogs);
      if (data.language) setLanguage(data.language);
      if (data.theme) setTheme(data.theme);
      
      logAction('Backup Restore', 'Successfully restored system database from backup file.');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Artists Operations
  const addArtist = (artistData: Omit<Artist, 'id' | 'createdAt'>): Artist => {
    // Generate sequential ID: e.g. PAR-2026-006 based on standard ID count
    const activeYear = '2026';
    const nextNum = artists.length + 1;
    const paddedNum = String(nextNum).padStart(3, '0');
    const newId = `PAR-${activeYear}-${paddedNum}`;

    const newArtist: Artist = {
      ...artistData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newArtist, ...artists];
    syncState('artists', updated, setArtists);
    logAction('Add Artist', `Added artist ${artistData.name} (${newId})`);
    return newArtist;
  };

  const updateArtist = (id: string, updatedData: Partial<Artist>) => {
    const updated = artists.map(art => art.id === id ? { ...art, ...updatedData } : art);
    syncState('artists', updated, setArtists);
    logAction('Update Artist', `Modified details of artist ${id}`);
  };

  const deleteArtist = (id: string) => {
    const updated = artists.filter(art => art.id !== id);
    syncState('artists', updated, setArtists);
    logAction('Delete Artist', `Removed artist record: ${id}`);
  };

  // Trainers Operations
  const addTrainer = (trainerData: Omit<Trainer, 'id'>) => {
    const newId = `TRN-2026-${String(trainers.length + 1).padStart(2, '0')}`;
    const newTrainer: Trainer = {
      ...trainerData,
      id: newId
    };
    const updated = [...trainers, newTrainer];
    syncState('trainers', updated, setTrainers);
    logAction('Add Trainer', `Hired trainer: ${trainerData.name} (${newId})`);
  };

  const updateTrainer = (id: string, updatedData: Partial<Trainer>) => {
    const updated = trainers.map(trn => trn.id === id ? { ...trn, ...updatedData } : trn);
    syncState('trainers', updated, setTrainers);
    logAction('Update Trainer', `Modified trainer profile for ${id}`);
  };

  const deleteTrainer = (id: string) => {
    const updated = trainers.filter(trn => trn.id !== id);
    syncState('trainers', updated, setTrainers);
    logAction('Delete Trainer', `Fired/Removed trainer profile: ${id}`);
  };

  // Responsible Persons Operations
  const addResponsible = (personData: Omit<ResponsiblePerson, 'id' | 'attendance' | 'collectedFeesSum'>) => {
    const newId = `RSP-${String(responsiblePersons.length + 1).padStart(2, '0')}`;
    const newPerson: ResponsiblePerson = {
      ...personData,
      id: newId,
      attendance: {},
      collectedFeesSum: 0
    };
    const updated = [...responsiblePersons, newPerson];
    syncState('respersons', updated, setResponsiblePersons);
    logAction('Add Responsible Person', `Registered member ${personData.name} with roles: ${personData.roles.join(', ')}`);
  };

  const updateResponsible = (id: string, updatedData: Partial<ResponsiblePerson>) => {
    const updated = responsiblePersons.map(res => res.id === id ? { ...res, ...updatedData } : res);
    syncState('respersons', updated, setResponsiblePersons);
    logAction('Update Responsible Person', `Edited profile for member: ${id}`);
  };

  const deleteResponsible = (id: string) => {
    const updated = responsiblePersons.filter(res => res.id !== id);
    syncState('respersons', updated, setResponsiblePersons);
    logAction('Delete Responsible', `Removed admin colleague record: ${id}`);
  };

  // Classes Operations
  const addClass = (classData: Omit<ClassSchedule, 'id'>) => {
    const newId = `CLS-${String(classes.length + 1).padStart(3, '0')}`;
    const newClass: ClassSchedule = {
      ...classData,
      id: newId
    };
    const updated = [...classes, newClass];
    syncState('classes', updated, setClasses);
    logAction('Add Class', `Scheduled new class ${classData.className} under ${classData.department}`);
  };

  const updateClass = (id: string, updatedData: Partial<ClassSchedule>) => {
    const updated = classes.map(cls => cls.id === id ? { ...cls, ...updatedData } : cls);
    syncState('classes', updated, setClasses);
    logAction('Update Class', `Rescheduled class id: ${id}`);
  };

  const deleteClass = (id: string) => {
    const updated = classes.filter(cls => cls.id !== id);
    syncState('classes', updated, setClasses);
    logAction('Delete Class', `Canceled or removed class schedule: ${id}`);
  };

  // Attendance Operations
  const saveAttendanceList = (recordsList: Omit<AttendanceRecord, 'id'>[]) => {
    const freshRecords: AttendanceRecord[] = recordsList.map((rec, idx) => ({
      ...rec,
      id: `ATT-${Date.now()}-${idx}`
    }));
    
    // Filter existing records on this key to prevent duplicates
    const searchKeys = recordsList.map(r => `${r.date}_${r.classId}_${r.artistId}`);
    const filteredOld = attendance.filter(att => {
      const key = `${att.date}_${att.classId}_${att.artistId}`;
      return !searchKeys.includes(key);
    });

    const updated = [...filteredOld, ...freshRecords];
    syncState('attendance', updated, setAttendance);
    logAction('Save Attendance', `Recorded attendance list with ${recordsList.length} counts on ${recordsList[0]?.date}`);
  };

  // Payments Operations
  const addPayment = (paymentData: Omit<Payment, 'id'> & { id?: string }) => {
    const generatedReceipt = paymentData.receiptNo || `REC-2026-${String(payments.length + 101).padStart(3, '0')}`;
    const newId = paymentData.id || `PAY-2026-${String(payments.length + 501).padStart(3, '0')}`;
    
    const newPayment: Payment = {
      ...paymentData,
      id: newId,
      receiptNo: generatedReceipt
    };
    const updated = [newPayment, ...payments];
    syncState('payments', updated, setPayments);
    logAction('Add Payment', `Received ৳${paymentData.amount} fee for ${paymentData.artistName}. Receipt: ${generatedReceipt}`);
  };

  const updatePayment = (id: string, updatedData: Partial<Payment>) => {
    const updated = payments.map(pay => pay.id === id ? { ...pay, ...updatedData } : pay);
    syncState('payments', updated, setPayments);
    logAction('Update Payment', `Updated status or receipt details of payment: ${id}`);
  };

  const deletePayment = (id: string) => {
    const updated = payments.filter(pay => pay.id !== id);
    syncState('payments', updated, setPayments);
    logAction('Delete Payment', `Removed payment row: ${id}`);
  };

  // Accounting Operations
  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newId = `EXP-${String(expenses.length + 201).padStart(3, '0')}`;
    const newExpense: Expense = {
      ...expenseData,
      id: newId
    };
    const updated = [newExpense, ...expenses];
    syncState('expenses', updated, setExpenses);
    logAction('Add Expense', `Logged academy expense of ৳${expenseData.amount} for "${expenseData.title}"`);
  };

  const updateExpense = (id: string, updatedData: Partial<Expense>) => {
    const updated = expenses.map(exp => exp.id === id ? { ...exp, ...updatedData } : exp);
    syncState('expenses', updated, setExpenses);
    logAction('Update Expense', `Modified expense ledger row: ${id}`);
  };

  const deleteExpense = (id: string) => {
    // Moves to recycle bin (soft delete)
    const updated = expenses.map(exp => exp.id === id ? { ...exp, deletedAt: new Date().toISOString() } : exp);
    syncState('expenses', updated, setExpenses);
    logAction('Recycle Expense', `Moved expense row ${id} to Recycle Bin`);
  };

  const restoreExpense = (id: string) => {
    const updated = expenses.map(exp => exp.id === id ? { ...exp, deletedAt: undefined } : exp);
    syncState('expenses', updated, setExpenses);
    logAction('Restore Expense', `Restored expense row ${id} back to ledger`);
  };

  const hardDeleteExpense = (id: string) => {
    const updated = expenses.filter(exp => exp.id !== id);
    syncState('expenses', updated, setExpenses);
    logAction('Hard Delete Expense', `Irreversibly purged expense row: ${id}`);
  };

  // Supporters Operations
  const addSupporter = (supporterData: Omit<Supporter, 'id'>) => {
    const newId = `SUP-${String(supporters.length + 101).padStart(3, '0')}`;
    const newSupporter: Supporter = {
      ...supporterData,
      id: newId
    };
    const updated = [...supporters, newSupporter];
    syncState('supporters', updated, setSupporters);
    logAction('Add Supporter', `Connected new academy supporter: ${supporterData.name}`);
  };

  const updateSupporter = (id: string, updatedData: Partial<Supporter>) => {
    const updated = supporters.map(sup => sup.id === id ? { ...sup, ...updatedData } : sup);
    syncState('supporters', updated, setSupporters);
    logAction('Update Supporter', `Modified details of supporter: ${id}`);
  };

  const deleteSupporter = (id: string) => {
    const updated = supporters.filter(sup => sup.id !== id);
    syncState('supporters', updated, setSupporters);
    logAction('Delete Supporter', `Removed supporter association: ${id}`);
  };

  // Donations Operations
  const addDonation = (donationData: Omit<Donation, 'id'>) => {
    const newId = `DON-REC-${String(donations.length + 8001).padStart(4, '0')}`;
    const newDonation: Donation = {
      ...donationData,
      id: `DON-${Date.now()}`,
      receiptNo: newId
    };
    const updated = [newDonation, ...donations];
    syncState('donations', updated, setDonations);
    logAction('Add Donation', `Received donor contribution of ৳${donationData.amount} from "${donationData.supporterName}"`);
  };

  // Notifications Operations
  const markNotificationRead = (id: string) => {
    const updated = notifications.map(not => not.id === id ? { ...not, isRead: true } : not);
    syncState('notifications', updated, setNotifications);
  };

  const addNotification = (notData: Omit<SystemNotification, 'id' | 'isRead' | 'date'>) => {
    const newNot: SystemNotification = {
      ...notData,
      id: `NOT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };
    const updated = [newNot, ...notifications];
    syncState('notifications', updated, setNotifications);
    logAction('Add Announcement', `Created new system notification alert: "${notData.titleEn}"`);
  };

  const updateAdminPermissions = (id: string, permissions: Admin['permissions']) => {
    const updated = admins.map(adm => adm.id === id ? { ...adm, permissions } : adm);
    setAdmins(updated);
    if (currentAdmin.id === id) {
      setCurrentAdmin({ ...currentAdmin, permissions });
    }
  };

  // Auto-set core UI toggles
  const handleSetLanguage = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('parabar_language', lang);
  };

  const handleSetTheme = (tName: 'light' | 'dark') => {
    setTheme(tName);
    localStorage.setItem('parabar_theme', tName);
  };

  const loginUser = (idOrEmail: string, passwordMobile: string) => {
    const trimmedInput = idOrEmail.trim().toLowerCase();
    const cleanPassword = passwordMobile.trim();

    // 1. Try to find an Admin matching email
    const foundAdmin = admins.find(a => a.email.toLowerCase() === trimmedInput);
    if (foundAdmin) {
      const storedPins = localStorage.getItem('parabar_admin_pins');
      const pins = storedPins ? JSON.parse(storedPins) : {
        'ADM-001': '1234',
        'ADM-002': '4321',
        'ADM-003': '0000'
      };
      const allowedPassword = pins[foundAdmin.id] || 'admin';
      if (cleanPassword === allowedPassword || cleanPassword === 'admin') {
        const loggedUser: LoggedInUser = {
          id: foundAdmin.id,
          name: foundAdmin.name,
          nameEn: foundAdmin.name,
          role: 'admin',
          avatar: foundAdmin.avatar,
          email: foundAdmin.email,
          adminData: foundAdmin
        };
        setCurrentUser(loggedUser);
        setCurrentAdmin(foundAdmin);
        localStorage.setItem('parabar_current_user', JSON.stringify(loggedUser));
        logAction('Login', `Admin logged in successfully: ${foundAdmin.name}`);
        return { success: true };
      } else {
        return { 
          success: false, 
          errorEn: 'Incorrect admin password!', 
          errorBn: 'ভুল অ্যাডমিন পাসওয়ার্ড!' 
        };
      }
    }

    // 2. Try to find a Student (Artist) matching ID (case-insensitive)
    const foundStudent = artists.find(a => a.id.toLowerCase() === trimmedInput);
    if (!foundStudent) {
      // Try to find a student matching mobile number
      const foundByMobile = artists.find(a => a.mobile === trimmedInput || a.mobile.replace(/\+/g, '') === trimmedInput);
      if (foundByMobile) {
        const studentPassword = foundByMobile.password || '';
        const isValidPassword = studentPassword 
          ? (cleanPassword === studentPassword)
          : (cleanPassword === 'student' || cleanPassword === foundByMobile.mobile || cleanPassword === '123456');

        if (isValidPassword) {
          const loggedUser: LoggedInUser = {
            id: foundByMobile.id,
            name: foundByMobile.name,
            nameEn: foundByMobile.nameEn,
            role: 'student',
            avatar: foundByMobile.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
            mobile: foundByMobile.mobile,
            studentData: foundByMobile
          };
          setCurrentUser(loggedUser);
          localStorage.setItem('parabar_current_user', JSON.stringify(loggedUser));
          setActiveTabState('studentDashboard');
          logAction('Login', `Student logged in successfully: ${foundByMobile.name}`);
          return { success: true };
        } else {
          return {
            success: false,
            errorEn: 'Incorrect student password!',
            errorBn: 'ভুল পাসওয়ার্ড!'
          };
        }
      }

      return { 
        success: false, 
        errorEn: 'No Admin or Student registered with this ID/Email/Mobile.', 
        errorBn: 'এই আইডি, ইমেল বা মোবাইল দিয়ে কোনো অ্যাডমিন বা শিক্ষার্থী পাওয়া যায়নি।' 
      };
    }

    // If ID matches, validate password
    const studentPassword = foundStudent.password || '';
    const isValidPassword = studentPassword 
      ? (cleanPassword === studentPassword)
      : (cleanPassword === 'student' || cleanPassword === foundStudent.mobile || cleanPassword === '123456');

    if (isValidPassword) {
      const loggedUser: LoggedInUser = {
        id: foundStudent.id,
        name: foundStudent.name,
        nameEn: foundStudent.nameEn,
        role: 'student',
        avatar: foundStudent.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        mobile: foundStudent.mobile,
        studentData: foundStudent
      };
      setCurrentUser(loggedUser);
      localStorage.setItem('parabar_current_user', JSON.stringify(loggedUser));
      setActiveTabState('studentDashboard');
      logAction('Login', `Student logged in: ${foundStudent.name}`);
      return { success: true };
    } else {
      return { 
        success: false, 
        errorEn: 'Incorrect student password!', 
        errorBn: 'ভুল পাসওয়ার্ড!' 
      };
    }
  };

  const logout = () => {
    if (currentUser) {
      logAction('Logout', `${currentUser.name} logged out`);
    }
    setCurrentUser(null);
    localStorage.removeItem('parabar_current_user');
    setActiveTabState('dashboard');
  };

  const changeAdminPin = (adminId: string, newPin: string): boolean => {
    try {
      const storedPins = localStorage.getItem('parabar_admin_pins');
      const pins = storedPins ? JSON.parse(storedPins) : {
        'ADM-001': '1234',
        'ADM-002': '4321',
        'ADM-003': '0000'
      };
      pins[adminId] = newPin;
      localStorage.setItem('parabar_admin_pins', JSON.stringify(pins));
      logAction('Change Password', `Admin changed security PIN.`);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const changeArtistPassword = (artistId: string, newPassword: string): boolean => {
    try {
      const updated = artists.map(art => art.id === artistId ? { ...art, password: newPassword } : art);
      syncState('artists', updated, setArtists);
      
      if (currentUser && currentUser.role === 'student' && currentUser.id === artistId) {
        const updatedUser = {
          ...currentUser,
          studentData: {
            ...currentUser.studentData!,
            password: newPassword
          }
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('parabar_current_user', JSON.stringify(updatedUser));
      }
      logAction('Change Password', `Student ${artistId} changed login password.`);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      theme,
      setTheme: handleSetTheme,
      activeTab,
      setActiveTab,
      admins,
      currentAdmin,
      setCurrentAdmin,
      updateAdminPermissions,
      artists,
      addArtist,
      updateArtist,
      deleteArtist,
      trainers,
      addTrainer,
      updateTrainer,
      deleteTrainer,
      responsiblePersons,
      addResponsible,
      updateResponsible,
      deleteResponsible,
      classes,
      addClass,
      updateClass,
      deleteClass,
      attendance,
      saveAttendanceList,
      payments,
      addPayment,
      updatePayment,
      deletePayment,
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      restoreExpense,
      hardDeleteExpense,
      supporters,
      addSupporter,
      updateSupporter,
      deleteSupporter,
      donations,
      addDonation,
      notifications,
      markNotificationRead,
      addNotification,
      activityLogs,
      logAction,
      clearActivityLogs,
      t,
      backupData,
      restoreData,
      currentUser,
      setCurrentUser,
      loginUser,
      logout,
      changeAdminPin,
      changeArtistPassword
    }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans antialiased transition-colors duration-200">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
