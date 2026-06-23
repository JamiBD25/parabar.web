export interface Admin {
  id: string;
  name: string;
  role: 'Super Admin' | 'Sub Admin';
  email: string;
  avatar: string;
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
    messaging: boolean;
  };
}

export interface Artist {
  id: string; // Auto-generated ID (e.g. PAR-2026-001)
  name: string;
  nameEn: string;
  fatherName: string;
  motherName: string;
  dob: string;
  bloodGroup: string;
  mobile: string;
  address: string;
  institution: string;
  grade: string; // Class/Grade in school
  departments: string[]; // Multiple department enrollment (e.g., Music, Fine Arts, Dance, Recitation)
  status: 'Active' | 'Inactive';
  photo: string; // Base64 or placeholder URL
  createdAt: string;
  password?: string;
}

export interface Trainer {
  id: string;
  name: string;
  mobile: string;
  address: string;
  departments: string[];
  joiningDate: string;
  status: 'Active' | 'Inactive';
  salary: number; // Monthly Honorarium
  avatar: string;
}

export interface ClassSchedule {
  id: string;
  className: string;
  department: string;
  trainerId: string;
  trainerName: string;
  day: string; // e.g. Friday, Special Class
  time: string;
  isSpecial: boolean;
  conductedBy?: string; // Track who conducted the class
  date?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  type: 'Friday Class' | 'Special Class';
  classId: string;
  artistId: string;
  artistName: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Late';
}

export interface Payment {
  id: string; // Auto generator
  artistId: string;
  artistName: string;
  feeType: 'Admission Fee' | 'Monthly Fee' | 'Form Fee' | 'Exam Fee' | 'Event Fee' | 'Other Income';
  amount: number;
  paymentDate: string;
  month?: string; // For monthly fee, e.g. 'January 2026'
  receiptNo: string; // Manual or Auto
  paymentMethod: 'Cash' | 'bKash' | 'Rocket' | 'Nagad' | 'Bank';
  status: 'Paid' | 'Unpaid' | 'Partial' | 'Due';
  collectedBy: string; // Admin who collected the fee
}

export interface Expense {
  id: string;
  title: string;
  category: 'Rent' | 'Utility' | 'Trainer Honorarium' | 'Material purchase' | 'Event Expense' | 'Office Supply' | 'Others';
  amount: number;
  date: string;
  description: string;
  deletedAt?: string; // For recycle bin logic
}

export interface Supporter {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  regularContribution: number; // Monthly or annual committed donation
  status: 'Active' | 'Inactive';
}

export interface Donation {
  id: string;
  supporterId: string; // Can be anonymous or external supporter
  supporterName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  receiptNo: string;
  purpose: string; // Academic support, festival, equipment, general
}

export interface SystemNotification {
  id: string;
  titleEn: string;
  titleBn: string;
  messageEn: string;
  messageBn: string;
  type: 'due' | 'birthday' | 'announcement';
  date: string;
  isRead: boolean;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface ResponsiblePerson {
  id: string;
  name: string;
  designation: string;
  mobile: string;
  roles: string[]; // Multiple roles like Manager, Cashier, Transport Admin, Volunteer Coordinator
  startDate: string;
  status: 'Active' | 'Inactive';
  attendance: { [date: string]: 'Present' | 'Absent' | 'Leave' };
  collectedFeesSum: number;
}

export type UserRole = 'admin' | 'student';

export interface LoggedInUser {
  id: string;
  name: string;
  nameEn: string;
  role: UserRole;
  avatar?: string;
  email?: string;
  mobile?: string;
  studentData?: Artist;
  adminData?: Admin;
}

