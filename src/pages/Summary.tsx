import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Label } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Gauge, Star, Check, Cookie, UtensilsCrossed, Frown, Brain, Wine } from 'lucide-react';
import { useQuizStore } from '../store/quiz';

const generateChartData = () => {
return [
{ week: 'Início', kure: 90, other: 90 },
{ week: 'Semana 2', kure: 70, other: 85 },
{ week: 'Semana 4', kure: 40, other: 80 },
{ week: 'Semana 8', kure: 10, other: 75 },
];
};

const weeklyPlan = [
  {
    week: 'Semana 1',
    title: 'Iniciando uma transformação mental profunda, mudando a percepção'
  },
  {
    week: 'Semana 2',
    title: 'Reduzindo a vontade de beber álcool'
  },
  {
    week: 'Semana 3',
    title: 'Sentindo-se livre do álcool'
  },
  {
    week: 'Semana 4',
    title: 'Removendo crenças internas tóxicas'
  },
  {
    week: 'Semana 5 em diante',
    title: 'Reforçando a transformação da mente para resultados duradouros'
  }
];

const testimonials = [
  {
    date: '27 Jun 2024',
    rating: 5,
    text: 'Sinceramente, não achei que ia dar certo, mas o Kure mudou totalmente a minha vida! Parei de beber e me sinto incrível. Não acredito como foi fácil!',
    author: 'João K.',
    verified: true
  },
  {
    date: '24 Jun 2024',
    rating: 5,
    text: 'No começo, eu estava cética, mas o Kure me surpreendeu! Depois de apenas algumas sessões, estou livre do álcool e me sinto muito melhor.',
    author: 'Laura S.',
    verified: true
  },
  {
    date: '19 Jun 2024',
    rating: 5,
    text: 'Kure mudou tudo! Eu deixei de lutar contra a bebida e passei a me sentir completamente no controle. É como se um peso tivesse sido tirado de mim!',
    author: 'Eliza D.',
    verified: true
  }
];

