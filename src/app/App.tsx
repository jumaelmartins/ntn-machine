import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import logoIcon from '../imports/logo-icon.png';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight, BarChart3, Bot, Calendar, CheckCircle2,
  ChevronDown, HelpCircle, LineChart, MessageCircle,
  Package, Settings, ShieldCheck, Target, TrendingUp,
  Workflow, Zap,
} from 'lucide-react';

const siteTitle = 'NTN MACHINE | Automação, IA e sistemas sob medida';
const siteDescription = 'NTN MACHINE cria automações, chatbots com IA, sistemas sob medida e dashboards para reduzir gargalos operacionais em empresas.';
const contactEmail = 'contato@ntnmachine.com';
const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent('Diagnóstico gratuito NTN MACHINE')}&body=${encodeURIComponent('Olá, quero mapear gargalos e entender como automatizar minha empresa.')}`;
const whatsappNumber = '5571996575727';
const whatsappMessage = 'Olá, quero mapear gargalos e entender como automatizar minha empresa.';
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

function buildWhatsAppHref(message = whatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function trackConversionEvent(eventName: string, details: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const analyticsWindow = window as Window & {
    dataLayer?: unknown[];
    gtag?: (command: string, eventName: string, details: Record<string, string | number>) => void;
    fbq?: (command: string, eventName: string, details: Record<string, string | number>) => void;
  };

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push({ event: eventName, ...details });
  analyticsWindow.gtag?.('event', eventName, details);
  analyticsWindow.fbq?.('trackCustom', eventName, details);
}

function setMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateDocumentMetadata(service?: Service) {
  if (typeof document === 'undefined') {
    return;
  }

  const title = service ? `${service.title} | NTN MACHINE` : siteTitle;
  const description = service?.metaDescription ?? siteDescription;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const structuredData = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description,
        areaServed: 'BR',
        provider: {
          '@type': 'Organization',
          name: 'NTN MACHINE',
          email: contactEmail,
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'NTN MACHINE',
        email: contactEmail,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+${whatsappNumber}`,
          contactType: 'sales',
          availableLanguage: 'Portuguese',
        },
      };

  document.title = title;
  setMetaContent('name', 'description', description);
  setMetaContent('property', 'og:title', title);
  setMetaContent('property', 'og:description', description);
  setMetaContent('property', 'og:type', service ? 'article' : 'website');
  setMetaContent('property', 'og:url', url);
  setMetaContent('name', 'twitter:card', 'summary_large_image');
  setMetaContent('name', 'twitter:title', title);
  setMetaContent('name', 'twitter:description', description);

  let script = document.querySelector('#ntn-structured-data') as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = 'ntn-structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(structuredData);
}

interface Service {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  href: string;
  eyebrow: string;
  description: string;
  pain: string;
  howItWorks: string[];
  deliverables: string[];
  outcomes: string[];
  products: string[];
  whatsappMessage: string;
  offerTitle: string;
  offerDescription: string;
  metaDescription: string;
  position: string;
  lineEnd: {
    x: string;
    y: string;
  };
  delay: number;
}

