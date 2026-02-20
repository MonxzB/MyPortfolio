import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AppData } from './types';
import { USER_PROFILE, SKILLS, PROJECTS, EDUCATION_DATA, EXPERIENCE_DATA, CERTIFICATES_DATA } from './constants';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize with constant data as fallback
  const [data, setData] = useState<AppData>({
    profile: USER_PROFILE,
    skills: SKILLS,
    projects: PROJECTS,
    education: EDUCATION_DATA,
    experience: EXPERIENCE_DATA,
    certificates: CERTIFICATES_DATA
  });
  const [loading, setLoading] = useState(true);

  // Fetch Data from Google Sheets API Proxy
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const cloudData = await res.json();
          // Basic validation to ensure we don't break UI with empty data
          if (cloudData.profile && cloudData.projects) {
            // Check if optional sections are empty in cloud data, fallback to constants if needed
            // But usually we prefer empty cloud data if user intended to clear it.
            // For now, we trust cloudData fully.
            setData(prev => ({
                ...cloudData,
                // Ensure array existence even if API returns undefined for new sections
                education: cloudData.education || [], 
                experience: cloudData.experience || [],
                certificates: cloudData.certificates || []
            }));
          }
        }
      } catch (error) {
        console.warn("Failed to fetch cloud content, using fallback data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary/30">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        {/* Pass fetched data to components */}
        <Hero profile={data.profile} />
        <About profile={data.profile} skills={data.skills} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} profile={data.profile} />
        <Education education={data.education} certificates={data.certificates} />
        <Contact profile={data.profile} />
      </main>
      <Footer name={data.profile.name} />
    </div>
  );
};

export default App;