import Image, { IImage } from '../models/Image';
import { ImageType } from '../utils/enums';

export const createImageDao = async (
  imageBuffer: Buffer,
  mimeType: string,
  size: number,
  originalName: string,
  type: ImageType = ImageType.RESULT
): Promise<IImage> => {
  const image = await Image.create({
    image: imageBuffer,
    type,
    mimeType,
    size,
    originalName,
  });
  return image;
};

export const findImageByIdDao = async (id: string): Promise<IImage | null> => {
  return await Image.findById(id).exec();
};
