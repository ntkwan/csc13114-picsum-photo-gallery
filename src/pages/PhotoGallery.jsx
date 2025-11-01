import React from 'react'
import { usePhotos } from '../hooks/usePhotos'
import PhotoCard from '../components/PhotoCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import InfiniteScrollTrigger from '../components/InfiniteScrollTrigger'

/**
 * PhotoGallery page component - Main gallery view with infinite scroll
 */
const PhotoGallery = () => {
  const { 
    photos, 
    loading, 
    error, 
    hasMore, 
    initialLoad, 
    loadMore, 
    refresh 
  } = usePhotos(20) // Load 20 photos per page

  // Show full screen loading for initial load
  if (initialLoad && loading) {
    return <LoadingSpinner size="lg" text="Loading beautiful photos..." fullScreen />
  }

  // Show error state with retry option
  if (error && photos.length === 0) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={refresh}
        fullScreen 
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Photo gallery
        </h1>
      </div>

      {/* Gallery Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          Showing {photos.length} photos
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          <InfiniteScrollTrigger
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
          <p className="text-gray-600 mb-4">We couldn't find any photos to display.</p>
          <button onClick={refresh} className="btn-primary">
            Try Again
          </button>
        </div>
      )}

      {/* Error Toast for Load More Errors */}
      {error && photos.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800">Failed to load more photos</h4>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <button 
                onClick={loadMore}
                className="text-sm text-red-800 font-medium mt-2 hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
