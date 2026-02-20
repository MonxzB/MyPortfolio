import React, { useState, useMemo, useEffect } from 'react';
import { Project, ProjectType, ProjectMetrics, UserProfile } from '../types';
import { Search, Filter, Play, Eye, MessageCircle, ThumbsUp, Youtube, ArrowRight } from 'lucide-react';
import { PARTNERS_DATA } from '../constants';

interface ProjectsProps {
  projects: Project[];
  profile?: UserProfile;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper hook to fetch stats for a specific video
// Hàm format số lượng (VD: 1200 -> 1.2K)
const formatNum = (numStr: string) => {
  const num = parseInt(numStr);
  if (isNaN(num)) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const useYoutubeStats = (url: string, initialMetrics?: ProjectMetrics) => {
  const [metrics, setMetrics] = useState<ProjectMetrics | undefined>(initialMetrics);
  
  useEffect(() => {
    const videoId = getYoutubeId(url);
    if (!videoId) return;

    const fetchStats = async () => {
      try {
        // ĐIỀN API KEY CỦA BẠN VÀO ĐÂY
        const API_KEY = "AIzaSyAeCltQwa74FRSbQVcO8VDO10Veza_UPas"; 
        const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
        
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            setMetrics(prev => ({ 
              ...prev, 
              viewCount: formatNum(stats.viewCount),
              likeCount: formatNum(stats.likeCount),
              commentCount: formatNum(stats.commentCount)
            }));
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu YouTube cho video:", videoId);
      }
    };
    
    fetchStats();
  }, [url]);

  return metrics;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const videoId = getYoutubeId(project.youtubeUrl);
  const thumbnail = project.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 'https://placehold.co/600x400?text=No+Video');
  
  // GỌI API LẤY STATS TRỰC TIẾP CHO TỪNG CARD DỰA TRÊN URL CỦA DỰ ÁN NÀY
  const metrics = useYoutubeStats(project.youtubeUrl, project.metrics);
  
  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 flex flex-col h-full"
      onClick={() => onClick(project)}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-900">
        <img 
          src={thumbnail} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            if (videoId && (e.target as HTMLImageElement).src.includes('maxresdefault')) {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
          }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-primary text-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
            <Play fill="currentColor" className="w-6 h-6 ml-1" />
          </div>
        </div>
        
        {/* HIỂN THỊ CHỈ SỐ VIEW, LIKE, COMMENT BÊN DƯỚI GÓC TRÁI THUMBNAIL */}
        <div className="absolute bottom-2 left-2 flex gap-2 flex-wrap">
           {metrics?.viewCount && (
             <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
               <Eye className="w-3 h-3" />
               {metrics.viewCount}
             </div>
           )}
           {metrics?.likeCount && (
             <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
               <ThumbsUp className="w-3 h-3" />
               {metrics.likeCount}
             </div>
           )}
           {metrics?.commentCount && (
             <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
               <MessageCircle className="w-3 h-3" />
               {metrics.commentCount}
             </div>
           )}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>
        
        <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
             <span>{project.role.join(', ')}</span>
             <span>{project.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Modal Component ---
interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  // Fetch real-time stats when modal opens
  const metrics = useYoutubeStats(project?.youtubeUrl || '', project?.metrics);

  if (!project) return null;
  
  const videoId = getYoutubeId(project.youtubeUrl);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl z-10 no-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="aspect-video w-full bg-black">
          {videoId ? (
             <iframe 
             width="100%" 
             height="100%" 
             src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
             title={project.title}
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
           ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">Video ID not found</div>
          )}
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
             <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">{tag}</span>
                  ))}
                </div>
             </div>
             <a 
               href={project.youtubeUrl} 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center px-6 py-3 bg-primary hover:bg-red-600 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
             >
               Xem trên YouTube
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chi Tiết Dự Án</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Vai Trò</h4>
                <div className="flex flex-wrap gap-2">
                   {project.role.map(r => (
                     <span key={r} className="text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded bg-white dark:bg-gray-900">{r}</span>
                   ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Công Cụ</h4>
                <div className="flex flex-wrap gap-2">
                   {project.tools.map(t => (
                     <span key={t} className="text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded bg-white dark:bg-gray-900">{t}</span>
                   ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
               <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hiệu Quả</h3>
                 <div className="space-y-4">
                     {/* View Count */}
                     <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500 text-sm flex items-center gap-2"><Eye className="w-4 h-4"/> Lượt xem</span>
                        <span className="font-bold text-gray-900 dark:text-white">{metrics?.viewCount || metrics?.views || '---'}</span>
                     </div>
                     {/* Like Count */}
                     <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500 text-sm flex items-center gap-2"><ThumbsUp className="w-4 h-4"/> Lượt thích</span>
                        <span className="font-bold text-gray-900 dark:text-white">{metrics?.likeCount || metrics?.likes || '---'}</span>
                     </div>
                     {/* Comment Count */}
                     <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500 text-sm flex items-center gap-2"><MessageCircle className="w-4 h-4"/> Bình luận</span>
                        <span className="font-bold text-gray-900 dark:text-white">{metrics?.commentCount || '---'}</span>
                     </div>
                     {/* Manual Metrics (CTR/Retention) */}
                     {metrics?.retention && (
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-500 text-sm">Retention</span>
                          <span className="font-bold text-gray-900 dark:text-white">{metrics.retention}</span>
                        </div>
                     )}
                     {metrics?.ctr && (
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-500 text-sm">CTR</span>
                          <span className="font-bold text-gray-900 dark:text-white">{metrics.ctr}</span>
                        </div>
                     )}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Section Component ---

const Projects: React.FC<ProjectsProps> = ({ projects, profile }) => {
  const [selectedType, setSelectedType] = useState<ProjectType | 'Tất cả'>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive unique Types from projects
  const types = ['Tất cả', ...Array.from(new Set(projects.map(p => p.type)))] as (ProjectType | 'Tất cả')[];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesType = selectedType === 'Tất cả' || project.type === selectedType;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [projects, selectedType, searchQuery]);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Dự Án</h2>
            <p className="text-gray-500 dark:text-gray-400">Thư viện các sản phẩm kể chuyện, dựng phim và phát triển.</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Tìm dự án..."
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm appearance-none cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ProjectType | 'Tất cả')}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Partners Static Grid */}
        <div className="mb-16">
             <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">Đối Tác & Network lớn</p>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {PARTNERS_DATA.map((partner, index) => (
                      <div key={index} className="flex flex-col items-center gap-3 group">
                          <div className="w-24 h-24 bg-white rounded-xl shadow-sm flex items-center justify-center p-4 overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                              <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{partner.name}</span>
                      </div>
                  ))}
             </div>
        </div>

        {/* Main Grid */}
        <div className="mb-12">
           {filteredProjects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredProjects.map(project => (
                 <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
               ))}
             </div>
           ) : (
             <div className="text-center py-20">
               <p className="text-gray-500 text-lg">Không tìm thấy dự án nào phù hợp.</p>
               <button 
                 onClick={() => {setSearchQuery(''); setSelectedType('Tất cả');}}
                 className="mt-4 text-primary font-medium hover:underline"
               >
                 Xóa bộ lọc
               </button>
             </div>
           )}
        </div>
        {/* CTA */}
        <div className="text-center">
          <p 
            href={profile?.socials?.youtube || profile?.socials?.facebook || "#contacts"} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-primary/50 hover:text-primary dark:hover:text-primary hover:shadow-lg transition-all group"
          >
            <Youtube className="w-5 h-5 mr-2 text-red-600 group-hover:scale-110 transition-transform" />
            Xem Tất Cả Dự Án Trên YouTube
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100" />
          </p>
        </div>

      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;