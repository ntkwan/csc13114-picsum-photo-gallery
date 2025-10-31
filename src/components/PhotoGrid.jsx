import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, CircularProgress, Typography, Alert } from '@mui/material';
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
      <Container className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Typography variant="h4" component="h1" className="mb-8 text-center">
        photo gallery
      </Typography>
      
      <Grid container spacing={3}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <PhotoCard 
              photo={photo}
              isLast={index === photos.length - 1}
              lastElementRef={lastElementRef}
            />
          </Grid>
        ))}
      </Grid>

      {isFetching && (
        <div className="flex justify-center mt-8">
          <CircularProgress />
        </div>
      )}

      {!hasMore && photos.length > 0 && (
        <Typography variant="body2" className="text-center mt-8 text-gray-500">
          no more photos to load
        </Typography>
      )}
    </Container>
  );
};

export default PhotoGrid;
