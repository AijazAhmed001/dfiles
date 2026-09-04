export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  challenge: string;
  solution: string;
  result: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAtUtc: string;
}

export interface AdminStats {
  totalMessages: number;
  unreadMessages: number;
  projects: number;
  events: number;
}
