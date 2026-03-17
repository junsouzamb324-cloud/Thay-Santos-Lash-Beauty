/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Calendar, Clock, CreditCard, Send, X, Instagram, 
  Phone, MapPin, Check, Star, ArrowRight, ChevronRight,
  Sparkles, Heart, ShieldCheck, Award, Menu
} from 'lucide-react';

interface ServiceModel {
  id: number;
  category: 'Cílios' | 'Sobrancelha' | 'Lábios';
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  image: string;
  duration?: string;
  style?: string;
}

const SERVICES: ServiceModel[] = [
  // Cílios
  {
    id: 1,
    category: 'Cílios',
    name: "Clássico Fio a Fio",
    description: "Um olhar natural e elegante, perfeito para o dia a dia. Realça seus cílios com sutileza e precisão milimétrica.",
    price: 120,
    discountPrice: 99,
    image: "/fioafio.jpg",
    duration: "1h 30min",
    style: "Natural"
  },
  {
    id: 2,
    category: 'Cílios',
    name: "Volume Híbrido",
    description: "A mistura perfeita entre o clássico e o volume. Proporciona textura e um olhar mais marcante e sofisticado.",
    price: 150,
    discountPrice: 129,
    image: "https://picsum.photos/seed/lash2/600/800",
    duration: "2h 00min",
    style: "Moderado"
  },
  {
    id: 3,
    category: 'Cílios',
    name: "Volume Russo",
    description: "Para quem busca glamour e densidade. Cílios extremamente macios, volumosos e com curvatura impecável.",
    price: 180,
    discountPrice: 159,
    image: "https://picsum.photos/seed/lash3/600/800",
    duration: "2h 30min",
    style: "Cheio / Glamour"
  },
  {
    id: 4,
    category: 'Cílios',
    name: "Volume Brasileiro",
    description: "A técnica queridinha! Utiliza fios em formato de Y para um efeito volumoso, porém leve e com acabamento natural.",
    price: 160,
    discountPrice: 139,
    image: "https://picsum.photos/seed/lash4/600/800",
    duration: "2h 00min",
    style: "Marcante"
  },
  {
    id: 5,
    category: 'Cílios',
    name: "Volume Egípcio",
    description: "Fios em formato de W que proporcionam um olhar preenchido e com textura única. Ideal para quem ama volume com leveza.",
    price: 170,
    discountPrice: 149,
    image: "https://picsum.photos/seed/lash5/600/800",
    duration: "2h 15min",
    style: "Texturizado"
  },
  {
    id: 6,
    category: 'Cílios',
    name: "Mega Volume",
    description: "O máximo de densidade e impacto. Fans feitos à mão para um olhar dramático, luxuoso e extremamente preto.",
    price: 220,
    discountPrice: 189,
    image: "https://picsum.photos/seed/lash6/600/800",
    duration: "3h 00min",
    style: "Dramático"
  },
  // Sobrancelhas
  {
    id: 7,
    category: 'Sobrancelha',
    name: "Design com Henna",
    description: "Modelagem estratégica das sobrancelhas com aplicação de henna premium para preenchimento e definição.",
    price: 60,
    discountPrice: 45,
    image: "https://picsum.photos/seed/brow1/600/800"
  },
  {
    id: 8,
    category: 'Sobrancelha',
    name: "Brow Lamination",
    description: "Técnica que deixa os fios alinhados e com aspecto de mais volumosos, ideal para um visual editorial.",
    price: 130,
    discountPrice: 110,
    image: "https://picsum.photos/seed/brow2/600/800"
  },
  {
    id: 9,
    category: 'Sobrancelha',
    name: "Microblading",
    description: "Micropigmentação fio a fio para um resultado ultra realista, corrigindo falhas com naturalidade absoluta.",
    price: 450,
    discountPrice: 390,
    image: "https://picsum.photos/seed/brow3/600/800"
  },
  // Lábios
  {
    id: 10,
    category: 'Lábios',
    name: "Revitalização Labial",
    description: "Devolve a cor natural e o viço aos lábios com um efeito de 'lip tint' saudável e rejuvenescido.",
    price: 350,
    discountPrice: 299,
    image: "https://picsum.photos/seed/lip1/600/800"
  },
  {
    id: 11,
    category: 'Lábios',
    name: "Efeito Batom",
    description: "Micropigmentação com cor mais intensa e definida, ideal para quem busca praticidade e sofisticação.",
    price: 400,
    discountPrice: 350,
    image: "/labios.jpg"
  },
  {
    id: 12,
    category: 'Lábios',
    name: "Neutralização Labial",
    description: "Técnica avançada para clarear lábios escuros ou arroxeados, deixando-os com tom rosado uniforme.",
    price: 380,
    discountPrice: 330,
    image: "https://picsum.photos/seed/lip3/600/800"
  }
];

