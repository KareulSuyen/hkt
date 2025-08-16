import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import styles from '../styles/dashboard.module.scss';
import { SiUnitednations } from "react-icons/si";
import overpopulationVid from '/videos/overpopulation.mp4'
import { LuHandHelping } from "react-icons/lu";



const Dashboard = () => {
  const [language, setLanguage] = useState('filipino');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('trends');
  const [isLoading, setIsLoading] = useState(true);
  const [languageToggleText, setLanguageToggleText] = useState('🇬🇧 English');

  const growthChartRef = useRef(null);
  const projectionChartRef = useRef(null);
  const [growthChart, setGrowthChart] = useState(null);
  const [projectionChart, setProjectionChart] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    setTimeout(() => setIsLoading(false), 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLanguageToggleText(language === 'filipino' ? '🇬🇧 English' : '🇵🇭 Filipino');
  }, [activeTab, language]);

  useEffect(() => {
    if (!isLoading && activeTab === 'trends') {
      const timeoutId = setTimeout(() => {
        if (growthChart) {
          growthChart.destroy();
          setGrowthChart(null);
        }
        if (projectionChart) {
          projectionChart.destroy();
          setProjectionChart(null);
        }

        if (growthChartRef.current && projectionChartRef.current) {
          const growthCtx = growthChartRef.current.getContext('2d');
          const newGrowthChart = new Chart(growthCtx, {
            type: 'line',
            data: {
              labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'],
              datasets: [{
                label: language === 'english' ? 'World Population (billions)' : 'Populasyon ng Mundo (bilyon)',
                data: [2.5, 3.0, 3.7, 4.4, 5.3, 6.1, 6.9, 7.8],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#e2e8f0'
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    color: '#94a3b8'
                  },
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: '#94a3b8'
                  },
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                }
              }
            }
          });

          const projectionCtx = projectionChartRef.current.getContext('2d');
          const newProjectionChart = new Chart(projectionCtx, {
            type: 'line',
            data: {
              labels: ['2020', '2030', '2040', '2050', '2060', '2070', '2080', '2090', '2100'],
              datasets: [{
                label: language === 'english' ? 'Projected Population (billions)' : 'Inaasahang Populasyon (bilyon)',
                data: [7.8, 8.5, 9.2, 9.7, 10.1, 10.4, 10.6, 10.7, 10.8],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#e2e8f0'
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    color: '#94a3b8'
                  },
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: '#94a3b8'
                  },
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                }
              }
            }
          });

          setGrowthChart(newGrowthChart);
          setProjectionChart(newProjectionChart);
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      if (growthChart) {
        growthChart.destroy();
        setGrowthChart(null);
      }
      if (projectionChart) {
        projectionChart.destroy();
        setProjectionChart(null);
      }
    };
  }, [isLoading, language, activeTab]);

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
      chartTitles: {
        historical: "Historical Growth",
        historicalDesc: "World population has doubled since 1970, showing exponential growth patterns across different regions. Growth rate has slowed from 2.1% annually in the 1960s to about 0.9% today.",
        future: "Future Projections",
        futureDesc: "Expected to reach 9.7 billion by 2050, with growth slowing significantly in the latter half of the century. Population is projected to stabilize around 10.8 billion by 2100."
      }
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
          category: "Epekto ng klima",
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
      chartTitles: {
        historical: "Makasaysayang Paglaki",
        historicalDesc: "Ang populasyon ng mundo ay dumoble mula noong 1970, na nagpapakita ng exponential growth pattern sa iba't ibang rehiyon. Ang growth rate ay bumagal mula 2.1% taun-taon noong 1960s hanggang sa 0.9% ngayon.",
        future: "Mga Inaasahang Proyeksyon",
        futureDesc: "Inaasahang aabot sa 9.7 bilyon pagsapit ng 2050, na may makabuluhang pagbagal ng paglaki sa huling kalahati ng siglo. Inaasahang magiging matatag ang populasyon sa palibot ng 10.8 bilyon pagsapit ng 2100."
      }
    }
  };

  const t = content[language];

  const toggleLanguage = () => {
    const newLanguage = language === 'english' ? 'filipino' : 'english';
    setLanguage(newLanguage);
    setLanguageToggleText(newLanguage === 'filipino' ? '🇬🇧 English' : '🇵🇭 Filipino');
  };

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
            onClick={toggleLanguage}
          >
            {languageToggleText}
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={`${styles.fadeIn}`} style={{ marginBottom: '3rem' }}>
          <h2 className={styles.sectionHeading}>
            {language === 'english' ? 'Key Population Insights' : 'Mga Pangunahing Insight sa Populasyon'}
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
                <h3>{t.chartTitles.historical}</h3>
                <div className={styles.chartContainer}>
                  <canvas ref={growthChartRef}></canvas>
                </div>
                <p>{t.chartTitles.historicalDesc}</p>
              </div>
              
              <div className={`${styles.contentCard} ${styles.cardHover}`}>
                <h3>{t.chartTitles.future}</h3>
                <div className={styles.chartContainer}>
                  <canvas ref={projectionChartRef}></canvas>
                </div>
                <p>{t.chartTitles.futureDesc}</p>
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

        {/* Global Statistics */}
        <section className={`${styles.fadeIn}`} style={{ marginBottom: '3rem' }}>
          <h2 className={styles.sectionHeading}>
            {language === 'english' ? 'Global Demographics Overview' : 'Pangkalahatang-ideya ng Pandaigdigang Demograpiko'}
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

        {/* Regional Analysis */}
        <section className={`${styles.fadeIn}`} style={{ marginBottom: '3rem' }}>
          <h2 className={styles.sectionHeading}>
            {language === 'english' ? 'Regional Population Analysis' : 'Pagsusuri sa Rehiyonal na Populasyon'}
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
                    { label: language === 'english' ? 'Population' : 'Populasyon', value: region.population },
                    { label: language === 'english' ? 'Density' : 'Densidad', value: region.density },
                    { label: language === 'english' ? 'Urban' : 'Urbanisasyon', value: region.urbanization },
                    { label: language === 'english' ? 'Median Age' : 'Median Edad', value: region.medianAge }
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
                    <strong>{language === 'english' ? '2050 Projection' : 'Proyeksyon sa 2050'}: {region.projection2050}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

         <div className={`${styles.callToAction} ${styles.fadeIn}`}>
      <div className={styles.videoContainer}>
        <video autoPlay muted loop playsInline className={styles.bgVideo}>
          <source src={overpopulationVid} type="video/mp4" />
        </video>
      </div>
      
    </div>
      <div className={styles.content}>
        <p id={styles.suggestion}>{t.callToAction}</p>
        <a
          href="https://betterplaneteducation.org.uk/factsheets/overpopulation-what-are-some-solutions-to-overpopulation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.ctaButton}>
            {language === 'english' ? 
              <span>
                <LuHandHelping size={20} /> Join&nbsp;
              </span> : 

              <span>
                <LuHandHelping size={20} /> Makilahok&nbsp;
              </span>}
          </button>
        </a>
      </div>
      </main>

      <footer className={styles.dashboardFooter}>
        <p>Data from &nbsp;<span><a href="https://population.un.org/wpp" target='_blank'>UN Population Division & World Bank</a></span><SiUnitednations size={20} id={styles['UN-icon']}/></p>
      </footer>
    </div>
  );
};

export default Dashboard;