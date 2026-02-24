import React from 'react';
import '../../styles/clientStyles/splitScreenSection.css';

/**
 * SplitScreenSection - Esri-style split screen layout
 * Features large imagery on one side with structured text content on the other
 * @param {Object} props
 * @param {string} props.imageUrl - Background image URL
 * @param {string} props.layout - 'image-left' or 'image-right'
 * @param {string} props.heading - Section heading
 * @param {string} props.description - Section description text
 * @param {React.ReactNode} props.children - Additional content
 * @param {string} props.imageOverlayText - Optional text to overlay on the image
 * @param {string} props.backgroundColor - Background color for text section
 */
export default function SplitScreenSection({
    imageUrl,
    layout = 'image-left',
    heading,
    description,
    children,
    imageOverlayText,
    backgroundColor = '#ffffff'
}) {
    return (
        <div className={`split-screen-section ${layout}`}>
            <div className="split-screen-image" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="image-overlay"></div>
                {imageOverlayText && (
                    <div className="image-overlay-text">
                        <p>{imageOverlayText}</p>
                    </div>
                )}
            </div>
            <div className="split-screen-content" style={{ backgroundColor }}>
                <div className="content-inner">
                    {heading && <h2>{heading}</h2>}
                    {description && <p className="description">{description}</p>}
                    {children}
                </div>
            </div>
        </div>
    );
}
