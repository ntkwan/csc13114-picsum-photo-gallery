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

  // calculate proper dimensions for pinterest-style layout with higher quality
  const aspectRatio = photo.height / photo.width;
  // use higher resolution for better quality - responsive to screen size
  const cardWidth = screenWidth >= 1024 ? 600 : screenWidth >= 768 ? 500 : 400;
  const cardHeight = Math.floor(cardWidth * aspectRatio); // maintain original aspect ratio

  return (
    <Card 
      ref={isLast ? lastElementRef : null}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 mb-4 break-inside-avoid"
      onClick={handleClick}
      style={{ width: '100%' }}
    >
      <CardMedia
        component="img"
        image={getPhotoUrl(photo.id, cardWidth, cardHeight)}
        alt={`photo by ${photo.author}`}
        className="w-full h-auto object-contain"
        style={{ 
          aspectRatio: `${photo.width} / ${photo.height}`,
          maxWidth: '100%'
        }}
      />
      <CardContent className="p-3">
        <Typography variant="body2" color="text.secondary" className="text-sm">
          by {photo.author}
        </Typography>
        <Typography variant="caption" color="text.secondary" className="block mt-1 text-xs">
          {photo.width} x {photo.height}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
