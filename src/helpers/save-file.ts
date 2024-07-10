import {  writeFile } from "fs-extra";
import { path } from "app-root-path";
import { v4 as uuidV4 } from "uuid";



export const download_image = async(url: string) => {
  const folder = `${path}`;
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const imagePatch = `/uploads/${uuidV4()}.jpg`;
  const imgName = `${folder}${imagePatch}`;

  await writeFile(imgName, buffer);
  return imagePatch;
}