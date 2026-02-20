import React from 'react';
import { ExperienceItem } from '../types';
import { Calendar, TrendingUp } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Kinh Nghiệm Làm Việc</h2>
          <p className="text-gray-500 dark:text-gray-400">Kết hợp UI/UX + phân tích nghiệp vụ + vận hành YouTube theo dữ liệu để tăng trưởng bền vững.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-6 space-y-12">
            {experience.map((item) => (
              <div key={item.id} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute top-0 left-[-9px] w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-gray-900 shadow-sm"></div>
                
                {/* Content Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         {item.role}
                      </h3>
                      <p className="text-primary font-medium">{item.company}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 w-fit">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.duration}
                    </div>
                  </div>

                  {/* Tags / Skills */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-xs font-medium text-gray-600 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    {item.description}
                  </p>

                  <div className="mb-6">
                    <ul className="space-y-2">
                      {item.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics Section */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-4 border border-dashed border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Kết Quả Nổi Bật
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {item.metrics.map((metric, idx) => (
                          <div key={idx} className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-bold text-center">
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;