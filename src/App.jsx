import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PhotoGallery from './pages/PhotoGallery'
import PhotoDetail from './pages/PhotoDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PhotoGallery />} />
          <Route path="/photos" element={<PhotoGallery />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
