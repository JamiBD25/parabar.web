/**
 * Admin Levels and Role-Based Access Control configuration for Parabar Academy.
 * There are 6 levels of Admin IDs (ADM-001 to ADM-006).
 * Level 1 has ALL access to the entire ERP system.
 * Level 2 has Branch Operations access.
 * Levels 3 to 6 have Departmental Director access with data restricted to their specific department.
 */

export interface AdminLevelConfig {
  level: number;
  labelEn: string;
  labelBn: string;
  descriptionEn: string;
  descriptionBn: string;
  allowedTabs: string[];
  restrictedDepartments: string[] | null; // null means all departments
}

export const ADMIN_LEVELS: { [adminId: string]: AdminLevelConfig } = {
  'ADM-001': {
    level: 1,
    labelEn: 'Level 1: Director (Super Admin)',
    labelBn: 'লেভেল ১: পরিচালক (সুপার অ্যাডমিন)',
    descriptionEn: 'Full system access, including accounts, supporters, colleagues and security panels.',
    descriptionBn: 'হিসাব, সমর্থক, সহকর্মী এবং নিরাপত্তা প্যানেল সহ সম্পূর্ণ সিস্টেম অ্যাক্সেস।',
    allowedTabs: [
      'dashboard', 'artists', 'fees', 'whatsapp', 'attendance', 
      'classes', 'trainers', 'accounting', 'supporters', 'responsible', 
      'notifications', 'adminPanel'
    ],
    restrictedDepartments: null // All access
  },
  'ADM-002': {
    level: 2,
    labelEn: 'Level 2: Branch Admin (Sub Admin)',
    labelBn: 'লেভেল ২: শাখা অ্যাডমিন (সাব অ্যাডমিন)',
    descriptionEn: 'General academy operations: student profiles, fees collection, messaging, class scheduling and attendance.',
    descriptionBn: 'সাধারণ একাডেমি পরিচালনা: ছাত্র প্রোফাইল, ফি সংগ্রহ, মেসেজিং, ক্লাসের সময়সূচী এবং উপস্থিতি।',
    allowedTabs: [
      'dashboard', 'artists', 'fees', 'whatsapp', 'attendance', 
      'classes', 'trainers', 'notifications'
    ],
    restrictedDepartments: null // All access to general branch departments
  },
  'ADM-003': {
    level: 3,
    labelEn: 'Level 3: Art Department Director',
    labelBn: 'লেভেল ৩: চারুকলা বিভাগীয় পরিচালক',
    descriptionEn: 'Department-specific access: Fine Arts student list, classes schedules and attendance ledger.',
    descriptionBn: 'বিভাগ-নির্দিষ্ট অ্যাক্সেস: চারুকলা ছাত্র তালিকা, ক্লাসের সময়সূচী এবং উপস্থিতি খাতা।',
    allowedTabs: [
      'dashboard', 'artists', 'attendance', 'classes', 'notifications'
    ],
    restrictedDepartments: ['Fine Arts']
  },
  'ADM-004': {
    level: 4,
    labelEn: 'Level 4: Song & Music Department Director',
    labelBn: 'লেভেল ৪: সঙ্গীত বিভাগীয় পরিচালক',
    descriptionEn: 'Department-specific access: Music (Khude & Kishore Parabar) student list, schedules and attendance.',
    descriptionBn: 'বিভাগ-নির্দিষ্ট অ্যাক্সেস: সঙ্গীত (খুদে ও কিশোর পারাবার) ছাত্র তালিকা, সময়সূচী এবং উপস্থিতি।',
    allowedTabs: [
      'dashboard', 'artists', 'attendance', 'classes', 'notifications'
    ],
    restrictedDepartments: ['Music', 'Music (Khude Parabar)', 'Music (Kishore Parabar)']
  },
  'ADM-005': {
    level: 5,
    labelEn: 'Level 5: Recitation Department Director',
    labelBn: 'লেভেল ৫: আবৃত্তি বিভাগীয় পরিচালক',
    descriptionEn: 'Department-specific access: Recitation student list, classes schedules and attendance.',
    descriptionBn: 'বিভাগ-নির্দিষ্ট অ্যাক্সেস: আবৃত্তি ছাত্র তালিকা, ক্লাসের সময়সূচী এবং উপস্থিতি।',
    allowedTabs: [
      'dashboard', 'artists', 'attendance', 'classes', 'notifications'
    ],
    restrictedDepartments: ['Recitation']
  },
  'ADM-006': {
    level: 6,
    labelEn: 'Level 6: Theatre & Dance Department Director',
    labelBn: 'লেভেল ৬: অভিনয়, নাটক ও নৃত্য বিভাগীয় পরিচালক',
    descriptionEn: 'Department-specific access: Theatre & Dance student list, classes schedules and attendance.',
    descriptionBn: 'বিভাগ-নির্দিষ্ট অ্যাক্সেস: অভিনয়, নাটক ও নৃত্য ছাত্র তালিকা, ক্লাসের সময়সূচী এবং উপস্থিতি।',
    allowedTabs: [
      'dashboard', 'artists', 'attendance', 'classes', 'notifications'
    ],
    restrictedDepartments: ['Theatre', 'Dance']
  }
};

/**
 * Returns the admin config based on ID.
 * Defaults to Level 2 if ID is not recognized.
 */
export function getAdminLevelConfig(adminId: string): AdminLevelConfig {
  return ADMIN_LEVELS[adminId] || {
    level: 2,
    labelEn: 'Level 2: Branch Admin',
    labelBn: 'লেভেল ২: শাখা অ্যাডমিন',
    descriptionEn: 'General operational access.',
    descriptionBn: 'সাধারণ অপারেশনাল অ্যাক্সেস।',
    allowedTabs: ['dashboard', 'artists', 'fees', 'attendance', 'classes', 'notifications'],
    restrictedDepartments: null
  };
}

/**
 * Checks if a specific tab (module) is allowed for the given Admin ID.
 */
export function isTabAllowedForAdmin(adminId: string, tabId: string): boolean {
  const config = getAdminLevelConfig(adminId);
  return config.allowedTabs.includes(tabId);
}

/**
 * Checks if an item (like an Artist or Class) belongs to the departments allowed for the Admin.
 */
export function isDepartmentAllowedForAdmin(adminId: string, itemDepts: string[] | string): boolean {
  const config = getAdminLevelConfig(adminId);
  if (!config.restrictedDepartments) return true; // Level 1 & 2 have access to all departments
  
  const deptsToCheck = Array.isArray(itemDepts) ? itemDepts : [itemDepts];
  return deptsToCheck.some(dept => 
    config.restrictedDepartments!.some(restricted => 
      dept.toLowerCase().includes(restricted.toLowerCase()) || 
      restricted.toLowerCase().includes(dept.toLowerCase())
    )
  );
}

/**
 * Returns localized label for an Admin's level/role.
 */
export function getAdminLevelLabel(adminId: string, lang: 'bn' | 'en'): string {
  const config = ADMIN_LEVELS[adminId];
  if (!config) return lang === 'bn' ? 'সহকারী পরিচালক' : 'Assistant Director';
  return lang === 'bn' ? config.labelBn : config.labelEn;
}
