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
  user: {
    username: string;
  }
}