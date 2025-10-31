import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Alert, CircularProgress } from '@mui/material';
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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <Container className="py-6">
            <Typography variant="h4" component="h1" className="text-center font-light">
              photo gallery
            </Typography>
          </Container>
        </header>
        <Container className="flex justify-center items-center py-20">
          <Typography variant="body1" color="text.secondary">
            loading photos...
          </Typography>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <Container className="py-6">
            <Typography variant="h4" component="h1" className="text-center font-light">
              photo gallery
            </Typography>
          </Container>
        </header>
        <Container className="py-8">
          <Alert severity="error">{error}</Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <Container className="py-6">
          <Typography variant="h4" component="h1" className="text-center font-light">
            photo gallery
          </Typography>
          <Typography variant="body2" color="text.secondary" className="text-center mt-2">
            discover beautiful photography from talented artists around the world
          </Typography>
        </Container>
      </header>
      
      <Container className="py-8">
        <div 
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
          style={{ columnFill: 'balance' }}
        >
          {photos.map((photo, index) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo}
              isLast={index === photos.length - 1}
              lastElementRef={lastElementRef}
            />
          ))}
        </div>

        {isFetching && (
          <div className="flex justify-center mt-8">
            <CircularProgress />
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