const services: Service[] = [
  {
    icon: Bot,
    title: 'Chatbots & IA',
    href: '/solucoes/chatbots-ia',
    eyebrow: 'Atendimento inteligente',
    description: 'Atenda clientes 24/7 sem contratar mais pessoas. Sistema responde, qualifica e agenda sozinho.',
    pain: 'Clientes chegam por WhatsApp, Instagram e site, mas a equipe demora para responder, perde contexto e deixa oportunidades esfriarem.',
    howItWorks: [
      'A IA recebe o primeiro contato e entende a intenção do cliente.',
      'O sistema qualifica o lead, responde dúvidas frequentes e coleta dados importantes.',
      'Quando existe oportunidade real, o atendimento agenda, encaminha ou aciona uma pessoa da equipe.',
    ],
    deliverables: ['Chatbot treinado para seu negócio', 'Fluxos de qualificação', 'Integração com WhatsApp/site', 'Painel de conversas e leads'],
    outcomes: ['Atendimento fora do horário comercial', 'Menos perda de leads', 'Equipe humana focada nos casos que realmente precisam dela'],
    products: ['Assistente de pré-venda', 'Bot de suporte', 'Qualificador de leads', 'Agente de agendamento'],
    whatsappMessage: 'Olá, quero entender como Chatbots & IA podem reduzir perda de leads e acelerar atendimento na minha empresa.',
    offerTitle: 'Assistente IA para WhatsApp',
    offerDescription: 'Fluxo de atendimento treinado para responder, qualificar e acionar sua equipe só quando existe oportunidade real.',
    metaDescription: 'Chatbots com IA para atendimento, qualificação de leads e agendamentos automáticos no WhatsApp, site e canais digitais.',
    position: 'top-0 left-1/2 -translate-x-1/2',
    lineEnd: { x: '50%', y: '11%' },
    delay: 0.2,
  },
  {
    icon: Settings,
    title: 'Sistemas sob medida',
    href: '/solucoes/sistemas-sob-medida',
    eyebrow: 'Operação sob controle',
    description: 'Acabou a gambiarra com planilhas. Sistema feito do zero para o SEU negócio funcionar melhor.',
    pain: 'A empresa cresce, mas o processo continua espalhado em planilhas, grupos de WhatsApp e tarefas manuais que ninguém consegue auditar.',
    howItWorks: [
      'Mapeamos o processo real e identificamos onde o trabalho manual trava a operação.',
      'Desenhamos telas, permissões e automações alinhadas à rotina da equipe.',
      'Entregamos em etapas para validar rápido e evoluir com dados reais de uso.',
    ],
    deliverables: ['Sistema web personalizado', 'Controle de usuários e permissões', 'Relatórios operacionais', 'Integrações com ferramentas atuais'],
    outcomes: ['Menos retrabalho', 'Processos padronizados', 'Informação centralizada para decidir melhor'],
    products: ['CRM interno', 'Portal operacional', 'Sistema de ordens de serviço', 'Gestão de processos'],
    whatsappMessage: 'Olá, quero entender um sistema sob medida para tirar minha operação de planilhas e processos manuais.',
    offerTitle: 'MVP de sistema sob medida',
    offerDescription: 'Primeira versão enxuta para centralizar processo, usuários, dados e relatórios sem travar a operação.',
    metaDescription: 'Sistemas sob medida para empresas que precisam centralizar processos, reduzir planilhas e ganhar controle operacional.',
    position: 'top-[22%] right-0',
    lineEnd: { x: '84%', y: '30%' },
    delay: 0.3,
  },
  {
    icon: Package,
    title: 'Controle de estoque',
    href: '/solucoes/controle-de-estoque',
    eyebrow: 'Estoque em tempo real',
    description: 'Pare de perder dinheiro com falta ou excesso de produtos. Controle total em tempo real.',
    pain: 'Sem controle confiável, a empresa compra errado, vende item indisponível e só percebe perdas quando o caixa já foi impactado.',
    howItWorks: [
      'Registramos entradas, saídas, reservas e ajustes em uma base única.',
      'Alertas indicam ruptura, excesso e itens parados antes que virem prejuízo.',
      'Dashboards mostram giro, margem e necessidade de compra por período.',
    ],
    deliverables: ['Cadastro de produtos', 'Movimentação de estoque', 'Alertas de mínimo e excesso', 'Relatórios de giro e perdas'],
    outcomes: ['Menos capital parado', 'Redução de faltas', 'Compras mais previsíveis'],
    products: ['Controle de almoxarifado', 'Gestão de inventário', 'Painel de reposição', 'Rastreamento de movimentações'],
    whatsappMessage: 'Olá, quero entender uma solução de controle de estoque para reduzir falta, excesso e perdas na minha operação.',
    offerTitle: 'Painel de estoque e reposição',
    offerDescription: 'Controle de entradas, saídas, alertas de mínimo e visão de giro para comprar melhor e perder menos.',
    metaDescription: 'Controle de estoque em tempo real com alertas, relatórios de giro e redução de perdas operacionais.',
    position: 'bottom-[22%] right-0',
    lineEnd: { x: '84%', y: '70%' },
    delay: 0.4,
  },
  {
    icon: Calendar,
    title: 'Agendamentos inteligentes',
    href: '/solucoes/agendamentos-inteligentes',
    eyebrow: 'Agenda sem atrito',
    description: 'Reduza faltas em até 80%. Lembretes automáticos e confirmação por WhatsApp/SMS.',
    pain: 'Agenda manual gera buracos, remarcações confusas, clientes esquecidos e equipe gastando tempo confirmando horários.',
    howItWorks: [
      'O cliente escolhe ou solicita horários por um fluxo simples.',
      'O sistema confirma, envia lembretes e libera remarcações com regra definida.',
      'A equipe acompanha agenda, presença e faltas em um painel único.',
    ],
    deliverables: ['Agenda online', 'Confirmação automática', 'Lembretes por WhatsApp/SMS', 'Painel de presença e faltas'],
    outcomes: ['Menos no-show', 'Mais previsibilidade de atendimento', 'Menos tempo gasto em confirmação manual'],
    products: ['Agenda para clínicas', 'Agenda comercial', 'Fila de atendimento', 'Confirmação automática'],
    whatsappMessage: 'Olá, quero entender agendamentos inteligentes para reduzir faltas e confirmações manuais.',
    offerTitle: 'Agenda inteligente com confirmação',
    offerDescription: 'Agenda online com lembretes, confirmação automática e painel de presença para reduzir buracos na rotina.',
    metaDescription: 'Agendamentos inteligentes com confirmação automática por WhatsApp, lembretes e redução de faltas.',
    position: 'bottom-0 left-1/2 -translate-x-1/2',
    lineEnd: { x: '50%', y: '89%' },
    delay: 0.5,
  },
  {
    icon: BarChart3,
    title: 'Dashboards & relatórios',
    href: '/solucoes/dashboards-relatorios',
    eyebrow: 'Decisão com dados',
    description: 'Veja exatamente onde está ganhando ou perdendo dinheiro. Decisões baseadas em dados reais.',
    pain: 'Sem indicadores claros, decisões viram opinião: o gestor não sabe qual canal vende, onde perde margem ou qual processo atrasa.',
    howItWorks: [
      'Conectamos as fontes de dados que já existem no negócio.',
      'Organizamos indicadores por área, prioridade e frequência de análise.',
      'Criamos painéis que mostram tendência, gargalos e alertas acionáveis.',
    ],
    deliverables: ['Dashboard executivo', 'Relatórios recorrentes', 'Indicadores por área', 'Alertas de variação'],
    outcomes: ['Decisões mais rápidas', 'Gargalos visíveis', 'Acompanhamento de metas sem planilhas manuais'],
    products: ['Dashboard financeiro', 'Painel comercial', 'Relatório operacional', 'Indicadores de atendimento'],
    whatsappMessage: 'Olá, quero entender dashboards e relatórios para enxergar gargalos e indicadores da minha empresa.',
    offerTitle: 'Dashboard de gestão',
    offerDescription: 'Painéis executivos e operacionais conectados às fontes de dados que a empresa já usa.',
    metaDescription: 'Dashboards e relatórios para gestão com indicadores de vendas, financeiro, atendimento e operação.',
    position: 'bottom-[22%] left-0',
    lineEnd: { x: '16%', y: '70%' },
    delay: 0.6,
  },
  {
    icon: Zap,
    title: 'Automações & integrações',
    href: '/solucoes/automacoes-integracoes',
    eyebrow: 'Ferramentas conectadas',
    description: 'Seus sistemas conversando sozinhos. Menos retrabalho, menos erro, mais resultado.',
    pain: 'Quando cada ferramenta funciona isolada, a equipe copia dados de um lado para outro, erra informação e perde tempo em tarefa repetitiva.',
    howItWorks: [
      'Identificamos tarefas repetitivas e pontos onde dados são duplicados.',
      'Criamos automações entre sistemas, planilhas, formulários, CRMs e canais de atendimento.',
      'Monitoramos falhas e deixamos rastros para a equipe acompanhar o que foi automatizado.',
    ],
    deliverables: ['Mapeamento de integrações', 'Automações de rotina', 'Sincronização entre sistemas', 'Logs e alertas de falha'],
    outcomes: ['Menos digitação manual', 'Dados mais consistentes', 'Processos rodando mesmo fora do horário comercial'],
    products: ['Integração CRM/WhatsApp', 'Automação de propostas', 'Sincronização de planilhas', 'Robôs de rotina administrativa'],
    whatsappMessage: 'Olá, quero entender automações e integrações para reduzir retrabalho entre minhas ferramentas.',
    offerTitle: 'Sprint de Automação',
    offerDescription: 'Mapeamento e entrega rápida de automações para remover tarefas repetitivas de alto impacto.',
    metaDescription: 'Automações e integrações entre sistemas, planilhas, CRMs, WhatsApp e rotinas administrativas.',
    position: 'top-[22%] left-0',
    lineEnd: { x: '16%', y: '30%' },
    delay: 0.7,
  },
];

const stats = [
  { value: '+100', label: 'empresas transformadas' },
  { value: '+250', label: 'sistemas entregues' },
  { value: '+10.000', label: 'horas economizadas' },
  { value: '+40%', label: 'aumento médio de lucro' },
];

