const BASE_URL = 'https://picsum.photos/v2';

export const fetchPhotos = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/list?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`failed to fetch photos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('error fetching photos:', error);
    throw error;
  }
};

export const fetchPhotoById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/list`);
    if (!response.ok) {
      throw new Error(`failed to fetch photo details: ${response.status}`);
    }
    const photos = await response.json();
    const photo = photos.find(p => p.id === id);
    
    if (!photo) {
      throw new Error(`photo with id ${id} not found`);
    }

    return {
      ...photo,
      title: `photo ${photo.id}`,
      description: `beautiful photograph captured by ${photo.author}. dimensions: ${photo.width}x${photo.height}px`
    };
  } catch (error) {
    console.error('error fetching photo details:', error);
    throw error;
  }
};

export const getPhotoUrl = (id, width = 400, height = 300) => {
  return `https://picsum.photos/id/${id}/${width}/${height}`;
};
