import { Container, Typography } from '@mui/material';

const Header = ({ title = "photo gallery", subtitle = "discover beautiful photography from talented artists around the world" }) => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <Container className="relative py-16">
        <Typography 
          variant="h4" 
          component="h1" 
          className="text-center text-white font-bold mb-4 select-none"
          style={{ fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="h6" 
            className="text-center text-white opacity-90 max-w-2xl mx-auto select-none"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </header>
  );
};

export default Header;