const impactItems = [
  {
    icon: Zap,
    title: 'Menos custo operacional',
    description: 'Reduza até 60% do tempo gasto em tarefas repetitivas e erros humanos',
  },
  {
    icon: Target,
    title: 'Controle total do negócio',
    description: 'Saiba exatamente o que está acontecendo na sua empresa em tempo real',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento sem contratar',
    description: 'Atenda 3x mais clientes sem aumentar sua equipe',
  },
];

const proofItems = [
  {
    title: 'Atendimento que não deixa lead esfriar',
    before: 'Mensagens espalhadas e resposta manual atrasando oportunidades.',
    after: 'Triagem automática, histórico centralizado e repasse para a equipe certa.',
  },
  {
    title: 'Operação que sai da planilha',
    before: 'Controle manual sem rastreabilidade e difícil de auditar.',
    after: 'Fluxo padronizado, permissões por usuário e indicadores em tempo real.',
  },
  {
    title: 'Gestão que vê o gargalo antes do prejuízo',
    before: 'Decisões tomadas só depois que o problema aparece no caixa.',
    after: 'Alertas, dashboards e relatórios para agir antes da perda crescer.',
  },
];

const offers = [
  {
    icon: Target,
    title: 'Diagnóstico de Gargalos',
    description: 'Mapeamento rápido para identificar onde tempo, dinheiro e oportunidades estão vazando.',
    idealFor: 'Empresas que sabem que perdem eficiência, mas ainda não sabem por onde começar.',
    delivery: 'Mapa de gargalos, prioridade de automação e próximo passo recomendado.',
  },
  {
    icon: Zap,
    title: 'Sprint de Automação',
    description: 'Entrega enxuta para eliminar uma rotina manual de alto impacto em poucos dias.',
    idealFor: 'Times que repetem tarefas em planilhas, WhatsApp, CRM ou sistemas internos.',
    delivery: 'Automação funcional, teste com a equipe e ajustes de adoção.',
  },
  {
    icon: Workflow,
    title: 'MVP de Sistema sob Medida',
    description: 'Primeira versão de um sistema próprio para centralizar processo, dados e responsabilidades.',
    idealFor: 'Operações que cresceram além da planilha e precisam de controle.',
    delivery: 'Fluxo principal, painel de gestão, usuários e relatórios essenciais.',
  },
  {
    icon: Bot,
    title: 'Assistente IA para WhatsApp',
    description: 'Atendimento inteligente para responder, qualificar e encaminhar leads automaticamente.',
    idealFor: 'Empresas que recebem contatos fora do horário ou perdem vendas por demora.',
    delivery: 'Fluxo treinado, integração com canal e painel de acompanhamento.',
  },
  {
    icon: LineChart,
    title: 'Dashboard de Gestão',
    description: 'Painéis para enxergar vendas, operação, atendimento e gargalos sem montar relatório manual.',
    idealFor: 'Gestores que precisam decidir com dados confiáveis e recorrentes.',
    delivery: 'Indicadores, fonte de dados conectada e alertas de variação.',
  },
];

const faqs = [
  {
    question: 'Preciso trocar meus sistemas atuais?',
    answer: 'Na maioria dos casos, não. O primeiro caminho é integrar o que já existe e automatizar os pontos que geram mais retrabalho.',
  },
  {
    question: 'Isso funciona para empresa pequena?',
    answer: 'Funciona quando existe repetição operacional clara: atendimento, agenda, estoque, relatórios, propostas ou tarefas administrativas recorrentes.',
  },
  {
    question: 'Quanto tempo leva para ver resultado?',
    answer: 'Projetos menores podem começar com uma sprint enxuta. Sistemas maiores entram em etapas para validar rápido e evoluir com segurança.',
  },
  {
    question: 'Como vocês definem o que automatizar primeiro?',
    answer: 'Priorizamos impacto financeiro, frequência da tarefa, risco de erro e facilidade de implantação para atacar o gargalo com melhor retorno.',
  },
];

type DiagnosticAreaId = 'atendimento' | 'agenda' | 'estoque' | 'relatorios' | 'integracoes' | 'sistemas';
type DiagnosticSymptomId = 'leads' | 'atraso' | 'controle' | 'retrabalho' | 'dados';
type DiagnosticUrgencyId = 'agora' | 'avaliando' | 'planejando';

const diagnosticAreas: Array<{
  id: DiagnosticAreaId;
  label: string;
  symptomHint: string;
  serviceHref: string;
  solutionTitle: string;
  offerTitle: string;
  reason: string;
}> = [
  {
    id: 'atendimento',
    label: 'Atendimento',
    symptomHint: 'Leads esfriando',
    serviceHref: '/solucoes/chatbots-ia',
    solutionTitle: 'Chatbots & IA',
    offerTitle: 'Assistente IA para WhatsApp',
    reason: 'O problema é responder tarde, perder contexto e deixar oportunidades esfriarem.',
  },
  {
    id: 'agenda',
    label: 'Agenda',
    symptomHint: 'Faltas e remarcações',
    serviceHref: '/solucoes/agendamentos-inteligentes',
    solutionTitle: 'Agendamentos inteligentes',
    offerTitle: 'Agenda inteligente com confirmação',
    reason: 'O problema é organizar horários, confirmar presença e reduzir no-show.',
  },
  {
    id: 'estoque',
    label: 'Estoque',
    symptomHint: 'Compra errada ou ruptura',
    serviceHref: '/solucoes/controle-de-estoque',
    solutionTitle: 'Controle de estoque',
    offerTitle: 'Painel de estoque e reposição',
    reason: 'O problema é operar sem visibilidade de entradas, saídas e itens críticos.',
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    symptomHint: 'Decisão sem dados',
    serviceHref: '/solucoes/dashboards-relatorios',
    solutionTitle: 'Dashboards & relatórios',
    offerTitle: 'Dashboard de gestão',
    reason: 'O problema é decidir sem enxergar gargalos, metas e tendência de resultado.',
  },
  {
    id: 'integracoes',
    label: 'Integrações',
    symptomHint: 'Retrabalho entre sistemas',
    serviceHref: '/solucoes/automacoes-integracoes',
    solutionTitle: 'Automações & integrações',
    offerTitle: 'Sprint de Automação',
    reason: 'O problema é copiar dados entre ferramentas, errar informação e perder tempo.',
  },
  {
    id: 'sistemas',
    label: 'Processos internos',
    symptomHint: 'Planilhas e controles paralelos',
    serviceHref: '/solucoes/sistemas-sob-medida',
    solutionTitle: 'Sistemas sob medida',
    offerTitle: 'MVP de sistema sob medida',
    reason: 'O problema é crescer sem um sistema central para a operação.',
  },
];

