import { unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path/posix';

export class FileStorage {
  static PNG_STORAGE_PATH = '/storage/pngs';
  static PDF_STORAGE_PATH = '/storage/pdfs';
  static DEFAULT_PROFILE_IMG_PATH = '/storage/default.png';
  static DEFAULT_PDF_PATH = '/storage/default.pdf';

  static storeImage(image_name: string, buffer: Buffer<ArrayBufferLike>) {
    const file_type = image_name.split('.').at(-1);
    if (!file_type) {
      throw new Error('o formato do arquivo não foi identificado');
    }
    const file_path = join(
      process.cwd(),
      this.resolve_storage_folder(file_type),
      image_name,
    );
    writeFileSync(file_path, buffer);
  }

  static removeImage(image_name: string) {
    unlinkSync(image_name);
  }

  static resolve_storage_folder(file_extension: string): string {
    switch (file_extension) {
      case 'pdf':
        return this.PDF_STORAGE_PATH;
      case 'png':
        return this.PNG_STORAGE_PATH;
      default:
        throw new Error('unsuported file format');
    }
  }
}
