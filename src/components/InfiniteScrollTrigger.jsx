import React from 'react'
import { useInView } from 'react-intersection-observer'

const InfiniteScrollTrigger = ({ onLoadMore, hasMore, loading }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px 0px', // Trigger 100px before the element comes into view
  })

  // Trigger load more when the element comes into view
  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore()
    }
  }, [inView, hasMore, loading, onLoadMore])

  // Don't render anything if there are no more items
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <span className="font-medium">You've reached the end!</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          That's all the beautiful photos we have for now.
        </p>
      </div>
    )
  }

  return (
    <div ref={ref} className="text-center py-8">
      {loading ? (
        <div className="inline-flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 font-medium">Loading more photos...</span>
        </div>
      ) : (
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></div>
        </div>
      )}
    </div>
  )
}

export default InfiniteScrollTrigger
