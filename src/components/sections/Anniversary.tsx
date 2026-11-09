import React from 'react';

const Anniversary: React.FC = () => {
    const containerStyle: React.CSSProperties = {
       
        width: '100%',
        height: '100dvh',


        backgroundImage: `url('/images/10yearsofexcellence.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        margin: 0,
        padding: 0,
        display: 'block'
    };

    return <div style={containerStyle} aria-label="10 Years of Excellence Anniversary Image" />;
};

export default Anniversary;