
export const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') // Normalize accents
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim(); // Trim leading and trailing hyphens
  };