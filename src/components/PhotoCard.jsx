import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPhotoUrl } from '../services/api';

const PhotoCard = ({ photo, isLast, lastElementRef }) => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    navigate(`/photos/${photo.id}`);
  };

  // calculate proper dimensions for grid layout with higher quality
  const aspectRatio = photo.height / photo.width;
  // use consistent sizing for grid layout
  const cardWidth = 250; // consistent width for grid layout
  const cardHeight = Math.min(Math.floor(cardWidth * aspectRatio), 350); // maintain aspect ratio but cap height

  return (
    <Card 
      ref={isLast ? lastElementRef : null}
      className="cursor-pointer group"
      onClick={handleClick}
      sx={{
        width: '250px',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        '&:hover .photo-overlay': {
          opacity: 1,
        }
      }}
    >
      <div className="relative overflow-hidden">
        <CardMedia
          component="img"
          image={getPhotoUrl(photo.id, cardWidth, cardHeight)}
          alt={`photo by ${photo.author}`}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ 
            height: cardHeight,
            maxWidth: '100%'
          }}
        />
        <div 
          className="photo-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300"
        >
          <div className="absolute bottom-4 left-4 text-white">
            <Typography variant="body2" className="font-medium">
              {photo.author}
            </Typography>
          </div>
        </div>
      </div>
      <CardContent 
        sx={{ 
          p: 2.5,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}
      >
        <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 500 }} className="text-sm">
          by {photo.author}
        </Typography>
        <Typography variant="caption" color="text.secondary" className="block mt-1 text-xs opacity-75">
          {photo.width} x {photo.height}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
