import Image, { IImage } from "../models/Image";
import { ImageType } from "../utils/enums";

export const createImageDao = async (
  buffer: Buffer,
  type: ImageType,
  mimeType: string,
  size: number,
  originalName: string
): Promise<IImage> => {
  return await Image.create({
    image: buffer,
    type: type,
    mimeType: mimeType,
    size: size,
    originalName: originalName,
  });
};

export const findImageByIdDao = async (id: string): Promise<IImage | null> => {
  return await Image.findById(id).exec();
};
