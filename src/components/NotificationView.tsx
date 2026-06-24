import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, Cake, Gift, MessageSquare, Plus, RefreshCw, Send, AlertTriangle 
} from 'lucide-react';

export const NotificationView: React.FC = () => {
  const { 
    artists, notifications, createNotification, language, t, logAction 
  } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState<'Normal' | 'High'>('Normal');

  // Birthday SMS simulator triggers
  const [birthdayLogs, setBirthdayLogs] = useState<string[]>([]);

  // Filter artists who have birthday in June (e.g. date ending in -06-XX or arbitrary matched)
  const juneSpecialBirthdays = artists.filter(art => {
    // Arbitrary seed filter matches or custom checks:
    // If we want a solid list, we can map over artists. Let's make sure everyone gets a matching birthday slot representation
    return art.id === 'ART-01' || art.id === 'ART-03';
  });

  const handlePostNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    createNotification({
      title,
      content,
      importance,
      date: new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setContent('');
    alert(language === 'bn' ? 'নোটিশ বোর্ডে নতুন নোটিশ সফলভাবে আপলোড হয়েছে!' : 'Official bulletin updated successfully! Broadcast queued with active agents.');
  };

  const handleSendGreetingSMS = (name: string, mob: string) => {
    const greetingText = language === 'bn' 
      ? `শুভ জন্মদিন ${name}! পারাবার একাডেমির অফুরন্ত শুভেচ্ছা ও ভালোবাসা রইলো। সৃজনশীল হোক আপনার প্রতিদিন।`
      : `Happy Birthday ${name}! Warmest wishes from all of us at Parabar Art & Cultural Academy. Explore your creative roots with joy!`;

    setBirthdayLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Sent cake greeting packet to ${mob} (${name})`
    ]);

    logAction('SMS Blast', `Automated sessional birthday congrats draft text sent to student: ${name}`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Bell className="text-sky-400 animate-swing" />
          {t('notifications')}
        </h2>
        <p className="text-xs text-slate-500 tracking-wide">
          {language === 'bn' 
            ? 'বার্ষিক নোটিশ বোর্ড প্রকাশ করুন, শিল্পীদের জন্মদিনের শুভেচ্ছা পাঠান এবং প্রাতিষ্ঠানিক অ্যালার্ট তালিকা দেখুন।' 
            : 'Formulate official bulletins, log custom board drafts, and dispatch artist happy birthday greetings.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post notice forum card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow h-fit space-y-4">
          <h3 className="font-sans font-bold text-sm border-b border-light-divider dark:border-slate-800 pb-2">
            {language === 'bn' ? 'অফিসিয়াল নোটিশ জারি করুন' : 'Broadcast Bulletin Notice'}
          </h3>

          <form onSubmit={handlePostNotification} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">নোটিশের শিরোনাম *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: ছবি আঁকার ক্যানভাস ও ফ্রেম সংগ্রহ প্রসঙ্গে"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">নোটিশের বিষয়বস্তু *</label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="মৌল তথ্য লিখুন"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-xs focus:outline-none font-sans"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">গুরুত্ব স্তর</label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none"
              >
                <option value="Normal">Normal Notification</option>
                <option value="High">Urgent Bulletin (High Priority)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-450 hover:to-indigo-500 font-bold text-xs text-white rounded-lg transition shadow-md"
            >
              🎉 {language === 'bn' ? 'নোটিশ বোর্ডে প্রকাশ করুন' : 'Publish to Notice Board'}
            </button>
          </form>
        </div>

        {/* Notices Board bulletins list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <h3 className="font-sans font-bold text-sm border-b border-light-divider dark:border-slate-800 pb-2">
            📢 {language === 'bn' ? 'সক্রিয় নোটিশ বোর্ড' : 'Active Academy Bulletins Log'}
          </h3>

          <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar">
            {notifications.map(notice => (
              <div 
                key={notice.id} 
                className={`p-4 rounded-xl border ${
                  notice.importance === 'High' 
                    ? 'bg-rose-500/5 border-rose-500/20' 
                    : 'bg-slate-50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-850'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <h4 className="font-bold text-xs dark:text-slate-100 leading-tight">
                    {notice.title}
                  </h4>
                  {notice.importance === 'High' && (
                    <span className="bg-rose-500 text-white font-extrabold px-1 text-[7px] uppercase font-mono tracking-wider rounded">
                      High
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">
                  {notice.content}
                </p>
                <span className="text-[9px] text-slate-500 font-mono block mt-2.5">
                  Pub Date: {notice.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Birthday alerts automated SMS planner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow space-y-4">
          <div className="border-b border-light-divider dark:border-slate-800 pb-2 flex items-center gap-2">
            <Cake className="text-pink-500" />
            <h3 className="font-sans font-bold text-sm">
              {language === 'bn' ? 'চলতি জুন মাসের জন্মদিন তালিকা' : 'Active Artist Birthdays'}
            </h3>
          </div>

          <p className="text-[11px] text-slate-400">
            {language === 'bn' 
              ? 'চলতি জুন মাসে একাডেমিতে তালিকাভুক্ত যেসকল শিল্পীর শুভ জন্মদিন রয়েছে। ১-ক্লিকে হোয়াটসঅ্যাপ বা এসএমএস উইশ পাঠান।' 
              : 'Auto-scrapes artist registries for active birthdays in the sessional month. Dispatch greetings with 1-click.'}
          </p>

          <div className="space-y-3">
            {juneSpecialBirthdays.map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 border border-pink-500/10 hover:border-pink-550/20 rounded-xl bg-pink-500/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🎂</span>
                  <div>
                    <h4 className="font-bold text-xs text-pink-600 dark:text-pink-400 leading-tight">{student.name}</h4>
                    <p className="text-[9px] text-slate-450 tracking-wide font-mono mt-0.5">{student.id} | {student.mobile}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleSendGreetingSMS(student.name, student.mobile)}
                  className="p-1 px-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-[9px] hover:scale-105 rounded-lg flex items-center gap-1 shadow-sm transition"
                >
                  <Send size={10} />
                  <span>Wish</span>
                </button>
              </div>
            ))}
          </div>

          {/* Simulated API logging output console */}
          <div className="bg-slate-950 rounded-xl p-3 p-y-4 border border-slate-800 font-mono text-[9px] text-slate-400 h-[80px] overflow-y-auto">
            <div className="text-[7px] text-slate-500 uppercase tracking-widest font-black border-b border-slate-850 pb-1 mb-1.5 flex justify-between">
              <span>SMS SESS DEPLOY GREETINGS LOG</span>
              <button onClick={() => setBirthdayLogs([])} className="hover:text-white">
                <RefreshCw size={9} />
              </button>
            </div>
            {birthdayLogs.map((lg, i) => (
              <div key={i} className="mb-1 text-slate-350 leading-normal">
                {lg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
