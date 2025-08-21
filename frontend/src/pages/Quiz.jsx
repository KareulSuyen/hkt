import React, { useState, useEffect } from 'react';
import styles from '../styles/quiz.module.scss';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizQuestions = {
    easy: [
      {
        question: "Ano ang kasalukuyang populasyon ng mundo noong 2024?",
        options: ["7.5 bilyon", "8.1 bilyon", "9.2 bilyon", "6.8 bilyon"],
        correct: 1,
        explanation: "Ang kasalukuyang populasyon ng mundo ay 8.1 bilyon noong 2024 ayon sa UN Population Division."
      },
      {
        question: "Ano ang tawag sa maximum na bilang ng mga tao na maaaring suportahan ng isang lugar?",
        options: ["Population Density", "Carrying Capacity", "Growth Rate", "Birth Rate"],
        correct: 1,
        explanation: "Carrying Capacity ay ang maximum na bilang ng mga tao na maaaring suportahan ng isang kapaligiran nang walang hanggan."
      },
      {
        question: "Alin sa mga sumusunod ang pangunahing sanhi ng sobrang populasyon?",
        options: ["Mataas na birth rates", "Mababang death rates", "Parehong A at B", "Wala sa nabanggit"],
        correct: 2,
        explanation: "Ang sobrang populasyon ay dulot ng kombinasyon ng mataas na birth rates at pagbaba ng death rates dahil sa pag-unlad ng medisina."
      },
      {
        question: "Ano ang kasalukuyang populasyon ng Pilipinas?",
        options: ["98.5 milyon", "112.7 milyon", "125.3 milyon", "89.2 milyon"],
        correct: 1,
        explanation: "Ang kasalukuyang populasyon ng Pilipinas ay 112.7 milyon."
      },
      {
        question: "Alin sa mga rehiyon ang may pinakamabilis na population growth?",
        options: ["Europe", "North America", "Sub-Saharan Africa", "East Asia"],
        correct: 2,
        explanation: "Ang Sub-Saharan Africa ay may pinakamabilis na population growth rate na 2.7% annually."
      }
    ],
    medium: [
      {
        question: "Ano ang Demographic Transition Model?",
        options: [
          "Teorya ni Thomas Malthus", 
          "Model na nagpapaliwanag kung paano nagbabago ang birth at death rates", 
          "Pamamaraan ng population control", 
          "Sistema ng pag-uuri ng mga bansa"
        ],
        correct: 1,
        explanation: "Ang Demographic Transition Model ay nagpapaliwanag kung paano dumadaan ang mga bansa sa apat na yugto ng population change."
      },
      {
        question: "Ano ang median age ng Africa?",
        options: ["32.1 taon", "19.7 taon", "43.1 taon", "25.4 taon"],
        correct: 1,
        explanation: "Ang median age ng Africa ay 19.7 taon, na nagpapakita ng napakahulay na populasyon."
      },
      {
        question: "Ilang megacities ang mayroon sa mundo?",
        options: ["25", "33", "41", "28"],
        correct: 1,
        explanation: "May 33 megacities sa buong mundo - mga lungsod na may mahigit 10 milyong residente."
      },
      {
        question: "Ano ang growth rate ng Asia?",
        options: ["+0.7%", "+2.4%", "-0.1%", "+0.6%"],
        correct: 0,
        explanation: "Ang Asia ay may moderate growth rate na +0.7% annually."
      },
      {
        question: "Ano ang urbanization rate ng Europe?",
        options: ["51%", "82%", "75%", "43%"],
        correct: 2,
        explanation: "Ang Europe ay may 75% urbanization rate, na nagpapakita ng mataas na urban development."
      }
    ],
    hard: [
      {
        question: "Ayon sa Malthusian Theory, paano tumutubo ang populasyon kumpara sa food supply?",
        options: [
          "Arithmetic vs Geometric", 
          "Geometric vs Arithmetic", 
          "Exponential vs Linear", 
          "Linear vs Exponential"
        ],
        correct: 1,
        explanation: "Ayon kay Malthus, ang populasyon ay tumutubo nang geometric habang ang pagkain ay arithmetic lamang."
      },
      {
        question: "Ano ang projected population ng Africa sa 2050?",
        options: ["2.1 bilyon", "2.5 bilyon", "1.8 bilyon", "3.2 bilyon"],
        correct: 1,
        explanation: "Ang projected population ng Africa sa 2050 ay 2.5 bilyon, halos dumoble mula sa kasalukuyan."
      },
      {
        question: "Ano ang CO₂ emissions per capita globally?",
        options: ["3.2 tons/year", "4.8 tons/year", "6.1 tons/year", "5.5 tons/year"],
        correct: 1,
        explanation: "Ang average CO₂ emissions per capita globally ay 4.8 tons per year, na patuloy na tumataas."
      },
      {
        question: "Ano ang deforestation rate sa buong mundo?",
        options: ["8M hectares/year", "10M hectares/year", "15M hectares/year", "12M hectares/year"],
        correct: 1,
        explanation: "Ang global deforestation rate ay 10 million hectares per year, bagamat bumababa na ng 2.8% annually."
      },
      {
        question: "Ano ang slum population sa buong mundo?",
        options: ["900M tao", "1.1B tao", "1.5B tao", "750M tao"],
        correct: 1,
        explanation: "Ang slum population globally ay 1.1 billion people, na tumataas ng 3.2% per year."
      }
    ],
    extreme: [
      {
        question: "Ano ang freshwater availability per person globally?",
        options: ["4,500 m³/person", "6,000 m³/person", "7,200 m³/person", "5,100 m³/person"],
        correct: 1,
        explanation: "Ang freshwater availability ay 6,000 m³ per person, na bumababa ng 1.8% per year."
      },
      {
        question: "Kailan inaasahang mag-peak ang global population?",
        options: ["2070s", "2080s", "2090s", "2100s"],
        correct: 1,
        explanation: "Ang global population ay inaasahang mag-peak sa 2080s sa around 10.8 billion."
      },
      {
        question: "Ano ang traffic congestion index sa average?",
        options: ["115", "127", "134", "142"],
        correct: 1,
        explanation: "Ang average traffic congestion index ay 127, na tumataas ng 4.1% per year."
      },
      {
        question: "Ano ang arable land per capita globally?",
        options: ["0.19 hectares", "0.24 hectares", "0.31 hectares", "0.15 hectares"],
        correct: 0,
        explanation: "Ang arable land per capita ay 0.19 hectares, na bumababa ng 2.1% per year."
      },
      {
        question: "Ano ang progress ng Global Education Access initiative?",
        options: ["68%", "73%", "79%", "65%"],
        correct: 1,
        explanation: "Ang Global Education Access initiative ay may 73% progress sa pagpapalawak ng quality education."
      }
    ]
  };

  const currentQuestions = difficulty ? quizQuestions[difficulty] : [];

  useEffect(() => {
    if (difficulty && !quizCompleted && !showExplanation && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleNextQuestion();
    }
  }, [timeLeft, difficulty, quizCompleted, showExplanation]);

  const startQuiz = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    setTimeLeft(getDifficultyTime(selectedDifficulty));
  };

  const getDifficultyTime = (diff) => {
    const times = { easy: 45, medium: 35, hard: 25, extreme: 15 };
    return times[diff];
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (showExplanation) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (selectedAnswer === currentQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < currentQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setTimeLeft(getDifficultyTime(difficulty));
      } else {
        setQuizCompleted(true);
      }
    } else {
      setShowExplanation(true);
    }
  };

  const restartQuiz = () => {
    setDifficulty(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / currentQuestions.length) * 100;
    if (percentage >= 90) return "Napakagaling! Expert ka sa population studies!";
    if (percentage >= 70) return "Magaling! Mataas ang inyong kaalaman!";
    if (percentage >= 50) return "Hindi masama! May pag-unawa kayo sa topic.";
    return "Kailangan pa ng pag-aaral. Subukan muli!";
  };

  const getDifficultyColor = () => {
    const colors = {
      easy: '#10b981',
      medium: '#f59e0b', 
      hard: '#ef4444',
      extreme: '#8b5cf6'
    };
    return colors[difficulty] || '#6b7280';
  };

  if (!difficulty) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.difficultySelection}>
          <h2 className={styles.title}>Pumili ng Difficulty Level</h2>
          <p className={styles.subtitle}>Subukan ang inyong kaalaman tungkol sa sobrang populasyon</p>
          
          <div className={styles.difficultyGrid}>
            <div 
              className={`${styles.difficultyCard} ${styles.easy}`}
              onClick={() => startQuiz('easy')}
            >
              <div className={styles.difficultyIcon}>🟢</div>
              <h3>Easy</h3>
              <p>Mga madaling konsepto</p>
              <div className={styles.difficultyStats}>
                <span>5 tanong</span>
                <span>45 segundo bawat tanong</span>
              </div>
            </div>

            <div 
              className={`${styles.difficultyCard} ${styles.medium}`}
              onClick={() => startQuiz('medium')}
            >
              <div className={styles.difficultyIcon}>🟡</div>
              <h3>Medium</h3>
              <p>Intermediate na kaalaman</p>
              <div className={styles.difficultyStats}>
                <span>5 tanong</span>
                <span>35 segundo bawat tanong</span>
              </div>
            </div>

            <div 
              className={`${styles.difficultyCard} ${styles.hard}`}
              onClick={() => startQuiz('hard')}
            >
              <div className={styles.difficultyIcon}>🔴</div>
              <h3>Hard</h3>
              <p>Advanced na mga tanong</p>
              <div className={styles.difficultyStats}>
                <span>5 tanong</span>
                <span>25 segundo bawat tanong</span>
              </div>
            </div>

            <div 
              className={`${styles.difficultyCard} ${styles.extreme}`}
              onClick={() => startQuiz('extreme')}
            >
              <div className={styles.difficultyIcon}>🟣</div>
              <h3>Extreme</h3>
              <p>Expert level na challenge</p>
              <div className={styles.difficultyStats}>
                <span>5 tanong</span>
                <span>15 segundo bawat tanong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.resultsContainer}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Quiz Completed!</h2>
            <div 
              className={styles.scoreDisplay}
              style={{ borderColor: getDifficultyColor() }}
            >
              <div className={styles.scoreNumber}>{score}</div>
              <div className={styles.scoreTotal}>/ {currentQuestions.length}</div>
            </div>
            <p className={styles.scorePercentage}>
              {Math.round((score / currentQuestions.length) * 100)}%
            </p>
            <p className={styles.scoreMessage}>{getScoreMessage()}</p>
          </div>

          <div className={styles.reviewSection}>
            <h3>Review ng mga Sagot</h3>
            {currentQuestions.map((question, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.questionNumber}>Tanong {index + 1}</div>
                <h4>{question.question}</h4>
                <div className={styles.answerComparison}>
                  <div className={styles.answerRow}>
                    <span>Inyong sagot:</span>
                    <span className={answers[index] === question.correct ? styles.correct : styles.incorrect}>
                      {question.options[answers[index]] || "Hindi nasagot"}
                    </span>
                  </div>
                  {answers[index] !== question.correct && (
                    <div className={styles.answerRow}>
                      <span>Tamang sagot:</span>
                      <span className={styles.correct}>
                        {question.options[question.correct]}
                      </span>
                    </div>
                  )}
                </div>
                <p className={styles.explanation}>{question.explanation}</p>
              </div>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <button 
              className={styles.restartButton}
              onClick={restartQuiz}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%`,
                backgroundColor: getDifficultyColor()
              }}
            ></div>
          </div>
          <div className={styles.progressText}>
            Tanong {currentQuestion + 1} sa {currentQuestions.length}
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.difficultyBadge} style={{ backgroundColor: getDifficultyColor() }}>
            {difficulty.toUpperCase()}
          </div>
          <div className={styles.scoreDisplay}>Score: {score}</div>
          <div className={`${styles.timer} ${timeLeft <= 10 ? styles.urgent : ''}`}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      <div className={styles.questionContainer}>
        <h2 className={styles.question}>
          {currentQuestions[currentQuestion]?.question}
        </h2>

        <div className={styles.optionsContainer}>
          {currentQuestions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${
                selectedAnswer === index ? styles.selected : ''
              } ${
                showExplanation && index === currentQuestions[currentQuestion].correct 
                  ? styles.correctAnswer 
                  : ''
              } ${
                showExplanation && selectedAnswer === index && index !== currentQuestions[currentQuestion].correct 
                  ? styles.wrongAnswer 
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              <span className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={styles.optionText}>{option}</span>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={styles.explanationContainer}>
            <h3>Paliwanag:</h3>
            <p>{currentQuestions[currentQuestion]?.explanation}</p>
          </div>
        )}

        <div className={styles.actionSection}>
          {!showExplanation ? (
            <button
              className={styles.submitButton}
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              style={{ backgroundColor: selectedAnswer !== null ? getDifficultyColor() : '#6b7280' }}
            >
              {selectedAnswer !== null ? 'Submit Answer' : 'Pumili ng sagot'}
            </button>
          ) : (
            <button
              className={styles.nextButton}
              onClick={handleNextQuestion}
              style={{ backgroundColor: getDifficultyColor() }}
            >
              {currentQuestion + 1 < currentQuestions.length ? 'Susunod na Tanong' : 'Tignan ang Resulta'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;