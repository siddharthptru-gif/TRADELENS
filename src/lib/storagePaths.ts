export function getFileExtension(file: File): string {
  const nameParts = file.name.split('.');
  if (nameParts.length < 2) return 'png';
  const ext = nameParts.pop()?.toLowerCase();
  
  if (ext === 'jpg' || ext === 'jpeg') return 'jpeg';
  if (ext === 'webp') return 'webp';
  return 'png';
}

export function getOriginalChartPath(uid: string, scanId: string, extension: string): string {
  return `chartUploads/${uid}/${scanId}/original.${extension}`;
}

export function getCompressedChartPath(uid: string, scanId: string): string {
  return `chartUploads/${uid}/${scanId}/compressed.webp`;
}
