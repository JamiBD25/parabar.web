import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Artist } from '../types';
import { 
  Plus, Edit2, Trash2, Search, Filter, ArrowUpDown, 
  Download, QrCode, FileSpreadsheet, FileText, CheckCircle, 
  X, Camera, User, School, Calendar, Smartphone, MapPin,
  ClipboardList, CreditCard, Lock
} from 'lucide-react';

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

export const ArtistView: React.FC = () => {
  const { 
    artists, addArtist, updateArtist, deleteArtist, t, language, logAction, payments, attendance
  } = useApp();

  // Search, Filter and Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState<keyof Artist>('nameEn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Form modal states
  const [showModal, setShowModal] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  // QR Modal states
  const [selectedQRArtist, setSelectedQRArtist] = useState<Artist | null>(null);

  // Detail tracker modal states
  const [selectedDetailArtist, setSelectedDetailArtist] = useState<Artist | null>(null);
  const [detailSubTab, setDetailSubTab] = useState<'fees' | 'attendance'>('fees');

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formFather, setFormFather] = useState('');
  const [formMother, setFormMother] = useState('');
  const [formDob, setFormDob] = useState('2015-01-01');
  const [formBlood, setFormBlood] = useState('O+');
  const [formMobile, setFormMobile] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formInstitution, setFormInstitution] = useState('');
  const [formGrade, setFormGrade] = useState('Class 5');
  const [formDepts, setFormDepts] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');
  const [formPhoto, setFormPhoto] = useState('');
  const [formPassword, setFormPassword] = useState('student');

  // Mock Camera State
  const [cameraActive, setCameraActive] = useState(false);

  const departmentsList = ['Music (Khude Parabar)', 'Music (Kishore Parabar)', 'Fine Arts', 'Dance', 'Recitation', 'Theatre'];
  const bloodGroupsList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const gradesList = ['Playgroup', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'HSC 1st Yr', 'HSC 2nd Yr'];

  // Toggle Department Choice
  const handleDeptToggle = (dept: string) => {
    if (formDepts.includes(dept)) {
      setFormDepts(formDepts.filter(d => d !== dept));
    } else {
      setFormDepts([...formDepts, dept]);
    }
  };

  const handleOpenAddModal = () => {
    setEditingArtist(null);
    setFormName('');
    setFormNameEn('');
    setFormFather('');
    setFormMother('');
    setFormDob('2015-01-01');
    setFormBlood('O+');
    setFormMobile('');
    setFormAddress('');
    setFormInstitution('');
    setFormGrade('Class 5');
    setFormDepts([]);
    setFormStatus('Active');
    setFormPhoto('');
    setFormPassword('student');
    setShowModal(true);
  };

  const handleOpenEditModal = (artist: Artist) => {
    setEditingArtist(artist);
    setFormName(artist.name);
    setFormNameEn(artist.nameEn);
    setFormFather(artist.fatherName);
    setFormMother(artist.motherName);
    setFormDob(artist.dob);
    setFormBlood(artist.bloodGroup);
    setFormMobile(artist.mobile);
    setFormAddress(artist.address);
    setFormInstitution(artist.institution);
    setFormGrade(artist.grade);
    setFormDepts(artist.departments);
    setFormStatus(artist.status);
    setFormPhoto(artist.photo);
    setFormPassword(artist.password || 'student');
    setShowModal(true);
  };

  const currentAdminCanModify = true; // Super / Sub Admin permissions

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formNameEn || !formMobile || formDepts.length === 0) {
      alert(language === 'bn' ? 'দয়া করে সব প্রয়োজনীয় তথ্য ও অন্তত একটি বিভাগ পূরণ করুন।' : 'Please fill all fields and enroll in at least one department.');
      return;
    }

    const payload = {
      name: formName,
      nameEn: formNameEn,
      fatherName: formFather,
      motherName: formMother,
      dob: formDob,
      bloodGroup: formBlood,
      mobile: formMobile,
      address: formAddress,
      institution: formInstitution,
      grade: formGrade,
      departments: formDepts,
      status: formStatus,
      password: formPassword,
      photo: formPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces'
    };

    if (editingArtist) {
      updateArtist(editingArtist.id, payload);
    } else {
      addArtist(payload);
    }
    setShowModal(false);
  };

  const handleDeleteArtist = (id: string, name: string) => {
    if (confirm(language === 'bn' ? `আপনি কি নিশ্চিতভাবে "${name}" শিল্পীকে মুছে ফেলতে চান?` : `Are you sure you want to delete artist "${name}"?`)) {
      deleteArtist(id);
    }
  };

  const handleTakeMockPhoto = () => {
    setCameraActive(true);
    setTimeout(() => {
      // Pick a random cool portrait illustration
      const randomAvatars = [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=faces',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces'
      ];
      const selected = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
      setFormPhoto(selected);
      setCameraActive(false);
    }, 1500);
  };

  const handleToggleSort = (field: keyof Artist) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Searching, sorting, filtering logic
  const filteredArtists = (artists || [])
    .filter(art => {
      if (!art) return false;
      const searchLower = (searchTerm || '').toLowerCase();
      const nameLower = (art.name || '').toLowerCase();
      const nameEnLower = (art.nameEn || '').toLowerCase();
      const idLower = (art.id || '').toLowerCase();
      const mobileVal = art.mobile || '';
      const instLower = (art.institution || '').toLowerCase();

      const matchesSearch = 
        nameLower.includes(searchLower) ||
        nameEnLower.includes(searchLower) ||
        idLower.includes(searchLower) ||
        mobileVal.includes(searchLower) ||
        instLower.includes(searchLower);

      const matchesDept = filterDept ? (art.departments && Array.isArray(art.departments) && art.departments.includes(filterDept)) : true;
      const matchesStatus = filterStatus ? art.status === filterStatus : true;

      return matchesSearch && matchesDept && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortBy] ?? '';
      let bVal = b[sortBy] ?? '';

      if (Array.isArray(aVal)) aVal = aVal.join(',');
      if (Array.isArray(bVal)) bVal = bVal.join(',');

      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();

      if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
      if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Export PDF: Triggers window print with dynamic styled context
  const handlePrintArtistRoster = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const artistRows = filteredArtists.map((art, idx) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px; font-weight: bold;">${art.id || ''}</td>
        <td style="padding: 10px;">${art.name || ''} (${art.nameEn || ''})</td>
        <td style="padding: 10px;">${Array.isArray(art.departments) ? art.departments.join(', ') : ''}</td>
        <td style="padding: 10px;">${art.mobile || ''}</td>
        <td style="padding: 10px;">${art.grade || ''}</td>
        <td style="padding: 10px;">${art.status === 'Active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Parabar Artists Roster</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; }
            h1 { text-align: center; color: #0f172a; margin-bottom: 5px; }
            p { text-align: center; color: #666; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #f1f5f9; padding: 12px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>পারাবার আর্ট অ্যান্ড কালচারাল একাডেমি</h1>
          <p>শিল্পী তালিকা (সর্বমোট: ${filteredArtists.length} জন)</p>
          <table>
            <thead>
              <tr>
                <th>আইডি</th>
                <th>শিল্পীর নাম</th>
                <th>বিভাগ</th>
                <th>মোবাইল</th>
                <th>শ্রেণী</th>
                <th>অবস্থা</th>
              </tr>
            </thead>
            <tbody>
              ${artistRows}
            </tbody>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
    logAction('Export Artists Roster', 'Generated print/PDF document for artists registry list');
  };

  // Export Excel: Creates a CSV stream
  const handleExportCSV = () => {
    const headers = ['Artist ID', 'Name', 'English Name', 'Father', 'Mother', 'DOB', 'Blood Group', 'Mobile', 'Address', 'Institution', 'Grade', 'Departments', 'Status', 'CreatedAt'];
    const rows = filteredArtists.map(art => [
      art.id || '',
      art.name || '',
      art.nameEn || '',
      art.fatherName || '',
      art.motherName || '',
      art.dob || '',
      art.bloodGroup || '',
      art.mobile || '',
      art.address || '',
      art.institution || '',
      art.grade || '',
      Array.isArray(art.departments) ? art.departments.join(';') : '',
      art.status || '',
      art.createdAt || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'parabar_artists_registry.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    logAction('Export Artists CSV', 'Downloaded CSV backup file for artists directory');
  };

  return (
    <div className="space-y-6">
      {/* Title with controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <User className="text-sky-400" />
            {t('artists')}
          </h2>
          <p className="text-xs text-slate-500 tracking-wide">
            {language === 'bn' ? 'শিল্পীদের আইডি, বিভাগ ও ব্যক্তিগত তথ্যাদি পর্যবেক্ষণ করুন' : 'Enroll and monitor the cultural credentials of academy registers'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Export PDF */}
          <button
            onClick={handlePrintArtistRoster}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-800"
          >
            <FileText size={14} />
            <span>PDF</span>
          </button>

          {/* Export Excel (CSV) */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-800"
          >
            <FileSpreadsheet size={14} />
            <span>CSV</span>
          </button>

          {/* Add New Artist Button */}
          <button
            id="add-new-artist-btn"
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg text-xs font-semibold shadow hover:from-sky-400 hover:to-indigo-500 transition"
          >
            <Plus size={16} />
            <span>{t('addNew')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Filter Department */}
          <div className="relative">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">{language === 'bn' ? 'সকল বিভাগ' : 'All Departments'}</option>
              {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Filter Status */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">{language === 'bn' ? 'সকল অবস্থা' : 'All Status'}</option>
              <option value="Active">{language === 'bn' ? 'সক্রিয়' : 'Active'}</option>
              <option value="Inactive">{language === 'bn' ? 'নিষ্ক্রিয়' : 'Inactive'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of registered Artists (Responsive list and cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredArtists.length === 0 ? (
          <div className="col-span-full bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-700 py-12 text-center text-slate-400 rounded-2xl">
            <User size={48} className="mx-auto mb-3 opacity-30 text-sky-400" />
            <p className="font-semibold text-sm text-slate-600 dark:text-slate-400">
              {language === 'bn' ? 'কোনো শিল্পী পাওয়া যায়নি।' : 'No enrolled artist matched the search query.'}
            </p>
          </div>
        ) : (
          filteredArtists.map((artist) => {
            return (
              <div 
                key={artist.id} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-lg p-5 hover:translate-y-[-4px] transition duration-300 flex flex-col justify-between"
              >
                {/* Header Profile Photo */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={artist.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces'} 
                      alt="" 
                      className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500/20 shadow-md shadow-indigo-500/5 shrink-0" 
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                        {artist.name}
                      </h3>
                      <p className="text-xs text-sky-400 font-mono font-semibold">{artist.id}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{artist.nameEn}</p>
                    </div>
                  </div>

                  {/* Status Indicator bubble */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    artist.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {artist.status === 'Active' ? t('active') : t('inactive')}
                  </span>
                </div>

                {/* Body details list */}
                <div className="my-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <p className="flex items-center gap-2">
                    <School size={13} className="text-slate-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-300">{artist.institution || ''}</span>
                    <span className="bg-slate-850 px-1 rounded font-mono font-bold text-sky-400">{artist.grade || ''}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Smartphone size={13} className="text-slate-500" />
                    <span>{artist.mobile || ''}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={13} className="text-slate-500" />
                    <span className="truncate">{artist.address || ''}</span>
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">{language === 'bn' ? 'পিতা/মাতা' : 'Parents'}:</span>
                    <span className="truncate">{artist.fatherName || ''} / {artist.motherName || ''}</span>
                  </p>

                  <div className="flex items-center gap-2 mt-2 bg-sky-500/5 dark:bg-sky-450/10 border border-sky-500/10 dark:border-sky-455/20 px-2.5 py-1.5 rounded-xl text-sky-600 dark:text-[#38bdf8]">
                    <Lock size={11} className="shrink-0" />
                    <span className="text-[10px] font-bold tracking-wide uppercase">{language === 'bn' ? 'লগইন পাসওয়ার্ড:' : 'Login Pass:'}</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded text-indigo-600 dark:text-[#38bdf8] font-black select-all text-[11px] tracking-wider ml-auto">
                      {artist.password || 'student'}
                    </span>
                  </div>
                  
                  {/* Departments Array list */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                    {Array.isArray(artist.departments) && artist.departments.map(dept => (
                      <span key={dept} className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-medium text-[10px]">
                        {getDeptLabel(dept, language)}
                      </span>
                    ))}
                    <span className="ml-auto bg-slate-950 font-bold px-1.5 rounded text-[10px] text-rose-400 uppercase font-mono">
                      Blood {artist.bloodGroup || ''}
                    </span>
                  </div>
                </div>

                {/* Ledger Quick Peek Button */}
                <button
                  id={`ledger-peek-${artist.id}`}
                  onClick={() => {
                    setSelectedDetailArtist(artist);
                    setDetailSubTab('fees');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 mb-2 rounded-lg bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-700 transition duration-200 text-xs text-slate-700 dark:text-slate-300 cursor-pointer text-center"
                >
                  <ClipboardList size={13} className="text-indigo-400" />
                  <span className="font-sans font-bold">{language === 'bn' ? 'বেতন ও উপস্থিতি বিবরণী' : 'Fees & Attendance Ledger'}</span>
                </button>

                {/* Active Action Controls */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850/50 pt-3 mt-1.5">
                  {/* QR code trigger */}
                  <button
                    onClick={() => setSelectedQRArtist(artist)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-sky-400 transition"
                    title="Retrieve ID QR Card"
                  >
                    <QrCode size={16} />
                    <span className="text-[11px] font-semibold">{t('qrCode')}</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEditModal(artist)}
                      className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                      title={t('edit')}
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteArtist(artist.id, artist.name)}
                      className="p-1.5 rounded bg-rose-500/15 hover:bg-rose-500 hover:text-white text-rose-400 transition"
                      title={t('delete')}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add & Edit Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl text-slate-800 dark:text-slate-100 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-light-divider dark:border-slate-800/80">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-slate-100">
                {editingArtist ? t('edit') : t('addNew')}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveArtist} className="p-6 space-y-6">
              {/* Profile Photo upload placeholder selector */}
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-850">
                <div className="relative">
                  <img 
                    src={formPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces'} 
                    alt="avatar" 
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/20" 
                  />
                  {cameraActive && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center text-sky-400 text-xs text-center font-bold font-mono">
                      CAMA...
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <p className="text-sm font-semibold">{t('photoUpload')}</p>
                  <p className="text-xs text-slate-400">{language === 'bn' ? 'স্ন্যাপশট তুলতে ক্যামেরা অ্যাক্টিভেট ক্লিক করুন' : 'Camera frame will capture portrait mock'}</p>
                  
                  <div className="flex gap-2 pt-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={handleTakeMockPhoto}
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      <Camera size={13} />
                      <span>{cameraActive ? 'Snapping...' : 'Webcam Snap'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces')}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                    >
                      Use Avatar
                    </button>
                  </div>
                </div>
              </div>

              {/* Three column inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('artistName')} *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="যেমন: ফারহান আহমেদ"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('artistNameEn')} *</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="e.g. Farhan Ahmed"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">পিতার নাম</label>
                  <input
                    type="text"
                    value={formFather}
                    onChange={(e) => setFormFather(e.target.value)}
                    placeholder="পিতার পুরো নাম দিন"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">মাতার নাম</label>
                  <input
                    type="text"
                    value={formMother}
                    onChange={(e) => setFormMother(e.target.value)}
                    placeholder="মাতার পুরো নাম দিন"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('dob')}</label>
                  <input
                    type="date"
                    value={formDob}
                    onChange={(e) => setFormDob(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('bloodGroup')}</label>
                  <select
                    value={formBlood}
                    onChange={(e) => setFormBlood(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    {bloodGroupsList.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('mobile')} *</label>
                  <input
                    type="tel"
                    value={formMobile}
                    onChange={(e) => setFormMobile(e.target.value)}
                    placeholder="মোবাইল নম্বর লিখুন"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">
                    {language === 'bn' ? 'লগইন পাসওয়ার্ড / সিকিউরিটি পিন *' : 'Login Password / Security PIN *'}
                  </label>
                  <input
                    type="text"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder={language === 'bn' ? 'পাসওয়ার্ড লিখুন (যেমন: student)' : 'Enter password (e.g. student)'}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-mono tracking-wide"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('institution')}</label>
                  <input
                    type="text"
                    value={formInstitution}
                    onChange={(e) => setFormInstitution(e.target.value)}
                    placeholder="বিদ্যালয় বা কলেজের নাম"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('gradeClass')}</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    {gradesList.map(gr => <option key={gr} value={gr}>{gr}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('status')}</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="Active">{t('active')}</option>
                    <option value="Inactive">{t('inactive')}</option>
                  </select>
                </div>
              </div>

              {/* Address input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">{t('address')}</label>
                <textarea
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="বর্তমান ঠিকানা লিখুন"
                  rows={2}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                ></textarea>
              </div>

              {/* Departments checklist - support multi department enrollment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-2">
                  {t('enrollMultiple')} * (সর্বোচ্চ ৪ টি)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {departmentsList.map(dept => {
                    const selected = formDepts.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => handleDeptToggle(dept)}
                        className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition ${
                          selected 
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-bold' 
                            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded border border-indigo-500 flex items-center justify-center text-[8px] ${selected ? 'bg-indigo-600 text-white' : ''}`}>
                          {selected ? '✓' : ''}
                        </span>
                        <span>{getDeptLabel(dept, language)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action layout buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-light-divider dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-xs text-slate-750 dark:text-slate-300 transition"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 font-semibold text-xs text-white shadow hover:from-sky-400 hover:to-indigo-500 transition"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code and digital ID card generator popup modal */}
      {selectedQRArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white max-w-sm w-full shadow-2xl relative text-center">
            <button 
              onClick={() => setSelectedQRArtist(null)}
              className="absolute right-4 top-4 p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition"
            >
              <X size={16} />
            </button>

            {/* Simulated Printed card structure */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-5 shadow-inner">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
                <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">PARABAR CULTURAL ID</span>
              </div>

              {/* Live generated QR mock using visual styling */}
              <div className="mx-auto bg-white p-3 rounded-xl w-32 h-32 flex items-center justify-center border-4 border-slate-800 shadow">
                {/* Visual Representation of exact QR Grid for artist ID */}
                <div className="grid grid-cols-4 gap-0.5 w-full h-full p-2 opacity-90">
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="border border-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  
                  <div className="border border-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="border border-slate-950 rounded-[1px]"></div>
                  
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="border border-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                  <div className="border border-slate-950 rounded-[1px]"></div>
                  <div className="bg-slate-950 rounded-[1px]"></div>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-sans font-bold text-lg text-white">{selectedQRArtist.name || ''}</p>
                <p className="text-xs text-sky-400 font-mono tracking-wide mt-0.5">{selectedQRArtist.id || ''}</p>
                <p className="text-[10px] text-slate-500 mt-2">
                  Dept: {Array.isArray(selectedQRArtist.departments) ? selectedQRArtist.departments.join(', ') : ''}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {language === 'bn' 
                ? 'আইডি ও বিভাগের কিউআর ডিজিটাল কোড। একাডেমী দরজায় স্ক্যান করে দৈনিক ডিজিটাল হাজিরা দিতে এবং চালান রসিদ মেলাতে ব্যবহার করুন।' 
                : 'Digital security token used to verify billing accounts and auto-submit attendance registers.'}
            </p>

            <button
              onClick={() => {
                alert(language === 'bn' ? 'ডিজিটাল কার্ড ডাউনলোড সফল হয়েছে!' : 'Download complete!');
                setSelectedQRArtist(null);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition"
            >
              <Download size={16} />
              <span>{language === 'bn' ? 'কোড ডাউনলোড' : 'Download QR'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Fees & Attendance Ledger detailed Modal */}
      {selectedDetailArtist && (() => {
        const studentPayments = payments ? payments.filter(p => p.artistId === selectedDetailArtist.id) : [];
        const paidSum = studentPayments
          .filter(p => p.status === 'Paid')
          .reduce((sum, p) => sum + p.amount, 0);
        const dueSum = studentPayments
          .filter(p => p.status === 'Due' || p.status === 'Unpaid' || p.status === 'Partial')
          .reduce((sum, p) => sum + p.amount, 0);

        const studentAttendance = attendance ? attendance.filter(a => a.artistId === selectedDetailArtist.id) : [];
        const totalAttendance = studentAttendance.length;
        const presentCount = studentAttendance.filter(a => a.status === 'Present').length;
        const lateCount = studentAttendance.filter(a => a.status === 'Late').length;
        const absentCount = studentAttendance.filter(a => a.status === 'Absent').length;
        const leaveCount = studentAttendance.filter(a => a.status === 'Leave').length;

        const attendanceRate = totalAttendance > 0 
          ? Math.round(((presentCount + lateCount) / totalAttendance) * 100) 
          : 0;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl w-full max-w-2xl text-slate-800 dark:text-slate-100 shadow-2xl animate-scaleUp max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <h3 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <ClipboardList className="text-indigo-400" size={18} />
                    <span>{language === 'bn' ? `${selectedDetailArtist.name} এর আর্থিক ও উপস্থিতি বিবরণী` : `${selectedDetailArtist.name} - Ledger Summary`}</span>
                  </h3>
                  <p className="text-xs text-sky-400 font-mono font-semibold uppercase tracking-wide mt-0.5">
                    ID: {selectedDetailArtist.id || ''} • {selectedDetailArtist.nameEn || ''}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedDetailArtist(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body with Scroll area */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase font-bold">{language === 'bn' ? 'উপস্থিতি হার' : 'Attendance Rate'}</p>
                    <p className="text-xl font-extrabold text-emerald-400 mt-1">{attendanceRate}%</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {presentCount} P • {lateCount} L • {absentCount} A
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase font-bold">{language === 'bn' ? 'পরিশোধিত ফি' : 'Total Paid'}</p>
                    <p className="text-lg font-extrabold text-sky-400 mt-1">৳{paidSum}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {studentPayments.filter(p => p.status === 'Paid').length} {language === 'bn' ? 'রসিদ' : 'Receipts'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase font-bold">{language === 'bn' ? 'মোট বকেয়া' : 'Pending Due'}</p>
                    <p className="text-lg font-extrabold text-rose-400 mt-1">৳{dueSum}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {studentPayments.filter(p => p.status === 'Due' || p.status === 'Unpaid').length} {language === 'bn' ? 'প্রদেয়' : 'Pending'}
                    </p>
                  </div>
                </div>

                {/* Sub-Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDetailSubTab('fees')}
                    className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition ${
                      detailSubTab === 'fees' 
                        ? 'border-indigo-500 text-indigo-400' 
                        : 'border-transparent text-slate-450 hover:text-slate-350'
                    }`}
                  >
                    {language === 'bn' ? 'ফি পরিশোধ ও চালানের ইতিহাস' : 'Fee Payments & Bill Invoices'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailSubTab('attendance')}
                    className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition ${
                      detailSubTab === 'attendance' 
                        ? 'border-indigo-500 text-indigo-400' 
                        : 'border-transparent text-slate-455 hover:text-slate-355'
                    }`}
                  >
                    {language === 'bn' ? 'দৈনিক উপস্থিতি খতিয়ান' : 'Daily Academic Attendance'}
                  </button>
                </div>

                {/* Content Panel */}
                {detailSubTab === 'fees' ? (
                  <div className="space-y-3">
                    {studentPayments.length === 0 ? (
                      <p className="text-center py-8 text-xs text-slate-400 italic">
                        {language === 'bn' ? 'কোনো ফি পরিশোধের রেকর্ড পাওয়া যায়নি।' : 'No billings records registered for this student yet.'}
                      </p>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
                              <th className="p-3">{language === 'bn' ? 'ফি বিবরণী' : 'Fee Type'}</th>
                              <th className="p-3 text-right">{language === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                              <th className="p-3">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                              <th className="p-3">{language === 'bn' ? 'রসিদ' : 'Receipt No'}</th>
                              <th className="p-3">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                            {studentPayments.map((pay) => (
                              <tr key={pay.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                                <td className="p-3">
                                  <span className="font-semibold text-slate-900 dark:text-slate-100">{pay.feeType}</span>
                                  {pay.month && <span className="block text-[10px] text-slate-450 dark:text-slate-500">{pay.month}</span>}
                                </td>
                                <td className="p-3 text-right font-bold text-slate-800 dark:text-slate-250">
                                  ৳{pay.amount}
                                </td>
                                <td className="p-3 text-slate-500 font-mono text-[11px]">{pay.paymentDate || 'N/A'}</td>
                                <td className="p-3 text-slate-500 font-mono text-[11px]">{pay.receiptNo}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    pay.status === 'Paid' 
                                      ? 'bg-emerald-500/10 text-emerald-400' 
                                      : pay.status === 'Partial'
                                      ? 'bg-amber-500/10 text-amber-400'
                                      : 'bg-rose-500/10 text-rose-450'
                                  }`}>
                                    {pay.status === 'Paid' 
                                      ? (language === 'bn' ? 'পরিশোধিত' : 'Paid') 
                                      : pay.status === 'Partial'
                                      ? (language === 'bn' ? 'আংশিক' : 'Partial')
                                      : (language === 'bn' ? 'বকেয়া' : 'Due')}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {studentAttendance.length === 0 ? (
                      <p className="text-center py-8 text-xs text-slate-400 italic">
                        {language === 'bn' ? 'কোনো উপস্থিতির রেকর্ড পাওয়া যায়নি।' : 'No academic attendance logged for this student yet.'}
                      </p>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
                              <th className="p-3">{language === 'bn' ? 'ক্লাস তারিখ' : 'Class Date'}</th>
                              <th className="p-3">{language === 'bn' ? 'শ্রেণী প্রকার' : 'Course Type'}</th>
                              <th className="p-3">{language === 'bn' ? 'উপস্থিতি স্থিতি' : 'Attendance Status'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                            {studentAttendance.map((rec) => (
                              <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{rec.date}</td>
                                <td className="p-3 text-slate-500">{rec.type}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    rec.status === 'Present' 
                                      ? 'bg-emerald-500/10 text-emerald-400' 
                                      : rec.status === 'Late'
                                      ? 'bg-cyan-500/10 text-cyan-400'
                                      : rec.status === 'Leave'
                                      ? 'bg-amber-500/10 text-amber-400'
                                      : 'bg-rose-500/10 text-rose-450'
                                  }`}>
                                    {rec.status === 'Present' 
                                      ? (language === 'bn' ? 'উপস্থিত' : 'Present') 
                                      : rec.status === 'Late'
                                      ? (language === 'bn' ? 'বিলম্বিত' : 'Late')
                                      : rec.status === 'Leave'
                                      ? (language === 'bn' ? 'ছুটি' : 'Leave')
                                      : (language === 'bn' ? 'অনুপস্থিত' : 'Absent')}
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
              </div>

              {/* Footer */}
              <div className="flex justify-end p-5 border-t border-slate-100 dark:border-slate-805/50 bg-slate-50 dark:bg-slate-900/40 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setSelectedDetailArtist(null)}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition duration-200"
                >
                  {language === 'bn' ? 'ঠিক আছে' : 'Close Summary'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
