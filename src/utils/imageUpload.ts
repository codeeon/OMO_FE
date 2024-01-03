import {
  duplicateFiles,
  imageSizeError,
  imageTypeError,
  imageUploadSuccess,
} from '../components/alert/postAlert';
import { fileToUrl } from './fileToUrl';

export const uploadImage = (
  files: File[],
  setFiles: (value: React.SetStateAction<File[]>) => void,
  setImageUrl: (value: React.SetStateAction<string[]>) => void,
  imageURL: string[],
) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  const changeHandler = async () => {
    const file = input.files?.[0];
    const fileSize = file?.size;
    if (fileSize && fileSize > 3072000) {
      return imageSizeError();
    }
    if (!file) return null;
    if (!isValidImageFileType(file)) {
      return imageTypeError();
    }

    if (files.some((existingFile) => existingFile.name === file.name)) {
      return duplicateFiles();
    }

    try {
      const imageUrl = await fileToUrl(file);
      setFiles([...files, file]);
      setImageUrl([...imageURL, imageUrl]);
    } finally {
      input.removeEventListener('change', changeHandler);
      imageUploadSuccess();
    }
  };

  input.addEventListener('change', changeHandler);
};

export const deleteImageHandler = (
  image: string,
  imageURL: string[],
  files: File[],
  setFiles: (value: React.SetStateAction<File[]>) => void,
  setImageUrl: (value: React.SetStateAction<string[]>) => void,
) => {
  const imageIndex = imageURL.findIndex((img) => img === image);
  if (imageIndex !== -1) {
    const updatedFiles = [...files];
    const updatedImages = [...imageURL];
    updatedFiles.splice(imageIndex, 1);
    updatedImages.splice(imageIndex, 1);
    setImageUrl(updatedImages);
    setFiles(updatedFiles);
  }
};

const isValidImageFileType = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  return allowedTypes.includes(file.type);
};
