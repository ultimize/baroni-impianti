import { cn } from "@/lib/utils"

export type Step = {
  number: number
  title: string
  description: string
}

type StepListProps = {
  steps: Step[]
  className?: string
}

export function StepList({ steps, className }: StepListProps) {
  return (
    <ol
      className={cn(
        "grid gap-6 sm:gap-8",
        "md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {steps.map((step) => (
        <li
          key={step.number}
          className="relative flex flex-col rounded-2xl border border-border/60 bg-card p-6"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {String(step.number).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
