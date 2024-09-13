import { HandlerDef } from '@/common/HttpHandler';
import { FilesManager } from '../FilesManager';
import { typeCast } from '@/common/typeCast';
import { FileModel } from '@/models/File/FileModel';

const UploadFile: HandlerDef = async (req, res) => {
  try {

    const filesManager = new FilesManager();
    const fields = req.body as { folder: string };
    const files = typeCast<Express.Multer.File[]>(req.files) ?? [];

    const uploadedFiles = await Promise.all(files.map(async (file) => {
      const extensions = file.originalname.split('.').pop();
      const newFileName =
        await filesManager.generateFileName('file.' + extensions);

      return await filesManager.upload(
        `${fields.folder ? fields.folder + '/' : ''}${newFileName}`,
        file.buffer,
        { mimeType: file.mimetype }
      );
    }));


    const dbRecords = await FileModel.create(uploadedFiles.map((file) => ({
      path: file.path,
      mimeType: file.mimeType,
      ownerId: req.user.id
    })))


    const filesFromDb = await FileModel.fetchById(dbRecords);


    return res.status(200).json({
      success: true,
      files: filesFromDb,
      uploadedFiles,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false, message: "An error has ocurred"
    })
  }
}

export default UploadFile;