export async function UploadImage(file: File): Promise<string> {
  return URL.createObjectURL(file);
}
