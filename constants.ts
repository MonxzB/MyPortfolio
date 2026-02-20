import { Project, Skill, UserProfile, EducationItem, ExperienceItem, Certificate, Partner } from './types';

export const USER_PROFILE: UserProfile = {
  name: "Vũ Bảo",
  title: "Quản trị kênh Youtube",
  tagline: "Sáng Tạo Nội Dung Youtube về mảng A.I ",
  description: "Chuyên dựng video hiệu suất cao cho các mảng Nhạc, Công nghệ và Đời sống. Tôi tạo và biến những thước phim A.I thô thành những câu chuyện lôi cuốn.",
  stats: {
    videosEdited: 500,
    totalViews: "5M+",
    clients: 12
  },
  email: "vbao1511@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/monzB.conhieuchuyenkhohieuthatay",
    instagram: "https://www.instagram.com/vbao151/",
    linkedin: "https://www.linkedin.com/in/vũ-bảo-2439b6325",
    youtube: "https://www.youtube.com"
  }
};

export const PARTNERS_DATA: Partner[] = [
  { name: "METUB Network", logo: "data:image/png;base64,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" },
  { name: "Mediacube", logo: "data:image/png;base64,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" },
  { name: "Empty Mind Films Media LLC", logo: "data:image/png;base64,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" },
  { name: "MentaMusicCLA", logo: "data:image/jpeg;base64,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" },

];

