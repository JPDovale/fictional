// @ts-ignore
import { marked } from 'marked'
// @ts-ignore
import helpText from './help.md'
import { useTheme } from '@rHooks/useTheme'

export function HelpPage() {
  const { theme } = useTheme()
  const htmlText = marked(helpText)

  return (
    <main className="h-full flex-col flex w-full overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto mt-6 mb-16">
        <article
          data-theme={theme}
          className="prose data-[theme=dark]:prose-invert min-w-full prose-violet text-justify"
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
      </div>
    </main>
  )
}
