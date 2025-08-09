import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import styles from '../styles/home.module.scss';

const Dashboard = () => {
  const [language, setLanguage] = useState('english');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('trends');
  const [isLoading, setIsLoading] = useState(true);

  // Update time every minute instead of every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate loading for smooth UX
    setTimeout(() => setIsLoading(false), 1000);
    
    return () => clearInterval(timer);
  }, []);

  const content = {
    english: {
      title: "Population Impact Dashboard",
      subtitle: "Visualizing the challenges of rapid population growth",
      lastUpdated: "Last Updated",
      stats: {
        current: "Current Population",
        daily: "Daily Increase",
        yearly: "Yearly Growth",
        next: "Next Person In"
      },
      tabs: {
        trends: "Growth Trends",
        impacts: "Key Impacts",
        solutions: "Actionable Solutions"
      },
      callToAction: "Explore how you can make a difference",
      dataSource: "Data from UN Population Division & World Bank",
      globalStats: [
        {
          id: 'growth-rate',
          title: "Global Growth Rate",
          value: "0.87%",
          change: "↓ 0.18% vs 2020",
          icon: "📊",
          description: "Annual population increase has slowed significantly",
          color: "primary"
        },
        {
          id: 'demographic-dividend',
          title: "Demographic Dividend",
          value: "2.1B",
          change: "Young workforce (15-34)",
          icon: "👥",
          description: "Working-age population driving economic growth",
          color: "success"
        },
        {
          id: 'aging-population',
          title: "Aging Population",
          value: "771M",
          change: "↑ 65+ years old",
          icon: "👴",
          description: "Fastest growing age demographic globally",
          color: "warning"
        }
      ],
      keyInsights: [
        {
          metric: "World Population",
          value: "8.1 billion",
          description: "Current global population as of 2024"
        },
        {
          metric: "Daily Growth",
          value: "+227,000",
          description: "Net population increase per day"
        },
        {
          metric: "Annual Growth",
          value: "+67 million",
          description: "Net population increase per year"
        },
        {
          metric: "Peak Expected",
          value: "2080s",
          description: "When global population may stabilize"
        }
      ],
      regionalData: [
        {
          region: "Africa",
          population: "1.4B",
          growth: "+2.4%",
          density: "45/km²",
          urbanization: "43%",
          medianAge: "19.7",
          projection2050: "2.5B",
          flag: "🌍",
          status: "rapid-growth"
        },
        {
          region: "Asia",
          population: "4.6B",
          growth: "+0.7%",
          density: "150/km²",
          urbanization: "51%",
          medianAge: "32.1",
          projection2050: "5.3B",
          flag: "🌏",
          status: "moderate-growth"
        },
        {
          region: "Europe",
          population: "745M",
          growth: "-0.1%",
          density: "34/km²",
          urbanization: "75%",
          medianAge: "43.1",
          projection2050: "715M",
          flag: "🇪🇺",
          status: "declining"
        },
        {
          region: "North America",
          population: "580M",
          growth: "+0.6%",
          density: "20/km²",
          urbanization: "82%",
          medianAge: "38.5",
          projection2050: "425M",
          flag: "🇺🇸",
          status: "stable"
        }
      ],
      pressurePoints: [
        {
          category: "Resource Scarcity",
          metrics: [
            { name: "Arable Land per Capita", value: "0.19 hectares", trend: "↓ 2.1%/year", severity: "critical" },
            { name: "Freshwater Availability", value: "6,000 m³/person", trend: "↓ 1.8%/year", severity: "high" }
          ],
          icon: "🌾"
        },
        {
          category: "Urban Challenges",
          metrics: [
            { name: "Slum Population", value: "1.1B people", trend: "↑ 3.2%/year", severity: "critical" },
            { name: "Traffic Congestion Index", value: "127 (avg)", trend: "↑ 4.1%/year", severity: "high" }
          ],
          icon: "🏙️"
        },
        {
          category: "Climate Impact",
          metrics: [
            { name: "CO₂ Emissions per Capita", value: "4.8 tons/year", trend: "↑ 1.2%/year", severity: "high" },
            { name: "Deforestation Rate", value: "10M hectares/year", trend: "↓ 2.8%/year", severity: "moderate" }
          ],
          icon: "🌡️"
        }
      ],
      solutionTrackers: [
        {
          initiative: "Global Education Access",
          description: "Expanding quality education to reduce birth rates and empower communities",
          progress: 73,
          icon: "📚"
        },
        {
          initiative: "Sustainable Urban Planning",
          description: "Creating compact, resource-efficient cities with green infrastructure",
          progress: 42,
          icon: "🏗️"
        },
        {
          initiative: "Renewable Energy Transition",
          description: "Shifting to clean energy sources to reduce per-capita environmental impact",
          progress: 38,
          icon: "⚡"
        },
        {
          initiative: "Family Planning Programs",
          description: "Supporting reproductive health and family planning worldwide",
          progress: 65,
          icon: "👨‍👩‍👧‍👦"
        }
      ],
      languageToggle: "🇵🇭 Filipino"
    },
    filipino: {
      title: "Population Impact Dashboard",
      subtitle: "Ipinapakita ang mga hamon ng mabilis na paglaki ng populasyon",
      lastUpdated: "Huling Na-update",
      stats: {
        current: "Kasalukuyang Populasyon",
        daily: "Dagdag Araw-araw",
        yearly: "Taunang Paglaki",
        next: "Susunod na Tao Sa"
      },
      tabs: {
        trends: "Mga Trend ng Paglaki",
        impacts: "Pangunahing Epekto",
        solutions: "Mga Solusyon"
      },
      callToAction: "Alamin kung paano ka makakatulong",
      dataSource: "Data mula sa UN Population Division & World Bank",
      globalStats: [
        {
          id: 'growth-rate',
          title: "Pandaigdigang Growth Rate",
          value: "0.87%",
          change: "↓ 0.18% vs 2020",
          icon: "📊",
          description: "Ang taunang pagtaas ng populasyon ay bumagal nang malaki",
          color: "primary"
        },
        {
          id: 'demographic-dividend',
          title: "Demographic Dividend",
          value: "2.1B",
          change: "Batang workforce (15-34)",
          icon: "👥",
          description: "Working-age population na nangunguna sa economic growth",
          color: "success"
        },
        {
          id: 'aging-population',
          title: "Tumatandang Populasyon",
          value: "771M",
          change: "↑ 65+ taong gulang",
          icon: "👴",
          description: "Pinakamabilis na lumalaking age demographic sa mundo",
          color: "warning"
        }
      ],
      keyInsights: [
        {
          metric: "Populasyon ng Mundo",
          value: "8.1 bilyon",
          description: "Kasalukuyang pandaigdigang populasyon noong 2024"
        },
        {
          metric: "Araw-araw na Paglaki",
          value: "+227,000",
          description: "Net na pagtaas ng populasyon kada araw"
        },
        {
          metric: "Taunang Paglaki",
          value: "+67 milyon",
          description: "Net na pagtaas ng populasyon kada taon"
        },
        {
          metric: "Inaasahang Peak",
          value: "2080s",
          description: "Kailan maaaring mag-stabilize ang pandaigdigang populasyon"
        }
      ],
      regionalData: [
        {
          region: "Africa",
          population: "1.4B",
          growth: "+2.4%",
          density: "45/km²",
          urbanization: "43%",
          medianAge: "19.7",
          projection2050: "2.5B",
          flag: "🌍",
          status: "rapid-growth"
        },
        {
          region: "Asia",
          population: "4.6B",
          growth: "+0.7%",
          density: "150/km²",
          urbanization: "51%",
          medianAge: "32.1",
          projection2050: "5.3B",
          flag: "🌏",
          status: "moderate-growth"
        },
        {
          region: "Europe",
          population: "745M",
          growth: "-0.1%",
          density: "34/km²",
          urbanization: "75%",
          medianAge: "43.1",
          projection2050: "715M",
          flag: "🇪🇺",
          status: "declining"
        },
        {
          region: "North America",
          population: "580M",
          growth: "+0.6%",
          density: "20/km²",
          urbanization: "82%",
          medianAge: "38.5",
          projection2050: "425M",
          flag: "🇺🇸",
          status: "stable"
        }
      ],
      pressurePoints: [
        {
          category: "Kakulangan sa Resources",
          metrics: [
            { name: "Arable Land bawat Kapitolyo", value: "0.19 ektarya", trend: "↓ 2.1%/taon", severity: "critical" },
            { name: "Freshwater Availability", value: "6,000 m³/tao", trend: "↓ 1.8%/taon", severity: "high" }
          ],
          icon: "🌾"
        },
        {
          category: "Mga Urban na Hamon",
          metrics: [
            { name: "Slum Population", value: "1.1B tao", trend: "↑ 3.2%/taon", severity: "critical" },
            { name: "Traffic Congestion Index", value: "127 (avg)", trend: "↑ 4.1%/taon", severity: "high" }
          ],
          icon: "🏙️"
        },
        {
          category: "Climate Impact",
          metrics: [
            { name: "CO₂ Emissions bawat Kapitolyo", value: "4.8 tons/taon", trend: "↑ 1.2%/taon", severity: "high" },
            { name: "Deforestation Rate", value: "10M ektarya/taon", trend: "↓ 2.8%/taon", severity: "moderate" }
          ],
          icon: "🌡️"
        }
      ],
      solutionTrackers: [
        {
          initiative: "Global Education Access",
          description: "Pagpapalawak ng quality education para mabawasan ang birth rates at mabigyan ng kapangyarihan ang mga komunidad",
          progress: 73,
          icon: "📚"
        },
        {
          initiative: "Sustainable Urban Planning",
          description: "Paglikha ng compact, resource-efficient na mga lungsod na may green infrastructure",
          progress: 42,
          icon: "🏗️"
        },
        {
          initiative: "Renewable Energy Transition",
          description: "Paglipat sa mga malinis na pinagkukunan ng enerhiya upang mabawasan ang environmental impact",
          progress: 38,
          icon: "⚡"
        },
        {
          initiative: "Family Planning Programs",
          description: "Pagsuporta sa reproductive health at family planning sa buong mundo",
          progress: 65,
          icon: "👨‍👩‍👧‍👦"
        }
      ],
      languageToggle: "🇬🇧 English"
    }
  };

  const t = content[language];

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
            <div className={styles.lastUpdated}>
              {t.lastUpdated}: {currentTime.toLocaleString()}
            </div>
          </div>
          <button
            className={styles.languageToggle}
            onClick={() => setLanguage(language === 'english' ? 'filipino' : 'english')}
          >
            {t.languageToggle}
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Key Insights Section */}
        <section className={`${styles.fadeIn}`} style={{ marginBottom: '3rem' }}>
          <h2 className={styles.sectionHeading}>
            Key Population Insights
          </h2>
          <div className={styles.insightsGrid}>
            {t.keyInsights.map((insight, index) => (
              <div key={index} className={`${styles.insightCard} ${styles.cardHover}`}>
                <h3>{insight.metric}</h3>
                <div className={`${styles.metricValue} ${styles.gradientText}`}>
                  {insight.value}
                </div>
                <p>{insight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className={styles.tabNav}>
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              className={`${styles.tabButton} ${activeTab === key ? styles.active : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'trends' && (
            <div className={styles.contentGrid}>
              <div className={`${styles.contentCard} ${styles.cardHover}`}>
                <h3>Historical Growth</h3>
                <div className={styles.chartPlaceholder}>
                  📈 Population Growth Chart
                </div>
                <p>
                  World population has doubled since 1970, showing exponential growth patterns across different regions.
                </p>
              </div>
              
              <div className={`${styles.contentCard} ${styles.cardHover}`}>
                <h3>Future Projections</h3>
                <div className={styles.chartPlaceholder}>
                  🔮 Future Projections Chart
                </div>
                <p>
                  Expected to reach 9.7 billion by 2050, with growth slowing significantly in the latter half of the century.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'impacts' && (
            <div className={styles.contentGrid}>
              {t.pressurePoints.map((category, index) => (
                <div key={index} className={`${styles.pressurePointCard} ${styles.cardHover}`}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <h3>{category.category}</h3>
                  </div>
                  <div className={styles.metricsContainer}>
                    {category.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className={styles.metricItem}
                        style={{
                          borderLeftColor: 
                            metric.severity === 'critical' ? '#ef4444' :
                            metric.severity === 'high' ? '#f59e0b' :
                            metric.severity === 'moderate' ? '#3b82f6' : '#10b981'
                        }}
                      >
                        <div className={styles.metricHeader}>
                          <span className={styles.metricName}>{metric.name}</span>
                          <span className={styles.metricTrend}>{metric.trend}</span>
                        </div>
                        <div className={styles.metricFooter}>
                          <span className={styles.metricValue}>{metric.value}</span>
                          <span className={`${styles.severityBadge} ${styles[metric.severity]}`}>
                            {metric.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'solutions' && (
            <div className={styles.contentGrid}>
              {t.solutionTrackers.map((solution, index) => (
                <div key={index} className={`${styles.solutionTrackerCard} ${styles.cardHover}`}>
                  <div className={styles.solutionHeader}>
                    <span className={styles.solutionIcon}>{solution.icon}</span>
                    <div className={styles.solutionInfo}>
                      <h3>{solution.initiative}</h3>
                      <p>{solution.description}</p>
                    </div>
                  </div>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${solution.progress}%` }}
                      ></div>
                    </div>
                    <span className={styles.progressText}>{solution.progress}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className={`${styles.fadeIn}`} style={{ marginBottom: '3rem' }}>
          <h2 className={styles.sectionHeading}>
            Global Demographics Overview
          </h2>
          <div className={styles.globalStatsGrid}>
            {t.globalStats.map((stat) => (
              <div
                key={stat.id}
                className={`${styles.statCard} ${styles.cardHover} ${styles[stat.color]}`}
              >
                <div className={styles.statHeader}>
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <h3>{stat.title}</h3>
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statChange}>{stat.change}</div>
                <p className={styles.statDescription}>{stat.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.fadeIn}`} style={{ marginBottom: '3rem' }}>
          <h2 className={styles.sectionHeading}>
            Regional Population Analysis
          </h2>
          <div className={styles.regionalGrid}>
            {t.regionalData.map((region, index) => (
              <div
                key={index}
                className={`${styles.regionalCard} ${styles.cardHover} ${styles[region.status]}`}
                onClick={() => setSelectedRegion(region.region.toLowerCase())}
              >
                <div className={styles.regionHeader}>
                  <span className={styles.regionFlag}>{region.flag}</span>
                  <h3>{region.region}</h3>
                  <span className={`${styles.growthBadge} ${styles[region.status]}`}>
                    {region.growth}
                  </span>
                </div>
                <div>
                  {[
                    { label: 'Population', value: region.population },
                    { label: 'Density', value: region.density },
                    { label: 'Urban', value: region.urbanization },
                    { label: 'Median Age', value: region.medianAge }
                  ].map((metric, idx) => (
                    <div
                      key={idx}
                      className={styles.regionMetric}
                      style={{ borderBottom: idx < 3 ? '1px solid #334155' : 'none' }}
                    >
                      <span className={styles.metricLabel}>{metric.label}:</span>
                      <span className={styles.metricValue}>{metric.value}</span>
                    </div>
                  ))}
                  <div className={styles.regionProjection}>
                    <strong>2050 Projection: {region.projection2050}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className={`${styles.callToAction} ${styles.fadeIn}`}>
          <p>{t.callToAction}</p>
          <button className={styles.ctaButton}>
            {language === 'english' ? 'Get Involved' : 'Makilahok'}
          </button>
        </div>
      </main>

      <footer className={styles.dashboardFooter}>
        <p>{t.dataSource}</p>
      </footer>
    </div>
  );
};

export default Dashboard;