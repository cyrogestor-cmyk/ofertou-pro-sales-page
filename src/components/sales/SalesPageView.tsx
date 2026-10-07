import { useState, useEffect } from 'react';
import { 
  Check, 
  Sparkles, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Zap,
  Lock,
  Layers,
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Share2,
  Eye,
  Sliders,
  DollarSign,
  Cloud,
  Film,
  Camera,
  Moon,
  Rocket
} from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface SalesPageViewProps {
  onSelectPlan: (plan: any) => void;
  onOpenLogin: () => void;
  apiBase: string;
  onBack?: () => void;
}

interface PlanItem {
  id: string;
  name: string;
  badge: string;
  popular?: boolean;
  price: number;
  interval: string;
  maxGroups: number;
  maxAutomations: number;
  description: string;
  features: string[];
  ctaText: string;
}

const DEFAULT_PLANS: PlanItem[] = [
  {
    id: 'starter',
    name: 'Starter Influencer',
    badge: 'COMECE AQUI',
    price: 97,
    interval: 'mensal',
    maxGroups: 1,
    maxAutomations: 1,
    description: 'Para quem está criando seu primeiro grupo de ofertas.',
    features: [
      '1 grupo automatizado',
      'Automação dedicada',
      'Ofertas encontradas automaticamente',
      'Verificação das oportunidades',
      'Publicações preparadas automaticamente',
      'Seus links de afiliado',
      'Imagens em alta definição',
      'Operação contínua'
    ],
    ctaText: 'Começar com 1 grupo →'
  },
  {
    id: 'creator',
    name: 'Pro Creator',
    badge: 'MAIS POPULAR ⭐',
    popular: true,
    price: 197,
    interval: 'mensal',
    maxGroups: 3,
    maxAutomations: 3,
    description: 'Para criadores que querem segmentar sua audiência e aumentar sua operação.',
    features: [
      '3 grupos automatizados',
      '3 automações independentes',
      'Segmentação por nichos',
      'Busca automática de ofertas',
      'Verificação antes do envio',
      'Publicações automáticas',
      'Links de afiliado',
      'Imagens em alta definição',
      'Operação contínua'
    ],
    ctaText: 'Quero automatizar meus 3 grupos →'
  },
  {
    id: 'elite',
    name: 'Elite Influencer',
    badge: 'PARA QUEM ESTÁ CRESCENDO',
    price: 297,
    interval: 'mensal',
    maxGroups: 5,
    maxAutomations: 5,
    description: 'Para criadores com várias comunidades ativas.',
    features: [
      '5 grupos automatizados',
      '5 automações independentes',
      'Segmentação por nichos',
      'Busca automática de oportunidades',
      'Verificação antes do envio',
      'Publicações estruturadas',
      'Links de afiliado',
      'Imagens HD',
      'Operação contínua'
    ],
    ctaText: 'Escalar para 5 grupos →'
  },
  {
    id: 'business',
    name: 'Business Scale',
    badge: 'ESCALA',
    price: 497,
    interval: 'mensal',
    maxGroups: 10,
    maxAutomations: 10,
    description: 'Para agências, coprodutores e operações maiores.',
    features: [
      '10 grupos automatizados',
      '10 automações independentes',
      'Segmentação por nichos',
      'Automação em escala',
      'Publicações automáticas',
      'Verificação de oportunidades',
      'Links personalizados de afiliado',
      'Imagens HD',
      'Suporte prioritário'
    ],
    ctaText: 'Levar minha operação para 10 grupos →'
  },
  {
    id: 'empire',
    name: 'Império VIP',
    badge: 'OPERAÇÃO PROFISSIONAL',
    price: 897,
    interval: 'mensal',
    maxGroups: 20,
    maxAutomations: 20,
    description: 'Para operações de grande escala com múltiplas comunidades.',
    features: [
      '20 grupos automatizados',
      '20 automações independentes',
      'Estrutura para grandes operações',
      'Segmentação por nichos',
      'Automação contínua',
      'Publicações automáticas',
      'Verificação das oportunidades',
      'Links de afiliado',
      'Imagens HD',
      'Suporte prioritário',
      'Acompanhamento de implantação',
      'Recursos profissionais'
    ],
    ctaText: 'Construir minha operação de 20 grupos →'
  }
];

