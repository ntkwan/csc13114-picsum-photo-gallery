import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { fetchPhotoById, getPhotoUrl } from '../services/api';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setLoading(true);
        const photoData = await fetchPhotoById(id);
        setPhoto(photoData);
      } catch (err) {
        setError('failed to load photo details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPhoto();
    }
  }, [id]);

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
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          back to gallery
        </Button>
      </Container>
    );
  }

  if (!photo) {
    return (
      <Container className="py-8">
        <Alert severity="info">photo not found</Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          back to gallery
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        back to gallery
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardMedia
          component="img"
          image={getPhotoUrl(photo.id, 800, 600)}
          alt={photo.title}
          className="w-full h-96 md:h-[500px] object-cover"
        />
        <CardContent className="p-6">
          <Typography variant="h4" component="h1" className="mb-4">
            {photo.title}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" className="mb-3">
            by {photo.author}
          </Typography>
          
          <Typography variant="body1" className="mb-4 text-gray-700">
            {photo.description}
          </Typography>
          
          <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded">
            <div>
              <Typography variant="body2" color="text.secondary">
                dimensions
              </Typography>
              <Typography variant="body1">
                {photo.width} x {photo.height} px
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                photo id
              </Typography>
              <Typography variant="body1">
                {photo.id}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PhotoDetail;
