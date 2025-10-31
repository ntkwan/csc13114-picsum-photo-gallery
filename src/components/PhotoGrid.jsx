import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Alert, CircularProgress, Box } from '@mui/material';
import PhotoCard from './PhotoCard';
import { fetchPhotos } from '../services/api';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMorePhotos = useCallback(async () => {
    try {
      const newPhotos = await fetchPhotos(page + 1, 20);
      if (newPhotos.length === 0) {
        return false;
      }
      setPhotos(prev => [...prev, ...newPhotos]);
      setPage(prev => prev + 1);
      return true;
    } catch (err) {
      setError('failed to load more photos');
      return false;
    }
  }, [page]);

  const { isFetching, hasMore, lastElementRef } = useInfiniteScroll(fetchMorePhotos);

  useEffect(() => {
    const loadInitialPhotos = async () => {
      try {
        setLoading(true);
        const initialPhotos = await fetchPhotos(1, 20);
        setPhotos(initialPhotos);
      } catch (err) {
        setError('failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    loadInitialPhotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <Container className="relative py-16">
            <Typography 
              variant="h4" 
              component="h1" 
              className="text-center text-white font-bold"
              style={{ fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              photo gallery
            </Typography>
          </Container>
        </header>
        <Container className="flex justify-center items-center pt-200 pb-20">
          <div className="text-center">
            <CircularProgress size={48} sx={{ color: '#6366f1', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" className="mt-4">
              loading beautiful photos...
            </Typography>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <Container className="relative py-16">
            <Typography 
              variant="h4" 
              component="h1" 
              className="text-center text-white font-bold"
              style={{ fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              photo gallery
            </Typography>
          </Container>
        </header>
        <Container className="pt-40 pb-8">
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca'
            }}
          >
            {error}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <Container className="relative py-16">
          <Typography 
            variant="h4" 
            component="h1" 
            className="text-center text-white font-bold mb-4"
            style={{ fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            photo gallery
          </Typography>
          <Typography 
            variant="h6" 
            className="text-center text-white opacity-90 max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
          >
            discover beautiful photography from talented artists around the world
          </Typography>
        </Container>
      </header>
      
      <Container sx={{ pt: 1, mt: 2 }} maxWidth="xl">        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
            },
            gap: 3,
            justifyItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {photos.map((photo, index) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo}
              isLast={index === photos.length - 1}
              lastElementRef={lastElementRef}
            />
          ))}
        </Box>

        {isFetching && (
          <div className="flex justify-center mt-12">
            <div className="text-center">
              <CircularProgress 
                size={48} 
                sx={{ 
                  color: '#6366f1',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }} 
              />
              <Typography 
                variant="body2" 
                className="mt-4"
                sx={{ color: '#64748b', fontWeight: 500 }}
              >
                loading more beautiful photos...
              </Typography>
            </div>
          </div>
        )}

        {!hasMore && photos.length > 0 && (
          <Typography variant="body2" className="text-center mt-12 text-gray-500">
            no more photos to load
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default PhotoGrid;
