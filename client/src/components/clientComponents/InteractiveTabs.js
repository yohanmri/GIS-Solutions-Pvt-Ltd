import React, { useState } from 'react';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-tabs';
import '@esri/calcite-components/components/calcite-tab-nav';
import '@esri/calcite-components/components/calcite-tab-title';
import '@esri/calcite-components/components/calcite-tab';
import '../../styles/clientStyles/interactiveTabs.css';

/**
 * InteractiveTabs - Icon-based tab navigation component using Calcite
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with id, icon, label, content
 */
export default function InteractiveTabs({ tabs }) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

    return (
        <div className="interactive-tabs-wrapper">
            <calcite-tabs>
                <calcite-tab-nav slot="title-group">
                    {tabs.map((tab) => (
                        <calcite-tab-title
                            key={tab.id}
                            selected={activeTab === tab.id}
                            onCalciteTabsActivate={() => setActiveTab(tab.id)}
                        >
                            <div className="tab-icon-wrapper">
                                <calcite-icon icon={tab.icon} scale="m"></calcite-icon>
                            </div>
                            <span>{tab.label}</span>
                        </calcite-tab-title>
                    ))}
                </calcite-tab-nav>

                {tabs.map((tab) => (
                    <calcite-tab key={tab.id} selected={activeTab === tab.id}>
                        <div className="tab-content-wrapper">
                            {tab.content}
                        </div>
                    </calcite-tab>
                ))}
            </calcite-tabs>
        </div>
    );
}
