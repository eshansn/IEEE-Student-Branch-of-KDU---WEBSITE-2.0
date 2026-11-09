import type { GalleryItem } from '../services/galleryService';
import type { EventCategory, ImageItem } from '../types/memory';

export const convertGalleryItemsToEventCategories = (galleryItems: GalleryItem[]): Record<string, EventCategory> => {
  const eventCategories: Record<string, EventCategory> = {
    all: {
      name: 'All Events',
      color: '#0066CC',
      images: []
    }
  };

  galleryItems.forEach((item) => {
    // Create a slug from event name
    const slug = item.eventName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_');

    // Convert gallery images to ImageItem format
    const images: ImageItem[] = item.images.map((img, index) => ({
      id: `${item._id}_${index}`,
      title: img.title,
      image: img.url,
      size: img.size,
      categoryId: item._id
    }));

    // Add to event categories
    eventCategories[slug] = {
      name: item.eventName,
      color: item.color,
      images: images
    };

    // Add all images to the 'all' category
    eventCategories.all.images.push(...images);
  });

  return eventCategories;
};
