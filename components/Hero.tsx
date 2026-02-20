import React from 'react';
import { ArrowRight, PlayCircle, Users, Video } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroProps {
  profile: UserProfile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToContact = () => {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="welcome" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase">
                {profile.title}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                Xin chào, tôi là <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{profile.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
                {profile.tagline}
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto lg:mx-0">
                {profile.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-red-600 transition-transform hover:scale-105 shadow-lg shadow-primary/30"
              >
                Xem Dự Án
                <PlayCircle className="ml-2 -mr-1 h-5 w-5" />
              </button>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Liên Hệ
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                  <Video className="w-5 h-5 text-secondary" />
                  {profile.stats.videosEdited}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Video Đã Dựng</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                  <PlayCircle className="w-5 h-5 text-primary" />
                  {profile.stats.totalViews}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Tổng Lượt Xem</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                  <Users className="w-5 h-5 text-green-500" />
                  {profile.stats.clients}+
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Khách Hàng</div>
              </div>
            </div>
          </div>

          {/* Visual Content (Mockup/Image) */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform rotate-3 hover:rotate-0 transition-all duration-500">
              <img 
                src="https://picsum.photos/600/600?random=100" 
                alt="Workspace Setup" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold">Dự Án Mới Nhất</p>
                  <p className="text-sm opacity-80">Phim Tài Liệu</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;