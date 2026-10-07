import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download } from "lucide-react";
import { SalesPageView } from "@/components/sales/SalesPageView";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "OFERTOU PRO | Ofertas no automático para seu WhatsApp" },
    { name: "description", content: "Automatize suas publicações de ofertas no WhatsApp com seu link de afiliado. Conheça os cinco planos do OFERTOU PRO." },
    { property: "og:title", content: "OFERTOU PRO | Ofertas no automático para seu WhatsApp" },
    { property: "og:description", content: "Encontre, verifique, prepare e publique ofertas automaticamente. Mais tempo para criar e crescer sua comunidade." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [action, setAction] = useState<{ title: string; description: string } | null>(null);
  return (
    <>
      <SalesPageView apiBase="/preview" onSelectPlan={(plan) => setAction({ title: plan.name, description: `Plano selecionado: R$ ${plan.price}/mês. No seu projeto, onSelectPlan(plan) abrirá o checkout PIX existente. Nenhum pagamento é processado nesta prévia.` })} onOpenLogin={() => setAction({ title: "Área do cliente", description: "Nesta prévia, o botão confirma a chamada de onOpenLogin(). No seu projeto, ele continuará abrindo o login existente." })} onBack={() => setAction({ title: "Voltar ao Painel", description: "Nesta prévia, o botão confirma a chamada de onBack(). No seu projeto, ele continuará voltando ao painel existente." })} />
      <Button asChild variant="secondary" className="fixed bottom-4 right-4 z-40 border border-border shadow-lg">
        <a href="/downloads/SalesPageView.tsx" download><Download /> Baixar SalesPageView.tsx</a>
      </Button>
      <Dialog open={action !== null} onOpenChange={(open) => { if (!open) setAction(null); }}>
        <DialogContent><DialogHeader><DialogTitle>{action?.title}</DialogTitle><DialogDescription>{action?.description}</DialogDescription></DialogHeader>
          <Button asChild><a href="/downloads/SalesPageView.tsx" download><Download /> Baixar arquivo completo</a></Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
