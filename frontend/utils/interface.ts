export interface Comment {
  id: number;
  content: string;
  created_at: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  created_at: string;
  comments: Comment[];
}