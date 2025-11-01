import React from 'react'

/**
 * LoadingSpinner component for showing loading states
 * @param {string} size - Size variant: 'sm', 'md', 'lg', 'xl'
 * @param {string} text - Optional loading text to display
 * @param {boolean} fullScreen - Whether to display as full screen overlay
 */
const LoadingSpinner = ({ size = 'md', text = '', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
      
      {/* Loading text */}
      {text && (
        <p className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  )
}

export default LoadingSpinner
