import { Injectable } from "@nestjs/common";
import { ensureDir, writeFile, remove } from "fs-extra";
import { path } from "app-root-path";
import { v4 as uuidV4 } from "uuid";
import { getFileExtension } from "src/helpers/utils";


@Injectable()
export class UploadService {
  
  async saveImage(image: Express.Multer.File) {
    const folder = `${path}/uploads`;
    const imgName = uuidV4();
    await ensureDir(folder);
    await writeFile(`${folder}/${imgName}${getFileExtension(image.originalname)}`, image.buffer);

    return { imageName: `${imgName}${getFileExtension(image.originalname)}` };
  }

   async removeImage(image: string) {
      const folder = `${path}/uploads/${image}`;
      remove(folder)
      .then(() => 'success')
      .catch(error => error);
  }

}
