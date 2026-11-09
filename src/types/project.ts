export interface Project {
  title: string;
  year: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  gradient: string;
  category: string;
  participants: string;
  images: string[];
  galleryImages: string[];
  detailedDescription: string;
}
