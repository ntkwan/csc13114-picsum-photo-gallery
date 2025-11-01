import { useState, useEffect, useCallback } from 'react'
import { fetchPhotos } from '../services/api'

/**
 * Custom hook for managing photo gallery with infinite scroll
 * @param {number} initialLimit - Initial number of photos to load per page
 * @returns {Object} Hook state and functions
 */
export const usePhotos = (initialLimit = 20) => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  /**
   * Load photos for a specific page
   * @param {number} pageNumber - Page number to load
   * @param {boolean} append - Whether to append to existing photos or replace
   */
  const loadPhotos = useCallback(async (pageNumber, append = true) => {
    if (loading) return
    
    setLoading(true)
    setError(null)

    try {
      const newPhotos = await fetchPhotos(pageNumber, initialLimit)
      
      if (newPhotos.length === 0) {
        setHasMore(false)
      } else if (newPhotos.length < initialLimit) {
        setHasMore(false)
      }

      setPhotos(prevPhotos => {
        if (append) {
          // Remove duplicates based on photo ID
          const existingIds = new Set(prevPhotos.map(photo => photo.id))
          const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.has(photo.id))
          return [...prevPhotos, ...uniqueNewPhotos]
        } else {
          return newPhotos
        }
      })

      setPage(pageNumber)
    } catch (err) {
      setError(err.message || 'Failed to load photos')
      console.error('Error loading photos:', err)
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }, [loading, initialLimit])

  /**
   * Load more photos (next page)
   */
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadPhotos(page + 1, true)
    }
  }, [loading, hasMore, page, loadPhotos])

  const refresh = useCallback(() => {
    setPhotos([])
    setPage(1)
    setHasMore(true)
    setError(null)
    loadPhotos(1, false)
  }, [loadPhotos])

  // Load initial photos on mount
  useEffect(() => {
    loadPhotos(1, false)
  }, []) // Only run on mount

  return {
    photos,
    loading,
    error,
    hasMore,
    initialLoad,
    loadMore,
    refresh,
    page
  }
}
