import { AttributePreviewResponse } from "@modules/persons/presenters/AttributesPreview.presenter";
import { useTheme } from "@rHooks/useTheme";
import { LucideIcon } from "lucide-react";

interface AttributeGroupCardsProps {
  Icon: LucideIcon
  title: string
  attributes: AttributePreviewResponse[]
}

export function AttributeGroupCards({ attributes, title, Icon }: AttributeGroupCardsProps) {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold flex items-center gap-2">
        {title}
        <Icon size={20} className="fill-purple900" />
      </span>

      {attributes.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {attributes.map(attr => (
            <div
              data-theme={theme}
              className="flex flex-col gap-2 border border-purple500 rounded-lg p-1.5 bg-gray200 shadow-lg data-[theme=light]:bg-gray800"
            >
              <span className="text-sm opacity-60">{attr.file.title}</span>

              {attr.file.contentPreview ? (
                <div
                  data-theme={theme}
                  className="text-xs flex max-h-24 overflow-hidden flex-col gap-1 prose prose-sm data-[theme=dark]:prose-invert"
                  dangerouslySetInnerHTML={{ __html: attr.file.contentPreview }}
                />
              ) : (
                <div className="text-xs flex max-h-24 overflow-hidden flex-col gap-1">
                  <p className="opacity-30 text-center -mt-0.5">Sem preview de conteúdo</p>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center font-bold opacity-60 py-4">Não há nada por aqui!</div>
      )}
    </div>
  );
}
