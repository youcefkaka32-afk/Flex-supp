import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './ToolPage.css'
import './WorkoutPlanning.css'
import Icon from '../../components/Icons/WorkoutIcons'

export default function WorkoutPlanning() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    goal: '',
    experience: '',
    frequency: '',
    equipment: '',
    bodyType: '',
    limitations: ''
  })

  const content = {
    fr: {
      intro: {
        title: 'Programme d\'Entraînement Personnalisé',
        subtitle: 'Répondez à quelques questions pour recevoir un programme d\'entraînement gratuit de 1 mois adapté à vos objectifs',
        features: [
          'Programme personnalisé selon votre niveau',
          'Adapté à vos objectifs spécifiques',
          'Plan d\'entraînement de 4 semaines',
          'Exercices détaillés avec sets et reps',
          'Conseils de progression inclus'
        ],
        startButton: 'Commencer le Quiz'
      },
      stepLabel: 'Étape {step} / 6',
      nextButton: 'Suivant',
      backButton: 'Précédent',
      finishButton: 'Voir le programme',
      restartButton: 'Recommencer',
      resultTitle: 'Votre plan personnalisé',
      resultSubtitle: 'Basé sur vos réponses, voici votre point de départ',
      questions: {
        goal: {
          title: 'Quel est votre objectif principal?',
          subtitle: 'Choisissez l\'objectif qui correspond le mieux à vos besoins actuels',
          options: [
            { value: 'muscle', icon: 'dumbbell', title: 'Prise de Masse', desc: 'Construire du muscle et augmenter la force' },
            { value: 'fat-loss', icon: 'fire', title: 'Perte de Graisse', desc: 'Brûler la graisse tout en préservant le muscle' },
            { value: 'strength', icon: 'bolt', title: 'Force Pure', desc: 'Maximiser la force et la puissance' },
            { value: 'athletic', icon: 'run', title: 'Performance Athlétique', desc: 'Améliorer l\'explosivité et l\'endurance' }
          ]
        },
        experience: {
          title: 'Quel est votre niveau d\'expérience?',
          subtitle: 'Sélectionnez le niveau qui décrit le mieux votre parcours en musculation',
          options: [
            { value: 'beginner', icon: 'seedling', title: 'Débutant', desc: 'Moins de 6 mois d\'entraînement régulier' },
            { value: 'intermediate', icon: 'target', title: 'Intermédiaire', desc: '6 mois à 2 ans d\'entraînement' },
            { value: 'advanced', icon: 'fire', title: 'Avancé', desc: 'Plus de 2 ans d\'entraînement régulier' }
          ]
        },
        frequency: {
          title: 'Combien de fois par semaine pouvez-vous vous entraîner?',
          subtitle: 'Choisissez une fréquence réaliste pour vos disponibilités',
          options: [
            { value: '3', icon: 'num-3', title: '3 jours', desc: 'Programme de base efficace' },
            { value: '4', icon: 'num-4', title: '4 jours', desc: 'Très bon compromis volume/récupération' },
            { value: '5', icon: 'num-5', title: '5 jours', desc: 'Entraînement avancé avec plus de variation' }
          ]
        },
        equipment: {
          title: 'Quel équipement avez-vous?',
          subtitle: 'Sélectionnez ce que vous pouvez utiliser pour votre programme',
          options: [
            { value: 'gym', icon: 'dumbbell', title: 'Salle de sport', desc: 'Accès à machines et charges libres' },
            { value: 'home', icon: 'home', title: 'À la maison', desc: 'Haltere, bande élastique ou poids du corps' },
            { value: 'minimal', icon: 'minimal', title: 'Équipement limité', desc: 'Poids du corps et accessoires simples' }
          ]
        },
        bodyType: {
          title: 'Quel est votre type de corps?',
          subtitle: 'Cela aide à personnaliser l\'approche d\'entraînement',
          options: [
            { value: 'ectomorph', icon: 'leg', title: 'Ectomorphe', desc: 'Physique long et fin, gain de muscle difficile' },
            { value: 'mesomorph', icon: 'bolt', title: 'Mésomorphe', desc: 'Physique naturellement sportif' },
            { value: 'endomorph', icon: 'peach', title: 'Endomorphe', desc: 'Prise de masse facile, perte de graisse plus lente' }
          ]
        },
        limitations: {
          title: 'Avez-vous des limitations physiques?',
          subtitle: 'Aidez-nous à adapter le programme en toute sécurité',
          options: [
            { value: 'none', icon: 'check', title: 'Aucune limitation', desc: 'Entraînement standard possible' },
            { value: 'knees', icon: 'knee', title: 'Genoux sensibles', desc: 'Moins d\'impact, mouvements contrôlés' },
            { value: 'back', icon: 'back', title: 'Dos sensible', desc: 'Éviter les charges lourdes et torsions' }
          ]
        }
      }
    },
    ar: {
      intro: {
        title: 'برنامج تدريب مخصص',
        subtitle: 'أجب على بعض الأسئلة للحصول على برنامج تدريبي مجاني لمدة شهر يناسب أهدافك',
        features: [
          'برنامج مخصص لمستواك',
          'متوافق مع أهدافك المحددة',
          'خطة تدريب لمدة 4 أسابيع',
          'تمارين مفصلة مع مجموعات وتكرارات',
          'نصائح للتقدم متضمنة'
        ],
        startButton: 'ابدأ الاختبار'
      },
      stepLabel: 'الخطوة {step} / 6',
      nextButton: 'التالي',
      backButton: 'السابق',
      finishButton: 'عرض البرنامج',
      restartButton: 'إعادة البدء',
      resultTitle: 'خطة مخصصة لك',
      resultSubtitle: 'استنادًا إلى إجاباتك، إليك نقطة انطلاقك',
      questions: {
        goal: {
          title: 'ما هو هدفك الرئيسي؟',
          subtitle: 'اختر الهدف الذي يناسب احتياجاتك الحالية',
          options: [
            { value: 'muscle', icon: 'dumbbell', title: 'زيادة العضلات', desc: 'بناء العضلات وزيادة القوة' },
            { value: 'fat-loss', icon: 'fire', title: 'حرق الدهون', desc: 'حرق الدهون مع الحفاظ على العضلات' },
            { value: 'strength', icon: 'bolt', title: 'القوة', desc: 'زيادة القوة والقدرة' },
            { value: 'athletic', icon: 'run', title: 'الأداء الرياضي', desc: 'تحسين القوة والقدرة على التحمل' }
          ]
        },
        experience: {
          title: 'ما هو مستوى خبرتك؟',
          subtitle: 'اختر المستوى الذي يصف مسيرتك التدريبية',
          options: [
            { value: 'beginner', icon: 'seedling', title: 'مبتدئ', desc: 'أقل من 6 أشهر تدريب منتظم' },
            { value: 'intermediate', icon: 'target', title: 'متوسط', desc: 'من 6 أشهر إلى سنتين تدريب' },
            { value: 'advanced', icon: 'fire', title: 'متقدم', desc: 'أكثر من سنتين تدريب منتظم' }
          ]
        },
        frequency: {
          title: 'كم مرة يمكنك التدريب أسبوعيًا؟',
          subtitle: 'اختر وتيرة واقعية لجدولك',
          options: [
            { value: '3', icon: 'num-3', title: '3 أيام', desc: 'برنامج أساسي فعال' },
            { value: '4', icon: 'num-4', title: '4 أيام', desc: 'توازن ممتاز بين حجم التدريب والتعافي' },
            { value: '5', icon: 'num-5', title: '5 أيام', desc: 'تدريب متقدم مع تنوع أكبر' }
          ]
        },
        equipment: {
          title: 'ما هي المعدات المتاحة لديك؟',
          subtitle: 'حدد ما يمكنك استخدامه في برنامجك',
          options: [
            { value: 'gym', icon: 'dumbbell', title: 'نادي رياضي', desc: 'أجهزة وأوزان حرة' },
            { value: 'home', icon: 'home', title: 'المنزل', desc: 'أوزان، أحزمة مطاطية، وزن الجسم' },
            { value: 'minimal', icon: 'minimal', title: 'معدات قليلة', desc: 'تمارين وزن الجسم وأدوات بسيطة' }
          ]
        },
        bodyType: {
          title: 'ما هو نوع جسدك؟',
          subtitle: 'هذا يساعد في تخصيص نهج التدريب',
          options: [
            { value: 'ectomorph', icon: 'leg', title: 'إكتومورف', desc: 'جسم نحيف وطويل، صعوبة في زيادة العضلات' },
            { value: 'mesomorph', icon: 'bolt', title: 'ميزومورف', desc: 'جسم رياضي طبيعي' },
            { value: 'endomorph', icon: 'peach', title: 'إندومورف', desc: 'زيادة في العضلات سهلة، فقدان الدهون أبطأ' }
          ]
        },
        limitations: {
          title: 'هل لديك أي قيود جسدية؟',
          subtitle: 'ساعدنا في تخصيص البرنامج بأمان',
          options: [
            { value: 'none', icon: 'check', title: 'لا توجد قيود', desc: 'برنامج قياسي مناسب' },
            { value: 'knees', icon: 'knee', title: 'ركبتين حساسة', desc: 'تقليل التأثير والحركات المسيطر عليها' },
            { value: 'back', icon: 'back', title: 'ظهر حساس', desc: 'تجنب الأحمال الثقيلة والالتواءات' }
          ]
        }
      }
    },
    en: {
      intro: {
        title: 'Personalized Workout Program',
        subtitle: 'Answer a few questions to get a free 1-month workout plan tailored to your goals',
        features: [
          'Personalized plan for your level',
          'Aligned with your specific goals',
          '4-week training plan',
          'Detailed exercises with sets and reps',
          'Progression guidance included'
        ],
        startButton: 'Start the Quiz'
      },
      stepLabel: 'Step {step} / 6',
      nextButton: 'Next',
      backButton: 'Back',
      finishButton: 'See Plan',
      restartButton: 'Start Again',
      resultTitle: 'Your personalized plan',
      resultSubtitle: 'Based on your answers, here is a recommended starting point',
      questions: {
        goal: {
          title: 'What is your main goal?',
          subtitle: 'Choose the objective that best matches your current needs',
          options: [
            { value: 'muscle', icon: 'dumbbell', title: 'Muscle Gain', desc: 'Build muscle and increase strength' },
            { value: 'fat-loss', icon: 'fire', title: 'Fat Loss', desc: 'Burn fat while preserving muscle' },
            { value: 'strength', icon: 'bolt', title: 'Pure Strength', desc: 'Maximize strength and power' },
            { value: 'athletic', icon: 'run', title: 'Athletic Performance', desc: 'Improve explosiveness and endurance' }
          ]
        },
        experience: {
          title: 'What is your experience level?',
          subtitle: 'Select the level that best describes your gym journey',
          options: [
            { value: 'beginner', icon: 'seedling', title: 'Beginner', desc: 'Less than 6 months of regular training' },
            { value: 'intermediate', icon: 'target', title: 'Intermediate', desc: '6 months to 2 years of training' },
            { value: 'advanced', icon: 'fire', title: 'Advanced', desc: 'More than 2 years of regular training' }
          ]
        },
        frequency: {
          title: 'How many times per week can you train?',
          subtitle: 'Choose a realistic frequency for your schedule',
          options: [
            { value: '3', icon: 'num-3', title: '3 days', desc: 'A solid beginner-friendly program' },
            { value: '4', icon: 'num-4', title: '4 days', desc: 'Great balance between volume and recovery' },
            { value: '5', icon: 'num-5', title: '5 days', desc: 'More advanced training with greater variety' }
          ]
        },
        equipment: {
          title: 'What equipment do you have?',
          subtitle: 'Select what you can use for your program',
          options: [
            { value: 'gym', icon: 'dumbbell', title: 'Gym Access', desc: 'Machines and free weights available' },
            { value: 'home', icon: 'home', title: 'Home Setup', desc: 'Dumbbells, bands, or bodyweight' },
            { value: 'minimal', icon: 'minimal', title: 'Minimal Gear', desc: 'Bodyweight and basic equipment' }
          ]
        },
        bodyType: {
          title: 'What is your body type?',
          subtitle: 'This helps personalize the training approach',
          options: [
            { value: 'ectomorph', icon: 'leg', title: 'Ectomorph', desc: 'Lean frame, muscle gain is harder' },
            { value: 'mesomorph', icon: 'bolt', title: 'Mesomorph', desc: 'Naturally athletic build' },
            { value: 'endomorph', icon: 'peach', title: 'Endomorph', desc: 'Gains muscle easily, fat loss can be slower' }
          ]
        },
        limitations: {
          title: 'Do you have any physical limitations?',
          subtitle: 'Help us adapt the plan safely for you',
          options: [
            { value: 'none', icon: 'check', title: 'No Limitations', desc: 'Standard workout plan is suitable' },
            { value: 'knees', icon: 'knee', title: 'Knee Sensitivities', desc: 'Lower-impact and controlled movements' },
            { value: 'back', icon: 'back', title: 'Back Concerns', desc: 'Avoid heavy loads and twisting' }
          ]
        }
      }
    }
  }

  const t = content[lang] || content.en
  const steps = ['goal', 'experience', 'frequency', 'equipment', 'bodyType', 'limitations']
  const activeStep = step > 0 && step <= steps.length ? steps[step - 1] : null
  const question = activeStep ? t.questions[activeStep] : null

  const updateAnswer = (value) => {
    if (!activeStep) return
    setAnswers((current) => ({ ...current, [activeStep]: value }))
  }

  const goNext = () => {
    if (!activeStep) {
      setStep(1)
      return
    }
    if (!answers[activeStep]) return
    setStep((current) => Math.min(current + 1, steps.length + 1))
  }

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0))
  }

  const resetQuiz = () => {
    setAnswers({
      goal: '',
      experience: '',
      frequency: '',
      equipment: '',
      bodyType: '',
      limitations: ''
    })
    setStep(0)
  }

  const selectedOption = activeStep ? t.questions[activeStep].options.find((option) => option.value === answers[activeStep]) : null

  const resultSummary = (
    <div className="quiz-step">
      <div className="quiz-step__number">{t.resultTitle}</div>
      <h2 className="quiz-step__title">{t.resultSubtitle}</h2>
      <div className="quiz-options">
        {steps.map((key) => {
          const answer = answers[key]
          const option = answer ? t.questions[key].options.find((item) => item.value === answer) : null
          return (
            <div className="quiz-option" key={key}>
              <div className="quiz-option__icon">{option?.icon ? <Icon name={option.icon} size={28} /> : '•'}</div>
              <h3>{option?.title || key}</h3>
              <p>{option?.desc || '–'}</p>
            </div>
          )
        })}
      </div>
      <button className="quiz-start-btn" type="button" onClick={resetQuiz}>{t.restartButton}</button>
    </div>
  )

  return (
    <div className="tool-page">
      <div className="tool-hero" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="section-shell">
          <h1 className="tool-hero__title font-display">{t.intro.title}</h1>
          <p className="tool-hero__subtitle">{t.intro.subtitle}</p>
        </div>
      </div>

      <div className="tool-content">
        <div className="section-shell">
          {step === 0 ? (
            <div className="quiz-intro">
              <h2 className="quiz-intro__title">{t.intro.title}</h2>
              <p className="quiz-intro__subtitle">{t.intro.subtitle}</p>
              <div className="quiz-intro__features">
                {t.intro.features.map((feature) => (
                  <div className="quiz-intro__feature" key={feature}>
                    <span className="quiz-intro__feature-icon"><Icon name="check" size={16} /></span>
                    <p className="quiz-intro__feature-text">{feature}</p>
                  </div>
                ))}
              </div>
              <button className="quiz-start-btn" type="button" onClick={() => setStep(1)}>{t.intro.startButton}</button>
            </div>
          ) : step <= steps.length ? (
            <div className="quiz-step">
              <div className="quiz-progress">
                {steps.map((_, index) => {
                  const isActive = index + 1 === step
                  const isCompleted = index + 1 < step
                  return (
                    <span key={index} className={`quiz-progress__dot ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`} />
                  )
                })}
              </div>
              <div className="quiz-step__number">{t.stepLabel.replace('{step}', step)}</div>
              <h2 className="quiz-step__title">{question.title}</h2>
              <p className="quiz-step__subtitle">{question.subtitle}</p>
              <div className="quiz-options">
                {question.options.map((option) => {
                  const isSelected = answers[activeStep] === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`quiz-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => updateAnswer(option.value)}
                    >
                      <div className="quiz-option__icon"><Icon name={option.icon} size={36} /></div>
                      <h3>{option.title}</h3>
                      <p>{option.desc}</p>
                    </button>
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="quiz-start-btn" type="button" onClick={goBack} disabled={step === 1}>{t.backButton}</button>
                <button className="quiz-start-btn" type="button" onClick={goNext} disabled={!answers[activeStep]}>{step === steps.length ? t.finishButton : t.nextButton}</button>
              </div>
            </div>
          ) : (
            resultSummary
          )}
        </div>
      </div>
    </div>
  )
}
