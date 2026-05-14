export async function validateChartImage(file: File): Promise<{ valid: boolean; error?: string; width?: number; height?: number }> {
  // Check file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Please upload a PNG, JPG, JPEG, or WEBP image." };
  }

  // Check file size (max 8MB)
  const maxSize = 8 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: "Image size must be under 8MB." };
  }

  // Check dimensions
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      if (img.width < 600 || img.height < 400) {
        resolve({ valid: false, error: "Image is too small. Please upload a clearer chart screenshot at least 600×400." });
      } else {
        resolve({ valid: true, width: img.width, height: img.height });
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ valid: false, error: "Unable to read image dimensions. Try another screenshot." });
    };

    img.src = objectUrl;
  });
}
