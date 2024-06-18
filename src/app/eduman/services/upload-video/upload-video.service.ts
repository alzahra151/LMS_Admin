import { Injectable } from '@angular/core';
import { Upload } from 'tus-js-client';
@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {

  constructor() { }
  uploadVideo(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const upload = new Upload(file, {
        endpoint: 'https://api.vimeo.com/me/videos',
        metadata: {
          filename: file.name
        },
        headers: {
          'Authorization': 'Bearer ND7S6lGMtBaafxXF0cy7JPTe2S05kBuuauiJwejE7gxX051FuA/07oY971mkj4rtj2nGAKQ+VF4uAmVxefNHKUw9hN8JJy4gOBCPbE53yvs8snxsryfOA0VpbLVrqqLg',
          'Upload-Protocol': 'tus',
          'Tus-Resumable': '1.0.0',
          'Content-Type': 'application/json',

          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        },
        onError: (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        onSuccess: () => {
          console.log('Upload successful');
          const videoUrl = upload.url;
          if (videoUrl) {
            resolve(videoUrl);
          } else {
            reject(new Error('Video URL is null'));
          }
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const progress = Math.floor((bytesUploaded / bytesTotal) * 100);
          console.log(`Upload progress: ${progress}%`);
          // You can emit a progress event here if you want to update the progress bar
        }
      });

      upload.start();
    });
  }
}
