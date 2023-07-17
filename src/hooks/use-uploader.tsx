import { trans } from "@mongez/localization";
import {
  parseError,
  toastError,
  toastLoading,
  uploadFiles,
  uploadsHandler,
} from "@mongez/moonlight";
import { Editor } from "@tiptap/react";

export function useUploader(editor: Editor | null) {
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files: File[] = e.dataTransfer.files;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toastError(trans("invalidImageFile"));
        continue;
      }

      upload([file]);
    }
  };

  const upload = (files: File[]) => {
    const loading = toastLoading(trans("rte.uploading"));

    const formData = new FormData();

    for (const file of files) {
      formData.append(uploadsHandler.uploadsKey(), file);
    }

    uploadFiles(formData)
      .then(files => {
        editor?.view.focus();

        loading.success(trans("rte.filesUploaded"));

        files.forEach(file => {
          editor?.commands.insertContent({
            type: "image",
            attrs: {
              src: file.url,
              alt: file.name,
            },
          });
        });
      })
      .catch(error => {
        console.error(error);
        loading.error(parseError(error));
      });
  };

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}
