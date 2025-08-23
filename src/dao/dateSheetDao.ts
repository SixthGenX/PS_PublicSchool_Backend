import { Document, Types } from "mongoose";
import { ClassRangeForResult } from "../utils/enums";
import DateSheet, { IDateSheet } from "../models/DateSheet";
import { IImage } from "../models/Image";

export interface IDateSheetWithImage extends Omit<IDateSheet, "image"> {
  image:
    | Types.ObjectId
    | Pick<IImage, "_id" | "mimeType" | "size" | "originalName" | "type">;
}

export const createDateSheetDao = async (
  classRange: ClassRangeForResult,
  imageId: Types.ObjectId
): Promise<IDateSheet> => {
  const dateSheet = await DateSheet.create({
    classRange,
    image: imageId,
  });
  return dateSheet;
};

export const updateDateSheetDao = async (
  id: string,
  updates: {
    classRange?: ClassRangeForResult;
    image?: Types.ObjectId;
  }
): Promise<IDateSheet | null> => {
  const dateSheet = await DateSheet.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );
  return dateSheet;
};

export const doesDateSheetExistByIdDao = async (
  id: string
): Promise<boolean> => {
  const exists = await DateSheet.exists({ _id: id });
  return !!exists;
};

export const findDateSheetByIdDao = async (
  id: string
): Promise<IDateSheetWithImage | null> => {
  return await DateSheet.findById(id)
    .populate("image", "-image") // Exclude the actual image buffer
    .exec();
};

export const findDateSheetsDao = async (
  filter: {
    classRange?: ClassRangeForResult;
  } = {}
): Promise<IDateSheetWithImage[]> => {
  const query: any = {};
  if (filter.classRange) {
    query.classRange = filter.classRange;
  }

  return await DateSheet.find(query)
    .populate("image", "-image") // Exclude the actual image buffer
    .sort({ createdAt: -1 })
    .exec();
};
