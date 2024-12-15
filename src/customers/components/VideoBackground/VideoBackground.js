import React from 'react';
import './VideoBackground.css'; // Import the CSS file for styling
import aw2 from '../../../assets/images/aw2.mp4'; // Adjust the path to where your video is located

const VideoBackground = ({ children }) => {
  return (
    <div className="video-background">
      <video autoPlay muted>
        <source src={aw2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