const REVIEWS = [
  { name: "Amanda Silva", text: "Melhor experiência que já tive! Meus cílios ficaram naturais e duraram muito.", stars: 5 },
  { name: "Beatriz Costa", text: "O design de sobrancelha mudou meu rosto. Atendimento impecável e ambiente luxuoso.", stars: 5 },
  { name: "Carla Mendes", text: "Fiz a revitalização labial e amei o resultado. Super natural!", stars: 5 }
];

const TIME_SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];
const PAYMENT_METHODS = ["Pix", "Cartão de Crédito", "Cartão de Débito", "Dinheiro"];

export default function App() {
  const [selectedModel, setSelectedModel] = useState<ServiceModel | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'Cílios' | 'Sobrancelha' | 'All'>('All');
  const [showCareModal, setShowCareModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendWhatsApp = () => {
    if (!selectedModel || !selectedTime || !selectedDate || !selectedPayment) {
      alert("Por favor, selecione todas as opções antes de enviar.");
      return;
    }

    const message = `Olá! Gostaria de agendar um procedimento:
*Serviço:* ${selectedModel.category} - ${selectedModel.name}
*Data:* ${selectedDate}
*Horário:* ${selectedTime}
*Forma de Pagamento:* ${selectedPayment}
*Valor:* R$ ${selectedModel.discountPrice.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5535910180139?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderServiceSection = (title: string, category: string, index: number) => (
    <section className="py-24 relative overflow-hidden" id={category.toLowerCase()}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="relative">
            <span className="text-pink-500/20 text-8xl font-display absolute -top-12 -left-4 select-none">0{index + 1}</span>
            <h2 className="text-4xl md:text-5xl font-serif italic relative z-10">{title}</h2>
            <div className="w-20 h-1 bg-pink-500 mt-4"></div>
          </div>
          <p className="text-zinc-500 max-w-md text-right">Técnicas exclusivas e materiais de alta qualidade para garantir o melhor resultado para você.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 md:gap-10 px-2 md:px-0">
          {SERVICES.filter(s => s.category === category)
            .slice(0, filterCategory === 'All' ? 3 : undefined)
            .map((model, idx) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all duration-500"
              onClick={() => setSelectedModel(model)}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={model.image} 
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                  <button className="w-full bg-white text-black py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2">
                    Agendar <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              
              <div className="p-3 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-2 md:mb-4 gap-1">
                  <h3 className="text-xs md:text-2xl font-serif italic group-hover:text-pink-500 transition-colors line-clamp-1">{model.name}</h3>
                  <div className="bg-pink-500/10 text-pink-500 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider whitespace-nowrap">Oferta</div>
                </div>
                <p className="text-zinc-500 text-[10px] md:text-sm mb-4 md:mb-8 leading-relaxed line-clamp-1 md:line-clamp-2 hidden sm:block">{model.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-zinc-600 line-through text-[8px] md:text-xs">R$ {model.price}</span>
                    <span className="text-white font-bold text-xs md:text-xl">R$ {model.discountPrice}</span>
                  </div>
                  <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-pink-500 group-hover:border-pink-500 transition-all">
                    <ArrowRight size={12} className="md:size-[18px] group-hover:text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen atmosphere-gradient">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-serif italic text-pink-500 tracking-tighter notranslate" translate="no">Thay Santos Lash & Beauty</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
            <a 
              href="#" 
              onClick={() => setFilterCategory('All')}
              className="hover:text-pink-500 transition-colors notranslate"
              translate="no"
            >
              Início
            </a>
            <a 
              href="#cílios" 
              onClick={(e) => {
                e.preventDefault();
                setFilterCategory('Cílios');
                setTimeout(() => {
                  document.getElementById('cílios')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-pink-500 transition-colors notranslate"
              translate="no"
            >
              Cílios
            </a>
            <a 
              href="#sobrancelha" 
              onClick={(e) => {
                e.preventDefault();
                setFilterCategory('Sobrancelha');
                setTimeout(() => {
                  document.getElementById('sobrancelha')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-pink-500 transition-colors notranslate"
              translate="no"
            >
              Sobrancelhas
            </a>
            <button 
              onClick={() => setShowNewsModal(true)}
              className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors group"
            >
              <Sparkles size={14} className="group-hover:animate-pulse" />
              Novidade
            </button>
            <a 
              href="#cuidados" 
              className="hover:text-pink-500 transition-colors flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                setShowCareModal(true);
              }}
            >
              ✨ Cuidados
            </a>
          </div>

          <button 
            onClick={() => window.open('https://wa.me/5535910180139?text=Olá! Gostaria de agendar um horário.', '_blank')}
            className="hidden md:block bg-white text-black px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-pink-500 hover:text-white transition-all"
          >
            Agendar
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white p-2"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-serif italic text-pink-500 tracking-tighter notranslate" translate="no">Thay Santos Lash & Beauty</div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-0">
              {[
                { label: 'Início', onClick: () => { setFilterCategory('All'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                { label: 'Cílios', onClick: () => { setFilterCategory('Cílios'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('cílios')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                { label: 'Sobrancelhas', onClick: () => { setFilterCategory('Sobrancelha'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('sobrancelha')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                { label: 'Novidade', highlight: true, onClick: () => { setShowNewsModal(true); setIsMobileMenuOpen(false); } },
                { label: 'Cuidados', onClick: () => { 
                  setShowCareModal(true);
                  setIsMobileMenuOpen(false); 
                } },
                { label: 'Agendamento', onClick: () => { window.open('https://wa.me/5535910180139?text=Olá! Gostaria de agendar um horário.', '_blank'); setIsMobileMenuOpen(false); } }
              ].map((item: { label: string; onClick: () => void; highlight?: boolean }, i) => (
                <div key={i} className="border-b border-white/10">
                  <button
                    onClick={item.onClick}
                    className={`w-full text-left py-6 text-xl sm:text-2xl font-medium transition-colors flex items-center justify-between ${item.highlight ? 'text-pink-500' : 'text-white hover:text-pink-500'}`}
                  >
                    <span className="notranslate" translate="no">{item.label}</span>
                    {item.highlight && (
                      <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">
                        Novo
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <p className="text-zinc-500 text-sm mb-6">Siga-nos no Instagram</p>
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/thay.santos_beauty?igsh=ejNnZ3pjYzByNHJl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-pink-500 transition-colors"
                >
                  <Instagram className="text-pink-500" size={24} />
                  <span className="text-sm font-medium notranslate" translate="no">@thay.santos_beauty</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/thay.jpg" 
            className="w-full h-full object-cover opacity-50"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/70 to-[#050505]"></div>
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-pink-500/30 text-pink-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 bg-pink-500/5">
              Estúdio de Beleza Premium
            </span>
            <h1 className="text-7xl md:text-9xl font-serif italic mb-8 leading-[0.9] tracking-tighter">
              A Arte de <br /> <span className="text-pink-500 text-glow">Encantar</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Especialistas em realçar sua beleza natural com técnicas avançadas de extensão de cílios e design de sobrancelhas.
            </p>
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 px-4">
              <button 
                onClick={() => document.getElementById('cílios')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 sm:w-auto bg-pink-600 hover:bg-pink-500 text-white px-4 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-[10px] sm:text-sm uppercase tracking-wide sm:tracking-widest transition-all shadow-2xl shadow-pink-600/20 group whitespace-nowrap"
              >
                Procedimentos <ArrowRight className="inline-block ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" size={14} />
              </button>
              <button 
                onClick={() => setShowStoryModal(true)}
                className="flex-1 sm:w-auto text-white border border-white/10 hover:bg-white/5 px-4 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-[10px] sm:text-sm uppercase tracking-wide sm:tracking-widest transition-all whitespace-nowrap"
              >
                História
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pink-500"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-8 h-12"
          >
            <path d="M12 2C12 2 11 4 10 10C9 16 9 22 9 22" />
            <path d="M12 2C12 2 13 4 14 10C15 16 15 22 15 22" />
            <line x1="10.5" y1="6" x2="13.5" y2="6" strokeWidth="0.5" opacity="0.5" />
            <line x1="10" y1="10" x2="14" y2="10" strokeWidth="0.5" opacity="0.5" />
          </svg>
          <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Arraste</span>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-8 border-y border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-2 grid grid-cols-4 gap-2 md:gap-12">
          {[
            { icon: Sparkles, title: "Qualidade Premium", desc: "Materiais importados." },
            { icon: ShieldCheck, title: "Biossegurança", desc: "Ambiente esterilizado." },
            { icon: Award, title: "Especialistas", desc: "Certificadas." },
            { icon: Heart, title: "Atendimento VIP", desc: "Experiência exclusiva." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-2 group-hover:bg-pink-500/10 group-hover:scale-110 transition-all duration-500">
                <item.icon className="text-pink-500" size={18} />
              </div>
              <h4 className="text-[13px] md:text-base font-serif italic mb-1 leading-tight">{item.title}</h4>
              <p className="text-zinc-500 text-[9px] md:text-[11px] leading-tight max-w-[120px]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <main>
        {(filterCategory === 'All' || filterCategory === 'Cílios') && renderServiceSection("Extensão de Cílios", "Cílios", 0)}
        
        {(filterCategory === 'All' || filterCategory === 'Sobrancelha') && renderServiceSection("Design de Sobrancelhas", "Sobrancelha", 1)}

        {/* Testimonials */}
        <section className="py-32 bg-[#080808] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif italic mb-4">O que dizem nossas clientes</h2>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-pink-500 fill-pink-500" />)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-8">
              {REVIEWS.map((review, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-4 md:p-10 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 relative"
                >
                  <span className="text-3xl md:text-6xl font-serif text-pink-500/20 absolute top-3 left-3 md:top-6 md:left-6">"</span>
                  <p className="text-zinc-300 italic mb-4 md:mb-8 relative z-10 leading-relaxed text-[10px] md:text-base line-clamp-4 md:line-clamp-none">{review.text}</p>
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold text-[10px] md:text-base">
                      {review.name[0]}
                    </div>
                    <div>
                      <h5 className="font-medium text-[10px] md:text-sm leading-tight">{review.name}</h5>
                      <span className="text-zinc-500 text-[7px] md:text-[10px] uppercase tracking-widest block">Verificada</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Info */}
        <section className="py-32 border-t border-white/5" id="contato">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif italic mb-8">Onde estamos</h3>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-pink-500/20 transition-all">
                  <MapPin className="text-pink-500" size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Endereço</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">Rua das Flores, 123 - Centro<br />São Paulo, SP - Brasil</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-pink-500/20 transition-all">
                  <Phone className="text-pink-500" size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Contato</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    <a href="https://wa.me/5535910180139" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                      (35) 91018-0139
                    </a>
                    <br />
                    <a href="mailto:thaysantoslashbeauty@gmail.com" className="hover:text-pink-500 transition-colors">
                      thaysantoslashbeauty@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-serif italic mb-8">Horários</h3>
              <div className="space-y-4">
                {[
                  { day: "Segunda - Sexta", time: "09:00 - 19:00" },
                  { day: "Sábado", time: "09:00 - 16:00" },
                  { day: "Domingo", time: "Fechado" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-zinc-400 text-sm">{item.day}</span>
                    <span className="text-white font-medium text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-serif italic mb-8">Siga-nos</h3>
              <p className="text-zinc-500 text-sm mb-8">Acompanhe nossos resultados diários e novidades exclusivas no Instagram.</p>
              <a 
                href="https://www.instagram.com/thay.santos_beauty?igsh=ejNnZ3pjYzByNHJl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-pink-500 hover:text-white px-8 py-4 rounded-2xl transition-all group"
              >
                <Instagram size={20} className="text-pink-500 group-hover:text-white" />
                <span className="font-bold text-sm notranslate" translate="no">@thay.santos_beauty</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black text-center border-t border-white/5">
        <div className="text-2xl font-serif italic text-pink-500 mb-6 notranslate" translate="no">Thay Santos Lash & Beauty</div>
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">&copy; 2026 <span translate="no" className="notranslate">Thay Santos</span>. Todos os direitos reservados.</p>
      </footer>

      {/* Modal / Card */}
      <AnimatePresence>
        {showNewsModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewsModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-[#121212] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
            >
              <button 
                onClick={() => setShowNewsModal(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pink-500 transition-all"
              >
                <X size={20} />
              </button>

              {/* Image Side - Appears first on mobile */}
              <div className="w-full md:w-1/2 h-64 md:h-auto order-first md:order-last p-4 md:p-6">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10">
                  <img 
                    src="/labios.jpg" 
                    alt="Micropigmentação Labial"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-pink-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">
                  <Sparkles size={14} />
                  Novidade no Studio!
                </div>
                <h2 className="text-3xl md:text-6xl font-serif italic text-white mb-4 md:mb-8 leading-[1.1]">
                  Micropigmentação <br /> Labial
                </h2>
                <p className="text-zinc-400 text-sm md:text-lg mb-6 md:mb-10 font-light leading-relaxed">
                  A micropigmentação labial é um procedimento estético que realça a cor natural dos lábios, melhora o contorno e proporciona aparência mais saudável e uniforme.
                </p>

                <div className="grid grid-cols-1 gap-y-3 md:gap-y-4 mb-8 md:mb-12">
                  {[
                    "Lábios mais definidos",
                    "Cor natural e duradoura",
                    "Aparência saudável",
                    "Procedimento moderno e seguro"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                        <Check size={10} className="md:size-[12px] text-pink-500" />
                      </div>
                      <span className="text-zinc-300 text-xs md:text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setShowNewsModal(false);
                    const element = document.getElementById('contato');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-pink-500 hover:bg-pink-400 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all w-full md:w-fit"
                >
                  Quero saber mais
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showCareModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCareModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-[#121212] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 p-8 md:p-16 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowCareModal(false)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pink-500 transition-all"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-12">
                <span className="text-pink-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Beleza & Saúde</span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-6 leading-tight">✨ Cuidados com seus cílios</h2>
                <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base">Para manter seu olhar impecável por mais tempo, siga estas recomendações essenciais de pós-procedimento.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { title: "Primeiras 24h", items: ["Não molhar os cílios", "Evitar vapor e sauna", "Não praticar exercícios intensos"] },
                  { title: "Higiene Diária", items: ["Lavar com shampoo neutro", "Usar escovinha própria", "Secar com cuidado (sem esfregar)"] },
                  { title: "O que Evitar", items: ["Demaquilantes oleosos", "Rímel à prova d'água", "Dormir de bruços"] }
                ].map((card, i) => (
                  <div 
                    key={i}
                    className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5"
                  >
                    <h3 className="text-lg md:text-xl font-serif italic mb-6 text-pink-500">{card.title}</h3>
                    <ul className="space-y-4">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-zinc-400 text-xs md:text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <button 
                  onClick={() => setShowCareModal(false)}
                  className="bg-pink-500 hover:bg-pink-400 text-white px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all"
                >
                  Entendi, obrigado!
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showStoryModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoryModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-[#121212] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
            >
              <button 
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pink-500 transition-all"
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto p-4 md:p-6">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 relative group">
                  <img 
                    src="/thay.jpg" 
                    alt="Thaiany Santos" 
                    translate="no"
                    className="w-full h-full object-cover grayscale-0 transition-all duration-700 scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <div className="text-2xl font-serif italic text-white notranslate" translate="no">Thaiany Santos</div>
                    <div className="text-pink-500 text-[10px] uppercase tracking-widest font-bold">Lash Designer & Specialist</div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center">
                <div className="mb-8">
                  <span className="text-pink-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Sobre Mim</span>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">Minha História</h2>
                </div>

                <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed overflow-y-auto pr-4 custom-scrollbar">
                  <p>
                    Meu nome é <span className="text-white font-medium notranslate" translate="no">Thaiany Santos</span> e sou apaixonada pelo mundo da beleza. Comecei a trabalhar com extensão de cílios com o objetivo de ajudar mulheres a se sentirem mais confiantes, bonitas e valorizadas.
                  </p>
                  <p>
                    Com o tempo fui me aperfeiçoando e ampliando meus serviços, trabalhando também com design de sobrancelhas e, em alguns momentos, maquiagem. Cada atendimento é feito com muito cuidado, dedicação e carinho, sempre pensando em realçar a beleza natural de cada cliente.
                  </p>
                  <p>
                    Busco sempre me aperfeiçoar para oferecer o melhor resultado para minhas clientes. Realizei cursos na área da beleza, principalmente em extensão de cílios e design de sobrancelhas, onde aprendi técnicas modernas, cuidados com higiene e procedimentos seguros para garantir qualidade em cada atendimento.
                  </p>
                  <p>
                    Estou sempre estudando novas tendências e técnicas, para trazer procedimentos atualizados e resultados cada vez mais bonitos e naturais.
                  </p>
                  <p className="italic text-pink-500/80">
                    "Acredito que a beleza vai muito além da aparência — ela está na confiança que cada mulher sente quando se olha no espelho e se sente incrível."
                  </p>
                  <p>
                    Meu objetivo é oferecer um atendimento de qualidade, em um ambiente confortável, onde cada cliente se sinta especial.
                  </p>
                  <div className="pt-4">
                    <span className="text-white font-serif italic text-xl">✨ Será um prazer cuidar da sua beleza!</span>
                  </div>
                </div>

                <div className="mt-10">
                  <button 
                    onClick={() => setShowStoryModal(false)}
                    className="bg-white text-black hover:bg-pink-500 hover:text-white px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Fechar História
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedModel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModel(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[95vh]"
            >
              <button 
                onClick={() => setSelectedModel(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-pink-500 transition-all"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-5/12 h-72 md:h-auto relative">
                <img 
                  src={selectedModel.image} 
                  alt={selectedModel.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:hidden"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-7/12 p-8 md:p-16 overflow-y-auto">
                <div className="mb-12">
                  <span className="text-pink-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{selectedModel.category}</span>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6 leading-tight">{selectedModel.name}</h2>
                  <p className="text-zinc-400 text-base leading-relaxed font-light mb-8">{selectedModel.description}</p>
                  
                  {selectedModel.category === 'Cílios' && (
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Tempo Estimado</span>
                        <span className="text-white font-medium flex items-center gap-2">
                          <Clock size={14} className="text-pink-500" />
                          {selectedModel.duration}
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Estilo / Volume</span>
                        <span className="text-white font-medium flex items-center gap-2">
                          <Sparkles size={14} className="text-pink-500" />
                          {selectedModel.style}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                  {/* Date Selection */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                      <Calendar size={14} className="text-pink-500" />
                      Data do Procedimento
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-pink-500 outline-none transition-all text-white"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                      <Clock size={14} className="text-pink-500" />
                      Horários
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl text-[10px] font-bold border transition-all ${
                            selectedTime === time 
                            ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-600/20' 
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:border-pink-500/30'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-4">
                    <CreditCard size={14} className="text-pink-500" />
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method}
                        onClick={() => setSelectedPayment(method)}
                        className={`py-4 rounded-2xl text-[10px] font-bold border flex flex-col items-center justify-center gap-2 transition-all ${
                          selectedPayment === method 
                          ? 'bg-pink-500/10 border-pink-500 text-pink-500' 
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:border-pink-500/30'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="text-center sm:text-left">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-widest block mb-1">Investimento</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-zinc-600 line-through text-sm">R$ {selectedModel.price}</span>
                      <span className="text-4xl font-bold text-pink-500">R$ {selectedModel.discountPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500 text-white font-bold px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl shadow-pink-600/20 group"
                  >
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Confirmar Agendamento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
