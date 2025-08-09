import { useState, useEffect } from 'react';

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

  const formatNumber = (num) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#0f172a',
        color: '#e2e8f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #334155',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: "'Inter', system-ui, sans-serif",
      backgroundColor: '#0f172a',
      color: '#e2e8f0'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.6s ease forwards;
          }
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
          }
          .gradient-text {
            background: linear-gradient(90deg, #93c5fd, #10b981);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>

      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        padding: '2rem',
        color: 'white',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              margin: '0 0 0.5rem',
              fontWeight: '800',
              letterSpacing: '-0.025em'
            }}>
              {t.title}
            </h1>
            <p style={{
              margin: '0 0 1rem',
              opacity: 0.9,
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              lineHeight: 1.4
            }}>
              {t.subtitle}
            </p>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              {t.lastUpdated}: {currentTime.toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'english' ? 'filipino' : 'english')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '2rem',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            {t.languageToggle}
          </button>
        </div>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Key Insights Section */}
        <section className="fade-in" style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            marginBottom: '2rem',
            color: 'white',
            position: 'relative',
            paddingBottom: '0.5rem'
          }}>
            Key Population Insights
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '4rem',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #10b981)',
              borderRadius: '2px'
            }}></div>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {t.keyInsights.map((insight, index) => (
              <div
                key={index}
                className="card-hover"
                style={{
                  background: '#1e293b',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  margin: '0 0 0.5rem',
                  fontSize: '1.1rem',
                  color: '#93c5fd'
                }}>
                  {insight.metric}
                </h3>
                <div className="gradient-text" style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  margin: '0.5rem 0'
                }}>
                  {insight.value}
                </div>
                <p style={{
                  margin: 0,
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tab Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '2rem',
                background: activeTab === key ? '#3b82f6' : 'transparent',
                color: activeTab === key ? 'white' : '#e2e8f0',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `1px solid ${activeTab === key ? '#3b82f6' : '#334155'}`,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = '#93c5fd';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = '#334155';
                }
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div style={{ marginBottom: '3rem' }}>
          {activeTab === 'trends' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              <div className="card-hover" style={{
                background: '#1e293b',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid #334155'
              }}>
                <h3 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.3rem' }}>
                  Historical Growth
                </h3>
                <div style={{
                  height: '200px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '1rem 0',
                  border: '1px dashed #334155',
                  color: '#94a3b8'
                }}>
                  📈 Population Growth Chart
                </div>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem' }}>
                  World population has doubled since 1970, showing exponential growth patterns across different regions.
                </p>
              </div>
              
              <div className="card-hover" style={{
                background: '#1e293b',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid #334155'
              }}>
                <h3 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.3rem' }}>
                  Future Projections
                </h3>
                <div style={{
                  height: '200px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '1rem 0',
                  border: '1px dashed #334155',
                  color: '#94a3b8'
                }}>
                  🔮 Future Projections Chart
                </div>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem' }}>
                  Expected to reach 9.7 billion by 2050, with growth slowing significantly in the latter half of the century.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'impacts' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {t.pressurePoints.map((category, index) => (
                <div
                  key={index}
                  className="card-hover"
                  style={{
                    background: '#1e293b',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '1px solid #334155'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>{category.icon}</span>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>
                      {category.category}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {category.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          borderLeft: `4px solid ${
                            metric.severity === 'critical' ? '#ef4444' :
                            metric.severity === 'high' ? '#f59e0b' :
                            metric.severity === 'moderate' ? '#3b82f6' : '#10b981'
                          }`
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          marginBottom: '0.5rem',
                          gap: '0.5rem'
                        }}>
                          <span style={{ fontWeight: '500' }}>{metric.name}</span>
                          <span style={{ opacity: 0.8, fontSize: '0.85rem' }}>
                            {metric.trend}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          <span style={{ fontWeight: '600' }}>{metric.value}</span>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '2rem',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            background: `${
                              metric.severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' :
                              metric.severity === 'high' ? 'rgba(245, 158, 11, 0.2)' :
                              metric.severity === 'moderate' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                            }`,
                            color: `${
                              metric.severity === 'critical' ? '#ef4444' :
                              metric.severity === 'high' ? '#f59e0b' :
                              metric.severity === 'moderate' ? '#93c5fd' : '#10b981'
                            }`
                          }}>
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {t.solutionTrackers.map((solution, index) => (
                <div
                  key={index}
                  className="card-hover"
                  style={{
                    background: '#1e293b',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '1px solid #334155'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>
                      {solution.icon}
                    </span>
                    <div>
                      <h3 style={{
                        margin: '0 0 0.5rem',
                        color: 'white',
                        fontSize: '1.2rem'
                      }}>
                        {solution.initiative}
                      </h3>
                      <p style={{
                        margin: 0,
                        opacity: 0.8,
                        fontSize: '0.95rem',
                        lineHeight: 1.4
                      }}>
                        {solution.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      height: '8px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                        borderRadius: '4px',
                        width: `${solution.progress}%`,
                        transition: 'width 0.5s ease'
                      }}>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#93c5fd'
                    }}>
                      {solution.progress}% Complete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Global Statistics */}
        <section className="fade-in" style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            marginBottom: '2rem',
            color: 'white',
            position: 'relative',
            paddingBottom: '0.5rem'
          }}>
            Global Demographics Overview
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '4rem',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #10b981)',
              borderRadius: '2px'
            }}></div>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {t.globalStats.map((stat) => (
              <div
                key={stat.id}
                className="card-hover"
                style={{
                  background: '#1e293b',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  borderLeft: `4px solid ${
                    stat.color === 'primary' ? '#3b82f6' :
                    stat.color === 'success' ? '#10b981' :
                    stat.color === 'warning' ? '#f59e0b' : '#ef4444'
                  }`
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  <h3 style={{
                    margin: 0,
                    color: 'white',
                    fontSize: '1.1rem',
                    flex: 1
                  }}>
                    {stat.title}
                  </h3>
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  margin: '0.5rem 0',
                  color: `${
                    stat.color === 'primary' ? '#93c5fd' :
                    stat.color === 'success' ? '#6ee7b7' :
                    stat.color === 'warning' ? '#fbbf24' : '#fca5a5'
                  }`
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  {stat.change}
                </div>
                <p style={{
                  margin: 0,
                  opacity: 0.7,
                  fontSize: '0.85rem',
                  lineHeight: 1.4
                }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Regional Analysis */}
        <section className="fade-in" style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            marginBottom: '2rem',
            color: 'white',
            position: 'relative',
            paddingBottom: '0.5rem'
          }}>
            Regional Population Analysis
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '4rem',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #10b981)',
              borderRadius: '2px'
            }}></div>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {t.regionalData.map((region, index) => (
              <div
                key={index}
                className="card-hover"
                onClick={() => setSelectedRegion(region.region.toLowerCase())}
                style={{
                  background: '#1e293b',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  borderLeft: `4px solid ${
                    region.status === 'rapid-growth' ? '#ef4444' :
                    region.status === 'moderate-growth' ? '#f59e0b' :
                    region.status === 'declining' ? '#94a3b8' : '#10b981'
                  }`,
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{region.flag}</span>
                  <h3 style={{
                    margin: 0,
                    flex: 1,
                    color: 'white',
                    fontSize: '1.2rem',
                    minWidth: '0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {region.region}
                  </h3>
                  <span style={{
                    fontWeight: '700',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    background: `${
                      region.status === 'rapid-growth' ? 'rgba(239, 68, 68, 0.2)' :
                      region.status === 'moderate-growth' ? 'rgba(245, 158, 11, 0.2)' :
                      region.status === 'declining' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                    }`,
                    color: `${
                      region.status === 'rapid-growth' ? '#ef4444' :
                      region.status === 'moderate-growth' ? '#f59e0b' :
                      region.status === 'declining' ? '#94a3b8' : '#10b981'
                    }`
                  }}>
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
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        borderBottom: idx < 3 ? '1px solid #334155' : 'none',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ opacity: 0.8 }}>{metric.label}:</span>
                      <span style={{ fontWeight: '500' }}>{metric.value}</span>
                    </div>
                  ))}
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid #334155',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                  }}>
                    <strong>2050 Projection: {region.projection2050}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="fade-in" style={{
          textAlign: 'center',
          margin: '3rem 0',
          padding: '2rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '1rem',
          border: '1px solid #334155'
        }}>
          <p style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            {t.callToAction}
          </p>
          <button
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(2rem, 4vw, 2.5rem)',
              border: 'none',
              borderRadius: '2rem',
              background: '#3b82f6',
              color: 'white',
              fontWeight: '600',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >
            {language === 'english' ? 'Get Involved' : 'Makilahok'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        opacity: 0.7,
        borderTop: '1px solid #334155'
      }}>
        <p style={{ margin: 0 }}>{t.dataSource}</p>
      </footer>
    </div>
  );
};

export default Dashboard;