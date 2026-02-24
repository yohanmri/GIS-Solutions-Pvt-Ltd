import React from 'react';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-block';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '../../styles/clientStyles/iconFeatureList.css';

/**
 * IconFeatureList - Displays features with large outline icons using Calcite blocks
 * @param {Object} props
 * @param {Array} props.features - Array of feature objects with icon, title, description
 */
export default function IconFeatureList({ features }) {
    return (
        <div className="icon-feature-list">
            {features.map((feature, index) => (
                <calcite-block
                    key={index}
                    heading={feature.title}
                    description={feature.description}
                    open
                    collapsible={false}
                >
                    <calcite-icon slot="icon" icon={feature.icon} scale="l"></calcite-icon>
                    {feature.items && (
                        <calcite-list>
                            {feature.items.map((item, i) => (
                                <calcite-list-item key={i} label={item} non-interactive></calcite-list-item>
                            ))}
                        </calcite-list>
                    )}
                </calcite-block>
            ))}
        </div>
    );
}
