import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Star, Lock as LockOpen } from 'lucide-react';
import { useQuizStore } from '../store/quiz';
import QuizProgress from '../components/QuizProgress';
import QuizOption from '../components/QuizOption';
import InfoPage from '../components/InfoPage';
import NumberInput from '../components/NumberInput';
import SuccessScreen from '../components/SuccessScreen';
import InfoPageWithIllustration from '../components/InfoPageWithIllustration';

function LoadingScreen({ messages, onComplete }: { messages: string[]; onComplete: () => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [messages, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-4 z-50"
    >
      <h1 className="text-3xl font-semibold text-center mb-12">
        Tudo pronto! Aguarde enquanto processamos seus dados...
      </h1>

      <div className="w-full max-w-md mb-12">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-gray-300 text-center mb-16"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="bg-[#1A1130] rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p className="text-center text-gray-200 mb-4">
          "Não sei como agradecer aos criadores desse aplicativo. Ele me salvou dos meus hábitos de beber quando eu pensava que nunca conseguiria parar."
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span>Usuário verificado</span>
        </div>
      </div>
    </motion.div>
  );
}

function EmailCollection({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      onSubmit(email);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-4 z-50"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">
            Seu programa está pronto.
          </h1>
          
          <p className="text-gray-300">
            Desbloqueie o acesso ao programa personalizado inserindo seu email.
            Junte-se à comunidade Kure que atingiu seu peso ideal, com uma taxa de sucesso superior a 90%.
          </p>
            
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1A1130] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              className="h-4 w-4 mt-1 rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-[#1A1130]"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="ml-2 text-sm text-gray-300">
              Eu gostaria de receber um email sobre meu relatório de dados corporais e concordo com a{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Política de Privacidade
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={!email || !agreed}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LockOpen className="w-5 h-5" />
            <span>Desbloquear meu programa</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
}

const questions = [
  {
    id: 'outcome',
    title: 'Por que você quer parar de beber?',
    options: [
      { label: 'Melhorar minha saúde geral', emoji: '🧬' },
      { label: 'Perder peso', emoji: '🧘‍♀️' },
      { label: 'Dormir melhor', emoji: '😴' },
      { label: 'Aumentar meus níveis de energia', emoji: '🚀' },
      { label: 'Melhorar minha clareza mental', emoji: '🧠' }´,
      { label: 'Fortalecer meus relacionamentos', emoji: '💜' }´,
      { label: 'Economizar dinheiro', emoji: '💰' }´,
      { label: 'Outro', emoji: '🤔' }´
    ]
  },
  {
    id: 'previous_attempts',
    title: 'Você já tentou parar de beber álcool antes?',
    options: [
      { label: 'Sim, uma vez' },
      { label: 'Sim, várias vezes' },
      { label: 'Não, esta é minha primeira tentativa' }
    ]
  },

{
    id: 'impacto', 
    title: 'O álcool impactou algum desses aspectos da sua vida?',
    options: [
      { label: 'Isolamento ou afastamento dos outros' },
      { label: 'Libido ou saúde sexual' },
      { label: 'Relações ou conexões sociais' },
      { label: 'Autoestima ou autovalor' },
      { label: 'Maus hábitos alimentares ou estilo de vida pouco saudável' }
    ]
  },


  {
    id: 'weight_cause',
    title: 'Qual você acredita ser a principal causa do seu consumo de álcool?',
    options: [
      { label: 'Dor Emocional / Trauma', emoji: '💔' },
      { label: 'Estresse / Ansiedade', emoji: '😩' },
      { label: 'Pressão social', emoji: '🍻' },
      { label: 'Fuga da realidade', emoji: '😶‍🌫️' },
      { label: 'História da Família / Genética', emoji: '👨‍👩‍👧' },
      { label: 'Tédio ou falta de propósito', emoji: '🤷‍♀️' },
      { label: 'Outro', emoji: '🤔' }
    ]
  },
  
  
  {
    type: 'info',
    id: 'root_cause',
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fno-alco-info-1-mobile.581f05a5.png&w=1920&q=75",
    title: 'Desta vez, você vai se libertar. Estamos tratando da causa raiz.',
    content: (
  <>
    <p style={{ color: '#c4afff' }}>Já ouviu alguém dizer: "Você só precisa se controlar mais" ou "Por que você não bebe menos"?</p>

    <p className="mt-4" style={{ color: '#c4afff' }}>
      Reduzir o consumo de álcool não é uma questão de força de vontade, mas sim de padrões subconscientes mais profundos.
    </p>

      
    <p className="mt-4">
      Por meio desse programa de hipnoterapia de 21 dias, ajudamos você a reconectar sua mente, abordando a causa raiz de seus padrões e capacitando você a retomar o controle - sem julgamento ou culpa.
    </p>
    
    
    
    <p className="mt-4">
      Mais de 110.000 usuários já transformaram sua relação com o álcool usando essa abordagem.
    </p>
    
    <blockquote className="mt-6 border-l-4 border-purple-500 pl-4 italic">
      "Agora consigo passar uma noite inteira sem pensar em álcool e, como bônus, perdi 5 quilos!" - Sara, começou a usar Kure em dezembro de 2024
    </blockquote>
    
  </>
)
    
  },


{
    id: 'struggle_duration',
    title: 'Há quanto tempo você bebe álcool?',
    options: [
      { label: 'Menos de um ano' },
      { label: '1-3 anos' },
      { label: '3-5 anos' },
      { label: 'Mais de 5 anos' }
    ]
  },


{
    id: 'eating_habits',
    title: 'Com que frequência você consome álcool atualmente?',
    options: [
      { label: 'Diariamente' },
      { label: 'Algumas vezes por semana' },
      { label: 'Uma vez por semana' },
      { label: 'Ocasionalmente' },
      { label: 'Raramente' }
    ]
  },


{
    id: 'food_craving',
    title: 'Quanta bebida alcoólica você costuma beber?',
    options: [
      { label: 'Um copo de vinho/cerveja' },
      { label: 'Algumas cervejas ou coquetéis' },
      { label: 'Muitas vezes terminando uma garrafa inteira' },
      { label: 'Beber muito e perder a noção de quanto consumo' }
    ]
  },




  {
    id: 'life_impact',
    title: 'Existem outros aspectos da sua vida que foram impactados negativamente pelo seu peso?',
    subtitle: 'Selecione o que mais te afeta.',
    options: [
      { label: 'Manhã' },
      { label: 'Tarde' },
      { label: 'Noite' },
      { label: 'Tarde da noite' }
    ]
  },


{
    id: 'physical_symptom',
    title: 'Quais destes sintomas você sente regularmente?',
    options: [
      { label: 'Tremores' },
      { label: 'Náuseas / vômitos' },
      { label: 'Insônia' },
      { label: 'Dores de cabeça' },
      { label: 'Suando excessivamente' },
      { label: 'Sensação de fraqueza' },
      { label: 'Perda de memória ou confusão' },
      { label: 'Outro' }
    ]
  },




  {
    type: 'info',
    id: 'transformation',
    title: '87% dos usuários com respostas como as suas recuperaram com sucesso o controle sobre a bebida',
    content: (
  <>
    <p>Métodos tradicionais, como força de vontade apenas ou grupos de apoio, muitas vezes não conseguem criar mudanças duradouras.</p>
    <p className="mt-4">O aplicativo Kure identifica as causas subconscientes do vício em álcool, como estresse, gatilhos emocionais ou hábitos, e ajuda você a reprogramar sua mente para se libertar e alcançar a sobriedade duradoura.</p>
    <p className="mt-4" style={{ color: '#c4afff' }}>É a maneira mais fácil de parar de beber álcool para sempre.</p>
  
  </>
),
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_2_main.53943ace.png&w=3840&q=75",
    showRating: true
  },
  
  

  {
    id: 'internal_belief',
    title: 'Quais são as crenças limitantes que estão impedindo você de parar de beber?',
    options: [
      { label: '"Preciso de álcool para relaxar ou lidar com o estresse."', emoji: '💆‍♀️' },
      { label: '"Não consigo me divertir ou socializar sem beber."', emoji: '🥳' },
      { label: '"Qual é o sentido? Se eu tentar, vou falhar."', emoji: '🤷‍♀️' },
      { label: '"O álcool faz parte da minha identidade ou de quem eu sou."', emoji: '😞' },
      { label: '"Tenho medo de enfrentar minhas emoções sem álcool."', emoji: '🙈' },
      { label: '"Eu não mereço uma vida melhor."', emoji: '😔' },
      { label: '"Meus amigos ou familiares esperam que eu beba."', emoji: '🕺' },
      { label: 'Incerto', emoji: '🤔' }
    ]
  },



      {
    id: 'life_impact',
    title: 'Que tipo de sistema de suporte você tem atualmente?',
    options: [
      { label: 'Amigos / Família' },
      { label: 'Ajuda profissional (por exemplo, terapeuta, coach)' },
      { label: 'Comunidades online' },
      { label: 'Nenhum por enquanto' }
    ]
  },

  


  {
    id: 'activity_level',
    title: 'Qual é sua visão máxima para uma vida sem álcool?',
    options: [
      { label: 'Sentindo-se mais saudável e com mais energia', emoji: '🌱' },
      { label: 'Estar mais presente com os entes queridos', emoji: '💞' },
      { label: 'Alcançar objetivos profissionais ou pessoais', emoji: '🚀' },
      { label: 'Recuperando o controle e a confiança', emoji: '💪' },
      { label: 'Outro', emoji: '🤔' }
    ]
  },

  


{
    id: 'hypnosis_knowledge',
    title: 'Você já ouviu falar que a hipnose ajuda as pessoas a mudar seu comportamento?',
    options: [
      { label: 'Sim', emoji: '👍' },
      { label: 'Não tenho certeza', emoji: '🤔' }
    ]
  },

  
  {
    id: 'referral',
    title: 'Você foi encaminhado para Kure por um nutricionista ou terapeuta cognitivo comportamental?',
    subtitle: 'A hipnose é um método cientificamente comprovado para resolver problemas relacionados à nutrição e questões psicológicas.',
    options: [
      { label: 'Sim' },
      { label: 'Não' }
    ]
  },




    {
    type: 'info',
    id: 'how_it_works',
    title: 'Pare de beber álcool enquanto dorme',
    content: (
      <>
        <p>Nossas sessões personalizadas de hipnose ajudarão você a lidar com os principais fatores que impulsionam sua dependência de álcool:</p>
        <ul className="space-y-2 mt-4">
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Elimine os desejos por álcool
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Quebre hábitos e rotinas pouco saudáveis
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Supere crenças limitantes sobre parar de fumar
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Restaure o equilíbrio entre sua mente e seu corpo
          </li>
        </ul>
        <p className="mt-4">
          Basta abrir o aplicativo Kure e ouvir uma sessão de hipnose relaxante antes de dormir.
        </p>
        <p className="mt-4">
          <span style={{ color: '#c4afff' }}>É quase como parar de beber álcool enquanto dorme.</span>
        </p>
        <p className="mt-4">
          Estudos de pesquisa médica e dados de usuários do Kure indicam que a hipnose é completamente segura e pode ajudar você a alcançar a liberdade duradoura do vício do álcool.*
        </p>
        <p className="mt-8 text-sm text-gray-400">
          *Fonte: Journal of Integrative Medicine Volume 19, Edição 1, Janeiro de 2021, Páginas 1-5.
        </p>
      </>
    ),
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_3_main_mobile.db09b2e6.png&w=1920&q=75"
  },

  



  {
    id: 'reward',
    title: 'Imagine atingir sua meta. Como você se recompensará?',
    subtitle: 'Em tempos desafiadores, lembre-se desta recompensa como motivação para continuar.',
    options: [
      { label: 'Vou fazer um dia de SPA', emoji: '💆' },
      { label: 'Vou contribuir para caridade', emoji: '💖' },
      { label: 'Vou mudar de emprego ou fazer algo igualmente significativo', emoji: '✨' },
      { label: 'Vou finalmente fazer aquela viagem linda que sempre sonhei', emoji: '🌴' }
    ]
  }



  
];

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processingAnswers, setProcessingAnswers] = useState(false);
  const [showEmailCollection, setShowEmailCollection] = useState(false);

  const {
    setAnswer,
    setHeight,
    setWeight,
    setTargetWeight,
    setAge,
    weight: currentWeight,
    setEmail
  } = useQuizStore();

  const currentValue = useQuizStore((state: any) => {
    const current = questions[currentQuestion];
    return current?.type === 'number' ? state[current.id] : null;
  });

  const handleAnswer = (answer: string) => {
    const current = questions[currentQuestion];

    if (current.type === 'info') {
      setCurrentQuestion(prev => prev + 1);
      return;
    }

    setAnswer(current.id, answer);

    if (currentQuestion === questions.length - 1) {
      setProcessingAnswers(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

const SKIP_EMAIL_SCREEN = true;
  
  const handleLoadingComplete = () => {
    setProcessingAnswers(false);
    if (SKIP_EMAIL_SCREEN) {
    navigate('/summary');
  } else {
    setShowEmailCollection(true);
  }
  };

  const handleNumberInput = (value: number) => {
    const current = questions[currentQuestion];
    if (isNaN(value)) return;
    
    switch (current.id) {
      case 'height':
        setHeight(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'target_weight':
        setTargetWeight(value);
        break;
      case 'age':
        setAge(value);
        break;
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    navigate('/summary');
  };

  if (showSuccess) {
    return <SuccessScreen />;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="relative min-h-screen bg-[#0A061E]">
      <AnimatePresence mode="wait">
        {processingAnswers && (
          <LoadingScreen
            messages={[
              "Analisando suas respostas...",
              "Projetando seu sucesso em parar de beber...",
              "Criando seus cursos de hipnose personalizados..."
            ]}
            onComplete={handleLoadingComplete}
          />
        )}
        {showEmailCollection && (
          <EmailCollection onSubmit={handleEmailSubmit} />
        )}
        {!processingAnswers && !showEmailCollection && currentQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-[#0A061E] text-white"
          >
            <div className="max-w-4xl mx-auto px-4 py-8">
              <QuizProgress onBack={handleBack} />
              
              {currentQ.type === 'info' ? (
                <InfoPageWithIllustration
                  title={currentQ.title}
                  image={currentQ.image}
                  showRating={currentQ.showRating}
                  onContinue={() => handleAnswer('')}
                >
                  {currentQ.content}
                </InfoPageWithIllustration>
              ) : currentQ.type === 'number' ? (
                <NumberInput
                  key={`${currentQ.id}-${currentQuestion}`}
                  label={currentQ.title}
                  subtitle={currentQ.subtitle}
                  value={currentValue}
                  onChange={handleNumberInput}
                  onNext={() => handleAnswer('')}
                  unit={currentQ.unit}
                  min={currentQ.min}
                  max={currentQ.max}
                  errorMessage={currentQ.errorMessage}
                  validateFn={currentQ.id === 'target_weight' ? (value: number) => value < currentWeight : undefined}
                />
              ) : (
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center gap-8"
                >
                  <h2 className="text-3xl font-semibold text-center">
                    {currentQ.title}
                  </h2>

                  {currentQ.subtitle && (
                    <p className="text-gray-400 text-center max-w-2xl">
                      {currentQ.subtitle}
                    </p>
                  )}

                  <div className="w-full max-w-2xl space-y-4">
                    {currentQ.options?.map((option, index) => (
                      <QuizOption
                        key={index}
                        label={option.label}
                        emoji={option.emoji}
                        subtitle={option.subtitle}
                        onClick={() => handleAnswer(option.label)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
