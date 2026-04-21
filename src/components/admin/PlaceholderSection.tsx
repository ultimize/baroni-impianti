import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type PlaceholderSectionProps = {
  title: string
  description: string
}

export function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">In costruzione</CardTitle>
          <CardDescription>
            La gestione CRUD di questa sezione verrà implementata negli step
            successivi del progetto.
          </CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    </div>
  )
}
