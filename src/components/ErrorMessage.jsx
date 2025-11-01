import React from 'react'

/**
 * ErrorMessage component for displaying error states
 * @param {string} message - Error message to display
 * @param {function} onRetry - Optional retry function
 * @param {boolean} fullScreen - Whether to display as full screen
 */
const ErrorMessage = ({ message, onRetry, fullScreen = false }) => {
  const content = (
    <div className="text-center">
      {/* Error Icon */}
      <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      {/* Error Message */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      
      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2M15 15v5h.582m-15.356-2A8.001 8.001 0 0015.582 15m0 0V15a8 8 0 01-15.356-2" 
            />
          </svg>
          <span>Try Again</span>
        </button>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {content}
    </div>
  )
}

export default ErrorMessage
