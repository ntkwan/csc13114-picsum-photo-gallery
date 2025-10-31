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
            loading photo details...
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
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            className="mt-4"
          >
            back to gallery
          </Button>
        </Container>
      </div>
    );
  }

  if (!photo) {
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
          <Alert severity="info">photo not found</Alert>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            className="mt-4"
          >
            back to gallery
          </Button>
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
        </Container>
      </header>
      
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
            image={getPhotoUrl(photo.id, 1200, Math.floor(1200 * (photo.height / photo.width)))}
            alt={photo.title}
            className="w-full object-contain"
            style={{ 
              aspectRatio: `${photo.width} / ${photo.height}`,
              maxHeight: '70vh'
            }}
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
    </div>
  );
};

export default PhotoDetail;
