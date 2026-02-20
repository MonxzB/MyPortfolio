import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Copy, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { UserProfile } from '../types';

interface ContactProps {
  profile: UserProfile;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate backend call
    setTimeout(() => {
      setFormState('success');
      // Reset after 3 seconds
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacts" className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Cùng Nhau Sáng Tạo</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Sẵn sàng nâng tầm nội dung của bạn? Dù là quản lý kênh, dự án video cụ thể hay hợp tác lâu dài, tôi luôn sẵn sàng lắng nghe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="space-y-8 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
            <div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Liên Hệ Trực Tiếp</h3>
               <div className="flex items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                 <div className="bg-primary/10 p-3 rounded-full text-primary">
                   <Mail className="w-6 h-6" />
                 </div>
                 <div className="flex-1 overflow-hidden">
                   <p className="text-sm text-gray-500 dark:text-gray-400">Email Cho Tôi</p>
                   <p className="text-gray-900 dark:text-white font-medium truncate">{profile.email}</p>
                 </div>
                 <button 
                   onClick={copyEmail}
                   className="p-2 text-gray-400 hover:text-primary transition-colors relative"
                   title="Sao chép Email"
                 >
                   {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                 </button>
               </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Kết Nối</h3>
              <div className="flex flex-wrap gap-4">
                {profile.socials.facebook && (
                  <a href={profile.socials.facebook} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                )}
                {profile.socials.instagram && (
                  <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                 {/* Fallback for other socials if present in sheet */}
                 {profile.socials.youtube && (
                   <a href={profile.socials.youtube} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                     <Youtube className="w-5 h-5" />
                     <span>YouTube</span>
                   </a>
                 )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-900 p-1 md:p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Tên của bạn"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lời Nhắn</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Chia sẻ về dự án của bạn..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={formState !== 'idle'}
                className={`w-full py-4 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  formState === 'success' 
                    ? 'bg-green-500' 
                    : formState === 'sending' 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-primary dark:hover:bg-gray-200'
                }`}
              >
                {formState === 'idle' && (
                  <>Gửi Tin Nhắn <Send className="w-4 h-4" /></>
                )}
                {formState === 'sending' && "Đang Gửi..."}
                {formState === 'success' && (
                  <>Gửi Thành Công <CheckCircle className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;