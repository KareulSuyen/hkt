import { useState } from 'react';

const Help = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const sections = {
        overview: 'Pangkalahatang-ideya',
        causes: 'Sanhi',
        effects: 'Epekto',
        solutions: 'Solusyon',
        resources: 'Mapagkukunan',
        faq: 'Mga Madalas na Tanong'
    };

    const faqData = [
        {
            question: "Ano ang tinutukoy na sobrang daming populasyon?",
            answer: "Ang sobrang daming populasyon ay nangyayari kapag ang bilang ng mga tao sa isang lugar ay lumampas sa carrying capacity nito - ang maximum na bilang ng mga taong maaaring manatili gamit ang available na resources at kapaligiran nang hindi nakakasama sa kakayahan ng susunod na henerasyon na matugunan ang kanilang mga pangangailangan."
        },
        {
            question: "Pandaigdigang problema ba ang sobrang populasyon?",
            answer: "Bagamat bumabagal na ang paglaki ng pandaigdigang populasyon, nananatiling problema sa mga partikular na lugar ang sobrang populasyon. May mga lugar na nahaharap sa siksikan at kakulangan ng resources, habang iba naman ay bumababa ang populasyon. Ang hamon ay madalas tungkol sa pamamahagi at pamamahala ng resources kaysa sa absolute na bilang."
        },
        {
            question: "Ano ang mga pangunahing epekto sa kapaligiran?",
            answer: "Kasama sa mga pangunahing epekto ang deforestation, pagkasira ng tahanan ng mga hayop, pagtaas ng polusyon, kakulangan ng tubig, pagkasira ng lupa, at mas mabilis na climate change dahil sa mas mataas na paggamit ng resources at produksyon ng basura."
        },
        {
            question: "Paano makakatulong ang edukasyon sa pagtugunan ng sobrang populasyon?",
            answer: "Ang edukasyon, lalo na para sa mga babae, ay may malakas na koneksyon sa mas mababang birth rates. Nagbibigay ito ng mas magandang oportunidad sa ekonomiya, nagpapataas ng kamalayan sa family planning options, at nagbibigay-kapangyarihan sa mga informed na reproductive choices."
        },
        {
            question: "Ano ang papel ng urbanization?",
            answer: "Ang urbanization ay maaaring makatulong at makasama. Ang mga maayos na plano na mga lungsod ay maaaring mas efficient sa resources, ngunit ang mabilis at walang plano na paglaki ng urban areas ay madalas na nagdudulot ng mga slums, pagkakauntog ng infrastructure, at pagkasira ng kapaligiran."
        }
    ];

    const renderContent = () => {
        switch(activeSection) {
            case 'overview':
                return (
                    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                        <h3 style={{ color: '#60a5fa', marginBottom: '20px', fontSize: '24px' }}>Pag-unawa sa Sobrang Populasyon</h3>
                        <div style={{ 
                            backgroundColor: '#1e293b', 
                            padding: '20px', 
                            borderRadius: '12px', 
                            marginBottom: '24px',
                            borderLeft: '4px solid #60a5fa',
                            border: '1px solid #334155'
                        }}>
                            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#cbd5e1' }}>
                                Ang sobrang populasyon ay nangyayari kapag ang populasyon ay lumampas sa carrying capacity ng kapaligiran, 
                                na nagreresulta sa pagkakasubos ng resources, pagkasira ng kapaligiran, at pagbaba ng kalidad ng buhay.
                            </p>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #000000ff 0%, #7c3aed 100%)',
                                padding: '24px',
                                borderRadius: '16px',
                                color: 'white',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                border: '1px solid #334155'
                            }}>
                                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌍</div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Pandaigdigang Saklaw</h4>
                                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                                    Ang populasyon ng mundo ay umabot sa 8 bilyong tao noong 2022, na may iba-ibang rate ng paglaki sa iba't ibang rehiyon.
                                </p>
                            </div>
                            
                            <div style={{
                                background: 'linear-gradient(135deg, #000000ff 0%, #dc2626 100%)',
                                padding: '24px',
                                borderRadius: '16px',
                                color: 'white',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                border: '1px solid #334155'
                            }}>
                                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚖️</div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Carrying Capacity</h4>
                                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                                    Ang maximum na populasyong maaaring suportahan ng isang kapaligiran nang walang hanggan.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            
            case 'causes':
                return (
                    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                        <h3 style={{ color: '#f87171', marginBottom: '20px', fontSize: '24px' }}>Mga Pangunahing Sanhi</h3>
                        
                        {[
                            { icon: '📈', title: 'Mataas na Birth Rates', desc: 'Kultural na preference para sa malalaking pamilya, kakulangan ng family planning education, at limitadong access sa contraceptives.' },
                            { icon: '💊', title: 'Pag-unlad ng Medisina', desc: 'Ang pagbuti ng healthcare at medisina ay malaki ang naitulong sa pagbaba ng mortality rates habang mataas pa rin ang birth rates sa ibang lugar.' },
                            { icon: '🏫', title: 'Limitadong Edukasyon', desc: 'Mas mababang antas ng edukasyon, lalo na sa mga babae, ay may koneksyon sa mas mataas na fertility rates at mas kaunting kamalayan sa family planning.' },
                            { icon: '🏛️', title: 'Mga Patakaran ng Gobyerno', desc: 'Ang ibang mga patakaran ay hindi sinasadyang naghihikayat sa paglaki ng populasyon sa pamamagitan ng incentives o kakulangan ng family planning programs.' },
                            { icon: '🌾', title: 'Mga Salik sa Ekonomiya', desc: 'Sa mga agricultural na lipunan, ang mga anak ay madalas na tinitingnan bilang economic assets at sources ng old-age security.' }
                        ].map((cause, index) => (
                            <div key={index} style={{
                                backgroundColor: '#1e293b',
                                padding: '20px',
                                marginBottom: '16px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                border: '1px solid #334155',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                                e.currentTarget.style.borderColor = '#f87171';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                                e.currentTarget.style.borderColor = '#334155';
                            }}>
                                <div style={{ fontSize: '32px', minWidth: '40px' }}>{cause.icon}</div>
                                <div>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '18px' }}>{cause.title}</h4>
                                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>{cause.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            
            case 'effects':
                return (
                    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                        <h3 style={{ color: '#fb923c', marginBottom: '20px', fontSize: '24px' }}>Mga Epekto sa Kapaligiran at Lipunan</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                padding: '24px',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid #eab308',
                                boxShadow: '0 8px 32px rgba(234, 179, 8, 0.1)'
                            }}>
                                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', opacity: 0.1 }}>🌳</div>
                                <h4 style={{ margin: '0 0 12px 0', color: '#eab308', fontSize: '18px', fontWeight: 'bold' }}>Epekto sa Kapaligiran</h4>
                                <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
                                    <li>Deforestation at pagkasira ng tahanan ng mga hayop</li>
                                    <li>Kakulangan at polusyon ng tubig</li>
                                    <li>Pagkasama ng kalidad ng hangin</li>
                                    <li>Soil erosion at pagkasira ng lupa</li>
                                    <li>Pagbilis ng climate change</li>
                                </ul>
                            </div>
                            
                            <div style={{
                                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                padding: '24px',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid #ec4899',
                                boxShadow: '0 8px 32px rgba(236, 72, 153, 0.1)'
                            }}>
                                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', opacity: 0.1 }}>🏘️</div>
                                <h4 style={{ margin: '0 0 12px 0', color: '#ec4899', fontSize: '18px', fontWeight: 'bold' }}>Mga Bunga sa Lipunan</h4>
                                <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
                                    <li>Siksikan sa mga urban areas</li>
                                    <li>Pagkakauntog ng healthcare systems</li>
                                    <li>Kompetisyon para sa trabaho at resources</li>
                                    <li>Overload ng educational system</li>
                                    <li>Pagtaas ng kahirapan at inequality</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style={{
                            marginTop: '24px',
                            padding: '20px',
                            backgroundColor: '#1e293b',
                            borderRadius: '12px',
                            borderLeft: '4px solid #ef4444',
                            border: '1px solid #334155'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', color: '#f87171', fontSize: '16px' }}>⚠️ Kritikal na Babala</h4>
                            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>
                                Kung walang tamang pagpaplano at sustainable na mga gawi, ang sobrang populasyon ay maaaring magdulot ng 
                                hindi na maibabalik na pagkasira ng kapaligiran at hindi matatag na lipunan na makakaapekto sa susunod na mga henerasyon.
                            </p>
                        </div>
                    </div>
                );
            
            case 'solutions':
                return (
                    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                        <h3 style={{ color: '#34d399', marginBottom: '20px', fontSize: '24px' }}>Mga Sustainable na Solusyon</h3>
                        
                        <div style={{ marginBottom: '32px' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '20px'
                            }}>
                                {[
                                    { icon: '📚', title: 'Edukasyon', color: '#60a5fa', items: ['Komprehensibong sex education', 'Mga programa sa edukasyon ng mga babae', 'Mga kampanya para sa kamalayan'] },
                                    { icon: '🏥', title: 'Healthcare', color: '#f87171', items: ['Mga serbisyo sa family planning', 'Accessible na contraceptives', 'Mga programa sa maternal health'] },
                                    { icon: '🌱', title: 'Sustainability', color: '#34d399', items: ['Paggamit ng renewable energy', 'Sustainable na agriculture', 'Green urban planning'] },
                                    { icon: '🏛️', title: 'Patakaran', color: '#a78bfa', items: ['Mga population policies', 'Resource management', 'Mga plano sa urban development'] }
                                ].map((solution, index) => (
                                    <div key={index} style={{
                                        backgroundColor: '#1e293b',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                        border: `2px solid ${solution.color}40`,
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                                        e.currentTarget.style.borderColor = solution.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                                        e.currentTarget.style.borderColor = `${solution.color}40`;
                                    }}>
                                        <div style={{ fontSize: '36px', marginBottom: '12px' }}>{solution.icon}</div>
                                        <h4 style={{ margin: '0 0 16px 0', color: solution.color, fontSize: '18px', fontWeight: 'bold' }}>{solution.title}</h4>
                                        <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
                                            {solution.items.map((item, i) => (
                                                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                            padding: '24px',
                            borderRadius: '16px',
                            textAlign: 'center',
                            border: '1px solid #34d399',
                            boxShadow: '0 8px 32px rgba(52, 211, 153, 0.1)'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌟</div>
                            <h4 style={{ margin: '0 0 8px 0', color: '#34d399', fontSize: '20px' }}>Kailangan ng Sama-samang Aksyon</h4>
                            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '1.5' }}>
                                Ang pagtugon sa sobrang populasyon ay nangangailangan ng coordinated na efforts mula sa mga gobyerno, komunidad, 
                                at mga indibidwal na nagtutulungang tungo sa sustainable na paglaki ng populasyon.
                            </p>
                        </div>
                    </div>
                );
            
            case 'resources':
                return (
                    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                        <h3 style={{ color: '#a78bfa', marginBottom: '20px', fontSize: '24px' }}>Mga Karagdagang Mapagkukunan</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            {[
                                { title: 'United Nations Population Division', desc: 'Opisyal na statistics at projections', link: '#', icon: '🌐' },
                                { title: 'World Bank Population Data', desc: 'Demographic at economic indicators', link: '#', icon: '📊' },
                                { title: 'Population Reference Bureau', desc: 'Research at data analysis', link: '#', icon: '🔍' },
                                { title: 'Our World in Data', desc: 'Interactive charts at visualizations', link: '#', icon: '📈' }
                            ].map((resource, index) => (
                                <div key={index} style={{
                                    backgroundColor: '#1e293b',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                    border: '1px solid #334155',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,139,250,0.3)';
                                    e.currentTarget.style.borderColor = '#a78bfa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                                    e.currentTarget.style.borderColor = '#334155';
                                }}>
                                    <div style={{ fontSize: '24px', marginBottom: '12px' }}>{resource.icon}</div>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '16px' }}>{resource.title}</h4>
                                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px' }}>{resource.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 'faq':
                return (
                    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                        <h3 style={{ color: '#f87171', marginBottom: '20px', fontSize: '24px' }}>Mga Madalas na Tanong</h3>
                        
                        <div>
                            {faqData.map((faq, index) => (
                                <div key={index} style={{
                                    backgroundColor: '#1e293b',
                                    marginBottom: '12px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    border: '1px solid #334155',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div 
                                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                        style={{
                                            padding: '20px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            backgroundColor: expandedFAQ === index ? '#0f172a' : '#1e293b',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (expandedFAQ !== index) {
                                                e.currentTarget.style.backgroundColor = '#334155';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (expandedFAQ !== index) {
                                                e.currentTarget.style.backgroundColor = '#1e293b';
                                            }
                                        }}
                                    >
                                        <h4 style={{ 
                                            margin: 0, 
                                            color: expandedFAQ === index ? '#f87171' : '#f8fafc', 
                                            fontSize: '16px',
                                            fontWeight: '600'
                                        }}>
                                            {faq.question}
                                        </h4>
                                        <span style={{ 
                                            fontSize: '18px', 
                                            color: expandedFAQ === index ? '#f87171' : '#cbd5e1',
                                            transform: expandedFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}>
                                            +
                                        </span>
                                    </div>
                                    {expandedFAQ === index && (
                                        <div style={{
                                            padding: '0 20px 20px 20px',
                                            backgroundColor: '#0f172a',
                                            animation: 'expandAnswer 0.3s ease-out'
                                        }}>
                                            <p style={{ 
                                                margin: 0, 
                                                color: '#cbd5e1', 
                                                fontSize: '14px', 
                                                lineHeight: '1.6',
                                                paddingTop: '8px',
                                                borderTop: '1px solid #334155'
                                            }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes expandAnswer {
                        from { opacity: 0; maxHeight: 0; }
                        to { opacity: 1; maxHeight: 200px; }
                    }
                    .help-container::-webkit-scrollbar {
                        width: 8px;
                    }
                    .help-container::-webkit-scrollbar-track {
                        background: #1e293b;
                        border-radius: 4px;
                    }
                    .help-container::-webkit-scrollbar-thumb {
                        background: #475569;
                        border-radius: 4px;
                    }
                    .help-container::-webkit-scrollbar-thumb:hover {
                        background: #64748b;
                    }
                `}
            </style>
            
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
                padding: '20px'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    backgroundColor: '#0f172a',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                    border: '1px solid #1e293b'
                }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                        padding: '32px',
                        textAlign: 'center',
                        color: 'white',
                        borderBottom: '1px solid #334155'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
                        <h1 style={{ 
                            margin: '0 0 8px 0', 
                            fontSize: '36px', 
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #60a5fa, #34d399)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Gabay sa Sobrang Populasyon
                        </h1>
                        <p style={{ margin: 0, fontSize: '18px', opacity: 0.8, color: '#cbd5e1' }}>
                            Pag-unawa sa mga hamon at solusyon para sa sustainable na paglaki ng populasyon
                        </p>
                    </div>

                    {/* Navigation */}
                    <div style={{
                        backgroundColor: '#1e293b',
                        padding: '20px 32px',
                        borderBottom: '1px solid #334155',
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {Object.entries(sections).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: activeSection === key ? '#60a5fa' : 'transparent',
                                    color: activeSection === key ? '#0f172a' : '#cbd5e1',
                                    border: activeSection === key ? 'none' : '2px solid #334155',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeSection !== key) {
                                        e.target.style.backgroundColor = '#334155';
                                        e.target.style.borderColor = '#60a5fa';
                                        e.target.style.color = '#60a5fa';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeSection !== key) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.borderColor = '#334155';
                                        e.target.style.color = '#cbd5e1';
                                    }
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div 
                        className="help-container"
                        style={{
                            padding: '32px',
                            minHeight: '600px',
                            backgroundColor: '#0f172a',
                            overflow: 'auto'
                        }}
                    >
                        {renderContent()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;