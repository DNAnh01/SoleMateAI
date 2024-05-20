import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';

import images from '~/assets/images';

const Image = forwardRef(({ src, alt, className, fallback: customerFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handelError = () => {
        setFallback(customerFallback);
    };

    return (
        <img
            style={{ overflow: 'hidden' }}
            className={className}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handelError}
        />
    );
});
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
