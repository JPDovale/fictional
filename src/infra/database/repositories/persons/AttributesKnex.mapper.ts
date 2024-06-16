import { Attribute } from '@modules/persons/entities/Attribute';
import { AttributeType } from '@modules/persons/entities/types';
import { AttributePreview } from '@modules/persons/valuesObjects/AttributePreview';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';
import { load } from 'cheerio';
import { AttributeMutation } from '@modules/persons/entities/AttributeMutation';
import { AttributeMutationList } from '@modules/persons/entities/AttributeMutationList';

// essa função está duplicando o conteúdo interno da tag
// ex para: <p><span>test</span></p>
// temos o seguinte resutado quando requisitado 2 tags
// <p><span>test</span></p><span>test</span>
function extractFirstTags(htmlContent: string, numTags: number) {
  const $ = load(htmlContent);
  let extracted = '';
  let count = 0;

  $('*').each((_, elem) => {
    let tag = $(elem).prop('tagName')?.toLowerCase();
    const tagsToSkip = ['html', 'head', 'body'];

    if (count >= numTags) return false;

    if (tag && !tagsToSkip.includes(tag)) {
      extracted += $.html(elem);
      count++;
    }
  });

  return extracted;
}

export interface AttributeFile {
  id: string;
  file_id: string;
  type: AttributeType;
  created_at: Date;
  updated_at: Date | null;
  trashed_at: Date | null;
}

interface AttributePreviewSelect {
  person_id: string;
  attribute_type: AttributeType;
  attribute_id: string;
  file_id: string;
  file_title: string;
  file_content: string;
  file_created_at: Date;
  file_updated_at: Date | null;
}

@injectable()
export class AttributesKnexMapper extends RepositoryMapper<
  Attribute,
  AttributeFile
> {
  toDomain(
    raw: AttributeFile & { mutations?: AttributeMutation[] }
  ): Attribute {
    return Attribute.create(
      {
        fileId: UniqueId.create(raw.file_id),
        type: raw.type,
        mutations: new AttributeMutationList(raw.mutations ?? []),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        trashedAt: raw.trashed_at,
      },
      UniqueId.create(raw.id)
    );
  }

  toPersistence(entity: Attribute): AttributeFile {
    return {
      trashed_at: entity.trashedAt,
      id: entity.id.toString(),
      file_id: entity.fileId.toString(),
      type: entity.type,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }

  toDomainPreview(raw: AttributePreviewSelect): AttributePreview {
    return AttributePreview.create({
      fileId: UniqueId.create(raw.file_id),
      attributeType: raw.attribute_type,
      fileCreatedAt: raw.file_created_at,
      fileUpdatedAt: raw.file_updated_at,
      fileContentPreview: extractFirstTags(raw.file_content, 1),
      fileTitle: raw.file_title,
      personId: UniqueId.create(raw.person_id),
      attributeId: UniqueId.create(raw.attribute_id),
    });
  }
}
