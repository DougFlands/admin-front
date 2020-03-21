import request from '@/utils/request';

export interface FileListParamsType {
  limit: string,
}

export async function getFileList(params: FileListParamsType) {
  return request('/api/file/query', {
    method: 'POST',
    data: params,
  });
}

export interface DownloadFileParamsType {
  filehash: string,
}

export async function downloadFile(params: DownloadFileParamsType) {
  return request('/api/file/downloadurl', {
    method: 'POST',
    data: params,
  });
}

export interface RenameFileParamsType {
  filehash: string,
  filename: string,
  op: string
}

export async function renameFile(params: RenameFileParamsType) {
  return request('/api/file/rename', {
    method: 'POST',
    data: params,
  });
}

export interface DeleteFileParamsType {
  filehash: string,
}

export async function deleteFile(params: DeleteFileParamsType) {
  return request('/api/file/delete', {
    method: 'POST',
    data: params,
  });
}

export interface UploadFileParamsType {
  file: File,
}

export async function uploadFile(params: UploadFileParamsType) {
  return request('/api/file/upload', {
    method: 'POST',
    data: params,
  })
}

export interface FastUploadFileParamsType {
  filehash: string,
  filename: string,
  filesize: string,
}

export async function fastUploadFile(params: FastUploadFileParamsType) {
  return request('/api/file/fastupload', {
    method: 'POST',
    data: params,
  });
}