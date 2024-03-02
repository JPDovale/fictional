export abstract class ImageProvider {
  abstract copyToSecure(
    originPath: string,
    destinationPath: string
  ): Promise<void>;

  abstract copyToSecureSync(originPath: string, destinationPath: string): void;

  abstract getSecurePath(originPath: string | null): Promise<string | null>;

  abstract getSecurePathSync(originPath: string | null): string | null;

  abstract free(securePath: string): Promise<void>;
}
