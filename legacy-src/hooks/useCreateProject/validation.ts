import { z } from 'zod'

export const newProjectFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome do projeto precisa ter pelo menos 2 caracteres')
    .max(60, 'O nome do projeto não pode ter mais de 60 caracteres'),
  type: z.object({
    book: z.boolean().default(true).optional(),
    roadmap: z.boolean().default(false).optional(),
    'game-history': z.boolean().default(false).optional(),
    rpg: z.boolean().default(false).optional(),
  }),
  imageUrl: z.string().optional().nullable(),
  features: z
    .object({
      'multi-book': z.boolean().default(false),
      planet: z.boolean().default(false),
      nation: z.boolean().default(false),
      person: z.boolean().default(false),
      city: z.boolean().default(false),
      race: z.boolean().default(false),
      religion: z.boolean().default(false),
      power: z.boolean().default(false),
      family: z.boolean().default(false),
      inst: z.boolean().default(false),
      'time-lines': z.boolean().default(false),
      language: z.boolean().default(false),
      structure: z.boolean().default(true),
    })
    .default({
      structure: true,
    }),
  initialDate: z
    .object({
      year: z.coerce
        .number({
          invalid_type_error: 'Coloque apenas números',
        })
        .optional(),
    })
    .optional(),
  structure: z.object({
    'three-acts': z.boolean().default(false).optional(),
    snowflake: z.boolean().default(false).optional(),
    'hero-journey': z.boolean().default(false).optional(),
  }),
  booksCount: z.coerce
    .number({
      invalid_type_error: 'Coloque apenas números',
    })
    .optional(),
  books: z
    .array(
      z.object({
        title: z
          .string()
          .max(60, 'O nome do livro não pode ter mais de 60 caracteres'),
        imageUrl: z.string().optional().nullable(),
      }),
    )
    .optional()
    .nullable(),
})

export type ProjectType = 'book' | 'rpg' | 'game-history' | 'roadmap'
export type ProjectStructureType = 'three-acts' | 'hero-journey' | 'snowflake'
export type INewProjectFormaData = z.infer<typeof newProjectFormSchema>
