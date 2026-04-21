import React, { useState, useEffect } from 'react';
import { instituteInfo as defaultInfo, classes as defaultClasses, staff as defaultStaff } from './data/content';
import { ContentContext } from './ContentContext';

export const ContentProvider = ({ children }) => {
  const [instituteInfo, setInstituteInfo] = useState(defaultInfo);
  const [courses, setCourses] = useState(defaultClasses);
  const [staff, setStaff] = useState(defaultStaff);
  const [gallery, setGallery] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [cloudinaryConfig, setCloudinaryConfig] = useState({ cloudName: '', uploadPreset: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Load from Storage or Backend on mount
  useEffect(() => {
    const loadContent = async () => {
      // 1. Load local cache first for fast display
      const savedInfo = localStorage.getItem('skcc_info');
      const savedCourses = localStorage.getItem('skcc_courses');
      const savedStaff = localStorage.getItem('skcc_staff');
      const savedGallery = localStorage.getItem('skcc_gallery');
      const savedToppers = localStorage.getItem('skcc_toppers');
      const savedSubmissions = localStorage.getItem('skcc_submissions');
      const savedCloudinary = localStorage.getItem('skcc_cloudinary');

      if (savedInfo) setInstituteInfo(JSON.parse(savedInfo));
      if (savedCourses) setCourses(JSON.parse(savedCourses));
      if (savedStaff) setStaff(JSON.parse(savedStaff));
      if (savedGallery) setGallery(JSON.parse(savedGallery));
      if (savedToppers) setToppers(JSON.parse(savedToppers));
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
      if (savedCloudinary) setCloudinaryConfig(JSON.parse(savedCloudinary));

      // 2. Fetch fresh data from backend to persist across devices
      try {
        const res = await fetch(`${API_URL}/api/content`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            if (data.instituteInfo && Object.keys(data.instituteInfo).length > 0) setInstituteInfo(data.instituteInfo);
            if (data.courses && data.courses.length > 0) setCourses(data.courses);
            if (data.staff && data.staff.length > 0) setStaff(data.staff);
            if (data.gallery && data.gallery.length > 0) setGallery(data.gallery);
            if (data.toppers && data.toppers.length > 0) setToppers(data.toppers);
            if (data.submissions && data.submissions.length > 0) setSubmissions(data.submissions);
            
            // Re-sync local storage
            localStorage.setItem('skcc_info', JSON.stringify(data.instituteInfo || defaultInfo));
            localStorage.setItem('skcc_courses', JSON.stringify(data.courses || defaultClasses));
            localStorage.setItem('skcc_staff', JSON.stringify(data.staff || defaultStaff));
            localStorage.setItem('skcc_gallery', JSON.stringify(data.gallery || []));
            localStorage.setItem('skcc_toppers', JSON.stringify(data.toppers || []));
          }
        }
      } catch (err) {
        console.error("Failed to load content from backend:", err);
      }
    };
    loadContent();
  }, []);

  const syncBackend = async (payload) => {
    try {
      await fetch(`${API_URL}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Failed to sync to backend", err);
    }
  };

  // Update methods
  const updateInfo = (newInfo) => {
    setInstituteInfo(newInfo);
    try { localStorage.setItem('skcc_info', JSON.stringify(newInfo)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ instituteInfo: newInfo });
  };

  const updateCourses = (newCourses) => {
    setCourses(newCourses);
    try { localStorage.setItem('skcc_courses', JSON.stringify(newCourses)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ courses: newCourses });
  };

  const updateStaff = (newStaff) => {
    setStaff(newStaff);
    try { localStorage.setItem('skcc_staff', JSON.stringify(newStaff)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ staff: newStaff });
  };

  const updateGallery = (newGallery) => {
    setGallery(newGallery);
    try { localStorage.setItem('skcc_gallery', JSON.stringify(newGallery)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ gallery: newGallery });
  };

  const updateToppers = (newToppers) => {
    setToppers(newToppers);
    try { localStorage.setItem('skcc_toppers', JSON.stringify(newToppers)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ toppers: newToppers });
  };

  const updateSubmissions = (newSubmissions) => {
    setSubmissions(newSubmissions);
    try { localStorage.setItem('skcc_submissions', JSON.stringify(newSubmissions)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ submissions: newSubmissions });
  };

  const updateCloudinary = (config) => {
    setCloudinaryConfig(config);
    try { localStorage.setItem('skcc_cloudinary', JSON.stringify(config)); } catch (e) { console.warn("Storage Quota Exceeded"); }
  };

  return (
    <ContentContext.Provider value={{
      instituteInfo, updateInfo,
      courses, updateCourses,
      staff, updateStaff,
      gallery, updateGallery,
      toppers, updateToppers,
      submissions, updateSubmissions,
      cloudinaryConfig, updateCloudinary
    }}>
      {children}
    </ContentContext.Provider>
  );
};
