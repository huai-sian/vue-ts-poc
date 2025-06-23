import axios from 'axios';
import { Types } from '../schema';

export interface UnsplashPhoto {
  id: string;
  slug: string;
  created_at: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  }
}

async function handleApiResponse(schema: any, raw: unknown) {
  const result = schema.safeParse(raw);

  if (!result.success) {
    // 彙整所有驗證失敗細節
    result.error.errors.forEach((issue: Record<string, any>) => {
      console.error(
        `欄位 ${issue.path.join('.')}：${issue.message}（收到值：${JSON.stringify(issue.received)}）`
      );
    });
    // 合併所有錯誤訊息
    const message = result.error.errors
      .map((issue: Record<string, any>) => `欄位 ${issue.path.join('.')}：${issue.message}`)
      .join("; ");
    throw new Error("API 回傳資料格式錯誤：" + message);
  }

  // result.data 已型別安全且結構完整
  return result.data;
}

const cache = new Map<number, UnsplashPhoto[]>();

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID UD6ccLYdB-6gbrwIFrhgCkWJZmgwlWGuKfOTL6-WaG4',
  },
})

export const fetchPhoto = async (page: number = 1): Promise<UnsplashPhoto[]> => {
  const cacheKey = page;
  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }
  try {
    const response = await unsplash.get('/photos', {
      params: {
        page,
      },
    });
    const veifiedRes = await handleApiResponse(Types['photos'], response.data)
    cache.set(cacheKey, veifiedRes as UnsplashPhoto[]);
    return veifiedRes;
  } catch (error) {
    throw error;
  }
}
