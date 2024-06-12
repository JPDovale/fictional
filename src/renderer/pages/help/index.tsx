// @ts-ignore
import { marked } from 'marked'
// @ts-ignore
import helpText from './help.md'

export function HelpPage() {
  const htmlText = marked(helpText)

  return (
    <main className="h-full flex-col flex w-full overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto mt-6 mb-16">
        <article
          className="prose prose-invert min-w-full prose-violet text-justify"
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
      </div>
    </main>
  )
}
