import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { Container } from "@/components/public/Container"
import { cn } from "@/lib/utils"

type Cta = { label: string; href: string }

type ClosingCtaProps = {
  title: React.ReactNode
  lead?: React.ReactNode
  primaryCta: Cta
  secondaryCta?: Cta
  variant?: "muted" | "primary" | "primary-soft"
}

export function ClosingCta({
  title,
  lead,
  primaryCta,
  secondaryCta,
}: ClosingCtaProps) {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <Container>
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
          {/* Glowing Background Elements */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-brand-500/20 blur-[100px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-24 text-center max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-lg">
              <Zap className="h-8 w-8 text-amber-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {title}
            </h2>
            
            {lead ? (
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mb-10">
                {lead}
              </p>
            ) : null}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link 
                href={primaryCta.href}
                className="inline-flex items-center justify-center bg-brand hover:bg-brand-600 text-white font-semibold px-8 h-14 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand/20 w-full sm:w-auto"
              >
                {primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              {secondaryCta ? (
                <Link 
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white hover:bg-white/10 font-medium px-8 h-14 rounded-xl transition-all backdrop-blur-sm w-full sm:w-auto"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