export default function Summary() {
  const navigate = useNavigate();
  const { weight, targetWeight, answers } = useQuizStore();
  const weightLoss = weight && targetWeight ? weight - targetWeight : 0;
  const data = generateChartData(weight || 79, targetWeight || 72);

  return (
    <div className="min-h-screen bg-[#0A061E] text-white">
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-start items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8" />
            <span className="text-2xl font-semibold">kure</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Mobile First: Prediction Section */}
          <div className="lg:hidden bg-[#1A1632] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ textAlign: 'center' }}>Pare de beber com hipnoterapia</h3>
            <h3 className="text-xl font-semibold mb-4" style={{ textAlign: 'center' }}>Com o Kure, reduzir o consumo de álcool se torna uma parte natural da sua jornada, ajudando você a progredir mais rápido e a melhorar seu bem-estar geral.</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="week" stroke="#fff" />
<YAxis
  stroke="#fff"
  domain={[10, 90]}
>
  <Label
    value="Consumo de Álcool"
    angle={-90}
    position="insideLeft"
    style={{ textAnchor: 'middle', fill: '#fff' }}
  />
</YAxis>
                  <Line
                    type="monotone"
                    dataKey="kure"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    stroke="#4B5563"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <b><span className="text-sm">Com hipnoterapia</span></b>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-gray-500 border-dashed"></div>
               <b><span className="text-sm">Com motivação</span></b>
              </div>
            </div>
            
          </div>

          <div>
            <h1 className="font-bold mb-6" style={{ fontSize: '2.2rem' }}>
  Com base na sua resposta,
  você tem <span className="text-purple-400">95% de chance de<br />
  parar de beber em 1 mês</span>
</h1>
            <p className="text-gray-400 mb-8 lg:mb-0">
              Aqui está o que prevemos com base em 24.000 usuários com perfil semelhante
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Começar
            </button>
          </div>

          {/* Desktop Prediction Section */}
          <div className="hidden lg:block bg-[#1A1632] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Pare de beber com hipnoterapia</h3>
            <h3 className="text-xl font-semibold mb-4">Com o Kure, reduzir o consumo de álcool se torna uma parte natural da sua jornada, ajudando você a progredir mais rápido e a melhorar seu bem-estar geral.</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="week" stroke="#fff" />
                <YAxis
  stroke="#fff"
  domain={[10, 90]}
>
  <Label
    value="Consumo de Álcool"
    angle={-90}
    position="insideLeft"
    style={{ textAnchor: 'middle', fill: '#fff' }}
  />
</YAxis>
                  <Line
                    type="monotone"
                    dataKey="kure"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    stroke="#4B5563"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <span className="text-sm">Com hipnoterapia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-gray-500 border-dashed"></div>
                <span className="text-sm">Com motivação</span>
              </div>
            </div>
            
          </div>
        </motion.div>
        
      </div>

      {/* Weekly Plan Section */}
      <div className="bg-[#1A1632] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">
            Seu plano “Pare de beber” com hipnoterapia
          </h2>

          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Weekly Timeline */}
            <div className="space-y-8">
              {weeklyPlan.map((week, index) => (
                <div key={week.week} className="flex items-start gap-4">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === weeklyPlan.length - 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    {index < weeklyPlan.length - 1 && (
                      <div className="absolute top-8 left-4 w-0.5 h-16 bg-purple-500/30" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium">{week.week}</h3>
                    <h4 className="text-xl font-semibold">{week.title}</h4>
                    <p className="text-gray-400">{week.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Preview */}
           
<div className="space-y-8">
  <div className="bg-[#0A061E] p-6 rounded-xl">
    <div className="flex items-center gap-4 mb-4">
      <Star className="w-6 h-6 text-purple-400" />
      <div>
        <h4 className="font-semibold">Probabilidade de sucesso</h4>
        <p className="text-gray-400">95%</p> {/* Use 'food_craving' */}
      </div>
    </div>
    <div className="flex items-center gap-4 mb-4">
      <Wine className="w-6 h-6 text-purple-400" />
      <div>
        <h4 className="font-semibold">Visão definitiva</h4>
        <p className="text-gray-400">{answers?.activity_level || 'Alimentação irregular'}</p> {/* Use 'eating_habits' */}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Frown className="w-6 h-6 text-purple-400" />
      <div>
        <h4 className="font-semibold">Crença interna removida</h4>
        <p className="text-gray-400">{answers?.internal_belief || 'Sinto que DEVO limpar o prato'}</p> {/* Use 'internal_belief' */}
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* Expert Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

           <div>
            <img
              src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmargot-promise.64216275.png&w=3840&q=75"
              alt="Especialista em perda de peso"
              className="rounded-2xl w-full"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold mb-8">Especialistas por trás do seu plano</h2>
            <p className="text-gray-400 mb-6">
              Ao criar o Kure, nosso objetivo era oferecer assistência a indivíduos que se sentem inseguros sobre o progresso em direção aos seus objetivos corporais, especialmente depois de passar por repetidos contratempos.
            </p>
            <p className="text-gray-400 mb-6">
              Com base em nossa experiência trabalhando com milhares de clientes, entendemos que o fator crucial que distingue os empreendimentos bem-sucedidos dos malsucedidos reside em nossa mentalidade. A hipnoterapia é o método perfeito para abordar esse problema.
            </p>
            <p className="text-gray-400 mb-8">
              O poder dos nossos pensamentos e a forte conexão entre nosso intestino e nossa mente são as chaves para alcançar o sucesso nas transformações corporais e nutricionais.
            </p>

            <p className="text-gray-400 mb-8">
              Experimente o aplicativo Kure e veja como a hipnose pode ajudar você a parar de ter desejos por comida e hábitos alimentares pouco saudáveis.
            </p>
            
            <div className="mb-8">
              <h4 className="font-semibold">Michele Rocha</h4>
              <p className="text-purple-400">Especialista em hipnoterapia ericksoniana</p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Começar
            </button>
          </div>
         
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#1A1632] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-1 mb-2">
              <div className="text-2xl text-yellow-400">{'★'.repeat(5)}</div>
              <span className="ml-2 text-lg">4,6 / 5 (+1.000 avaliações)</span>
            </div>
            <h2 className="text-4xl font-bold">O que nossos usuários dizem sobre o Kure?</h2>
          </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0A061E] p-6 rounded-xl"
              >
                <p className="text-sm text-gray-400 mb-2">{testimonial.date}</p>
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="mb-4">{testimonial.text}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={
                        index === 0
                          ? 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonials_thumbnail_1.69412d07.png&w=256&q=75'
                          : index === 1
                          ? 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonials_thumbnail_2.fff1b24f.png&w=256&q=75'
                          : 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonials_thumbnail_3.5bb2725f.png&w=256&q=75'
                      }
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    {testimonial.verified && (
                      <p className="text-xs text-gray-400">USUÁRIO VERIFICADO</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Começar
            </button>
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <p>© 2025 Kure. Todos os direitos reservados.</p>
          <p>Aviso: Os resultados podem variar de pessoa para pessoa</p>
        </div>
      </footer>
    </div>
  );
}