export function SalesPageView({ onSelectPlan, onOpenLogin, apiBase, onBack }: SalesPageViewProps) {
  const [plans, setPlans] = useState<PlanItem[]>(DEFAULT_PLANS);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<'meli' | 'shopee'>('meli');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/plans`, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('Plans unavailable'); return r.json(); })
      .then(data => {
        if (data.success && Array.isArray(data.plans) && data.plans.length > 0) {
          setPlans(DEFAULT_PLANS.map(def => {
            const apiPlan = data.plans.find((p: Partial<PlanItem>) => p.id === def.id);
            return apiPlan ? { ...def, price: apiPlan.price ?? def.price, maxGroups: apiPlan.maxGroups ?? def.maxGroups, maxAutomations: apiPlan.maxAutomations ?? def.maxAutomations } : def;
          }));
        }
      })
      .catch(() => { /* Preserve the original fallback plans. */ });
    return () => controller.abort();
  }, [apiBase]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'Preciso passar minha senha ou cookies do Mercado Livre?',
      a: 'Não. O OFERTOU PRO foi projetado para não exigir sua senha do Mercado Livre nem configuração manual de cookies. Você informa apenas seu identificador de parceiro/afiliado e nossa infraestrutura gera os links oficiais associados à sua conta.'
    },
    {
      q: 'Como sei que a comissão vai cair na minha conta?',
      a: 'As ofertas publicadas utilizam seu identificador e link direto de afiliado (como meli.la ou s.shopee.com.br com seus parâmetros). A atribuição e o pagamento das comissões seguem normalmente as regras e o painel oficial de cada programa de afiliados.'
    },
    {
      q: 'Preciso saber programar?',
      a: 'Não. A plataforma foi criada especificamente para criadores de conteúdo e donos de grupos que querem uma operação automatizada sem precisar programar nem gerenciar servidores.'
    },
    {
      q: 'É difícil conectar o WhatsApp?',
      a: 'Não. A conexão é tão simples quanto abrir o WhatsApp Web: você lê o QR Code direto na tela ou solicita um código de pareamento numérico de 8 dígitos para confirmar no seu celular.'
    },
    {
      q: 'O sistema manda qualquer cupom?',
      a: 'Não é essa a proposta. O sistema realiza verificações prévias antes de cada disparo para reduzir significativamente o risco de enviar oportunidades inválidas. Ainda assim, preços, estoques e cupons podem sofrer alterações diretamente nos marketplaces.'
    },
    {
      q: 'Preciso deixar meu computador ligado?',
      a: 'Não. A plataforma roda 100% em infraestrutura na nuvem 24 horas por dia, 7 dias por semana. Você pode desligar o computador ou viajar que seus grupos continuarão recebendo as oportunidades programadas.'
    },
    {
      q: 'Posso cancelar?',
      a: 'Sim, a qualquer momento. Os planos são mensais sem qualquer contrato de fidelidade ou multa rescisória.'
    },
    {
      q: 'Posso mudar de plano?',
      a: 'Sim. Você pode aumentar ou reduzir a quantidade de grupos da sua operação a qualquer momento direto pelo painel de assinaturas.'
    },
    {
      q: 'O OFERTOU PRO fica com parte das minhas vendas?',
      a: 'Não. A plataforma cobra apenas a mensalidade fixa do plano contratado e não retém nenhuma porcentagem sobre suas vendas ou comissões geradas.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-foreground font-body ofertou-sales antialiased">
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap" />
      <style>{SALES_STYLES}</style>
      {/* ══════════════════════════════════════════════════════════
          1. NAVBAR (STICKY COM BLUR)
      ══════════════════════════════════════════════════════════ */}
      <nav aria-label="Navegação Principal" className="sales-navigation sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-foreground/[0.08] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 py-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <SalesButton
                onClick={onBack}
                className="sales-back px-3 py-1.5 rounded-xl text-xs font-bold bg-foreground/10 hover:bg-foreground/20 text-foreground flex items-center gap-1.5 transition cursor-pointer border border-foreground/10"
              >
                <span>← Voltar ao Painel</span>
              </SalesButton>
            )}
            <OfertouLogo size="md" />
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-copy">
            <SalesButton onClick={() => scrollToSection('como-funciona')} className="hover:text-accent transition cursor-pointer">
              Como funciona
            </SalesButton>
            <SalesButton onClick={() => scrollToSection('beneficios')} className="hover:text-accent transition cursor-pointer">
              Benefícios
            </SalesButton>
            <SalesButton onClick={() => scrollToSection('planos')} className="hover:text-accent transition cursor-pointer">
              Planos
            </SalesButton>
            <SalesButton onClick={() => scrollToSection('faq')} className="hover:text-accent transition cursor-pointer">
              Dúvidas frequentes
            </SalesButton>
          </div>

          <div className="flex items-center gap-3">
            <SalesButton
              onClick={onOpenLogin}
              className="sales-login px-3.5 py-2 text-xs font-bold text-copy hover:text-foreground hover:bg-foreground/5 rounded-xl transition cursor-pointer"
            >
              Já sou cliente (Login)
            </SalesButton>
            <SalesButton
              onClick={() => scrollToSection('planos')}
              className="sales-start px-4.5 py-2.5 rounded-xl text-xs font-background bg-gradient-to-r from-primary to-primary-end hover:from-primary hover:to-primary-end text-foreground shadow-lg shadow-primary-deep/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Começar agora</span>
              <ArrowRight size={14} />
            </SalesButton>
          </div>
        </div>
      </nav>

      <main>
        {/* ══════════════════════════════════════════════════════════
            2. HERO SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="sales-hero relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Luzes de Fundo Sutis (Purple Glow) */}

          <div className="max-w-6xl mx-auto space-y-10 relative z-10 text-center">
            {/* Badge de Destaque */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-accent text-xs font-bold tracking-normal uppercase shadow-inner">
              <Zap size={14} className="text-accent" />
              <span>⚡ SUA OPERAÇÃO DE OFERTAS NO AUTOMÁTICO</span>
            </div>

            {/* Headline e Subheadline */}
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-background text-foreground tracking-normal leading-[1.12]">
                Transforme seu grupo de WhatsApp em uma máquina de vendas —{' '}
                <span className="bg-gradient-to-r from-accent via-accent to-accent-end bg-clip-text text-transparent">
                  mesmo enquanto você dorme.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-copy leading-relaxed font-normal max-w-3xl mx-auto">
                O OFERTOU PRO encontra ofertas e cupons, verifica as oportunidades antes do disparo, cria a publicação e envia automaticamente para seus grupos do WhatsApp usando seu próprio link de afiliado.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-accent/90 tracking-normal">
                Você configura uma vez. O sistema trabalha todos os dias.
              </p>
            </div>

            {/* CTAs do Hero */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <SalesButton
                onClick={() => scrollToSection('planos')}
                className="sales-primary w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-primary-deep to-primary-end hover:from-primary hover:to-primary-end text-foreground font-background text-sm shadow-xl shadow-primary-deep/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Quero automatizar meu grupo</span><ArrowRight size={18} />
              </SalesButton>
              <SalesButton
                onClick={() => scrollToSection('planos')}
                className="sales-secondary w-full sm:w-auto px-7 py-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 font-bold text-sm transition cursor-pointer"
              >
                Ver planos e preços
              </SalesButton>
            </div>

            {/* Microcopy de Confiança */}
            <div className="sales-trust pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-success" /> Sem programação</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-success" /> Sem passar horas procurando ofertas</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-success" /> Sem percentual sobre suas vendas</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-success" /> Conexão com WhatsApp em poucos minutos</span>
            </div>

            <div className="sales-operation" aria-label="Etapas da automação">
              <div className="sales-operation-heading"><Zap size={18} /><strong>OFERTOU PRO</strong><span className="sales-status"><CheckCircle2 size={14} /> Operação na nuvem</span></div>
              <div className="sales-operation-flow">{['Encontrar ofertas', 'Verificar oportunidades', 'Preparar a publicação', 'Enviar ao WhatsApp'].map((label, i) => <div key={label}><span className="sales-step">0{i + 1}</span><span>{label}</span>{i < 3 && <ArrowRight size={16} />}</div>)}</div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            3. BLOCO DE IMPACTO
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary/80">
          <div className="max-w-6xl mx-auto space-y-12 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                "Seu grupo não deveria depender de você estar online para vender."
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Enquanto você cria conteúdo, grava stories, dorme ou simplesmente aproveita seu tempo, o OFERTOU PRO continua trabalhando nas suas comunidades.
              </p>
            </div>

            {/* 4 Cards de Rotina */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] hover:border-primary/30 transition text-left space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Camera size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">Criar conteúdo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Foque em atrair novos seguidores sem se preocupar em caçar produtos o dia todo.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] hover:border-primary/30 transition text-left space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary-end/10 text-accent-end flex items-center justify-center">
                  <Film size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">Gravar stories</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gere conexão com seu público enquanto o grupo continua ativo com ofertas quentes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] hover:border-primary/30 transition text-left space-y-3">
                <div className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center">
                  <Moon size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">Dormir</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Oportunidades noturnas e madrugadas de cupons sendo aproveitadas sem você acordar.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] hover:border-primary/30 transition text-left space-y-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <Rocket size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">Crescer sua audiência</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mais tempo livre para parcerias e expansão das suas comunidades VIP.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-deep/40 via-primary-deep/30 to-primary-deep/40 border border-primary/30 text-accent text-xs font-background tracking-normal">
              <Sparkles size={14} className="text-accent" />
              <span>O OFERTOU PRO continua trabalhando ininterruptamente.</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            4. SEÇÃO DOR
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-danger">
                A armadilha da operação manual
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                Você criou um grupo para ganhar dinheiro. Mas acabou criando outro emprego.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Olhe a rotina de quem faz tudo na mão todos os dias:
              </p>
              {/* Timeline da Rotina Manual */}
              <div className="p-3.5 rounded-xl bg-danger/20 border border-danger/30 text-xs text-danger/90 font-mono max-w-2xl mx-auto">
                Entrar no marketplace → Procurar produto → Procurar cupom → Verificar validade → Montar mensagem → Procurar imagem → Gerar link → Publicar → Repetir o dia todo.
              </div>
            </div>

            {/* 6 Cards de Dores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-foreground/[0.06] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center font-bold">
                  <AlertTriangle size={16} />
                </div>
                <h3 className="text-sm font-background text-foreground">Cupons vencidos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Postar um cupom que já esgotou e ver os membros reclamando que a oferta não funciona.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-foreground/[0.06] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center font-bold">
                  <XCircle size={16} />
                </div>
                <h3 className="text-sm font-background text-foreground">Produtos esgotados</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Divulgar um super achadinho só para descobrir minutos depois que o estoque já acabou.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-foreground/[0.06] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center font-bold">
                  <Clock size={16} />
                </div>
                <h3 className="text-sm font-background text-foreground">Grupo parado quando você está offline</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Basta você se afastar do celular para o grupo esfriar e as comissões despencarem.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-foreground/[0.06] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center font-bold">
                  <Layers size={16} />
                </div>
                <h3 className="text-sm font-background text-foreground">Operação difícil de escalar</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Administrar 1 grupo já cansa. Tentar manter 3, 5 ou 10 grupos manualmente exige ainda mais tempo e organização.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-foreground/[0.06] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center font-bold">
                  <Eye size={16} />
                </div>
                <h3 className="text-sm font-background text-foreground">Tempo perdido procurando ofertas</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Horas preciosas do seu dia gastas vasculhando abas do navegador ao invés de crescer seu público.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-foreground/[0.06] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center font-bold">
                  <Sliders size={16} />
                </div>
                <h3 className="text-sm font-background text-foreground">Trabalho repetitivo todos os dias</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Copiar, colar, encurtar link, baixar foto, formatar mensagem. A mesma rotina engessada sem fim.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            5. SOLUÇÃO (FLUXO VISUAL EM 4 ETAPAS)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                A Virada de Chave
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                E se você pudesse tirar tudo isso das suas mãos?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                O OFERTOU PRO transforma uma operação manual em uma operação automatizada.
              </p>
            </div>

            {/* Fluxo: Encontrar → Verificar → Preparar → Publicar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="p-6 rounded-2xl bg-card border border-primary/20 text-left space-y-3 relative group">
                <div className="text-xs font-mono font-bold text-accent">ETAPA 01</div>
                <h3 className="text-lg font-background text-foreground flex items-center gap-2">
                  <span>ENCONTRAR</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O sistema minera continuamente cupons e super descontos nos canais oficiais de grandes marketplaces.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-primary/20 text-left space-y-3 relative group">
                <div className="text-xs font-mono font-bold text-accent">ETAPA 02</div>
                <h3 className="text-lg font-background text-foreground flex items-center gap-2">
                  <span>VERIFICAR</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Antes de publicar, realiza checagem do cupom e da disponibilidade para evitar o envio de links quebrados.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-primary/20 text-left space-y-3 relative group">
                <div className="text-xs font-mono font-bold text-accent">ETAPA 03</div>
                <h3 className="text-lg font-background text-foreground flex items-center gap-2">
                  <span>PREPARAR</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A foto é formatada em 1:1 HD com fundo limpo e a mensagem é estruturada com o seu código de parceiro.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-primary/20 text-left space-y-3 relative group">
                <div className="text-xs font-mono font-bold text-accent">ETAPA 04</div>
                <h3 className="text-lg font-background text-foreground flex items-center gap-2">
                  <span>PUBLICAR</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O disparo é feito de forma segura e espaçada direto no WhatsApp do grupo selecionado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            6. COMO FUNCIONA (6 PASSOS)
        ══════════════════════════════════════════════════════════ */}
        <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto space-y-14">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Simples de ponta a ponta
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                Como o OFERTOU PRO Funciona na Prática
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Você configura seu painel uma única vez e acompanha seus grupos rodando no piloto automático.
              </p>
            </div>

            {/* Grid dos 6 Passos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3 relative">
                <span className="text-3xl font-background text-primary/40 font-mono block">01</span>
                <h3 className="text-base font-background text-foreground">Conecte seu WhatsApp</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Leia o QR Code ou utilize o código de pareamento numérico no seu celular. Conecte diretamente pelo seu celular.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3 relative">
                <span className="text-3xl font-background text-primary/40 font-mono block">02</span>
                <h3 className="text-base font-background text-foreground">Configure seu grupo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Escolha o grupo e defina o tipo de ofertas que deseja receber (ex: Moda, Casa, Tech ou Achadinhos Gerais).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3 relative">
                <span className="text-3xl font-background text-primary/40 font-mono block">03</span>
                <h3 className="text-base font-background text-foreground">Informe seu identificador de afiliado</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Utilize seu código de parceiro para gerar seus links oficiais meli.la e Shopee com suas comissões intactas.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3 relative">
                <span className="text-3xl font-background text-primary/40 font-mono block">04</span>
                <h3 className="text-base font-background text-foreground">O sistema encontra oportunidades</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O motor trabalha continuamente procurando ofertas relevantes para o nicho configurado.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3 relative">
                <span className="text-3xl font-background text-primary/40 font-mono block">05</span>
                <h3 className="text-base font-background text-foreground">A oportunidade é verificada</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Antes da publicação, o sistema realiza as verificações disponíveis para reduzir o risco de enviar oportunidades inválidas.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3 relative">
                <span className="text-3xl font-background text-primary/40 font-mono block">06</span>
                <h3 className="text-base font-background text-foreground">Publicação automática</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A oferta é preparada com imagem 1:1 tratada e enviada para o grupo conforme o intervalo de tempo configurado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            7. ANATOMIA DE UMA BOA OFERTA (COM PRINTS REAIS DE WHATSAPP)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Padrão Profissional de Conversão
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                "Uma boa oferta não é só um link."
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Ela precisa fazer o seguidor parar, entender, confiar e clicar. Veja abaixo exemplos reais de publicações geradas e enviadas nos grupos pelo sistema:
              </p>
            </div>

            {/* Alternador entre Oferta ML e Shopee */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-foreground/5 border border-foreground/10 rounded-2xl">
                <SalesButton
                  onClick={() => setPreviewTab('meli')} aria-pressed={previewTab === 'meli'}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    previewTab === 'meli'
                      ? 'bg-primary text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Oferta Mercado Livre (meli.la)
                </SalesButton>
                <SalesButton
                  onClick={() => setPreviewTab('shopee')} aria-pressed={previewTab === 'shopee'}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    previewTab === 'shopee'
                      ? 'bg-primary text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Oferta Shopee Oficial
                </SalesButton>
              </div>
            </div>

            {/* Grid: Print Real do WhatsApp + Anatomia Explicada */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
              {/* Smartphone Frame com Imagem Real */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[300px] sm:w-[320px] rounded-[36px] bg-card border-4 border-border/80 p-2.5 shadow-2xl shadow-primary-deep/40 relative">
                  {/* Notch do Celular */}
                  <div className="w-24 h-4 bg-secondary rounded-full mx-auto mb-2" />
                  
                  {/* Screenshot Real do Usuário */}
                  <div className="rounded-[24px] overflow-hidden border border-foreground/10 bg-background">
                    <RealMockup key={previewTab} src={previewTab === 'meli' ? '/mockups/wa_meli_real.png' : '/mockups/wa_shopee_real.png'} label={previewTab === 'meli' ? 'Mercado Livre' : 'Shopee'} />
                  </div>

                  <div className="mt-2.5 text-center">
                    <span className="text-sm text-muted-foreground font-mono">
                      ✓ Mensagem real disparada no WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Elementos da Anatomia */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-card border border-foreground/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-background text-accent">
                    <CheckCircle2 size={16} />
                    <span>Imagem em formato 1:1</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Fotos nítidas, quadradas e com fundo limpo. Nada de fotos esticadas ou imagens embaçadas que passam amadorismo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-foreground/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-background text-accent">
                    <CheckCircle2 size={16} />
                    <span>Cupom apresentado de forma clara</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    O código do cupom é destacado em texto digitável (ex: <code className="text-accent font-mono">OPAECONOMIZEI</code>) para que o seguidor apenas copie e cole no checkout.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-foreground/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-background text-accent">
                    <CheckCircle2 size={16} />
                    <span>Texto estruturado</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Hierarquia clara com preço original riscado, valor promocional à vista e chamada de escassez ("Oferta por tempo limitado!").
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-foreground/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-background text-accent">
                    <CheckCircle2 size={16} />
                    <span>Seu link de afiliado</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Links curtos oficiais e confiáveis (<code className="text-info font-mono">meli.la</code> ou <code className="text-warning font-mono">s.shopee.com.br</code>) contendo 100% da sua tag de parceiro.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-foreground/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-background text-accent">
                    <CheckCircle2 size={16} />
                    <span>Chamada para ação</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    O seguidor não tem dúvida sobre onde clicar para garantir o desconto com segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            8. MANUAL VS OFERTOU PRO (TABELA DE ALTO IMPACTO)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                Você pode continuar fazendo tudo manualmente.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Ou deixar o OFERTOU PRO fazer o trabalho pesado.
              </p>
            </div>

            {/* Grid Comparativo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna Manual ❌ */}
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-danger/30 space-y-5">
                <div className="flex items-center justify-between border-b border-danger/30 pb-4">
                  <h3 className="text-lg font-background text-danger">AFILIADO MANUAL</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/20">
                    Limitado pelo tempo
                  </span>
                </div>
                <ul className="space-y-3.5 text-xs text-copy">
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Procura ofertas manualmente</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Passa horas monitorando oportunidades</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Precisa montar cada publicação</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Grupo depende da presença do administrador</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Difícil administrar vários grupos</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Trabalho repetitivo todos os dias</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-danger font-bold shrink-0">❌</span>
                    <span>Escala limitada pelo tempo</span>
                  </li>
                </ul>
              </div>

              {/* Coluna OFERTOU PRO ✓ */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-primary-deep/40 via-card to-secondary border border-primary/40 space-y-5 shadow-xl shadow-primary-deep/30 relative">
                <div className="flex items-center justify-between border-b border-primary/30 pb-4">
                  <h3 className="text-lg font-background text-foreground flex items-center gap-2">
                    <span>COM OFERTOU PRO</span>
                    <Sparkles size={16} className="text-accent" />
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                    Operação 24h
                  </span>
                </div>
                <ul className="space-y-3.5 text-xs text-foreground font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Ofertas encontradas automaticamente</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Oportunidades verificadas antes do envio</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Publicações preparadas automaticamente</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Operação continua enquanto você está offline</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Cada grupo pode ter sua própria configuração</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Menos trabalho repetitivo</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-success font-bold shrink-0">✓</span>
                    <span>Mais capacidade de escala</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            9. BENEFÍCIOS (BENTO GRID)
        ══════════════════════════════════════════════════════════ */}
        <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Mais Liberdade e Escala
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                Pare de trocar seu tempo por cliques.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">ECONOMIA DE TEMPO</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reduza o trabalho repetitivo de procurar e preparar ofertas. Recupere horas preciosas da sua semana.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">AUTOMAÇÃO</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deixe seus grupos trabalhando mesmo quando você estiver offline, dormindo ou com a família.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">ESCALA</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Adicione novos grupos conforme sua operação cresce sem aumentar a sua carga horária diária.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Layers size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">ORGANIZAÇÃO</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cada grupo pode ter sua própria configuração, nicho e intervalo, sem bagunça nem misturas.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">SEU LINK</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Suas publicações utilizam seu identificador de afiliado oficial. As comissões seguem as regras do seu programa de afiliados.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Sliders size={20} />
                </div>
                <h3 className="text-base font-background text-foreground">SIMPLICIDADE</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Você não precisa ser programador para utilizar a plataforma. Interface limpa, intuitiva e amigável.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            10. CADA GRUPO = UMA OPERAÇÃO (SEGMENTAÇÃO)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Segmentação Inteligente
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                "Um grupo. Um nicho. Uma automação."
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Mais organização. Menos mensagens fora de contexto. Mais liberdade para criar comunidades segmentadas.
              </p>
            </div>

            {/* 4 Cards de Exemplo de Grupos Segmentados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-primary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent">GRUPO 1</span>
                  <span className="w-2 h-2 rounded-full bg-success" />
                </div>
                <h3 className="text-base font-background text-foreground">👗 Moda Feminina</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vestidos, sapatos e acessórios sem promoções de furadeiras ou peças automotivas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-primary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent">GRUPO 2</span>
                  <span className="w-2 h-2 rounded-full bg-success" />
                </div>
                <h3 className="text-base font-background text-foreground">🏠 Casa & Cozinha</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Airfryers, organizadores, panelas e utilidades domésticas direto para quem ama o lar.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-primary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent">GRUPO 3</span>
                  <span className="w-2 h-2 rounded-full bg-success" />
                </div>
                <h3 className="text-base font-background text-foreground">💻 Eletrônicos & Tech</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fones bluetooth, celulares, monitores e periféricos com tíquete médio mais alto.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-primary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent">GRUPO 4</span>
                  <span className="w-2 h-2 rounded-full bg-success" />
                </div>
                <h3 className="text-base font-background text-foreground">🔥 Achadinhos Gerais</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Super descontos e cupons relâmpago de todas as categorias para seu público geral.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            11. ESCALA (PROGRESSÃO DE GRUPOS)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary">
          <div className="max-w-5xl mx-auto space-y-12 text-center">
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Crescimento Gradual
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                "Comece com 1 grupo. Escale para 20."
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Você não precisa começar grande. Comece com uma comunidade, valide sua operação e aumente conforme sua audiência cresce.
              </p>
            </div>

            {/* Linha de Progressão Visual */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <div className="px-5 py-3 rounded-2xl bg-card border border-foreground/10 text-center">
                <span className="text-xl sm:text-2xl font-background text-foreground block">1 Grupo</span>
                <span className="text-sm text-muted-foreground">Validação inicial</span>
              </div>
              <span className="text-accent font-bold hidden sm:inline">→</span>
              <div className="px-5 py-3 rounded-2xl bg-card border border-foreground/10 text-center">
                <span className="text-xl sm:text-2xl font-background text-foreground block">3 Grupos</span>
                <span className="text-xs text-accent font-semibold">Segmentação</span>
              </div>
              <span className="text-accent font-bold hidden sm:inline">→</span>
              <div className="px-5 py-3 rounded-2xl bg-card border border-foreground/10 text-center">
                <span className="text-xl sm:text-2xl font-background text-foreground block">5 Grupos</span>
                <span className="text-sm text-muted-foreground">Expansão</span>
              </div>
              <span className="text-accent font-bold hidden sm:inline">→</span>
              <div className="px-5 py-3 rounded-2xl bg-card border border-foreground/10 text-center">
                <span className="text-xl sm:text-2xl font-background text-foreground block">10 Grupos</span>
                <span className="text-sm text-muted-foreground">Escala de canais</span>
              </div>
              <span className="text-accent font-bold hidden sm:inline">→</span>
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary-deep/40 to-primary-deep/40 border border-primary/40 text-center">
                <span className="text-xl sm:text-2xl font-background text-accent block">20 Grupos</span>
                <span className="text-xs text-accent font-semibold">Operação Profissional</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            12. PLANOS & PREÇOS (COM CHECKOUT PIX REAL)
        ══════════════════════════════════════════════════════════ */}
        <section id="planos" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-14">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                Planos Mensais sem Fidelidade
              </span>
              <h2 className="text-3xl sm:text-5xl font-background text-foreground tracking-normal">
                Escolha o Plano Ideal para a sua Operação
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Cada grupo conta com 1 automação inteligente isolada. Ativação imediata via PIX sem contrato de fidelidade.
              </p>
            </div>

            {/* Grid dos 5 Planos */}
            <div className="sales-plans-grid grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 pt-4">
              {plans.map((p) => {
                const isPopular = p.popular || p.id === 'creator';
                return (
                  <div
                    key={p.id}
                    className={`sales-plan rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 border relative ${
                      isPopular
                        ? 'bg-gradient-to-b from-featured via-card to-secondary border-primary/60 shadow-2xl shadow-primary-deep/50 z-20'
                        : 'bg-card border-foreground/[0.08] hover:border-foreground/20'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-primary to-primary-end text-foreground font-background text-xs uppercase tracking-normal px-3.5 py-1 rounded-full shadow-lg">
                        MAIS POPULAR ⭐
                      </div>
                    )}

                    <div className="space-y-5">
                      <div>
                        <span className="text-xs font-background uppercase tracking-normal text-accent">
                          {p.badge}
                        </span>
                        <h3 className="text-lg font-background text-foreground mt-1">
                          {p.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed min-h-[32px]">
                          {p.description}
                        </p>
                      </div>

                      <div className="py-3 border-y border-foreground/[0.08]">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-muted-foreground font-bold">R$</span>
                          <span className="text-3xl font-background text-foreground tracking-normal">
                            {p.price}
                          </span>
                          <span className="text-sm text-muted-foreground">/mês</span>
                        </div>
                        <p className="text-xs text-success font-bold mt-1">
                          {p.maxGroups} {p.maxGroups === 1 ? 'grupo automatizado' : 'grupos automatizados'}
                        </p>
                      </div>

                      <ul className="space-y-2.5 text-xs text-copy">
                        {p.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={14} className="text-success shrink-0 mt-0.5" />
                            <span className="leading-tight text-xs">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-6 border-t border-foreground/[0.06]">
                      <SalesButton
                        onClick={() => onSelectPlan(p)}
                        aria-label={`Selecionar ${p.name}`} className={`sales-plan-cta w-full py-3 px-4 rounded-xl font-background text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isPopular
                            ? 'bg-gradient-to-r from-primary to-primary-end hover:from-primary hover:to-primary-end text-foreground shadow-lg shadow-primary-deep/40'
                            : 'bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/10'
                        }`}
                      >
                        <span>{p.ctaText.replace(/\s*→$/, '')}</span><ArrowRight size={14} />
                      </SalesButton>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2">
              <span className="text-sm text-muted-foreground font-medium">
                🔒 Pagamento 100% seguro via PIX com ativação em tempo real e renovação mensal sem fidelidade.
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            13. TABELA COMPARATIVA DOS PLANOS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Comparativo Completo
              </span>
              <h2 className="text-2xl sm:text-3xl font-background text-foreground tracking-normal">
                Compare os Recursos de Cada Plano
              </h2>
            </div>

            {/* Tabela com Scroll Horizontal no Mobile */}
            <div className="overflow-x-auto rounded-2xl border border-foreground/[0.08] bg-card">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-foreground/[0.08] bg-foreground/[0.02]">
                    <th className="p-4 font-bold text-muted-foreground">Recurso / Cota</th>
                    <th className="p-4 font-background text-foreground text-center">Starter</th>
                    <th className="p-4 font-background text-accent text-center bg-primary-deep/20">Pro (⭐ Mais Popular)</th>
                    <th className="p-4 font-background text-foreground text-center">Elite</th>
                    <th className="p-4 font-background text-foreground text-center">Business</th>
                    <th className="p-4 font-background text-foreground text-center">Império VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/[0.04] text-copy">
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Grupos automatizados</td>
                    <td className="p-4 text-center font-bold">1 grupo</td>
                    <td className="p-4 text-center font-bold text-accent bg-primary-deep/20">3 grupos</td>
                    <td className="p-4 text-center font-bold">5 grupos</td>
                    <td className="p-4 text-center font-bold">10 grupos</td>
                    <td className="p-4 text-center font-bold">20 grupos</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Automação por grupo</td>
                    <td className="p-4 text-center">Dedicada (1:1)</td>
                    <td className="p-4 text-center text-accent bg-primary-deep/20">3 Dedicadas</td>
                    <td className="p-4 text-center">5 Dedicadas</td>
                    <td className="p-4 text-center">10 Dedicadas</td>
                    <td className="p-4 text-center">20 Dedicadas</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Busca automática de ofertas</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold bg-primary-deep/20">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Verificação de oportunidades</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold bg-primary-deep/20">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Publicações automáticas</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold bg-primary-deep/20">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Links de afiliado oficiais</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold bg-primary-deep/20">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Imagens em alta definição 1:1</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold bg-primary-deep/20">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                    <td className="p-4 text-center text-success font-bold">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Segmentação por nicho</td>
                    <td className="p-4 text-center text-muted-foreground">—</td>
                    <td className="p-4 text-center text-success font-bold bg-primary-deep/20">✓ (3 nichos)</td>
                    <td className="p-4 text-center text-success font-bold">✓ (5 nichos)</td>
                    <td className="p-4 text-center text-success font-bold">✓ (10 nichos)</td>
                    <td className="p-4 text-center text-success font-bold">✓ (20 nichos)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Suporte prioritário VIP</td>
                    <td className="p-4 text-center text-muted-foreground">Padrão</td>
                    <td className="p-4 text-center text-accent font-semibold bg-primary-deep/20">Prioritário</td>
                    <td className="p-4 text-center text-copy">Prioritário</td>
                    <td className="p-4 text-center text-success font-bold">Dedicado</td>
                    <td className="p-4 text-center text-success font-bold">Acompanhamento</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            14. VALOR / TEMPO (O VERDADEIRO CUSTO)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                "Quanto vale recuperar algumas horas do seu dia?"
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Se você passa horas procurando, preparando e publicando ofertas, o custo não está apenas no dinheiro. Está no seu tempo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-danger/20 border border-danger/30 space-y-3">
                <span className="text-xs font-mono font-bold text-danger uppercase">TEMPO MANUAL</span>
                <p className="text-xl font-background text-foreground">Horas do seu dia em tarefas repetitivas</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tempo que você gasta caçando links, validando na mão se ainda tem estoque e recortando imagens.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-primary-deep/20 border border-primary/30 space-y-3">
                <span className="text-xs font-mono font-bold text-accent uppercase">TEMPO LIBERADO COM OFERTOU PRO</span>
                <p className="text-xl font-background text-foreground">Menos tarefas repetitivas. Mais tempo para criar.</p>
                <p className="text-xs text-copy leading-relaxed">
                  Seu tempo deveria estar indo para crescer sua audiência, criar conteúdo, fechar parcerias e criar novas oportunidades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            15. SEGURANÇA E CONFIANÇA
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-foreground/[0.06] bg-secondary">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Transparência e Controle Total
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                "Você não precisa entregar sua operação inteira para o OFERTOU."
              </h2>
            </div>

            {/* 4 Cards de Confiança */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <h3 className="text-sm font-background text-foreground">SEM SENHA DO MERCADO LIVRE</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Você não precisa entregar sua senha nem cookies para utilizar a plataforma.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Share2 size={20} />
                </div>
                <h3 className="text-sm font-background text-foreground">SEU IDENTIFICADOR</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Os links utilizam seu identificador oficial de afiliado. A atribuição segue as regras do programa de afiliados.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
                <h3 className="text-sm font-background text-foreground">SEM PERCENTUAL DAS VENDAS</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A plataforma cobra apenas a mensalidade fixa contratada. Não cobra porcentagem adicional.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-foreground/[0.06] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center">
                  <Cloud size={20} />
                </div>
                <h3 className="text-sm font-background text-foreground">NA NUVEM</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A operação é executada na nuvem da plataforma, sem depender do seu computador ficar ligado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            16. FAQ (ACCORDION ELEGANTE)
        ══════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-background uppercase tracking-normal text-accent">
                Perguntas Frequentes
              </span>
              <h2 className="text-2xl sm:text-4xl font-background text-foreground tracking-normal">
                Tire Todas as Suas Dúvidas
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-foreground/[0.08] bg-card overflow-hidden transition"
                  >
                    <SalesButton
                      onClick={() => toggleFaq(index)} aria-expanded={isOpen} aria-controls={`sales-faq-${index}`}
                      className="w-full p-5 text-left font-bold text-sm text-foreground flex items-center justify-between gap-4 cursor-pointer hover:bg-foreground/[0.02]"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle size={16} className="text-accent shrink-0" />
                        <span>{item.q}</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-accent' : ''}`}
                      />
                    </SalesButton>
                    {isOpen && (
                      <div id={`sales-faq-${index}`} role="region" className="sales-faq-answer px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-foreground/[0.04]">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            17. CTA FINAL (CHAMADA MAGNÉTICA)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-foreground/[0.08] bg-gradient-to-b from-secondary via-featured to-background relative overflow-hidden text-center">

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="space-y-2">
              <p className="text-base sm:text-xl font-bold text-copy">Seu grupo já existe.</p>
              <p className="text-base sm:text-xl font-bold text-accent">Sua audiência já existe.</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-background text-foreground tracking-normal pt-2">
                Agora falta fazer sua operação trabalhar.
              </h2>
            </div>

            <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pare de passar horas procurando ofertas manualmente. Pare de depender de estar online para movimentar seus grupos.
            </p>

            <div className="pt-2 flex flex-col items-center gap-3">
              <SalesButton
                onClick={() => scrollToSection('planos')}
                className="px-9 py-4.5 rounded-2xl bg-gradient-to-r from-primary via-primary-deep to-primary-end hover:from-primary hover:to-primary-end text-foreground font-background text-sm sm:text-base shadow-2xl shadow-primary-deep/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Quero automatizar meu grupo agora →</span>
              </SalesButton>
              <span className="text-sm text-muted-foreground font-medium">
                A partir de R$ 97/mês • Pagamento via PIX • Sem fidelidade
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════════════════
          18. FOOTER (BRANDING & DISCLAIMER TRANSPARENTE)
      ══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-foreground/[0.08] bg-background py-14 px-4 sm:px-6 lg:px-8 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <OfertouLogo size="md" />
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Automação de ofertas para criadores, afiliados e comunidades.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
              <SalesButton onClick={() => scrollToSection('como-funciona')} className="hover:text-foreground transition cursor-pointer">
                Como funciona
              </SalesButton>
              <SalesButton onClick={() => scrollToSection('beneficios')} className="hover:text-foreground transition cursor-pointer">
                Benefícios
              </SalesButton>
              <SalesButton onClick={() => scrollToSection('planos')} className="hover:text-foreground transition cursor-pointer">
                Planos
              </SalesButton>
              <SalesButton onClick={() => scrollToSection('faq')} className="hover:text-foreground transition cursor-pointer">
                FAQ
              </SalesButton>
              <SalesButton onClick={onOpenLogin} className="hover:text-foreground transition cursor-pointer font-bold text-accent">
                Área do Cliente
              </SalesButton>
            </div>
          </div>

          <div className="pt-6 border-t border-foreground/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} OFERTOU PRO. Todos os direitos reservados.</p>
            <p className="max-w-2xl text-center md:text-right leading-relaxed">
              Disclaimer: O OFERTOU PRO é uma ferramenta de software de automação. Resultados financeiros não são garantidos e dependem de fatores como audiência, engajamento, ofertas disponíveis nos marketplaces, conversão e regras dos programas de afiliados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


// Local design-system controls keep the replacement portable.
function SalesButton({ className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={`sales-button ${className}`} {...props} />;
}
function OfertouLogo({ size: _size }: { size?: string }) {
  return <div className="sales-logo" aria-label="OFERTOU PRO — Automação de ofertas"><span className="sales-logo-icon"><Zap size={23} /></span><div><div className="sales-logo-title">OFERTOU<b>PRO</b></div><div className="sales-logo-sub">AUTOMAÇÃO DE OFERTAS</div></div></div>;
}
function RealMockup({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);
  return missing ? <div className="sales-missing-mockup"><Camera size={32} /><strong>Mockup do {label}</strong><span>Imagem indisponível nesta prévia.</span></div> : <img src={src} alt={`Publicação real de oferta do ${label} enviada no WhatsApp pelo OFERTOU PRO`} className="w-full h-auto block" loading="lazy" decoding="async" onError={() => setMissing(true)} />;
}

const SALES_STYLES = `
.ofertou-sales {
 --background: oklch(0.12 0.006 285); --foreground: oklch(0.985 0.004 260);
 --card: oklch(0.165 0.013 295); --secondary: oklch(0.145 0.009 285);
 --primary: oklch(0.558 0.252 302); --primary-deep: oklch(0.38 0.17 300);
 --primary-end: oklch(0.511 0.262 277); --accent: oklch(0.811 0.101 293);
 --accent-end: oklch(0.785 0.12 277); --featured: oklch(0.205 0.05 300);
 --copy: oklch(0.82 0.012 280); --muted-foreground: oklch(0.7 0.016 280);
 --border: oklch(0.33 0.018 285); --success: oklch(0.78 0.15 165);
 --danger: oklch(0.76 0.14 20); --warning: oklch(0.8 0.15 75); --info: oklch(0.78 0.1 240);
 --sales-gradient: linear-gradient(110deg,var(--primary),var(--primary-end));
 --sales-text-gradient: linear-gradient(110deg,var(--accent),var(--accent-end));
 --sales-shadow: 0 8px 28px -10px color-mix(in oklab,var(--primary) 60%,transparent);
 --font-body: 'Manrope',sans-serif; --font-display: 'Sora',sans-serif;
 background:var(--background); color:var(--foreground);font-family:var(--font-body);letter-spacing:0;line-height:1.6;
}
.ofertou-sales *, .ofertou-sales *::before, .ofertou-sales *::after {box-sizing:border-box;letter-spacing:0;}
.ofertou-sales h1,.ofertou-sales h2,.ofertou-sales h3 {font-family:var(--font-display);text-wrap:balance;}
.ofertou-sales h3 {line-height:1.45;}
.ofertou-sales section[id] {scroll-margin-top:108px;}
.ofertou-sales .sales-button {font:inherit;cursor:pointer;transition:background-color .2s,border-color .2s,box-shadow .2s,transform .2s;}
.ofertou-sales .sales-button:focus-visible {outline:2px solid var(--accent);outline-offset:5px;}
.ofertou-sales .sales-button:disabled {opacity:.5;cursor:not-allowed;}
.ofertou-sales .sales-button svg {flex-shrink:0;transition:transform .2s;}
.ofertou-sales .sales-primary {background:var(--sales-gradient);box-shadow:var(--sales-shadow);min-height:56px;font-size:16px;}
.ofertou-sales .sales-primary:hover {transform:translateY(-2px);}
.ofertou-sales .sales-primary:hover svg,.ofertou-sales .sales-plan-cta:hover svg {transform:translateX(3px);}
.ofertou-sales .sales-secondary {min-height:56px;font-size:16px;}
.ofertou-sales .sales-hero {padding-top:72px;padding-bottom:64px;}
.ofertou-sales .sales-headline {max-width:960px;margin-inline:auto;font-size:64px;line-height:1.1;}
.ofertou-sales .sales-headline span {background-image:var(--sales-text-gradient);}
.ofertou-sales .sales-trust {font-size:12px;color:var(--copy);row-gap:12px;}
.ofertou-sales .sales-operation {max-width:960px;margin:64px auto 0;border:1px solid var(--border);border-radius:16px;background:var(--card);text-align:left;overflow:hidden;}
.ofertou-sales .sales-operation-heading {display:flex;align-items:center;gap:10px;padding:20px 24px;border-bottom:1px solid var(--border);font-size:13px;color:var(--accent);}
.ofertou-sales .sales-status {margin-left:auto;display:flex;align-items:center;gap:6px;color:var(--success);font-size:12px;}
.ofertou-sales .sales-operation-flow {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));padding:26px 24px;gap:20px;}
.ofertou-sales .sales-operation-flow>div {display:flex;align-items:center;gap:9px;font-size:12px;color:var(--copy);}
.ofertou-sales .sales-operation-flow svg {margin-left:auto;color:var(--muted-foreground);flex-shrink:0;}
.ofertou-sales .sales-step {font-family:var(--font-display);color:var(--accent);font-weight:700;}
.ofertou-sales .sales-plan {transform:none;transition:transform .2s,border-color .2s,box-shadow .2s;min-width:0;}
.ofertou-sales .sales-plan:hover {transform:translateY(-3px);border-color:var(--accent);box-shadow:var(--sales-shadow);}
.ofertou-sales .sales-plan h3 {min-height:52px;}
.ofertou-sales .sales-plan h3+p {min-height:78px;}
.ofertou-sales .sales-plan-cta {min-height:64px;font-size:12px;line-height:1.5;}
.ofertou-sales .sales-plan-cta span {overflow-wrap:anywhere;}
.ofertou-sales .sales-faq-answer {animation:sales-reveal .2s ease-out;}
.ofertou-sales .sales-logo {display:flex;gap:10px;align-items:center;flex-shrink:0;}
.ofertou-sales .sales-logo-icon {width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:var(--sales-gradient);box-shadow:var(--sales-shadow);color:var(--foreground);}
.ofertou-sales .sales-logo-title {font-family:var(--font-display);font-weight:800;font-size:20px;line-height:1.2;}
.ofertou-sales .sales-logo-title b {font-size:9px;color:var(--accent);border:1px solid var(--border);border-radius:4px;padding:3px;margin-left:5px;vertical-align:middle;}
.ofertou-sales .sales-logo-sub {font-size:9px;color:var(--muted-foreground);font-weight:600;}
.ofertou-sales .sales-missing-mockup {min-height:400px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px;padding:20px;text-align:center;background:var(--card);color:var(--muted-foreground);font-size:13px;}
@keyframes sales-reveal {from {opacity:0;transform:translateY(-4px);}to {opacity:1;transform:translateY(0);}}
@media (max-width:1100px) {.ofertou-sales .sales-headline {font-size:52px;}.ofertou-sales .sales-back {display:none;}.ofertou-sales .sales-plan h3+p {min-height:52px;}}
@media (max-width:640px) {
 .ofertou-sales .sales-headline {font-size:34px;line-height:1.15;}
 .ofertou-sales .sales-hero {padding-top:40px;padding-bottom:40px;}
 .ofertou-sales .sales-navigation>div {justify-content:center;gap:16px;}
 .ofertou-sales .sales-logo-title {font-size:18px;}
 .ofertou-sales .sales-start {display:none;}
 .ofertou-sales .sales-login {font-size:12px;}
 .ofertou-sales .sales-trust {display:grid;grid-template-columns:1fr 1fr;gap:16px;text-align:left;align-items:start;}
 .ofertou-sales .sales-trust>span {align-items:flex-start;}
 .ofertou-sales .sales-trust svg {flex-shrink:0;margin-top:2px;}
 .ofertou-sales .sales-operation {margin-top:40px;}
 .ofertou-sales .sales-operation-heading {padding:16px;flex-wrap:wrap;}
 .ofertou-sales .sales-status {font-size:10px;}
 .ofertou-sales .sales-operation-flow {grid-template-columns:1fr 1fr;padding:20px 16px;}
 .ofertou-sales .sales-operation-flow svg {display:none;}
 .ofertou-sales .sales-plan h3,.ofertou-sales .sales-plan h3+p {min-height:0;}
 .ofertou-sales .sales-plan-cta {min-height:48px;}
}
@media (prefers-reduced-motion:reduce) {.ofertou-sales *, .ofertou-sales *::before, .ofertou-sales *::after {animation:none!important;transition:none!important;scroll-behavior:auto!important;}.ofertou-sales .sales-plan:hover,.ofertou-sales .sales-primary:hover {transform:none;}}
.ofertou-sales .bg-background{background-color:var(--background);}
.ofertou-sales .bg-background\\/90{background-color:color-mix(in oklab,var(--background) 90.0%,transparent);}
.ofertou-sales .bg-card{background-color:var(--card);}
.ofertou-sales .bg-danger\\/10{background-color:color-mix(in oklab,var(--danger) 10.0%,transparent);}
.ofertou-sales .bg-danger\\/20{background-color:color-mix(in oklab,var(--danger) 20.0%,transparent);}
.ofertou-sales .bg-foreground\\/10{background-color:color-mix(in oklab,var(--foreground) 10.0%,transparent);}
.ofertou-sales .bg-foreground\\/5{background-color:color-mix(in oklab,var(--foreground) 5.0%,transparent);}
.ofertou-sales .bg-foreground\\/\\[0\\.02\\]{background-color:color-mix(in oklab,var(--foreground) 2.0%,transparent);}
.ofertou-sales .bg-info\\/10{background-color:color-mix(in oklab,var(--info) 10.0%,transparent);}
.ofertou-sales .bg-primary{background-color:var(--primary);}
.ofertou-sales .bg-primary-deep\\/20{background-color:color-mix(in oklab,var(--primary-deep) 20.0%,transparent);}
.ofertou-sales .bg-primary-end\\/10{background-color:color-mix(in oklab,var(--primary-end) 10.0%,transparent);}
.ofertou-sales .bg-primary\\/10{background-color:color-mix(in oklab,var(--primary) 10.0%,transparent);}
.ofertou-sales .bg-secondary{background-color:var(--secondary);}
.ofertou-sales .bg-secondary\\/80{background-color:color-mix(in oklab,var(--secondary) 80.0%,transparent);}
.ofertou-sales .bg-success{background-color:var(--success);}
.ofertou-sales .bg-success\\/10{background-color:color-mix(in oklab,var(--success) 10.0%,transparent);}
.ofertou-sales .border-border\\/80{border-color:color-mix(in oklab,var(--border) 80.0%,transparent);}
.ofertou-sales .border-danger\\/20{border-color:color-mix(in oklab,var(--danger) 20.0%,transparent);}
.ofertou-sales .border-danger\\/30{border-color:color-mix(in oklab,var(--danger) 30.0%,transparent);}
.ofertou-sales .border-foreground\\/10{border-color:color-mix(in oklab,var(--foreground) 10.0%,transparent);}
.ofertou-sales .border-foreground\\/\\[0\\.04\\]{border-color:color-mix(in oklab,var(--foreground) 4.0%,transparent);}
.ofertou-sales .border-foreground\\/\\[0\\.06\\]{border-color:color-mix(in oklab,var(--foreground) 6.0%,transparent);}
.ofertou-sales .border-foreground\\/\\[0\\.08\\]{border-color:color-mix(in oklab,var(--foreground) 8.0%,transparent);}
.ofertou-sales .border-primary\\/20{border-color:color-mix(in oklab,var(--primary) 20.0%,transparent);}
.ofertou-sales .border-primary\\/25{border-color:color-mix(in oklab,var(--primary) 25.0%,transparent);}
.ofertou-sales .border-primary\\/30{border-color:color-mix(in oklab,var(--primary) 30.0%,transparent);}
.ofertou-sales .border-primary\\/40{border-color:color-mix(in oklab,var(--primary) 40.0%,transparent);}
.ofertou-sales .border-primary\\/60{border-color:color-mix(in oklab,var(--primary) 60.0%,transparent);}
.ofertou-sales .border-success\\/20{border-color:color-mix(in oklab,var(--success) 20.0%,transparent);}
.ofertou-sales .divide-foreground\\/\\[0\\.04\\]{border-color:color-mix(in oklab,var(--foreground) 4.0%,transparent);}
.ofertou-sales .from-accent{--tw-gradient-from:var(--accent);}
.ofertou-sales .from-featured{--tw-gradient-from:var(--featured);}
.ofertou-sales .from-primary{--tw-gradient-from:var(--primary);}
.ofertou-sales .from-primary-deep\\/40{--tw-gradient-from:color-mix(in oklab,var(--primary-deep) 40.0%,transparent);}
.ofertou-sales .from-secondary{--tw-gradient-from:var(--secondary);}
.ofertou-sales .hover\\:bg-foreground\\/10:hover{background-color:color-mix(in oklab,var(--foreground) 10.0%,transparent);}
.ofertou-sales .hover\\:bg-foreground\\/20:hover{background-color:color-mix(in oklab,var(--foreground) 20.0%,transparent);}
.ofertou-sales .hover\\:bg-foreground\\/5:hover{background-color:color-mix(in oklab,var(--foreground) 5.0%,transparent);}
.ofertou-sales .hover\\:bg-foreground\\/\\[0\\.02\\]:hover{background-color:color-mix(in oklab,var(--foreground) 2.0%,transparent);}
.ofertou-sales .hover\\:border-foreground\\/20:hover{border-color:color-mix(in oklab,var(--foreground) 20.0%,transparent);}
.ofertou-sales .hover\\:border-primary\\/30:hover{border-color:color-mix(in oklab,var(--primary) 30.0%,transparent);}
.ofertou-sales .hover\\:from-primary:hover{--tw-gradient-from:var(--primary);}
.ofertou-sales .hover\\:text-accent:hover{color:var(--accent);}
.ofertou-sales .hover\\:text-foreground:hover{color:var(--foreground);}
.ofertou-sales .hover\\:to-primary-end:hover{--tw-gradient-to:var(--primary-end);}
.ofertou-sales .selection\\:bg-primary::selection{background-color:var(--primary);}
.ofertou-sales .selection\\:text-foreground::selection{color:var(--foreground);}
.ofertou-sales .shadow-primary-deep\\/30{--tw-shadow-color:color-mix(in oklab,var(--primary-deep) 30.0%,transparent);}
.ofertou-sales .shadow-primary-deep\\/40{--tw-shadow-color:color-mix(in oklab,var(--primary-deep) 40.0%,transparent);}
.ofertou-sales .shadow-primary-deep\\/50{--tw-shadow-color:color-mix(in oklab,var(--primary-deep) 50.0%,transparent);}
.ofertou-sales .text-accent{color:var(--accent);}
.ofertou-sales .text-accent-end{color:var(--accent-end);}
.ofertou-sales .text-accent\\/90{color:color-mix(in oklab,var(--accent) 90.0%,transparent);}
.ofertou-sales .text-copy{color:var(--copy);}
.ofertou-sales .text-danger{color:var(--danger);}
.ofertou-sales .text-danger\\/90{color:color-mix(in oklab,var(--danger) 90.0%,transparent);}
.ofertou-sales .text-foreground{color:var(--foreground);}
.ofertou-sales .text-info{color:var(--info);}
.ofertou-sales .text-muted-foreground{color:var(--muted-foreground);}
.ofertou-sales .text-primary\\/40{color:color-mix(in oklab,var(--primary) 40.0%,transparent);}
.ofertou-sales .text-success{color:var(--success);}
.ofertou-sales .text-warning{color:var(--warning);}
.ofertou-sales .to-accent-end{--tw-gradient-to:var(--accent-end);}
.ofertou-sales .to-background{--tw-gradient-to:var(--background);}
.ofertou-sales .to-primary-deep\\/40{--tw-gradient-to:color-mix(in oklab,var(--primary-deep) 40.0%,transparent);}
.ofertou-sales .to-primary-end{--tw-gradient-to:var(--primary-end);}
.ofertou-sales .to-secondary{--tw-gradient-to:var(--secondary);}
.ofertou-sales .via-accent{--tw-gradient-via:var(--accent);}
.ofertou-sales .via-card{--tw-gradient-via:var(--card);}
.ofertou-sales .via-featured{--tw-gradient-via:var(--featured);}
.ofertou-sales .via-primary{--tw-gradient-via:var(--primary);}
.ofertou-sales .via-primary-deep{--tw-gradient-via:var(--primary-deep);}
.ofertou-sales .via-primary-deep\\/30{--tw-gradient-via:color-mix(in oklab,var(--primary-deep) 30.0%,transparent);}
`;
