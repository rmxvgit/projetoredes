import { createWriteStream } from 'node:fs';
import { join } from 'node:path/posix';

export class FileStorage {
  static PNG_STORAGE_PATH = '/storage/pngs';
  static PDF_STORAGE_PATH = '/storage/pdfs';

  static storeImage(image_name: string, buffer: Buffer<ArrayBufferLike>) {
    const file_path = join(process.cwd(), this.PNG_STORAGE_PATH, image_name);
    const stream = createWriteStream(file_path);
    stream.write(buffer, (res) => {
      if (res instanceof Error) {
        console.log('writing image failed');
      }
    });
    stream.end();
  }

  static storePdf(pdf_name: string, owner_name: string) {}
}
