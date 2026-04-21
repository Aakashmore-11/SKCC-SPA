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

  const secureCloudinaryUrls = (data) => {
    if (!data) return data;
    try {
      const str = JSON.stringify(data);
      const secured = str.replace(/http:\/\/res\.cloudinary\.com/g, 'https://res.cloudinary.com');
      return JSON.parse(secured);
    } catch (e) {
      return data;
    }
  };

  const formatWhatsApp = (number) => {
    if (!number) return '';
    const digits = number.toString().replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  const getWhatsAppUrl = (number) => `https://wa.me/${formatWhatsApp(number)}`;

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

      if (savedInfo) setInstituteInfo(secureCloudinaryUrls(JSON.parse(savedInfo)));
      if (savedCourses) setCourses(secureCloudinaryUrls(JSON.parse(savedCourses)));
      if (savedStaff) setStaff(secureCloudinaryUrls(JSON.parse(savedStaff)));
      if (savedGallery) setGallery(secureCloudinaryUrls(JSON.parse(savedGallery)));
      if (savedToppers) setToppers(secureCloudinaryUrls(JSON.parse(savedToppers)));
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
      if (savedCloudinary) setCloudinaryConfig(JSON.parse(savedCloudinary));

      // 2. Fetch fresh data from backend to persist across devices
      try {
        const res = await fetch(`${API_URL}/api/content`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            if (data.instituteInfo && Object.keys(data.instituteInfo).length > 0) setInstituteInfo(secureCloudinaryUrls(data.instituteInfo));
            if (data.courses && data.courses.length > 0) setCourses(secureCloudinaryUrls(data.courses));
            if (data.staff && data.staff.length > 0) setStaff(secureCloudinaryUrls(data.staff));
            if (data.gallery && data.gallery.length > 0) setGallery(secureCloudinaryUrls(data.gallery));
            if (data.toppers && data.toppers.length > 0) setToppers(secureCloudinaryUrls(data.toppers));
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
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Failed to sync to backend", err);
    }
  };

  // Update methods
  const updateInfo = (newInfo) => {
    const secured = secureCloudinaryUrls(newInfo);
    setInstituteInfo(secured);
    try { localStorage.setItem('skcc_info', JSON.stringify(secured)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ instituteInfo: secured });
  };

  const updateCourses = (newCourses) => {
    const secured = secureCloudinaryUrls(newCourses);
    setCourses(secured);
    try { localStorage.setItem('skcc_courses', JSON.stringify(secured)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ courses: secured });
  };

  const updateStaff = (newStaff) => {
    const secured = secureCloudinaryUrls(newStaff);
    setStaff(secured);
    try { localStorage.setItem('skcc_staff', JSON.stringify(secured)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ staff: secured });
  };

  const updateGallery = (newGallery) => {
    const secured = secureCloudinaryUrls(newGallery);
    setGallery(secured);
    try { localStorage.setItem('skcc_gallery', JSON.stringify(secured)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ gallery: secured });
  };

  const updateToppers = (newToppers) => {
    const secured = secureCloudinaryUrls(newToppers);
    setToppers(secured);
    try { localStorage.setItem('skcc_toppers', JSON.stringify(secured)); } catch (e) { console.warn("Storage Quota Exceeded"); }
    syncBackend({ toppers: secured });
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
      cloudinaryConfig, updateCloudinary,
      getWhatsAppUrl
    }}>
      {children}
    </ContentContext.Provider>
  );
};
