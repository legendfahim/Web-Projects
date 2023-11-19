import React from 'react';

const Footer = () => {
    const footerStyle = {
        color: 'white',
        backgroundColor: 'black',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        textAlign: 'center',
    };

    return (
        <footer style={footerStyle}>
            <div className="p-3">
                Copyright: © 2023- dev-calling || Developed by Istiak
            </div>
        </footer>
    );
};

export default Footer;





