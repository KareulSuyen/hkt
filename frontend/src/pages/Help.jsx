import { useState } from 'react';
import helpstyle from '../styles/help.module.scss';
import { FaEarthAsia } from "react-icons/fa6";
import { FaPeopleCarry, FaRecycle, FaGlobeAsia, FaHospital, FaHandHoldingWater } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { ImEarth } from "react-icons/im";
import { BsBuildings, BsBuildingFillExclamation } from "react-icons/bs";
import { CiMap } from "react-icons/ci";
import { TbGeometry } from "react-icons/tb";
import { MdOutlineQueryStats } from "react-icons/md";
import { GiPlantRoots, GiJourney, GiPineTree } from "react-icons/gi";
import { BiSolidError } from "react-icons/bi";
import { SiGoogleearthengine } from "react-icons/si";
import { LuWeight } from "react-icons/lu";


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

                        <div className={helpstyle.conceptSection}>
                            <h4 className={helpstyle.subsectionTitle}>Mga Pangunahing Konsepto</h4>
                            <div className={helpstyle.conceptGrid}>
                                <div className={helpstyle.conceptCard}>
                                    <div className={helpstyle.conceptIcon}><FaPeopleCarry size={30} /></div>
                                    <h5>Carrying Capacity</h5>
                                    <p>Ang maximum na bilang ng mga tao na maaaring suportahan ng isang lugar nang walang hanggan, batay sa available na resources at technology.</p>
                                </div>
                                <div className={helpstyle.conceptCard}>
                                    <div className={helpstyle.conceptIcon}><FcStatistics size={30} /></div>
                                    <h5>Population Density</h5>
                                    <p>Ang bilang ng mga tao bawat square kilometer. Ang mataas na density ay maaaring magdulot ng mga problema kahit hindi pa naabot ang carrying capacity.</p>
                                </div>
                                <div className={helpstyle.conceptCard}>
                                    <div className={helpstyle.conceptIcon}><FaScaleUnbalanced size={30} /></div>
                                    <h5>Resource Distribution</h5>
                                    <p>Hindi pantay na pamamahagi ng mga resources ang madalas na dahilan ng mga problema sa populasyon, hindi lamang ang kakulangan nito.</p>
                                </div>
                                <div className={helpstyle.conceptCard}>
                                    <div className={helpstyle.conceptIcon}><FaRecycle size={30} /></div>
                                    <h5>Demographic Transition</h5>
                                    <p>Ang proseso kung saan bumababa ang birth at death rates habang umuunlad ang isang bansa.</p>
                                </div>
                            </div>
                        </div>

                        <div className={helpstyle.pyramidSection}>
                            <div className={helpstyle.pyramidContainer}>
                                <div className={helpstyle.pyramidContent}>
                                    <div className={helpstyle.pyramidText}>
                                        <h5>Population Pyramid</h5>
                                        <p>Ang hugis ng population pyramid ay nagpapakita ng age at gender distribution ng populasyon:</p>
                                        <ul>
                                            <li><strong>Pyramid Shape:</strong> Mataas na birth rate, mabilis na population growth</li>
                                            <li><strong>Bell Shape:</strong> Stable na population, developed countries</li>
                                            <li><strong>Inverted Shape:</strong> Aging population, mababang birth rate</li>
                                        </ul>
                                    </div>
                                    <div className={helpstyle.pyramidVisual}>
                                        <div className={helpstyle.pyramidDemo}>
                                            <div className={helpstyle.pyramidLevel} style={{width: '98%'}}>0-14 years</div>
                                            <div className={helpstyle.pyramidLevel} style={{width: '80%'}}>15-29 years</div>
                                            <div className={helpstyle.pyramidLevel} style={{width: '60%'}}>30-44 years</div>
                                            <div className={helpstyle.pyramidLevel} style={{width: '40%'}}>45-59 years</div>
                                            <div className={helpstyle.pyramidLevel} style={{width: '20%'}}>60+ years</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={helpstyle.currentSituationSection}>
                            <h4 className={helpstyle.subsectionTitle}>Kasalukuyang Kalagayan ng Pandaigdigang Populasyon</h4>
                            
                            
                            <div className={helpstyle.situationText}>
                                <p>
                                    Bagamat bumabagal na ang pandaigdigang population growth, ang mga lokal na problema ng sobrang populasyon 
                                    ay patuloy pa rin sa mga partikular na rehiyon. Ang mga urban areas sa mga developing countries ay 
                                    nakakaranas ng mabilis na paglaki na lampas sa kanilang kapasidad na magbigay ng sapat na infrastructure 
                                    at services.
                                </p>
                            </div>
                        </div>

                        <div className={helpstyle.theoriesSection}>
                            <h4 className={helpstyle.subsectionTitle}>Mga Kilalang Teorya tungkol sa Populasyon</h4>
                            <div className={helpstyle.theoriesGrid}>
                                <div className={helpstyle.theoryCard}>
                                    <div className={helpstyle.theoryHeader}>
                                        <div className={helpstyle.theoryIcon}><TbGeometry size={30} /> </div>
                                        <h5>Malthusian Theory</h5>
                                        <span className={helpstyle.theoryYear}>(1798)</span>
                                    </div>
                                    <p>Ni Thomas Malthus - Ang populasyon ay tumutubo nang geometric habang ang pagkain ay arithmetic lamang, na hahantong sa kagutuman at digmaan.</p>
                                </div>
                                <div className={helpstyle.theoryCard}>
                                    <div className={helpstyle.theoryHeader}>
                                        <div className={helpstyle.theoryIcon}><MdOutlineQueryStats size={30} /> </div>
                                        <h5>Demographic Transition Model</h5>
                                        <span className={helpstyle.theoryYear}>(1929)</span>
                                    </div>
                                    <p>Ni Warren Thompson - Ang mga bansa ay dumadaan sa apat na yugto: mataas na birth/death rates → mababang death rates → mababang birth rates → stable.</p>
                                </div>
                                <div className={helpstyle.theoryCard}>
                                    <div className={helpstyle.theoryHeader}>
                                        <div className={helpstyle.theoryIcon}><GiPlantRoots size={30} /> </div>
                                        <h5>Neo-Malthusian Theory</h5>
                                        <span className={helpstyle.theoryYear}>(1960s)</span>
                                    </div>
                                    <p>Modernong bersyon na tumutukoy sa environmental limits at sustainable development sa konteksto ng population growth.</p>
                                </div>
                            </div>
                        </div>

                        <div className={helpstyle.cardGrid}>
                            <a href="https://tl.council.science/blog/world-population-day-sustainable-population-growth-for-a-sustainable-future/" target='_blank'>
                                <div className={`${helpstyle.featureCard} ${helpstyle.purpleGradient}`}>
                                    <div className={helpstyle.cardIcon}><SiGoogleearthengine size={30} /> </div>
                                    <h4 className={helpstyle.cardTitle}>Pandaigdigang Saklaw</h4>
                                    <p className={helpstyle.cardText}>
                                        Ang populasyon ng mundo ay umabot sa 8 bilyong tao noong 2022, na may iba-ibang rate ng paglaki sa iba't ibang rehiyon.
                                    </p>
                                </div>
                            </a>
                            
                            <div className={`${helpstyle.featureCard} ${helpstyle.redGradient}`}>
                                <div className={helpstyle.cardIcon}><LuWeight size={30} /> </div>
                                <h4 className={helpstyle.cardTitle}>Carrying Capacity</h4>
                                <p className={helpstyle.cardText}>
                                    Ang maximum na populasyong maaaring suportahan ng isang kapaligiran nang walang hanggan.
                                </p>
                            </div>
                        </div>

                        <div className={helpstyle.affectedRegionsSection}>
                            <h4 className={helpstyle.subsectionTitle}><CiMap size={30} /> Mga Rehiyong Pinaka-naapektuhan</h4>
                            <div className={helpstyle.regionsContainer}>
                                <div className={helpstyle.regionItem}>
                                    <span className={helpstyle.regionFlag}><FaGlobeAsia size={30} /></span>
                                    <div className={helpstyle.regionInfo}>
                                        <strong>South Asia</strong>
                                        <p>Kasama ang India at Bangladesh, na may pinakamataas na population density sa mundo</p>
                                        <div className={helpstyle.regionStats}>
                                            <span>Population: 2B+</span>
                                            <span>Density: 303/km²</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={helpstyle.regionItem}>
                                    <span className={helpstyle.regionFlag}><ImEarth size={30} /></span>
                                    <div className={helpstyle.regionInfo}>
                                        <strong>Sub-Saharan Africa</strong>
                                        <p>Rehiyon na may pinakamabilis na population growth rate sa kasalukuyan</p>
                                        <div className={helpstyle.regionStats}>
                                            <span>Growth Rate: 2.7%</span>
                                            <span>Projected: 2.1B by 2050</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={helpstyle.regionItem}>
                                    <span className={helpstyle.regionFlag}><BsBuildings size={30} /></span>
                                    <div className={helpstyle.regionInfo}>
                                        <strong>Mga Megacities</strong>
                                        <p>Urban areas tulad ng Manila, Lagos, at Dhaka na may mahigit 10 milyong residente</p>
                                        <div className={helpstyle.regionStats}>
                                            <span>33 Megacities worldwide</span>
                                            <span>Tokyo: 37.4M largest</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={helpstyle.indicatorsSection}>
                            <h4 className={helpstyle.subsectionTitle}><BiSolidError size={30} /> Mga Palatandaan ng Sobrang Populasyon</h4>
                            <div className={helpstyle.indicatorsGrid}>
                                <div className={helpstyle.indicatorCard}>
                                    <div className={helpstyle.indicatorIcon}><BsBuildingFillExclamation size={30} /> </div>
                                    <h5>Urban Overcrowding</h5>
                                    <ul>
                                        <li>Mga slum areas na lumalaki</li>
                                        <li>Traffic congestion</li>
                                        <li>Insufficient housing</li>
                                    </ul>
                                </div>
                                <div className={helpstyle.indicatorCard}>
                                    <div className={helpstyle.indicatorIcon}><FaHandHoldingWater size={30}/> </div>
                                    <h5>Resource Scarcity</h5>
                                    <ul>
                                        <li>Water shortage</li>
                                        <li>Food insecurity</li>
                                        <li>Energy crisis</li>
                                    </ul>
                                </div>
                                <div className={helpstyle.indicatorCard}>
                                    <div className={helpstyle.indicatorIcon}><FaHospital size={30} /></div>
                                    <h5>Service Strain</h5>
                                    <ul>
                                        <li>Overcrowded hospitals</li>
                                        <li>Educational system overload</li>
                                        <li>Inadequate public transport</li>
                                    </ul>
                                </div>
                                <div className={helpstyle.indicatorCard}>
                                    <div className={helpstyle.indicatorIcon}><GiPineTree size={30} /></div>
                                    <h5>Environmental Impact</h5>
                                    <ul>
                                        <li>Deforestation</li>
                                        <li>Air at water pollution</li>
                                        <li>Loss of biodiversity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Bakit Mahalaga */}
                        <div className={helpstyle.importanceSection}>
                            <h4 className={helpstyle.subsectionTitle}>❓ Bakit Mahalaga ang Pag-unawa sa Sobrang Populasyon?</h4>
                            <div className={helpstyle.importanceGrid}>
                                <div className={helpstyle.importanceItem}>
                                    <div className={helpstyle.importanceIcon}>🔮</div>
                                    <h5>Para sa Hinaharap</h5>
                                    <p>Ang mga desisyon ngayon ay makakaapekto sa sustainability para sa susunod na mga henerasyon</p>
                                </div>
                                <div className={helpstyle.importanceItem}>
                                    <div className={helpstyle.importanceIcon}>🌿</div>
                                    <h5>Environmental Protection</h5>
                                    <p>Pag-unawa sa relationship sa pagitan ng population at environmental degradation</p>
                                </div>
                                <div className={helpstyle.importanceItem}>
                                    <div className={helpstyle.importanceIcon}>🤝</div>
                                    <h5>Social Justice</h5>
                                    <p>Pantay na access sa resources at opportunities para sa lahat</p>
                                </div>
                                <div className={helpstyle.importanceItem}>
                                    <div className={helpstyle.importanceIcon}>💡</div>
                                    <h5>Innovation</h5>
                                    <p>Pag-develop ng mga bagong solusyon para sa sustainable living</p>
                                </div>
                            </div>
                        </div>

                        <div className={helpstyle.mythsSection}>
                            <h4 className={helpstyle.subsectionTitle}>❌ Mga Karaniwang Mali na Pag-unawa</h4>
                            <div className={helpstyle.mythsContainer}>
                                <div className={helpstyle.mythItem}>
                                    <div className={helpstyle.mythHeader}>
                                        <span className={helpstyle.mythIcon}>❌</span>
                                        <strong>Mali:</strong> "Ang mundo ay mauubusan ng pagkain"
                                    </div>
                                    <div className={helpstyle.mythTruth}>
                                        <span className={helpstyle.truthIcon}>✅</span>
                                        <strong>Totoo:</strong> May sapat na pagkain para sa lahat, ngunit hindi pantay ang distribution at maraming nasasayang.
                                    </div>
                                </div>
                                <div className={helpstyle.mythItem}>
                                    <div className={helpstyle.mythHeader}>
                                        <span className={helpstyle.mythIcon}>❌</span>
                                        <strong>Mali:</strong> "Lahat ng bansa ay may sobrang populasyon"
                                    </div>
                                    <div className={helpstyle.mythTruth}>
                                        <span className={helpstyle.truthIcon}>✅</span>
                                        <strong>Totoo:</strong> May mga bansa na aging population at bumababa pa ang birth rates tulad ng Japan at Germany.
                                    </div>
                                </div>
                                <div className={helpstyle.mythItem}>
                                    <div className={helpstyle.mythHeader}>
                                        <span className={helpstyle.mythIcon}>❌</span>
                                        <strong>Mali:</strong> "Technology ay sosolusyon sa lahat"
                                    </div>
                                    <div className={helpstyle.mythTruth}>
                                        <span className={helpstyle.truthIcon}>✅</span>
                                        <strong>Totoo:</strong> Technology ay makakatulong pero kailangan din ng behavioral change at sustainable practices.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced call-to-action */}
                        <div className={helpstyle.overviewCallToAction}>
                            <div className={helpstyle.ctaContent}>
                                <h4><GiJourney /> Start your journey</h4>
                                <p>
                                    Ang pag-unawa sa sobrang populasyon ay hindi lamang tungkol sa mga numero - ito ay tungkol sa 
                                    paglikha ng sustainable na kinabukasan para sa lahat.
                                </p>
                                <div className={helpstyle.nextSteps}>
                                    <div className={helpstyle.nextButtons}>
                                        <button onClick={() => setActiveSection('causes')}>Mga Sanhi →</button>
                                        <button onClick={() => setActiveSection('effects')}>Mga Epekto →</button>
                                        <button onClick={() => setActiveSection('solutions')}>Mga Solusyon →</button>
                                    </div>
                                </div>
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
                                image="/images/population-density.png"
                                title="Densidad ng Populasyon"
                                description="Ang pagdami ng tao sa urban areas ay nagdudulot ng matinding pagsisikip at pressure sa mga resources at imprastraktura."
                            />
                            
                            <VisualCard
                                image="/images/resources-depletion.png"
                                title="Pagkaubos ng Resources"
                                description="Ang sobrang populasyon ay humahantong sa mabilis na pagkaubos ng likas na yaman tulad ng tubig, lupa, at enerhiya."
                            />
                            
                            <VisualCard
                                image="/images/deforestation.png"
                                title="Epekto sa Kapaligiran"
                                description="Ang deforestation, polusyon, at pagkawala ng biodiversity ay direktang epekto ng sobrang populasyon."
                            />
                            
                            <VisualCard
                                image="/images/urbanization.png"
                                title="Urbanisasyon at Kahirapan"
                                description="Ang mabilis na urbanisasyon ay nagreresulta sa paglaki ng mga informal settlements at slum areas."
                            />
                            
                            <VisualCard
                                image="/images/education.jpg"
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
                    <div className={helpstyle.headerIcon}>
                        <FaEarthAsia size={50}/>
                    </div>
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