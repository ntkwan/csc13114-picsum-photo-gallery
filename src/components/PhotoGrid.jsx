import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Alert, CircularProgress, Box } from '@mui/material';
import PhotoCard from './PhotoCard';
import Header from './Header';
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
        <Header subtitle={null} />
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
        <Header subtitle={null} />
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
      <Header />
      
      <Container sx={{ pt: 2, pb: 0 }} maxWidth="xl">
        <Box
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
          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: 8, 
              mb: 0,
              py: 6,
              px: 4,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: 4,
              border: '1px solid #e2e8f0',
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                mb: 2
              }}
            >
              you've reached the end
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}
            >
              that's all the beautiful photos we have for now. check back later for more amazing photography!
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default PhotoGrid;