export const SKILLS: Skill[] = [
  { name: "Adobe Premiere Pro", level: 65, category: "Editing" },
  { name: "After Effects", level: 45, category: "Motion" },
  { name: "CapCut PC", level: 90, category: "Editing" },
  { name: "Thiết kế Thumbnail", level: 85, category: "Optimization" },
  { name: "YouTube SEO", level: 90, category: "Optimization" },
  { name: "Kể chuyện & Nhịp điệu", level: 90, category: "Storytelling" },
  { name: "Thiết kế Âm thanh", level: 80, category: "Storytelling" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Cozy Treehouse Power Outage (Candlelight, Warm Rice, Quiet Family) | Ghibli-Style ASMR",
    thumbnail: "https://i.ytimg.com/vi/ryHuglWv0RY/maxresdefault.jpg",
    type: "Video Dài",
    role: ["Dựng chính", "Biên tập", "Thumbnail"],
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    description: "Video phân tích sâu về sự trở lại của Cyberpunk 2077. Tập trung vào chuyển cảnh động và âm thanh vòm sống động.",
    metrics: { views: "1.2M", likes: "85K", retention: "45%" },
    youtubeUrl: "https://www.youtube.com/watch?v=ryHuglWv0RY",
    date: "10/2023",
    tags: ["Gaming", "Video Essay", "4K"],
    featured: true
  },
  {
    id: "2",
    title: "Peaceful Rainy Night Ambience: Family Home, Soft TV Glow, Futon Sleep | Ghibli-Style ASMR",
    thumbnail: "https://i.ytimg.com/vi/vjJ4wqP0FX8/maxresdefault.jpg",
    type: "Video Dài",
    role: ["Dựng phim", "Chỉnh màu"],
    tools: ["DaVinci Resolve"],
    description: "Video biến hình nhịp độ nhanh. Cắt ghép theo nhạc và đồ họa hiển thị giá cả rõ ràng.",
    metrics: { views: "450K", ctr: "12%" },
    youtubeUrl: "https://www.youtube.com/watch?v=vjJ4wqP0FX8&t=3s",
    date: "12/2023",
    tags: ["Tech", "Vlog", "Clean Edit"],
    featured: true
  },
  {
    id: "3",
    title: "Cozy Rain Ambience in a Forest Cabin (Warm Light, Safe Silence, Deep Rest) | Ghibli-Style ASMR",
    thumbnail: "https://i.ytimg.com/vi/r_f6Z8QPHQw/maxresdefault.jpg",
    type: "Shorts",
    role: ["Dựng phim", "Phụ đề"],
    tools: ["CapCut", "Premiere Pro"],
    description: "Video dọc năng lượng cao cho TikTok và YouTube Shorts. Mở đầu cuốn hút và nhịp điệu dồn dập.",
    metrics: { views: "2.5M", retention: "80%" },
    youtubeUrl: "https://www.youtube.com/watch?v=r_f6Z8QPHQw",
    date: "01/2024",
    tags: ["Lifestyle", "Vertical", "Viral"],
    featured: true
  },
  {
    id: "4",
    title: "Life 1.2 Million Years Ago | The First River Burial Rituals of Prehistoric Humans",
    thumbnail: "https://i.ytimg.com/vi/vQqnaAAoCLQ/maxresdefault.jpg",
    type: "Series",
    role: ["Dựng phim", "Âm thanh"],
    tools: ["Premiere Pro"],
    description: "Phần 1 của series du lịch 4 tập. Chỉnh màu điện ảnh và âm thanh môi trường chân thực.",
    metrics: { views: "300K" },
    youtubeUrl: "https://www.youtube.com/watch?v=vQqnaAAoCLQ&t=39s",
    date: "09/2023",
    tags: ["Travel", "Cinematic", "Vlog"]
  },
  {
    id: "5",
    title: "Life 1.2 Million Years Ago | How Prehistoric Humans Mummified Their Dead",
    thumbnail: "hhttps://i.ytimg.com/vi/ml7mPHU0Mzc/maxresdefault.jpg",
    type: "Video Dài",
    role: ["Dựng phim", "Motion Graphics"],
    tools: ["After Effects", "Illustrator"],
    description: "Nội dung giáo dục yêu cầu trực quan hóa dữ liệu phức tạp và biểu đồ hoạt hình để giải thích các khái niệm chứng khoán.",
    metrics: { views: "800K", likes: "40K" },
    youtubeUrl: "https://www.youtube.com/watch?v=ml7mPHU0Mzc&t=633s",
    date: "11/2023",
    tags: ["Education", "Motion Graphics", "Finance"]
  },
  {
    id: "6",
    title: "T–71°C in Yakutia: How a Grandma and Baby Survive Surrounded by Wolves",
    thumbnail: "https://i.ytimg.com/vi/x7LQiFweULA/maxresdefault.jpg",
    type: "Video Dài",
    role: ["Dựng phim"],
    tools: ["Premiere Pro"],
    description: "Tổng hợp highlight stream. Zoom, thêm meme và tracking phụ đề hài hước.",
    metrics: { views: "150K" },
    youtubeUrl: "https://www.youtube.com/watch?v=x7LQiFweULA",
    date: "02/2024",
    tags: ["Gaming", "Comedy", "Memes"]
  },
  {
    id: "7",
    title: "Alone Against 50 Wolves at His Ice Cave Fridge | Life at –71°C",
    thumbnail: "https://i.ytimg.com/vi/XJPy4n5JQ5M/maxresdefault.jpg",
    type: "Video Dài",
    role: ["Dựng phim"],
    tools: ["Premiere Pro"],
    description: "Tổng hợp highlight stream. Zoom, thêm meme và tracking phụ đề hài hước.",
    metrics: { views: "150K" },
    youtubeUrl: "https://www.youtube.com/watch?v=XJPy4n5JQ5M&t=3s",
    date: "02/2024",
    tags: ["Gaming", "Comedy", "Memes"]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "1",
    role: "UI/UX Designer & Business Analyst",
    company: "STRONGBODY VN JOINT STOCK COMPANY – HA NOI BRANCH",
    duration: "9 tháng",
    description: "Thiết kế trải nghiệm người dùng và phân tích nghiệp vụ cho các sản phẩm thương mại điện tử và ứng dụng đa dịch vụ.",
    responsibilities: [
      "Thiết kế và phát triển giao diện người dùng cho nền tảng thương mại điện tử giày dép, tối ưu quy trình mua sắm và tăng tỷ lệ chuyển đổi.",
      "Phân tích yêu cầu nghiệp vụ, thiết kế quy trình cho mô-đun chính của ứng dụng đa dịch vụ Multi.me.",
      "Đề xuất kiến trúc giải pháp và phương án xử lý ngoại lệ để nâng cao trải nghiệm và độ tin cậy hệ thống.",
      "Phát triển tính năng “Tạo đề nghị” lấy cảm hứng từ Fiverr, từ nghiên cứu đến viết tài liệu BRD và SRS.",
      "Tạo User Flows, Use Case Diagrams và thiết kế UI bằng Figma.",
      "Xây dựng landing page và website chính thức đảm bảo nhất quán thương hiệu và trải nghiệm người dùng."
    ],
    metrics: [],
    tags: ["Figma", "UI/UX", "BA", "BRD", "SRS", "User Flow", "Use Case", "Conversion Optimization"]
  },
  {
    id: "2",
    role: "Quản trị kênh YouTube",
    company: "TTM Group",
    duration: "10 tháng",
    description: "Vận hành kênh YouTube end-to-end, tối ưu SEO & chiến lược nội dung, phối hợp sản xuất và ứng dụng AI để tăng hiệu quả.",
    responsibilities: [
      "Quản lý và chăm sóc kênh YouTube: đăng tải video, tối ưu thông tin video, đảm bảo chất lượng nội dung theo tiêu chuẩn kênh.",
      "Nghiên cứu từ khóa, tối ưu SEO (tiêu đề/mô tả/tag/chapter/playlist) nhằm tăng view, sub và tương tác.",
      "Thực thi thủ thuật & chiến lược vận hành để cải thiện hiệu quả phát triển kênh (tối ưu lịch đăng, nội dung theo trend/niche).",
      "Phối hợp triển khai content: nghĩ ý tưởng, hỗ trợ kịch bản; ứng dụng AI để render/hỗ trợ sản xuất video theo kịch bản."
    ],
    metrics: ["Đã bật kiếm tiền (BKT) doanh thu cao"],
    tags: ["YouTube SEO", "Channel Management", "Content Strategy", "Analytics", "AI-assisted Production"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "1",
    year: "2021 – 2024",
    institution: "Đại học Mở Hà Nội",
    degree: "Công nghệ thông tin - Chuyên ngành: Công nghệ đa phương tiện (GPA: 6.97/10)",
    description: "Được trang bị kiến thức nền tảng về CNTT kết hợp kỹ năng sáng tạo nội dung số: thiết kế & xử lý hình ảnh/âm thanh/video; biên tập & sản xuất nội dung đa phương tiện; lập trình ứng dụng cơ bản; thiết kế UI/UX; quản lý dự án truyền thông và phát triển sản phẩm số.",
    tags: ["Multimedia", "UI/UX", "Video Editing", "Digital Content", "Basic Programming", "Product Thinking"]
  }
];

export const CERTIFICATES_DATA: Certificate[] = [
  { name: "YouTube Certified - Channel Growth", issuer: "Google / YouTube" },
  { name: "Google Analytics 4 Certification", issuer: "Google" },
  { name: "Video Editing Masterclass", issuer: "Udemy" },
  { name: "Digital Marketing Fundamentals", issuer: "Google Digital Garage" }
];

export const NAVIGATION_LINKS = [
  { name: "Trang Chủ", href: "#welcome" },
  { name: "Thông Tin", href: "#about" },
  { name: "Kinh Nghiệm", href: "#experience" },
  { name: "Dự Án", href: "#projects" },
  { name: "Học Vấn", href: "#education" },
  { name: "Liên Hệ", href: "#contacts" },
];

export const CV_DOWNLOAD_URL = "https://drive.google.com/file/d/1L_iIRjBKSDXMRU_OZmpj1ZMgQyxGXVd_/view?usp=sharing";