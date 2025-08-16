import { useState } from 'react';
import helpstyle from '../styles/help.module.scss';

const VisualCard = ({ image, title, description }) => {
    return (
        <div className={helpstyle.visualCard}>
            <div className={helpstyle.visualImageContainer}>
                <img 
                    src={image} 
                    alt={title} 
                    className={helpstyle.visualImage}
                />
            </div>
            <div className={helpstyle.visualText}>
                <h4 className={helpstyle.visualTitle}>{title}</h4>
                <p className={helpstyle.visualDescription}>{description}</p>
            </div>
        </div>
    );
};

const Help = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const sections = {
        overview: 'Pangkalahatang-ideya',
        causes: 'Sanhi',
        effects: 'Epekto',
        solutions: 'Solusyon',
        resources: 'Mapagkukunan',
        faq: 'Mga Madalas na Tanong',
        visual: 'Gabay Biswal'
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
                    <div className={helpstyle.overview}>
                        <h3 className={helpstyle.sectionTitle}>Pag-unawa sa Sobrang Populasyon</h3>
                        <div className={helpstyle.highlightCard}>
                            <p>
                                Ang sobrang populasyon ay nangyayari kapag ang populasyon ay lumampas sa carrying capacity ng kapaligiran, 
                                na nagreresulta sa pagkakasubos ng resources, pagkasira ng kapaligiran, at pagbaba ng kalidad ng buhay.
                            </p>
                        </div>
                        
                        <div className={helpstyle.cardGrid}>
                            <a href="https://tl.council.science/blog/world-population-day-sustainable-population-growth-for-a-sustainable-future/" target='_blank'>
                                <div className={`${helpstyle.featureCard} ${helpstyle.purpleGradient}`}>
                                    <div className={helpstyle.cardIcon}>🌍</div>
                                    <h4 className={helpstyle.cardTitle}>Pandaigdigang Saklaw</h4>
                                    <p className={helpstyle.cardText}>
                                        Ang populasyon ng mundo ay umabot sa 8 bilyong tao noong 2022, na may iba-ibang rate ng paglaki sa iba't ibang rehiyon.
                                    </p>
                                </div>
                            </a>
                            
                            <div className={`${helpstyle.featureCard} ${helpstyle.redGradient}`}>
                                <div className={helpstyle.cardIcon}>⚖️</div>
                                <h4 className={helpstyle.cardTitle}>Carrying Capacity</h4>
                                <p className={helpstyle.cardText}>
                                    Ang maximum na populasyong maaaring suportahan ng isang kapaligiran nang walang hanggan.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            
            case 'causes':
                return (
                    <div className={helpstyle.causes}>
                        <h3 className={helpstyle.sectionTitle}>Mga Pangunahing Sanhi</h3>
                        
                        {[
                            { icon: '📈', title: 'Mataas na Birth Rates', desc: 'Kultural na preference para sa malalaking pamilya, kakulangan ng family planning education, at limitadong access sa contraceptives.' },
                            { icon: '💊', title: 'Pag-unlad ng Medisina', desc: 'Ang pagbuti ng healthcare at medisina ay malaki ang naitulong sa pagbaba ng mortality rates habang mataas pa rin ang birth rates sa ibang lugar.' },
                            { icon: '🏫', title: 'Limitadong Edukasyon', desc: 'Mas mababang antas ng edukasyon, lalo na sa mga babae, ay may koneksyon sa mas mataas na fertility rates at mas kaunting kamalayan sa family planning.' },
                            { icon: '🏛️', title: 'Mga Patakaran ng Gobyerno', desc: 'Ang ibang mga patakaran ay hindi sinasadyang naghihikayat sa paglaki ng populasyon sa pamamagitan ng incentives o kakulangan ng family planning programs.' },
                            { icon: '🌾', title: 'Mga Salik sa Ekonomiya', desc: 'Sa mga agricultural na lipunan, ang mga anak ay madalas na tinitingnan bilang economic assets at sources ng old-age security.' }
                        ].map((cause, index) => (
                            <div 
                                key={index} 
                                className={helpstyle.causeCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                                    e.currentTarget.style.borderColor = '#f87171';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                                    e.currentTarget.style.borderColor = '#334155';
                                }}
                            >
                                <div className={helpstyle.causeIcon}>{cause.icon}</div>
                                <div>
                                    <h4 className={helpstyle.causeTitle}>{cause.title}</h4>
                                    <p className={helpstyle.causeDescription}>{cause.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            
            case 'effects':
                return (
                    <div className={helpstyle.effects}>
                        <h3 className={helpstyle.sectionTitle}>Mga Epekto sa Kapaligiran at Lipunan</h3>
                        
                        <div className={helpstyle.effectsGrid}>
                            <div className={`${helpstyle.effectCard} ${helpstyle.yellowBorder}`}>
                                <div className={helpstyle.effectBgIcon}>🌳</div>
                                <h4 className={helpstyle.effectCardTitle}>Epekto sa Kapaligiran</h4>
                                <ul className={helpstyle.effectList}>
                                    <li>Deforestation at pagkasira ng tahanan ng mga hayop</li>
                                    <li>Kakulangan at polusyon ng tubig</li>
                                    <li>Pagkasama ng kalidad ng hangin</li>
                                    <li>Soil erosion at pagkasira ng lupa</li>
                                    <li>Pagbilis ng climate change</li>
                                </ul>
                            </div>
                            
                            <div className={`${helpstyle.effectCard} ${helpstyle.pinkBorder}`}>
                                <div className={helpstyle.effectBgIcon}>🏘️</div>
                                <h4 className={helpstyle.effectCardTitle}>Mga Bunga sa Lipunan</h4>
                                <ul className={helpstyle.effectList}>
                                    <li>Siksikan sa mga urban areas</li>
                                    <li>Pagkakauntog ng healthcare systems</li>
                                    <li>Kompetisyon para sa trabaho at resources</li>
                                    <li>Overload ng educational system</li>
                                    <li>Pagtaas ng kahirapan at inequality</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={helpstyle.warningCard}>
                            <h4>⚠️ Kritikal na Babala</h4>
                            <p>
                                Kung walang tamang pagpaplano at sustainable na mga gawi, ang sobrang populasyon ay maaaring magdulot ng 
                                hindi na maibabalik na pagkasira ng kapaligiran at hindi matatag na lipunan na makakaapekto sa susunod na mga henerasyon.
                            </p>
                        </div>
                    </div>
                );
            
            case 'solutions':
                return (
                    <div className={helpstyle.solutions}>
                        <h3 className={helpstyle.sectionTitle}>Mga Sustainable na Solusyon</h3>
                        
                        <div className={helpstyle.solutionsGrid}>
                            {[
                                { icon: '📚', title: 'Edukasyon', color: 'blue', items: ['Komprehensibong sex education', 'Mga programa sa edukasyon ng mga babae', 'Mga kampanya para sa kamalayan'] },
                                { icon: '🏥', title: 'Healthcare', color: 'red', items: ['Mga serbisyo sa family planning', 'Accessible na contraceptives', 'Mga programa sa maternal health'] },
                                { icon: '🌱', title: 'Sustainability', color: 'green', items: ['Paggamit ng renewable energy', 'Sustainable na agriculture', 'Green urban planning'] },
                                { icon: '🏛️', title: 'Patakaran', color: 'purple', items: ['Mga population policies', 'Resource management', 'Mga plano sa urban development'] }
                            ].map((solution, index) => (
                                <div 
                                    key={index} 
                                    className={`${helpstyle.solutionCard} ${helpstyle[solution.color + 'Border']}`}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                                    }}
                                >
                                    <div className={helpstyle.solutionIcon}>{solution.icon}</div>
                                    <h4 className={helpstyle.solutionTitle}>{solution.title}</h4>
                                    <ul className={helpstyle.solutionList}>
                                        {solution.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                        <div className={helpstyle.callToAction}>
                            <div className={helpstyle.actionIcon}>🌟</div>
                            <h4>Kailangan ng Sama-samang Aksyon</h4>
                            <p>
                                Ang pagtugon sa sobrang populasyon ay nangangailangan ng coordinated na efforts mula sa mga gobyerno, komunidad, 
                                at mga indibidwal na nagtutulungang tungo sa sustainable na paglaki ng populasyon.
                            </p>
                        </div>
                    </div>
                );
            
            case 'resources':
                return (
                    <div className={helpstyle.resources}>
                        <h3 className={helpstyle.sectionTitle}>Mga Karagdagang Mapagkukunan</h3>
                        
                        <div className={helpstyle.resourcesGrid}>
                            {[
                                { title: 'United Nations Population Division', desc: 'Opisyal na statistics at projections', link: '#', icon: '🌐' },
                                { title: 'World Bank Population Data', desc: 'Demographic at economic indicators', link: '#', icon: '📊' },
                                { title: 'Population Reference Bureau', desc: 'Research at data analysis', link: '#', icon: '🔍' },
                                { title: 'Our World in Data', desc: 'Interactive charts at visualizations', link: '#', icon: '📈' }
                            ].map((resource, index) => (
                                <div 
                                    key={index} 
                                    className={helpstyle.resourceCard}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,139,250,0.3)';
                                        e.currentTarget.style.borderColor = '#a78bfa';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                                        e.currentTarget.style.borderColor = '#334155';
                                    }}
                                >
                                    <div className={helpstyle.resourceIcon}>{resource.icon}</div>
                                    <h4 className={helpstyle.resourceTitle}>{resource.title}</h4>
                                    <p className={helpstyle.resourceDescription}>{resource.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 'faq':
                return (
                    <div className={helpstyle.faq}>
                        <h3 className={helpstyle.sectionTitle}>Mga Madalas na Tanong</h3>
                        
                        <div className={helpstyle.faqContainer}>
                            {faqData.map((faq, index) => (
                                <div 
                                    key={index} 
                                    className={helpstyle.faqItem}
                                >
                                    <div 
                                        className={`${helpstyle.faqQuestion} ${expandedFAQ === index ? helpstyle.activeQuestion : ''}`}
                                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                    >
                                        <h4>{faq.question}</h4>
                                        <span className={`${helpstyle.toggleIcon} ${expandedFAQ === index ? helpstyle.activeIcon : ''}`}>
                                            +
                                        </span>
                                    </div>
                                    {expandedFAQ === index && (
                                        <div className={helpstyle.faqAnswer}>
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'visual':
                return (
                    <div className={helpstyle.visualGuide}>
                        <h3 className={helpstyle.sectionTitle}>Gabay Biswal sa Sobrang Populasyon</h3>
                        <p className={helpstyle.sectionSubtitle}>Mga pangunahing konsepto sa pamamagitan ng mga larawan at paliwanag</p>
                        
                        <div className={helpstyle.visualGrid}>
                            <VisualCard
                                image="/images/population-density.jpg"
                                title="Densidad ng Populasyon"
                                description="Ang pagdami ng tao sa urban areas ay nagdudulot ng matinding pagsisikip at pressure sa mga resources at imprastraktura."
                            />
                            
                            <VisualCard
                                image="/images/resource-depletion.jpg"
                                title="Pagkaubos ng Resources"
                                description="Ang sobrang populasyon ay humahantong sa mabilis na pagkaubos ng likas na yaman tulad ng tubig, lupa, at enerhiya."
                            />
                            
                            <VisualCard
                                image="/images/environment-impact.jpg"
                                title="Epekto sa Kapaligiran"
                                description="Ang deforestation, polusyon, at pagkawala ng biodiversity ay direktang epekto ng sobrang populasyon."
                            />
                            
                            <VisualCard
                                image="/images/urban-slums.jpg"
                                title="Urbanisasyon at Kahirapan"
                                description="Ang mabilis na urbanisasyon ay nagreresulta sa paglaki ng mga informal settlements at slum areas."
                            />
                            
                            <VisualCard
                                image="/images/education-solution.jpg"
                                title="Edukasyon Bilang Solusyon"
                                description="Ang pagpapabuti ng access sa edukasyon, lalo na para sa kababaihan, ay isa sa pinakaepektibong paraan upang mapabagal ang paglaki ng populasyon."
                            />

                            <VisualCard
                                image="/images/family-planning.jpg"
                                title="Family Planning"
                                description="Ang access sa modernong family planning methods ay nakakatulong sa mga pamilya na planuhin ang kanilang kinabukasan at makontrol ang populasyon."
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={helpstyle.container}>
            <div className={helpstyle.mainContent}>
                <div className={helpstyle.header}>
                    <div className={helpstyle.headerIcon}>🌍</div>
                    <h1 className={helpstyle.headerTitle}>Gabay sa Sobrang Populasyon</h1>
                    <p className={helpstyle.headerSubtitle}>
                        Pag-unawa sa mga hamon at solusyon para sa sustainable na paglaki ng populasyon
                    </p>
                </div>

                <div className={helpstyle.navigation}>
                    {Object.entries(sections).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveSection(key)}
                            className={`${helpstyle.navButton} ${activeSection === key ? helpstyle.activeNavButton : ''}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className={helpstyle.content}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Help;