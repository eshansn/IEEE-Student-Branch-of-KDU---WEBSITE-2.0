import type { MemoryCategory, EventCategory, ImageItem } from '../types/memory';

export const convertMemoriesToEventCategories = (memories: MemoryCategory[]): Record<string, EventCategory> => {
  const eventCategories: Record<string, EventCategory> = {
    all: {
      name: 'All Events',
      color: '#0066CC',
      images: []
    }
  };

  memories.forEach((memory) => {
    // Create a slug from category name
    const slug = memory.categoryName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_');

    // Convert memory images to ImageItem format
    const images: ImageItem[] = memory.images.map((img, index) => ({
      id: `${memory._id}_${index}`,
      title: img.title,
      image: img.url,
      size: img.size,
      categoryId: memory._id
    }));

    // Add to event categories
    eventCategories[slug] = {
      name: memory.categoryName,
      color: memory.color,
      images: images
    };

    // Add all images to the 'all' category
    eventCategories.all.images.push(...images);
  });

  return eventCategories;
};

export const createFallbackCategories = (): Record<string, EventCategory> => {
  // Fallback categories in case API fails
  return {
    all: {
      name: 'All Events',
      color: '#0066CC',
      images: []
    },
    jamboree: {
      name: 'JamborIEEE 2024',
      color: '#667eea',
      images: [
        {
          id: 'fallback_1',
          title: 'Opening Ceremony',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
          size: 'large',
          categoryId: 'fallback_jamboree'
        },
        {
          id: 'fallback_2',
          title: 'Tech Presentations',
          image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop',
          size: 'wide',
          categoryId: 'fallback_jamboree'
        }
      ]
    },
    workshops: {
      name: 'Tech Workshops',
      color: '#f093fb',
      images: [
        {
          id: 'fallback_3',
          title: 'AI/ML Workshop',
          image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=800&fit=crop',
          size: 'tall',
          categoryId: 'fallback_workshops'
        }
      ]
    }
  };
};
