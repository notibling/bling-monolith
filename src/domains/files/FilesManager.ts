import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

interface IUploadOptions {
  mimeType: string;
}
class FilesManager {

  async upload(filePath: string, file: Buffer, { mimeType }: IUploadOptions) {
    await this.doCreateFolder(filePath);
    const fileUploadedPath = await this.doUpload(filePath, file);

    return {
      path: fileUploadedPath,
      mimeType
    };
  }

  generateFileName(fileName?: string) {
    let _fileName = uuid();

    if (fileName) _fileName += '-' + fileName;
    return _fileName;
  }

  private doCreateFolder(folderPath: string) {
    const folders = folderPath.split('/');
    const foldersStructure = folders.slice(0, folders.length - 1).join('/');
    return new Promise((resolve, reject) => {
      fs.mkdir(path.join(__dirname, '../../../uploads', foldersStructure), { recursive: true }, function (err) {
        if (err) reject(err);
        resolve(true);
      });
    })
  }

  private doUpload(fileName: string, file: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const realPath = path.join(__dirname, '../../../uploads', fileName);
      fs.writeFile(realPath, file, function (err) {

        if (err) reject(err);

        resolve(`uploads/${fileName}`);
      });

    })
  }
}

export { FilesManager };