const diagnosticSymptoms: Array<{
  id: DiagnosticSymptomId;
  label: string;
  note: string;
}> = [
  { id: 'leads', label: 'Perda de leads', note: 'Respostas lentas e pouco contexto.' },
  { id: 'atraso', label: 'Atrasos e filas', note: 'A operação acumula pedidos e retrabalho.' },
  { id: 'controle', label: 'Falta de controle', note: 'Ninguém confia 100% nos números.' },
  { id: 'retrabalho', label: 'Retrabalho manual', note: 'A equipe repete tarefas o dia todo.' },
  { id: 'dados', label: 'Sem dados claros', note: 'A decisão chega depois do problema.' },
];

const diagnosticUrgencies: Array<{
  id: DiagnosticUrgencyId;
  label: string;
  nextStep: string;
}> = [
  { id: 'agora', label: 'Quero resolver agora', nextStep: 'Diagnóstico de 15 minutos e prioridade de automação.' },
  { id: 'avaliando', label: 'Estou avaliando', nextStep: 'Mapa de oportunidades e custo de implantação.' },
  { id: 'planejando', label: 'Quero planejar', nextStep: 'Desenho da solução e cronograma da primeira entrega.' },
];

export default function App() {
  const currentPath = window.location.pathname;
  const selectedService = services.find((service) => service.href === currentPath);

  useEffect(() => {
    updateDocumentMetadata(selectedService);
  }, [selectedService]);

  return selectedService ? <SolutionPage service={selectedService} /> : <LandingPage />;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10 bg-black border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-3.5 px-4 md:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logoIcon} alt="NTN MACHINE" className="w-7 h-7 flex-shrink-0 object-contain" />
            <span className="font-outfit font-extrabold text-white text-[15px] tracking-[2px] truncate">
              NTN MACHINE
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-7">
            <a href="#solucoes" className="font-space-grotesk text-[13px] font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }} onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>Soluções</a>
            <a href="#processo" className="font-space-grotesk text-[13px] font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }} onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>Processo</a>
            <a href="#contato" className="font-space-grotesk text-[13px] font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }} onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>Contato</a>
          </div>
          <motion.a
            href={buildWhatsAppHref(whatsappMessage)}
            onClick={() => trackConversionEvent('whatsapp_header_click', { page: 'landing' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0 px-4 sm:px-5 py-2 rounded-lg font-space-grotesk font-semibold text-[13px] text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            Falar no WhatsApp
          </motion.a>
        </nav>
      </header>

      <HeroSection />

      <SolutionsSection />

      <SocialProofSection />
      <DiagnosticGuidedSection />
      <WhatsAppConversionSection />

      <ProductizedOffersSection />
      <ProcessSection />
      <FAQSection />

      <CTAFinalSection />

      <SiteFooter />
      <FloatingWhatsAppButton />
    </div>
  );
}

function AnimatedStatValue({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const numericValue = Number(value.replace(/[^\d]/g, ''));
  const suffix = value.replace(/[+\d.,]/g, '');
  const prefix = value.startsWith('+') ? '+' : '';

  useEffect(() => {
    const controls = animate(motionValue, numericValue, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [motionValue, numericValue]);

  return <>{prefix}{displayValue.toLocaleString('pt-BR')}{suffix}</>;
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });
  const heroAuroraLayers = [
    {
      className: 'right-[-8%] top-[-12%] h-[520px] w-[760px] rounded-[46%]',
      background: 'radial-gradient(80% 120% at 72% 18%, rgba(255,255,255,0.14) 0%, rgba(148,163,184,0.10) 28%, rgba(17,24,39,0.04) 52%, transparent 74%)',
      filter: 'blur(18px)',
      opacity: 0.85,
      animate: { x: [0, -18, 0], y: [0, 14, 0], scale: [1, 1.03, 1] },
      transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const },
    },
    {
      className: 'right-[10%] top-[6%] h-[380px] w-[560px] rounded-[50%]',
      background: 'radial-gradient(74% 116% at 36% 56%, rgba(255,255,255,0.10) 0%, rgba(148,163,184,0.08) 32%, rgba(17,24,39,0.03) 56%, transparent 78%)',
      filter: 'blur(24px)',
      opacity: 0.58,
      animate: { x: [0, 12, 0], y: [0, -12, 0], scale: [1, 1.05, 1] },
      transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' as const },
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28 md:py-36 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #020202 0%, #111827 52%, #050505 100%)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(120% 86% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(17,24,39,0.02) 34%, transparent 66%)',
          }}
        />
        <motion.div
          className="absolute right-[-16%] top-[-28%] h-[640px] w-[880px] rounded-[48%]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(17,24,39,0.01) 60%, transparent 100%)',
            filter: 'blur(60px)',
            opacity: 0.38,
          }}
          animate={{ x: [0, -10, 0], y: [0, 8, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        {heroAuroraLayers.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute ${shape.className}`}
            style={{
              background: shape.background,
              filter: shape.filter,
              opacity: shape.opacity,
            }}
            animate={shape.animate}
            transition={shape.transition}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(2,2,2,0.12) 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.18) 100%)',
          }}
        />
      </div>

      <motion.div style={{ y }} className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse-dot" />
          <span className="font-space-grotesk font-bold text-[11px] tracking-[1.5px] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Software & Automação com IA
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-outfit font-bold text-white leading-[1.0] tracking-[-2px] mb-6 text-[48px] sm:text-[60px] md:text-[72px]"
        >
          Pare de perder dinheiro<br className="hidden sm:block" />{' '}
          com processos manuais
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-space-grotesk text-[17px] leading-[1.65] mb-10 max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Planilhas, WhatsApp e retrabalho estão custando tempo e clientes. Desenvolvemos sistemas que eliminam processos manuais e aumentam seu lucro em até 40%.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <motion.a
            href={buildWhatsAppHref('Olá, quero automatizar minha empresa e mapear meus principais gargalos.')}
            onClick={() => trackConversionEvent('whatsapp_hero_click', { page: 'landing' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-white text-black font-space-grotesk font-extrabold text-[15px] transition-opacity hover:opacity-90"
            style={{ boxShadow: '0 4px 20px rgba(255,255,255,0.15)' }}
          >
            <MessageCircle size={18} /> Quero automatizar
          </motion.a>
          <motion.a
            href="#processo"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] font-space-grotesk font-semibold text-[15px] transition-all"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            Ver processo
          </motion.a>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 max-w-[580px] mx-auto rounded-2xl overflow-hidden"
          style={{ gap: '1px', background: 'rgba(255,255,255,0.07)' }}
        >
          {stats.map((stat, i) => {
            const suffix = stat.value.replace(/[+\d.,]/g, '');
            const prefix = stat.value.startsWith('+') ? '+' : '';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="py-4 text-center"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="font-outfit font-black text-white text-[26px] leading-none mb-1">
                  {statsInView ? <AnimatedStatValue value={stat.value} /> : `${prefix}0${suffix}`}
                </div>
                <div className="font-space-grotesk text-[10px] uppercase tracking-[0.5px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solucoes" className="py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase text-[#374151] mb-3">
            O que entregamos
          </p>
          <h2 className="font-outfit font-extrabold text-[#111827] text-[34px] sm:text-[40px] md:text-[44px] tracking-[-0.8px] leading-[1.1] mb-4">
            Como eliminamos seus gargalos
          </h2>
          <p className="font-space-grotesk text-[15px] text-[#6b7280] max-w-xl mx-auto leading-[1.65]">
            Sistemas personalizados que resolvem seus problemas reais — do diagnóstico à entrega em produção.
          </p>
        </motion.div>

        {/* Desktop: floating diagram */}
        <div className="hidden lg:block relative min-h-[820px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(55,65,81,0.08)" />
                <stop offset="50%" stopColor="rgba(55,65,81,0.5)" />
                <stop offset="100%" stopColor="rgba(55,65,81,0.08)" />
              </linearGradient>
            </defs>
            {services.map((service) => (
              <ConnectionLine key={service.title} service={service} />
            ))}
          </svg>
          {/* Central logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src={logoIcon}
              alt="NTN MACHINE"
              className="w-20 h-20 object-contain"
              style={{ filter: 'drop-shadow(0 8px 32px rgba(55,65,81,0.25))' }}
            />
          </motion.div>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} floating />
          ))}
        </div>

        {/* Mobile: grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiagnosticGuidedSection() {
  const [areaId, setAreaId] = useState<DiagnosticAreaId>('atendimento');
  const [symptomId, setSymptomId] = useState<DiagnosticSymptomId>('leads');
  const [urgencyId, setUrgencyId] = useState<DiagnosticUrgencyId>('agora');

  const selectedArea = diagnosticAreas.find((o) => o.id === areaId) ?? diagnosticAreas[0];
  const selectedSymptom = diagnosticSymptoms.find((o) => o.id === symptomId) ?? diagnosticSymptoms[0];
  const selectedUrgency = diagnosticUrgencies.find((o) => o.id === urgencyId) ?? diagnosticUrgencies[0];
  const selectedService = services.find((s) => s.href === selectedArea.serviceHref) ?? services[0];
  const diagnosticWhatsAppMessage = `Olá, fiz o diagnóstico no site. Meu gargalo é ${selectedArea.label}, o sintoma é ${selectedSymptom.label} e minha urgência é ${selectedUrgency.label}. Quero entender ${selectedArea.offerTitle} para minha empresa.`;
  const diagnosticWhatsAppHref = buildWhatsAppHref(diagnosticWhatsAppMessage);

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase text-[#374151] mb-3 flex items-center gap-2">
            <Workflow size={14} /> Diagnóstico guiado de gargalos
          </p>
          <h2 className="font-outfit font-extrabold text-[#111827] text-[32px] sm:text-[38px] md:text-[42px] tracking-[-0.8px] leading-[1.1] mb-4">
            Qual é o principal gargalo da sua operação?
          </h2>
          <p className="font-space-grotesk text-[15px] text-[#6b7280] leading-[1.65] max-w-xl mb-10">
            Escolha o tipo de travamento mais próximo do seu cenário. O site devolve a solução mais provável e o próximo passo.
          </p>

          <div className="grid gap-8">
            {/* Área */}
            <div>
              <h3 className="font-outfit font-bold text-[#111827] text-[14px] mb-3">1. Onde está travando?</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {diagnosticAreas.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => { setAreaId(opt.id); trackConversionEvent('diagnostic_area_select', { area: opt.label }); }}
                    className="rounded-lg p-3.5 text-left transition-all duration-150 font-space-grotesk"
                    style={{
                      border: `1px solid ${opt.id === areaId ? '#111827' : '#e5e7eb'}`,
                      background: opt.id === areaId ? '#111827' : '#fff',
                    }}
                  >
                    <span className="block text-[13px] font-semibold" style={{ color: opt.id === areaId ? '#fff' : '#374151' }}>{opt.label}</span>
                    <span className="block text-[12px] mt-1" style={{ color: opt.id === areaId ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{opt.symptomHint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sintoma */}
            <div>
              <h3 className="font-outfit font-bold text-[#111827] text-[14px] mb-3">2. Qual sintoma aparece mais?</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {diagnosticSymptoms.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => { setSymptomId(opt.id); trackConversionEvent('diagnostic_symptom_select', { symptom: opt.label }); }}
                    className="rounded-lg p-3.5 text-left transition-all duration-150 font-space-grotesk"
                    style={{
                      border: `1px solid ${opt.id === symptomId ? '#374151' : '#e5e7eb'}`,
                      background: opt.id === symptomId ? '#f3f4f6' : '#fff',
                    }}
                  >
                    <span className="block text-[13px] font-semibold" style={{ color: opt.id === symptomId ? '#111827' : '#374151' }}>{opt.label}</span>
                    <span className="block text-[12px] mt-1 text-[#9ca3af]">{opt.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgência */}
            <div>
              <h3 className="font-outfit font-bold text-[#111827] text-[14px] mb-3">3. Qual a urgência?</h3>
              <div className="grid gap-2 md:grid-cols-3">
                {diagnosticUrgencies.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => { setUrgencyId(opt.id); trackConversionEvent('diagnostic_urgency_select', { urgency: opt.label }); }}
                    className="rounded-lg px-4 py-3 text-left transition-all duration-150 font-space-grotesk text-[13px] font-semibold"
                    style={{
                      border: `1px solid ${opt.id === urgencyId ? '#111827' : '#e5e7eb'}`,
                      background: opt.id === urgencyId ? '#111827' : '#fff',
                      color: opt.id === urgencyId ? '#fff' : '#374151',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[14px] bg-white p-5 sm:p-6"
          style={{ border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
        >
          <p className="font-space-grotesk font-bold text-[10px] tracking-[1.5px] uppercase text-[#6b7280] mb-3 flex items-center gap-1.5">
            <LineChart size={13} /> Solução recomendada
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-outfit font-bold text-[#111827] text-[22px] tracking-[-0.4px] mb-2">{selectedArea.solutionTitle}</h3>
              <p className="font-space-grotesk text-[14px] text-[#6b7280] leading-[1.6] mb-6">{selectedArea.reason}</p>
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-3 rounded-[10px] p-4 mb-5" style={{ background: '#f9fafb', border: '1px solid #f3f4f6' }}>
            {[
              { label: 'Seu gargalo parece ser', value: selectedArea.label },
              { label: 'Sintoma principal', value: selectedSymptom.note },
              { label: 'Seu próximo passo', value: selectedUrgency.nextStep },
            ].map((item) => (
              <div key={item.label}>
                <span className="font-space-grotesk text-[11px] text-[#9ca3af] block mb-1">{item.label}</span>
                <p className="font-space-grotesk text-[13px] text-[#374151] leading-[1.5]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] p-4 mb-5" style={{ border: '1px solid #e5e7eb', background: '#fff' }}>
            <span className="font-space-grotesk font-bold text-[10px] tracking-[1px] uppercase text-[#374151] block mb-2">Oferta recomendada</span>
            <h4 className="font-outfit font-bold text-[#111827] text-[18px] mb-1.5 tracking-[-0.3px]">{selectedArea.offerTitle}</h4>
            <p className="font-space-grotesk text-[13px] text-[#6b7280] leading-[1.55]">{selectedService.offerDescription}</p>
          </div>

          <div className="rounded-[10px] p-4 mb-5" style={{ background: '#f9fafb', border: '1px solid #f3f4f6' }}>
            <span className="font-space-grotesk text-[11px] text-[#9ca3af] block mb-2">Mensagem pronta para o WhatsApp</span>
            <p className="font-space-grotesk text-[12px] text-[#6b7280] leading-[1.6]">{diagnosticWhatsAppMessage}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={selectedService.href}
              onClick={() => trackConversionEvent('diagnostic_solution_click', { service: selectedService.title })}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-space-grotesk font-semibold text-[14px] text-[#374151] transition-colors hover:bg-[#f3f4f6]"
              style={{ border: '1px solid #e5e7eb', background: '#fff' }}
            >
              Ver solução
            </a>
            <motion.a
              href={diagnosticWhatsAppHref}
              onClick={() => trackConversionEvent('diagnostic_whatsapp_click', { service: selectedService.title, area: selectedArea.label })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-space-grotesk font-bold text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ background: '#111827', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              Falar no WhatsApp <MessageCircle size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase text-[#374151] mb-3 flex items-center gap-2">
            <ShieldCheck size={14} /> Prova de valor
          </p>
          <h2 className="font-outfit font-extrabold text-[#111827] text-[32px] sm:text-[38px] md:text-[42px] tracking-[-0.8px] leading-[1.1] mb-4">
            Problemas que já destravamos
          </h2>
          <p className="font-space-grotesk text-[15px] text-[#6b7280] leading-[1.65]">
            Em vez de vender tecnologia pela tecnologia, partimos do problema operacional e transformamos em fluxo, painel ou automação.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {proofItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[14px] bg-white p-6"
              style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <h3 className="font-outfit font-bold text-[#111827] text-[16px] mb-5 leading-[1.3]">{item.title}</h3>
              <div className="grid gap-4 text-sm">
                <div>
                  <span className="font-space-grotesk font-bold text-[10px] tracking-[1px] uppercase text-[#d1d5db] block mb-2">Antes</span>
                  <p className="font-space-grotesk text-[13px] text-[#9ca3af] leading-[1.55]">{item.before}</p>
                </div>
                <div className="border-t pt-4" style={{ borderColor: '#f3f4f6' }}>
                  <span className="font-space-grotesk font-bold text-[10px] tracking-[1px] uppercase text-[#374151] block mb-2">Depois</span>
                  <p className="font-space-grotesk text-[13px] text-[#374151] leading-[1.55]">{item.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductizedOffersSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase text-[#374151] mb-3 flex items-center gap-2">
              <CheckCircle2 size={14} /> Ofertas claras
            </p>
            <h2 className="font-outfit font-extrabold text-[#111827] text-[32px] sm:text-[38px] md:text-[42px] tracking-[-0.8px] leading-[1.1] mb-3">
              Escolha o primeiro passo certo
            </h2>
            <p className="font-space-grotesk text-[15px] text-[#6b7280] leading-[1.65] max-w-xl">
              Empacotamos as soluções em formatos simples para reduzir incerteza e acelerar a primeira entrega.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            const offerMessage = `Olá, quero entender a oferta ${offer.title} da NTN MACHINE para minha empresa.`;
            const isFeatured = offer.title === 'MVP de Sistema sob Medida';

            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-full flex-col rounded-[12px] p-5"
                style={{
                  border: `1px solid ${isFeatured ? '#374151' : '#e5e7eb'}`,
                  background: '#fff',
                  boxShadow: isFeatured ? '0 4px 20px rgba(55,65,81,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px]"
                  style={{ background: isFeatured ? '#111827' : '#f3f4f6' }}
                >
                  <Icon size={20} color={isFeatured ? '#fff' : '#374151'} />
                </div>
                <h3 className="font-outfit font-bold text-[#111827] text-[16px] mb-2 tracking-[-0.2px]">{offer.title}</h3>
                <p className="font-space-grotesk text-[13px] text-[#6b7280] leading-[1.55]">{offer.description}</p>
                <div className="mt-4 grid gap-2.5 text-[13px]">
                  <div>
                    <span className="font-space-grotesk text-[11px] text-[#9ca3af] block mb-0.5">Ideal para</span>
                    <p className="font-space-grotesk text-[#374151] leading-[1.5]">{offer.idealFor}</p>
                  </div>
                  <div>
                    <span className="font-space-grotesk text-[11px] text-[#9ca3af] block mb-0.5">Entrega</span>
                    <p className="font-space-grotesk text-[#374151] leading-[1.5]">{offer.delivery}</p>
                  </div>
                </div>
                <a
                  href={buildWhatsAppHref(offerMessage)}
                  onClick={() => trackConversionEvent('offer_whatsapp_click', { offer: offer.title })}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 font-space-grotesk text-[12px] font-bold transition-colors"
                  style={{ color: isFeatured ? '#111827' : '#374151' }}
                >
                  Conversar sobre oferta <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhatsAppConversionSection() {
  const steps = [
    { icon: Target, title: 'Mapeamos gargalos', description: 'Você conta como a operação funciona hoje e onde o trabalho manual trava.' },
    { icon: BarChart3, title: 'Estimamos impacto', description: 'Identificamos onde automação pode reduzir tempo, erro ou perda de oportunidade.' },
    { icon: ArrowRight, title: 'Definimos o primeiro passo', description: 'Saímos da conversa com uma direção clara para começar pequeno e evoluir.' },
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-outfit font-extrabold text-[#111827] text-[32px] sm:text-[38px] md:text-[42px] tracking-[-0.8px] leading-[1.1] mb-3">
              Diagnóstico rápido pelo WhatsApp
            </h2>
            <p className="font-space-grotesk text-[15px] text-[#6b7280] leading-[1.65] max-w-xl">
              Em poucos minutos entendemos seu gargalo principal e indicamos o caminho mais simples para automatizar.
            </p>
          </motion.div>
          <motion.a
            href={buildWhatsAppHref('Olá, quero fazer um diagnóstico rápido pelo WhatsApp para mapear meus gargalos.')}
            onClick={() => trackConversionEvent('whatsapp_diagnostic_section_click', { page: 'landing' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] font-space-grotesk font-bold text-[14px] text-white px-7 py-3.5 transition-opacity hover:opacity-90 flex-shrink-0"
            style={{ background: '#111827', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
          >
            <MessageCircle size={20} /> Falar no WhatsApp
          </motion.a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[14px] bg-white p-6"
                style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ background: '#f3f4f6' }}>
                  <Icon size={20} color="#374151" />
                </div>
                <h3 className="font-outfit font-bold text-[#111827] text-[16px] mb-2">{step.title}</h3>
                <p className="font-space-grotesk text-[13px] text-[#6b7280] leading-[1.55]">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { step: '01', title: 'Diagnóstico gratuito', desc: 'Mapeamos onde você está perdendo dinheiro hoje' },
    { step: '02', title: 'Solução personalizada', desc: 'Desenhamos o sistema ideal para seu problema real' },
    { step: '03', title: 'Desenvolvimento ágil', desc: 'Entregamos em etapas para você ver resultado rápido' },
    { step: '04', title: 'Suporte + evolução', desc: 'Acompanhamos seu crescimento e ajustamos quando necessário' },
  ];

  return (
    <section id="processo" className="py-16 md:py-20 px-4 md:px-8 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase text-[#374151] mb-3">
            Como trabalhamos
          </p>
          <h2 className="font-outfit font-extrabold text-[#111827] text-[32px] sm:text-[38px] md:text-[44px] tracking-[-0.8px] leading-[1.1]">
            Do diagnóstico ao resultado em 4 etapas
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="font-outfit font-black text-[56px] leading-none mb-4" style={{ color: '#9ca3af' }}>
                {item.step}
              </div>
              <h3 className="font-outfit font-bold text-[#111827] text-[16px] mb-2">{item.title}</h3>
              <p className="font-space-grotesk text-[13px] text-[#6b7280] leading-[1.55]">{item.desc}</p>
              {i < 3 && (
                <div
                  className="hidden md:block absolute top-7 -right-4 w-8 h-px"
                  style={{ background: 'linear-gradient(90deg, #d1d5db, transparent)' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white transition-colors hover:bg-[#f9fafb]"
      >
        <span className="font-outfit font-bold text-[#111827] text-[15px] leading-[1.3]">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0 text-[#9ca3af]"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className="font-space-grotesk text-[13px] text-[#6b7280] leading-[1.65] px-5 py-4 border-t"
              style={{ borderColor: '#f3f4f6' }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase text-[#374151] mb-3 flex items-center gap-2">
            <HelpCircle size={14} /> Dúvidas comuns
          </p>
          <h2 className="font-outfit font-extrabold text-[#111827] text-[32px] sm:text-[38px] md:text-[44px] tracking-[-0.8px] leading-[1.1] mb-4">
            Antes de chamar no WhatsApp
          </h2>
          <p className="font-space-grotesk text-[15px] text-[#6b7280] leading-[1.65]">
            As principais objeções aparecem antes da conversa. A ideia é chegar no diagnóstico com menos incerteza.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-2"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionPage({ service }: { service: Service }) {
  const Icon = service.icon;
  const serviceWhatsAppHref = buildWhatsAppHref(service.whatsappMessage);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10 bg-black border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-3.5 px-4 md:px-8">
          <a href="/" className="flex items-center gap-3 min-w-0">
            <img src={logoIcon} alt="NTN MACHINE" className="w-7 h-7 flex-shrink-0 object-contain" />
            <span className="font-outfit font-extrabold text-white text-[15px] tracking-[2px] truncate">NTN MACHINE</span>
          </a>
          <div className="hidden lg:flex items-center gap-7">
            <a href="/#solucoes" className="font-space-grotesk text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Soluções</a>
            <a href="/#processo" className="font-space-grotesk text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Processo</a>
          </div>
          <motion.a
            href={serviceWhatsAppHref}
            onClick={() => trackConversionEvent('whatsapp_solution_header_click', { service: service.title })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0 px-4 sm:px-5 py-2 rounded-lg font-space-grotesk font-semibold text-[13px] text-white"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            Falar no WhatsApp
          </motion.a>
        </nav>
      </header>

      <main>
        {/* Hero da solução */}
        <section className="relative bg-black px-4 md:px-8 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-[-60px] right-[-40px] w-[260px] h-[260px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 70%)' }} />
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <a href="/#solucoes" className="inline-flex items-center gap-2 font-space-grotesk text-[13px] font-semibold transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <ArrowRight size={14} className="rotate-180" /> Voltar
                </a>
                <div className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <Icon size={14} color="rgba(255,255,255,0.7)" />
                  <span className="font-space-grotesk text-[11px] font-bold tracking-[1px] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>{service.eyebrow}</span>
                </div>
              </div>
              <h1 className="font-outfit font-black text-white text-[42px] sm:text-[52px] md:text-[60px] leading-[1.0] tracking-[-1.5px] mb-6">{service.title}</h1>
              <p className="font-space-grotesk text-[17px] leading-[1.65] mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>{service.pain}</p>
              <motion.a
                href={serviceWhatsAppHref}
                onClick={() => trackConversionEvent('whatsapp_solution_hero_click', { service: service.title })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] bg-white text-black px-7 py-3.5 font-space-grotesk font-extrabold text-[15px]"
                style={{ boxShadow: '0 4px 20px rgba(255,255,255,0.15)' }}
              >
                Quero uma solução assim <MessageCircle size={18} />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[14px] p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="font-outfit font-bold text-white text-[20px] mb-5">Produtos e componentes</h2>
              <div className="grid gap-2.5">
                {service.products.map((product) => (
                  <div key={product} className="rounded-lg px-4 py-3 font-space-grotesk text-[13px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}>
                    {product}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[10px] p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="font-space-grotesk font-bold text-[10px] tracking-[1px] uppercase block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Oferta recomendada</span>
                <h3 className="font-outfit font-bold text-white text-[18px] mb-1.5">{service.offerTitle}</h3>
                <p className="font-space-grotesk text-[13px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.6)' }}>{service.offerDescription}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="px-4 md:px-8 py-16 bg-[#f9fafb]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-outfit font-extrabold text-[#111827] text-[30px] md:text-[36px] tracking-[-0.6px] mb-10">Como funciona</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {service.howItWorks.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[14px] bg-white p-6"
                  style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div className="font-outfit font-black text-[44px] leading-none mb-4" style={{ color: '#f3f4f6' }}>{String(i + 1).padStart(2, '0')}</div>
                  <p className="font-space-grotesk text-[14px] text-[#374151] leading-[1.6]">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Entregáveis + Resultados */}
        <section className="px-4 md:px-8 py-16 bg-white">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-outfit font-extrabold text-[#111827] text-[28px] md:text-[32px] tracking-[-0.5px] mb-7">O que entregamos</h2>
              <div className="grid gap-3">
                {service.deliverables.map((d) => (
                  <div key={d} className="flex items-start gap-3 rounded-[10px] px-4 py-3.5 bg-white" style={{ border: '1px solid #e5e7eb' }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#374151]" />
                    <span className="font-space-grotesk text-[13px] text-[#374151] leading-[1.55]">{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-outfit font-extrabold text-[#111827] text-[28px] md:text-[32px] tracking-[-0.5px] mb-7">Resultados que buscamos</h2>
              <div className="grid gap-3">
                {service.outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-3 rounded-[10px] px-4 py-3.5 bg-white" style={{ border: '1px solid #e5e7eb' }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111827]" />
                    <span className="font-space-grotesk text-[13px] text-[#374151] leading-[1.55]">{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA final da solução */}
        <section className="relative px-4 md:px-8 py-20 bg-black overflow-hidden">
          <div className="absolute top-[-40px] right-[-40px] w-[220px] h-[220px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-outfit font-black text-white text-[32px] sm:text-[40px] md:text-[48px] tracking-[-1px] leading-[1.05] mb-5">
              Quer aplicar {service.title} no seu negócio?
            </h2>
            <p className="font-space-grotesk text-[17px] leading-[1.65] mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Agende um diagnóstico gratuito para mapear o gargalo, estimar impacto e definir o primeiro passo.
            </p>
            <motion.a
              href={serviceWhatsAppHref}
              onClick={() => trackConversionEvent('whatsapp_solution_final_click', { service: service.title })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] bg-white text-black px-8 py-4 font-space-grotesk font-extrabold text-[15px]"
              style={{ boxShadow: '0 4px 20px rgba(255,255,255,0.12)' }}
            >
              <MessageCircle size={20} /> Quero o diagnóstico gratuito
            </motion.a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsAppButton />
    </div>
  );
}

function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppHref(whatsappMessage)}
      aria-label="Falar com a NTN MACHINE pelo WhatsApp"
      onClick={() => trackConversionEvent('whatsapp_floating_click', { page: window.location.pathname || '/' })}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-white text-black transition-opacity hover:opacity-90"
      style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}

function CTAFinalSection() {
  return (
    <section id="contato" className="relative py-24 md:py-32 px-4 md:px-8 bg-black overflow-hidden">
      <div
        className="absolute top-[-60px] right-[-40px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-80px] left-[-20px] w-[240px] h-[240px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-space-grotesk font-bold text-[11px] tracking-[2px] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Próximo passo
          </p>
          <h2 className="font-outfit font-black text-white text-[36px] sm:text-[44px] md:text-[52px] tracking-[-1px] leading-[1.05] mb-5">
            Quanto dinheiro você está perdendo por mês?
          </h2>
          <p className="font-space-grotesk text-[17px] leading-[1.65] mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Cada dia operando com planilhas e processos manuais custa caro. Agende uma análise gratuita.
          </p>
          <motion.a
            href={buildWhatsAppHref('Olá, quero fazer um diagnóstico gratuito para entender quanto posso economizar automatizando minha operação.')}
            onClick={() => trackConversionEvent('whatsapp_final_cta_click', { page: 'landing' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] bg-white text-black px-8 sm:px-10 py-4 font-space-grotesk font-extrabold text-[15px] transition-opacity hover:opacity-90"
            style={{ boxShadow: '0 4px 20px rgba(255,255,255,0.12)' }}
          >
            <MessageCircle size={22} /> Quero meu diagnóstico
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-black px-4 md:px-8 py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoIcon} alt="NTN MACHINE" className="w-[22px] h-[22px] flex-shrink-0 object-contain" />
              <span className="font-outfit font-extrabold text-white text-[13px] tracking-[2px]">NTN MACHINE</span>
            </div>
            <p className="font-space-grotesk text-[12px] leading-[1.65]" style={{ color: '#4b5563' }}>
              Transformamos empresas que operam com planilhas e WhatsApp em negócios escaláveis com sistemas inteligentes.
            </p>
          </div>

          <div>
            <h4 className="font-space-grotesk font-bold text-[10px] tracking-[1.5px] uppercase mb-4" style={{ color: '#374151' }}>
              O que fazemos
            </h4>
            <ul className="grid gap-2">
              {services.slice(0, 4).map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="font-space-grotesk text-[12px] transition-colors hover:text-white"
                    style={{ color: '#4b5563' }}
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-space-grotesk font-bold text-[10px] tracking-[1.5px] uppercase mb-4" style={{ color: '#374151' }}>
              Contato
            </h4>
            <ul className="grid gap-2">
              <li>
                <a href={emailHref} className="font-space-grotesk text-[12px] transition-colors hover:text-white" style={{ color: '#4b5563' }}>
                  {contactEmail}
                </a>
              </li>
              <li>
                <span className="font-space-grotesk text-[12px]" style={{ color: '#4b5563' }}>CNPJ: 56.026.632/0001-89</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-5">
              <a
                href={buildWhatsAppHref(whatsappMessage)}
                onClick={() => trackConversionEvent('whatsapp_footer_click', { page: 'landing' })}
                aria-label="Falar com a NTN MACHINE pelo WhatsApp"
                className="transition-colors hover:text-white"
                style={{ color: '#4b5563' }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center font-space-grotesk text-[11px]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#374151' }}>
          © 2026 NTN MACHINE. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function ConnectionLine({ service }: { service: Service }) {
  const isVertical = service.lineEnd.x === '50%';

  return (
    <motion.line
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: service.delay }}
      x1="50%"
      y1="50%"
      x2={service.lineEnd.x}
      y2={service.lineEnd.y}
      stroke={isVertical ? 'rgba(55,65,81,0.8)' : 'url(#lineGrad)'}
      strokeWidth="2"
      strokeDasharray="4 4"
      strokeLinecap="round"
    />
  );
}

function ServiceCard({ service, floating = false }: { service: Service; floating?: boolean }) {
  const Icon = service.icon;

  return (
    <motion.a
      href={service.href}
      aria-label={`Ver detalhes de ${service.title}`}
      onClick={() => trackConversionEvent('solution_card_click', { service: service.title })}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: service.delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`${
        floating ? `absolute ${service.position} w-72` : 'w-full'
      } group block min-w-0 max-w-full rounded-[14px] border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] cursor-pointer z-10 transition-all duration-200 hover:border-[#374151] hover:shadow-[0_4px_20px_rgba(55,65,81,0.10)]`}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 rounded-[10px] bg-[#f3f4f6] p-2.5 transition-colors duration-200 group-hover:bg-[#111827]"
        >
          <Icon
            size={22}
            className="text-[#374151] transition-colors duration-200 group-hover:text-white"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-outfit font-bold text-[#111827] text-[15px] mb-1.5">{service.title}</h3>
          <p className="font-space-grotesk text-[13px] text-[#6b7280] leading-[1.55] break-words">
            {service.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
