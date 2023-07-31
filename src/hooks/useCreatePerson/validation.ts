import { z } from 'zod';

export const newPersonFormSchema = z.object({
  name: z
    .string()
    .max(60, 'O nome do personagem não pode ter mais de 60 caracteres')
    .optional(),
  lastName: z
    .string()
    .max(60, 'O nome do personagem não pode ter mais de 60 caracteres')
    .optional(),
  biographic: z
    .string()
    .min(2, 'A biografia do seu personagem precisa ter pelo menos 2 caracteres')
    .max(
      450,
      'A biografia do seu personagem não pode ter mias de 450 caracteres'
    ),
  projectId: z
    .string({
      required_error: 'Por favor selecione um projeto',
    })
    .uuid('Projeto inválido'),
  imageUrl: z.string().optional().nullable(),
  age: z.coerce
    .number({
      invalid_type_error: 'Coloque apenas números',
    })
    .optional()
    .nullable(),
});

export type INewPersonFormaData = z.infer<typeof newPersonFormSchema>;
