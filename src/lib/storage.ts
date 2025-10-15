import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadImages(userId: string, files: File[]): Promise<string[]> {
  const useDataUrl = String(import.meta.env.VITE_USE_DATA_URL_UPLOAD || '').toLowerCase() === 'true';
  const urls: string[] = [];
  if (useDataUrl) {
    // Dev fallback: store images as data URLs directly; no Firebase Storage required
    for (const file of files) {
      urls.push(await fileToDataUrl(file));
    }
    return urls;
  }

  try {
    for (const file of files) {
      const path = `posts/${userId}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  } catch (err) {
    // If Storage is disabled (requires billing), fall back to data URLs for development
    for (const file of files) {
      urls.push(await fileToDataUrl(file));
    }
    return urls;
  }
}


