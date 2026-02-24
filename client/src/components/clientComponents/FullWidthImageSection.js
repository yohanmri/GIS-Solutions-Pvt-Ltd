import React from 'react';
import '@esri/calcite-components/components/calcite-button';
import '../../styles/clientStyles/fullWidthImageSection.css';

/**
 * FullWidthImageSection - Full-width section with background image and overlay
 * @param {Object} props
 * @param {string} props.imageUrl - Background image URL
 * @param {string} props.heading - Section heading
 * @param {string} props.description - Section description
 * @param {string} props.ctaText - Call-to-action button text
 * @param {Function} props.onCtaClick - CTA button click handler
 * @param {string} props.theme - 'dark' or 'light'
 */
export default function FullWidthImageSection({
    imageUrl,
    heading,
    description,
    ctaText,
    onCtaClick,
    theme = 'dark'
}) {
    return (
        <div
            className={`full-width-image-section ${theme}`}
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="full-width-overlay"></div>
            <div className="full-width-content">
                <h2>{heading}</h2>
                {description && <p>{description}</p>}
                {ctaText && (
                    <calcite-button
                        appearance="outline-fill"
                        scale="l"
                        icon-end="arrow-right"
                        onClick={onCtaClick}
                    >
                        {ctaText}
                    </calcite-button>
                )}
            </div>
        </div>
    );
}
