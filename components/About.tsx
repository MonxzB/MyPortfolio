import React from 'react';
import { UserProfile, Skill } from '../types';
import { Briefcase, Zap, Film, Monitor, Download } from 'lucide-react';
import { CV_DOWNLOAD_URL } from '../constants';

interface AboutProps {
  profile: UserProfile;
  skills: Skill[];
}

const About: React.FC<AboutProps> = ({ profile, skills }) => {
  const workflowSteps = [
    { title: "Trao Đổi", desc: "Hiểu rõ mục tiêu & khán giả", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Dựng Phim", desc: "Kể chuyện & Nhịp điệu", icon: <Film className="w-5 h-5" /> },
    { title: "Duyệt & Sửa", desc: "Tinh chỉnh theo phản hồi", icon: <Monitor className="w-5 h-5" /> },
    { title: "Tối Ưu", desc: "Thumbnail, SEO & Giữ chân", icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Thông Tin & Kỹ Năng</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Column 1: About & Workflow */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Giới Thiệu</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {profile.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Quy trình làm việc của tôi được thiết kế tối ưu hiệu quả và tác động, đảm bảo từng giây video đều mang lại giá trị cho người xem.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quy Trình Làm Việc</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workflowSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                      {step.icon}
                      <span className="font-semibold">{step.title}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Skills */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Kỹ Năng Chuyên Môn</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 text-center">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Bạn muốn xem CV chi tiết?</h4>
              <a 
                href={CV_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-red-600 transition-transform hover:scale-105 shadow-md group"
              >
                Tải CV
                <Download className="ml-2 -mr-1 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;