import { Foundation } from '@modules/foundations/entities/Foundation';
import { FoundationsRepository } from '@modules/foundations/repositories/Foundations.repository';

export class FoundationsInMemoryRepository implements FoundationsRepository {
  async findByProjectId(projectId: string): Promise<Foundation | null> {
    const foundation = this.foundations.find(
      (foundation) => foundation.projectId.toString() === projectId
    );
    if (!foundation) return null;
    return foundation;
  }

  async create(data: Foundation, ctx?: unknown): Promise<void> {
    this.foundations.push(data);
  }

  findById(id: string, ctx?: unknown): Promise<Foundation | null> {
    throw new Error('Method not implemented.');
  }
  findAll(ctx?: unknown): Promise<Foundation[]> {
    throw new Error('Method not implemented.');
  }
  save(data: Foundation, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public foundations: Foundation[] = [];
}
