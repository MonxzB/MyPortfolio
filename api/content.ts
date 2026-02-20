import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helper to parse CSV (Simple implementation handles quotes)
function parseCSV(text: string) {
  const lines = text.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values: string[] = [];
    let current = '';
    let inQuote = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: any = {};
    headers.forEach((header, index) => {
      // Remove quotes from values if present
      let val = values[index] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      row[header] = val;
    });
    return row;
  });
}

// Fetch a single sheet tab by GID
async function fetchSheet(sheetId: string, gid: string) {
  // Correctly use the CSV export URL
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) {
     // Don't throw for optional sheets, return empty array
     console.warn(`Failed to fetch sheet gid ${gid}`);
     return [];
  }
  const text = await response.text();
  return parseCSV(text);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set Cache Headers (10 minutes)
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');

  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const GID_PROFILE = process.env.GID_PROFILE || '0';
  const GID_SKILLS = process.env.GID_SKILLS || '0';
  const GID_PROJECTS = process.env.GID_PROJECTS || '0';
  // New GIDs
  const GID_EXPERIENCE = process.env.GID_EXPERIENCE || '0';
  const GID_EDUCATION = process.env.GID_EDUCATION || '0';
  const GID_CERTIFICATES = process.env.GID_CERTIFICATES || '0';

  if (!SHEET_ID) {
    return res.status(500).json({ error: 'GOOGLE_SHEET_ID not set' });
  }

  try {
    const [rawProfile, rawSkills, rawProjects, rawExperience, rawEducation, rawCertificates] = await Promise.all([
      fetchSheet(SHEET_ID, GID_PROFILE),
      fetchSheet(SHEET_ID, GID_SKILLS),
      fetchSheet(SHEET_ID, GID_PROJECTS),
      fetchSheet(SHEET_ID, GID_EXPERIENCE),
      fetchSheet(SHEET_ID, GID_EDUCATION),
      fetchSheet(SHEET_ID, GID_CERTIFICATES)
    ]);

    // --- Process Profile ---
    const profile: any = { socials: {}, stats: { videosEdited: 0, totalViews: '0', clients: 0 } };
    rawProfile.forEach((row: any) => {
      const key = row.key?.toLowerCase();
      const value = row.value;
      if (!key || !value) return;

      if (['name', 'title', 'tagline', 'description', 'email'].includes(key)) {
        profile[key] = value;
      } else if (['videosedited', 'totalviews', 'clients'].includes(key)) {
         if(key === 'videosedited') profile.stats.videosEdited = parseInt(value) || 0;
         if(key === 'clients') profile.stats.clients = parseInt(value) || 0;
         if(key === 'totalviews') profile.stats.totalViews = value;
      } else {
        profile.socials[key] = value;
      }
    });

    // --- Process Skills ---
    const skills = rawSkills
      .filter((row: any) => row.visible?.toLowerCase() === 'true')
      .map((row: any) => ({
        name: row.skill,
        category: row.group,
        level: parseInt(row.level) || 0,
        order: parseInt(row.order) || 99
      }))
      .sort((a: any, b: any) => a.order - b.order);

    // --- Process Projects ---
    const projects = rawProjects
      .filter((row: any) => row.visible?.toLowerCase() === 'true')
      .map((row: any) => ({
        id: row.id,
        title: row.title,
        youtubeUrl: row.youtubeUrl,
        type: row.type,
        role: row.role ? row.role.split(';').map((s: string) => s.trim()) : [],
        tools: row.tools ? row.tools.split(';').map((s: string) => s.trim()) : [],
        tags: row.tags ? row.tags.split(';').map((s: string) => s.trim()) : [],
        date: row.date,
        description: row.description,
        thumbnail: row.thumbnailUrl,
        featured: row.featured?.toLowerCase() === 'true'
      }))
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // --- Process Experience ---
    const experience = rawExperience
        .filter((row: any) => row.visible?.toLowerCase() === 'true')
        .map((row: any) => ({
            id: row.id,
            role: row.role,
            company: row.company,
            duration: row.duration,
            description: row.description,
            responsibilities: row.responsibilities ? row.responsibilities.split(';').map((s: string) => s.trim()) : [],
            metrics: row.metrics ? row.metrics.split(';').map((s: string) => s.trim()) : [],
            tags: row.tags ? row.tags.split(';').map((s: string) => s.trim()) : [] // Added tags parsing
        }));

    // --- Process Education ---
    const education = rawEducation
        .filter((row: any) => row.visible?.toLowerCase() === 'true')
        .map((row: any) => ({
            id: row.id,
            year: row.year,
            institution: row.institution,
            degree: row.degree,
            description: row.description,
            tags: row.tags ? row.tags.split(';').map((s: string) => s.trim()) : []
        }));
    
    // --- Process Certificates ---
    const certificates = rawCertificates
        .filter((row: any) => row.visible?.toLowerCase() === 'true')
        .map((row: any) => ({
            name: row.name,
            issuer: row.issuer
        }));

    return res.status(200).json({
      profile,
      skills,
      projects,
      experience,
      education,
      certificates
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch content' });
  }
}