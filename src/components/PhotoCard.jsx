import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPhotoUrl } from '../services/api';

const PhotoCard = ({ photo, isLast, lastElementRef }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photos/${photo.id}`);
  };

  return (
    <Card 
      ref={isLast ? lastElementRef : null}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={getPhotoUrl(photo.id, 400, 300)}
        alt={`photo by ${photo.author}`}
        className="h-64 object-cover"
      />
      <CardContent className="p-4">
        <Typography variant="body2" color="text.secondary">
          by {photo.author}
        </Typography>
        <Typography variant="caption" color="text.secondary" className="block mt-1">
          {photo.width} x {photo.height}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
