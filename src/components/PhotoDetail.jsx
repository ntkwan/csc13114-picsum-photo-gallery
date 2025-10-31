import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Header from './Header';
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
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Header title="photo gallery" subtitle={null} />
        <Container className="flex justify-center items-center py-20">
          <div className="text-center">
            <CircularProgress size={48} sx={{ color: '#6366f1', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" className="mt-4">
              loading photo details...
            </Typography>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Header title="photo gallery" subtitle={null} />
        <Container className="py-8">
          <Alert 
            severity="error"
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              mb: 3
            }}
          >
            {error}
          </Alert>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              width: 56,
              height: 56,
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Container>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Header title="photo gallery" subtitle={null} />
        <Container className="py-8">
          <Alert 
            severity="info"
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              mb: 3
            }}
          >
            photo not found
          </Alert>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              width: 56,
              height: 56,
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Header title="photo gallery" subtitle={null} />
      
      <Container className="py-12">
        <IconButton 
          onClick={() => navigate('/')}
          className="mb-8"
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            width: 56,
            height: 56,
            borderRadius: 3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            mt: 2,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>

        <Card 
          className="max-w-4xl mx-auto"
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          }}
        >
          <div 
            className="relative group cursor-pointer" 
            onClick={() => photo.url && window.open(photo.url, '_blank')}
            style={{ display: 'inline-block', width: '100%' }}
          >
            <CardMedia
              component="img"
              image={getPhotoUrl(photo.id, 1200, Math.floor(1200 * (photo.height / photo.width)))}
              alt={photo.title}
              className="w-full object-contain transition-all duration-300 group-hover:brightness-90"
              style={{ 
                aspectRatio: `${photo.width} / ${photo.height}`,
                maxHeight: '70vh',
                display: 'block'
              }}
            />
            {photo.url && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(photo.url, '_blank');
                }}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                sx={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  width: 48,
                  height: 48,
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.95)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 22 }} />
              </IconButton>
            )}
          </div>
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              className="mb-4"
              sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              {photo.title}
            </Typography>
            
            <Typography 
              variant="h6" 
              className="mb-4"
              sx={{ color: '#64748b', fontWeight: 500 }}
            >
              by {photo.author}
            </Typography>
            
            <div 
              className="grid grid-cols-2 gap-6 mt-8 p-6 rounded-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                border: '1px solid #e2e8f0'
              }}
            >
              <div>
                <Typography 
                  variant="body2" 
                  sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}
                >
                  dimensions
                </Typography>
                <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 500 }}>
                  {photo.width} x {photo.height} px
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}
                >
                  photo id
                </Typography>
                <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 500 }}>
                  {photo.id}
                </Typography>
              </div>
              {photo.url && (
                <div className="col-span-2">
                  <Typography 
                    variant="body2" 
                    sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}
                  >
                    original source
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#1e293b', 
                      cursor: 'pointer',
                      '&:hover': { color: '#6366f1', textDecoration: 'underline' }
                    }}
                    onClick={() => window.open(photo.url, '_blank')}
                  >
                    click image to view original source
                  </Typography>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PhotoDetail;
