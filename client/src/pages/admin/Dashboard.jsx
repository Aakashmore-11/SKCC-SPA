import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Settings, 
  Plus, 
  Trash2, 
  Save, 
  LogOut,
  TrendingUp,
  Users,
  GraduationCap,
  Briefcase,
  Phone,
  MapPin,
  CheckCircle2,
  Upload,
  Camera,
  Cloud,
  Loader2,
  Trophy,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../ContentContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    instituteInfo, updateInfo,
    courses, updateCourses,
    staff, updateStaff,
    gallery, updateGallery,
    toppers, updateToppers,
    submissions, updateSubmissions,
    cloudinaryConfig, updateCloudinary
  } = useContent();

  const [activeTab, setActiveTab] = useState('overview');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCategory, setNewImageCategory] = useState('Event');
  const [localInfo, setLocalInfo] = useState(instituteInfo);
  const [successMsg, setSuccessMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const galleryInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const verifyAccess = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin');
        return;
      }
      try {
        const res = await fetch(`${API_URL}/api/auth/verify`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          localStorage.removeItem('isAdminAuthenticated');
          navigate('/admin');
        }
      } catch {
        navigate('/admin');
      }
    };
    verifyAccess();
    setLocalInfo(instituteInfo);
  }, [navigate, instituteInfo]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const uploadToCloudinary = async (file) => {
    setIsUploading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      // 1. Attempt Backend Signed Upload (Secure)
      try {
        const token = localStorage.getItem('token');
        const formDataBackend = new FormData();
        formDataBackend.append('image', file);
        
        const res = await fetch(`${API_URL}/api/admin/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataBackend,
          signal: controller.signal
        });

        if (res.ok) {
          const data = await res.json();
          return data.url;
        }
      } catch (e) {
        if (e.name === 'AbortError') {
          alert("Upload Timed Out! Your image might be too large or your internet is slow.");
        }
        console.log("Backend upload failed, attempting fallback...");
      }

      // 2. Direct Unsigned Fallback (If Configured)
      if (cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            { method: 'POST', body: formData }
          );
          const data = await response.json();
          if (data.secure_url) {
            return data.secure_url;
          }
        } catch (error) {
          console.log(`Cloudinary Fallback Error: ${error.message}`);
        }
      }

      // 3. Ultimate Fallback: Base64
      console.warn("Using local base64 fallback. This may consume storage quota.");
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

    } finally {
      setIsUploading(false);
      clearTimeout(timeoutId);
    }
  };

  const handleFileChange = async (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const result = await uploadToCloudinary(file);
      if (result) callback(result);
    }
  };

  // Gallery
  const addImage = (url) => {
    const targetUrl = url || newImageUrl;
    if (!targetUrl) return;
    updateGallery([...gallery, { id: Date.now(), url: targetUrl, category: newImageCategory }]);
    setNewImageUrl('');
    showSuccess('Asset added to ' + newImageCategory);
  };

  const removeImage = (id) => {
    updateGallery(gallery.filter(img => img.id !== id));
    showSuccess('Asset removed');
  };

  // Staff
  const removeStaff = (idx) => {
    const updated = [...staff];
    updated.splice(idx, 1);
    updateStaff(updated);
  };

  const addStaff = () => {
    const newMember = { name: "New Teacher", role: "Subject Specialist", qualification: "B.Ed", image: "https://images.unsplash.com/photo-1544717297-fa95b35c7685?q=80&w=2070&auto=format&fit=crop" };
    updateStaff([...staff, newMember]);
  };

  const updateStaffMember = (idx, field, value) => {
    const updated = [...staff];
    updated[idx][field] = value;
    updateStaff(updated);
  };

  // Toppers
  const addTopper = () => {
    const newTopper = { id: Date.now(), name: "Student Name", grade: "95%", year: "2024", image: "https://images.unsplash.com/photo-1590650516494-23251a17dd0c?q=80&w=2070&auto=format&fit=crop" };
    updateToppers([...toppers, newTopper]);
  };

  const removeTopper = (id) => {
    updateToppers(toppers.filter(t => t.id !== id));
    showSuccess('Achievement archived');
  };

  const updateTopperData = (id, field, value) => {
    updateToppers(toppers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // Info
  const saveInfo = () => {
    updateInfo(localInfo);
    showSuccess('Institute basics updated');
  };

  return (
    <div className="min-h-screen bg-[#06060A] text-white flex">
      {/* Uploading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-4">
             <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
             <p className="text-xs font-black uppercase tracking-widest">Processing Cloud Assets...</p>
          </div>
        </div>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-yellow-400 text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-3xl flex flex-col p-6 h-screen sticky top-0">
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-yellow-400 p-1.5 rounded-lg">
            <Settings className="text-black w-5 h-5" />
          </div>
          <span className="font-black text-xl italic" style={{ fontFamily: "'Playfair Display', serif" }}>Control</span>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'overview', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview' },
            { id: 'info', icon: <Briefcase className="w-4 h-4" />, label: 'Branding' },
            { id: 'results', icon: <Trophy className="w-4 h-4" />, label: 'Hall of Fame' },
            { id: 'gallery', icon: <ImageIcon className="w-4 h-4" />, label: 'Visuals' },
            { id: 'courses', icon: <GraduationCap className="w-4 h-4" />, label: 'Courses' },
            { id: 'staff', icon: <Users className="w-4 h-4" />, label: 'Faculty' },
            { id: 'stats', icon: <TrendingUp className="w-4 h-4" />, label: 'Live Data' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all mt-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock Shield</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
                <div className="bg-yellow-400/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <ShieldCheck className="text-yellow-400 w-10 h-10" />
                </div>
                <h2 className="text-4xl font-black mb-4 italic" style={{ fontFamily: "'Playfair Display', serif" }}>System Operational.</h2>
                <p className="text-gray-500 max-w-sm mx-auto font-bold uppercase tracking-widest text-[10px]">Managing: {instituteInfo.name}</p>
             </motion.div>
          )}

          {/* LIVE DATA / INBOUND FEED */}
          {activeTab === 'stats' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-4xl font-black mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Live Inbound Data</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'Total Leads', val: submissions.length, color: 'text-yellow-400' },
                  { label: 'Courses Active', val: courses.length, color: 'text-indigo-400' },
                  { label: 'Faculty Count', val: staff.length, color: 'text-emerald-400' },
                  { label: 'Media Assets', val: gallery.length, color: 'text-pink-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center">
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">{stat.label}</p>
                    <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden">
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Recent Admission Enquiries</h3>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Stream</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-gray-500 uppercase text-[10px] font-black tracking-widest border-b border-white/5">
                        <th className="px-8 py-6">Date</th>
                        <th className="px-8 py-6">Student</th>
                        <th className="px-8 py-6">Target Class</th>
                        <th className="px-8 py-6">Contact</th>
                        <th className="px-8 py-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6">
                            <p className="text-xs text-gray-400 font-bold">{sub.timestamp}</p>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-white font-black text-sm">{sub.studentName}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">P: {sub.parentName}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-400/20">
                              {sub.studentClass}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-xs text-white font-bold">{sub.phone}</p>
                            <p className="text-[10px] text-indigo-400 underline font-bold lowercase">{sub.email}</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => updateSubmissions(submissions.filter(s => s.id !== sub.id))}
                              className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {submissions.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-8 py-20 text-center text-slate-600 font-bold text-xs uppercase tracking-[0.4em]">
                            No enquiries received yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* BRANDING / INFO */}
          {activeTab === 'info' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-black mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Identity Settings</h2>
              
              {/* Cloudinary Config Section */}
              <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] p-8 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Cloud className="text-indigo-400 w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Cloudinary Engine</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-slate-500">Cloud Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm"
                      placeholder="e.g. dxyz1234"
                      value={cloudinaryConfig.cloudName}
                      onChange={(e) => updateCloudinary({...cloudinaryConfig, cloudName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-slate-500">Upload Preset (Unsigned)</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm"
                      placeholder="e.g. skcc_preset"
                      value={cloudinaryConfig.uploadPreset}
                      onChange={(e) => updateCloudinary({...cloudinaryConfig, uploadPreset: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image Browse */}
              <div className="mb-12">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-4">Landing Hero Image</label>
                <div className="relative group w-full h-64 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5">
                  <img 
                    src={localInfo.heroImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                       <Upload className="w-4 h-4" /> Change Background
                       <input 
                         type="file" 
                         className="hidden" 
                         accept="image/*"
                         onChange={(e) => handleFileChange(e, (url) => setLocalInfo({...localInfo, heroImage: url}))}
                       />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Institute Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-400/50"
                    value={localInfo.name}
                    onChange={(e) => setLocalInfo({...localInfo, name: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Address</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-400/50"
                    value={localInfo.address}
                    onChange={(e) => setLocalInfo({...localInfo, address: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">WhatsApp Number</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-400/50"
                    value={localInfo.whatsapp}
                    onChange={(e) => setLocalInfo({...localInfo, whatsapp: e.target.value})}
                  />
                </div>
              </div>
              <button onClick={saveInfo} className="bg-yellow-400 text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-yellow-400/20 active:scale-95 transition-all">
                <Save className="w-4 h-4" />
                Sync Identity
              </button>

              {/* Maintenance Section */}
              <div className="mt-20 pt-20 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500">System Maintenance</h3>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 rounded-[2.5rem] p-8">
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    If you encounter a <code className="text-red-400">QuotaExceededError</code>, it means massive Base64 images are clogging your browser's storage. Please reset the cache and use **Cloudinary** for image hosting.
                  </p>
                  <button 
                    onClick={() => {
                        localStorage.removeItem('skcc_gallery');
                        localStorage.removeItem('skcc_toppers');
                        localStorage.removeItem('skcc_staff');
                        window.location.reload();
                    }}
                    className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors"
                  >
                    Hard Reset Media Cache
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* HALL OF FAME (Achievements) */}
          {activeTab === 'results' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-black italic" style={{ fontFamily: "'Playfair Display', serif" }}>Academic Champions</h2>
                <button onClick={addTopper} className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-xs uppercase flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Topper
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toppers.map((t) => (
                  <div key={t.id} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-6 group">
                    <div className="relative group/img overflow-hidden rounded-2xl w-24 h-24 flex-shrink-0">
                      <img src={t.image} className="w-full h-full object-cover transition-all duration-500" />
                      <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer text-white">
                        <Camera className="w-5 h-5" />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, (url) => updateTopperData(t.id, 'image', url))} />
                      </label>
                    </div>
                    <div className="flex-grow space-y-3">
                      <input 
                        className="w-full bg-transparent border-b border-white/10 text-white font-black text-lg focus:border-yellow-400 outline-none" 
                        value={t.name} 
                        onChange={(e) => updateTopperData(t.id, 'name', e.target.value)}
                      />
                      <div className="flex gap-4">
                        <div className="space-y-1 flex-grow">
                           <label className="text-[10px] uppercase font-black text-slate-500">Grade</label>
                           <input 
                            className="w-full bg-transparent border-b border-white/10 text-yellow-400 font-black text-sm outline-none" 
                            value={t.grade} 
                            onChange={(e) => updateTopperData(t.id, 'grade', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1 w-24">
                           <label className="text-[10px] uppercase font-black text-slate-500">Year</label>
                           <input 
                            className="w-full bg-transparent border-b border-white/10 text-slate-400 font-bold text-sm outline-none" 
                            value={t.year} 
                            onChange={(e) => updateTopperData(t.id, 'year', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeTopper(t.id)} className="text-gray-700 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* GALLERY */}
          {activeTab === 'gallery' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-4xl font-black mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Visual Storytelling</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 mb-12">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400 mb-6">Import Moments</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                      <input 
                        type="text" 
                        placeholder="Image URL..." 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white pr-32"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                      />
                      <button onClick={() => galleryInputRef.current.click()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white"><Upload className="w-5 h-5" /></button>
                      <input ref={galleryInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, (url) => addImage(url))} />
                    </div>
                    <select 
                      className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-xs font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                      value={newImageCategory}
                      onChange={(e) => setNewImageCategory(e.target.value)}
                    >
                      <option value="Event" className="bg-[#0A0A0F]">Events</option>
                      <option value="Activity" className="bg-[#0A0A0F]">Activities</option>
                      <option value="Classroom" className="bg-[#0A0A0F]">Classroom</option>
                    </select>
                    <button onClick={() => addImage()} className="bg-white text-black px-10 rounded-2xl font-black text-xs uppercase tracking-widest py-4 md:py-0">Archive</button>
                  </div>
                </div>
              </div>

              <div className="columns-1 md:columns-3 gap-6 space-y-6">
                {gallery.map(img => (
                  <div key={img.id} className="group relative break-inside-avoid rounded-3xl overflow-hidden border border-white/5">
                    <img src={img.url} className="w-full object-cover transition-all duration-500" />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.category || 'Event'}
                    </div>
                    <button onClick={() => removeImage(img.id)} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 shadow-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* COURSES */}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-black italic" style={{ fontFamily: "'Playfair Display', serif" }}>Academic Offerings</h2>
                <button 
                  onClick={() => updateCourses([...courses, { name: 'New Course', description: 'Enter details...' }])}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-xs uppercase flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Level
                </button>
              </div>

              <div className="space-y-6">
                {courses.map((course, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] group relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-600">Course Title</label>
                        <input 
                          type="text"
                          className="w-full bg-transparent border-b border-white/10 py-2 text-xl font-black text-white focus:border-yellow-400 outline-none"
                          value={course.name}
                          onChange={(e) => {
                            const updated = [...courses];
                            updated[idx].name = e.target.value;
                            updateCourses(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-600">Description</label>
                        <textarea 
                          className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-gray-400 focus:border-yellow-400 outline-none resize-none"
                          value={course.description || course.desc}
                          onChange={(e) => {
                            const updated = [...courses];
                            updated[idx].description = e.target.value;
                            updateCourses(updated);
                          }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const updated = courses.filter((_, i) => i !== idx);
                        updateCourses(updated);
                      }}
                      className="absolute top-6 right-6 text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* FACULTY */}
          {activeTab === 'staff' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-black italic" style={{ fontFamily: "'Playfair Display', serif" }}>Faculty Roster</h2>
                <button onClick={addStaff} className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-xs uppercase flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Specialist
                </button>
              </div>

              <div className="space-y-6">
                {staff.map((member, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl flex items-center gap-8 group">
                    <div className="relative group/img overflow-hidden rounded-2xl">
                      <img src={member.image} className="w-24 h-24 rounded-2xl object-cover transition-all duration-500" />
                      <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, (url) => updateStaffMember(idx, 'image', url))}
                        />
                      </label>
                    </div>
                    <div className="flex-grow grid grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-700">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-b border-white/10 py-1 text-sm font-bold text-white focus:border-yellow-400 outline-none"
                          value={member.name}
                          onChange={(e) => updateStaffMember(idx, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-700">Role / Subject</label>
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-b border-white/10 py-1 text-sm text-gray-400 focus:border-yellow-400 outline-none"
                          value={member.role}
                          onChange={(e) => updateStaffMember(idx, 'role', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-700">Qualification</label>
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-b border-white/10 py-1 text-xs text-gray-500 focus:border-yellow-400 outline-none uppercase tracking-widest"
                          value={member.qualification}
                          onChange={(e) => updateStaffMember(idx, 'qualification', e.target.value)}
                        />
                      </div>
                    </div>
                    <button onClick={() => removeStaff(idx)} className="text-gray-700 hover:text-red-500 p-2 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
};



const ShieldCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default AdminDashboard;
