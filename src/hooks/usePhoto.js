import { useState, useEffect } from 'react'
import { fetchPhotoById } from '../services/api'

/**
 * Custom hook for fetching a single photo by ID
 * @param {string} photoId - The ID of the photo to fetch
 * @returns {Object} Hook state with photo data, loading, and error states
 */
export const usePhoto = (photoId) => {
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!photoId) {
      setLoading(false)
      return
    }

    const loadPhoto = async () => {
      setLoading(true)
      setError(null)

      try {
        const photoData = await fetchPhotoById(photoId)
        setPhoto(photoData)
      } catch (err) {
        setError(err.message || 'Failed to load photo')
        console.error('Error loading photo:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPhoto()
  }, [photoId])

  return { photo, loading, error }
}
