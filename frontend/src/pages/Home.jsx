import { useState } from 'react';
import homeStyle from '../styles/home.module.scss';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState('dashboard');
    
    // Sample data - replace with your actual data
    const populationData = {
        current: 8045311447,
        yearlyGrowth: 80000000,
        dailyGrowth: 219178
    };

    const features = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'comparison', label: 'Comparison' },
        { id: 'resources', label: 'Resources' }
    ];

    return (
        <div className={homeStyle.container}>
            <div className={homeStyle.mainContent}>
                {/* Header */}
                <header className={homeStyle.header}>
                    <h1 className={homeStyle.headerTitle}>Global Population Insights</h1>
                    <p className={homeStyle.headerSubtitle}>
                        Interactive data visualization of world population trends
                    </p>
                </header>

                {/* Feature Navigation */}
                <nav className={homeStyle.featureNav}>
                    {features.map(feature => (
                        <button
                            key={feature.id}
                            className={`${homeStyle.featureButton} ${
                                activeFeature === feature.id ? homeStyle.activeFeature : ''
                            }`}
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            {feature.label}
                        </button>
                    ))}
                </nav>

                {/* Main Content */}
                <main className={homeStyle.content}>
                    {activeFeature === 'dashboard' && (
                        <div className={homeStyle.featureContent}>
                            <div className={homeStyle.statsGrid}>
                                <div className={homeStyle.statCard}>
                                    <h3>Current Population</h3>
                                    <div className={homeStyle.statValue}>
                                        {populationData.current.toLocaleString()}
                                    </div>
                                </div>
                                <div className={homeStyle.statCard}>
                                    <h3>Yearly Growth</h3>
                                    <div className={homeStyle.statValue}>
                                        +{populationData.yearlyGrowth.toLocaleString()}
                                    </div>
                                </div>
                                <div className={homeStyle.statCard}>
                                    <h3>Daily Growth</h3>
                                    <div className={homeStyle.statValue}>
                                        +{populationData.dailyGrowth.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeFeature === 'timeline' && (
                        <div className={homeStyle.featureContent}>
                            <div className={homeStyle.timeline}>
                                <div className={homeStyle.timelineItem}>
                                    <h3>8 Billion Reached (2022)</h3>
                                    <p>World population crossed 8 billion mark</p>
                                </div>
                                <div className={homeStyle.timelineItem}>
                                    <h3>7 Billion (2011)</h3>
                                    <p>Previous milestone reached</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className={homeStyle.footer}>
                    <p>Data sourced from United Nations Population Division</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;