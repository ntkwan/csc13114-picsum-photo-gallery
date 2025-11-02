/**
 * API service for interacting with Lorem Picsum
 * Base URL: https://picsum.photos/
 * List endpoint: https://picsum.photos/v2/list
 */

const BASE_URL = 'https://picsum.photos'
const API_URL = `${BASE_URL}/v2/list`

export const fetchPhotos = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const photos = await response.json()
    
    return photos.map(photo => ({
      ...photo,
      thumbnail: `${BASE_URL}/id/${photo.id}/300/200`,
      fullSize: `${BASE_URL}/id/${photo.id}/800/600`,
      title: `Photo by ${photo.author}`,
    }))
  } catch (error) {
    console.error('Error fetching photos:', error)
    throw error
  }
}

/**
 * Fetch a single photo by ID
 * @param {string} id - Photo ID
 * @returns {Promise<Object>} Photo object with enhanced data
 */
export const fetchPhotoById = async (id) => {
  try {
    // Lorem Picsum doesn't have a single photo endpoint, so we fetch from the list
    // and find the specific photo, or create it if not found
    const url = `${BASE_URL}/id/${id}/info`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const rawPhoto = await response.json()
    const photo = {
        id: id,
        author: rawPhoto.author,
        width: rawPhoto.width,
        height: rawPhoto.height,
        url: rawPhoto.url,
        download_url: rawPhoto.download_url
    }

    return {
      ...photo,
      thumbnail: rawPhoto.download_url,
      fullSize: rawPhoto.download_url,
      title: `Photo #${photo.id}`,
    }
  } catch (error) {
    console.error('Error fetching photo by ID:', error)
    throw error
  }
}

/**
 * Get optimized image URL for different screen sizes
 * @param {string} id - Photo ID
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (id, width = 400, height = 300) => {
  return `${BASE_URL}/id/${id}/${width}/${height}`
}
