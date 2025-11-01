import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePhoto } from '../hooks/usePhoto'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

/**
 * PhotoDetail page component - Detailed view of a single photo
 */
const PhotoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { photo, loading, error } = usePhoto(id)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  // Loading state
  if (loading) {
    return <LoadingSpinner size="lg" text="Loading photo details..." fullScreen />
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => window.location.reload()}
        fullScreen 
      />
    )
  }

  // Photo not found
  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Not Found</h2>
          <p className="text-gray-600 mb-6">The photo you're looking for doesn't exist.</p>
          <Link to="/photos" className="btn-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleGoBack}
          className="btn-secondary inline-flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
                <span>Failed to load image</span>
              </div>
            ) : (
              <img
                src={photo.fullSize}
                alt={photo.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>

          {/* Image Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href={photo.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <span>Download</span>
              </a>

              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
                <span>View on Picsum</span>
              </a>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Photo Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {photo.title}
            </h1>
            <p className="text-xl text-gray-600">
              by <span className="font-semibold text-gray-800">{photo.author}</span>
            </p>
          </div>
          {/* Photo Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Details</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Photo ID</dt>
                <dd className="text-sm text-gray-900 font-mono">#{photo.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Photographer</dt>
                <dd className="text-sm text-gray-900">{photo.author}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                <dd className="text-sm text-gray-900">{photo.width} x {photo.height} pixels</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Aspect Ratio</dt>
                <dd className="text-sm text-gray-900">
                  {(photo.width / photo.height).toFixed(2)}:1
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
