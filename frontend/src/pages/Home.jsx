import { useState, useEffect } from 'react';
import homeStyle from '../styles/home.module.scss';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState('dashboard');
    const [globalData, setGlobalData] = useState(null);
    const [phData, setPhData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch population data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch global data from our Django API
                const globalRes = await fetch('/api/global-population/');
                const globalData = await globalRes.json();
                
                // Fetch Philippines data from our Django API
                const phRes = await fetch('/api/philippines-population/');
                const phData = await phRes.json();
                
                setGlobalData(globalData);
                setPhData(phData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
        // Set up interval for live updates (every 10 seconds)
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        { id: 'dashboard', icon: '📊', label: 'Live Dashboard' },
        { id: 'sources', icon: '📚', label: 'Data Sources' },
        { id: 'analysis', icon: '🔍', label: 'Analysis' }
    ];

    if (loading) return <div className={homeStyle.loading}>Loading data...</div>;
    if (error) return <div className={homeStyle.error}>Error: {error}</div>;

    return (
        <div className={homeStyle.container}>
            <div className={homeStyle.mainContent}>
                <header className={homeStyle.header}>
                    <h1>Population Tracker</h1>
                    <p>Real-time global and Philippine population data</p>
                </header>

                <nav className={homeStyle.nav}>
                    {features.map(feature => (
                        <button
                            key={feature.id}
                            className={`${homeStyle.navButton} ${activeFeature === feature.id ? homeStyle.active : ''}`}
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <span className={homeStyle.icon}>{feature.icon}</span>
                            {feature.label}
                        </button>
                    ))}
                </nav>

                <main className={homeStyle.content}>
                    {activeFeature === 'dashboard' && (
                        <div className={homeStyle.dashboard}>
                            <div className={homeStyle.card}>
                                <h2>🌍 Global Population</h2>
                                <div className={homeStyle.counter}>
                                    {globalData?.population.toLocaleString() || '--'}
                                </div>
                                <div className={homeStyle.meta}>
                                    <span>Last updated: {globalData?.timestamp || '--'}</span>
                                    <span>Growth today: +{(globalData?.daily_growth || 0).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className={homeStyle.card}>
                                <h2>🇵🇭 Philippines Population</h2>
                                <div className={homeStyle.counter}>
                                    {phData?.population.toLocaleString() || '--'}
                                </div>
                                <div className={homeStyle.meta}>
                                    <span>Last updated: {phData?.timestamp || '--'}</span>
                                    <span>Growth today: +{(phData?.daily_growth || 0).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className={`${homeStyle.card} ${homeStyle.chart}`}>
                                <h3>Population Growth Trend</h3>
                                <div className={homeStyle.chartPlaceholder}>
                                    [Chart visualization would appear here]
                                </div>
                            </div>
                        </div>
                    )}

                    {activeFeature === 'sources' && (
                        <div className={homeStyle.sources}>
                            <h2>Data Sources & Methodology</h2>
                            <div className={homeStyle.sourceList}>
                                <div className={homeStyle.sourceItem}>
                                    <h3>Global Population Data</h3>
                                    <p>Sourced from United Nations World Population Prospects</p>
                                    <a href="https://population.un.org/wpp/" target="_blank" rel="noopener noreferrer">
                                        View Source
                                    </a>
                                </div>
                                <div className={homeStyle.sourceItem}>
                                    <h3>Philippines Population Data</h3>
                                    <p>Sourced from Philippine Statistics Authority</p>
                                    <a href="https://psa.gov.ph/" target="_blank" rel="noopener noreferrer">
                                        View Source
                                    </a>
                                </div>
                                <div className={homeStyle.sourceItem}>
                                    <h3>API Integration</h3>
                                    <p>Custom Django backend processing live data feeds</p>
                                    <p>Data is updated every 10 minutes</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <footer className={homeStyle.footer}>
                    <p>© {new Date().getFullYear()} Population Tracker | Data updated periodically</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;