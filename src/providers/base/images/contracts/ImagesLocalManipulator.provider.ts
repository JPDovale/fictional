export abstract class ImagesLocalManipulatorProvider {
  abstract copyToSecure(
    originPath: string,
    destinationPath: string,
  ): Promise<void>

  abstract getSecurePath(
    originPath: string | null | undefined,
  ): Promise<string | null>

  abstract free(securePath: string): Promise<void>
}
