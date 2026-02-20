import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Cache for 1 hour
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const { videoId } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY not set' });
  }
  if (!videoId || Array.isArray(videoId)) {
    return res.status(400).json({ error: 'Missing or invalid videoId' });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      
      // Format numbers (e.g., 1200 -> 1.2K)
      const formatNum = (numStr: string) => {
        const num = parseInt(numStr);
        if (isNaN(num)) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
      };

      return res.status(200).json({
        viewCount: formatNum(stats.viewCount),
        likeCount: formatNum(stats.likeCount),
        commentCount: formatNum(stats.commentCount)
      });
    }

    return res.status(404).json({ error: 'Video not found' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch YouTube stats' });
  }
}