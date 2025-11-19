import { eventHandler, readBody } from "h3";
import { parse } from '../utils/parser';

// POST endpoint: expects body as array of { title, url, ... }
export default eventHandler(async (event) => {
  const body = await readBody(event);
  if (!Array.isArray(body)) {
    return { error: 'Body must be an array of objects with at least title and url.' };
  }
  // Parse each title, attach url, filter for x264 codec
  const results = body
    .map(item => {
      if (!item.title || !item.url) return null;
      const parsed = parse(item.title) as any;
      if (parsed && (parsed.codec === 'x264' || parsed.codec === 'h265' || parsed.codec === 'h264')) {
        return { ...parsed, url: item.url };
      }
      return null;
    })
    .filter(Boolean);

  // Reorder: .audio === 'aac' and .container === 'mp4' at the top
  results.sort((a: any, b: any) => {
    const aTop = a.audio === 'aac' && a.container === 'mp4' ? 1 : 0;
    const bTop = b.audio === 'aac' && b.container === 'mp4' ? 1 : 0;
    return bTop - aTop;
  });

  return results;
});
