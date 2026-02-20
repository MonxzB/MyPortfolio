import React from 'react';
import { EducationItem, Certificate } from '../types';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface EducationProps {
  education: EducationItem[];
  certificates: Certificate[];
}

const Education: React.FC<EducationProps> = ({ education, certificates }) => {
  if ((!education || education.length === 0) && (!certificates || certificates.length === 0)) return null;

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Học Vấn & Chứng Chỉ</h2>
          <p className="text-gray-500 dark:text-gray-400">Nền tảng học thuật & kỹ năng đa phương tiện phục vụ sản xuất nội dung số và vận hành kênh.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Main Education Timeline - 2 Columns on large screens */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Học Vấn Chính Quy</h3>
             </div>
             
             <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                       <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.institution}</h4>
                       <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">{edu.year}</span>
                    </div>
                    <p className="text-primary font-medium mb-3">{edu.degree}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                        {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {edu.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Certificates - 1 Column on large screens */}
          <div className="lg:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chứng Chỉ & Khóa Học</h3>
             </div>

             <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <ul className="space-y-4">
                    {certificates.map((cert, idx) => (
                        <li key={idx} className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0 border-gray-50 dark:border-gray-800">
                             <BookOpen className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                             <div>
                                 <p className="text-sm font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cert.issuer}</p>
                             </div>
                        </li>
                    ))}
                </ul>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;