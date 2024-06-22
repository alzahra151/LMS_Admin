import { Injectable } from '@angular/core';
import { Upload } from 'tus-js-client';
import axios from 'axios';
import * as tus from 'tus-js-client';
@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {
  private vimeoToken = '4b5c656f638f944192b6cb2a2a135889'; // Replace with your Vimeo token
  constructor() { }
  uploadVideo2(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const upload = new tus.Upload(file, {
        endpoint: 'https://api.vimeo.com/me/videos',
        metadata: {
          filename: file.name
        },
        headers: {
          'Authorization': 'Bearer 9db074d2025c7c8b89da3094894c8309',
          'Upload-Protocol': 'tus',
          // 'Tus-Resumable': '1.0.0',
          // // 'Content-Type': 'application/json',
          // 'Upload-Offset': '0',
          // 'Content-Type': 'application/offset+octet-stream',
          // Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        chunkSize: 10 * 1024 * 1024,
        uploadSize: file.size,
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


  async initializeUpload(file: File): Promise<string> {
    const fileSize = file.size;
    const initializeResponse = await axios.post(
      'https://api.vimeo.com/me/videos',
      {
        upload: {
          approach: 'tus',
          size: fileSize,
        },
      },
      {
        headers: {
          Authorization: `Bearer 890e9adaa2ba1ea2377b5a3ca1bc4bda`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(initializeResponse.data)
    return initializeResponse.data.upload.upload_link;
  }
  async uploadVideo(file: File, progressCallback: (progress: number) => void): Promise<string> {
    try {
      // const uploadLink = await this.initializeUpload(file);
      const fileSize = file.size;
      console.log(fileSize)
      const initializeResponse = await axios.post(
        'https://api.vimeo.com/me/videos',
        {
          upload: {
            approach: 'tus',
            size: fileSize,
          },
        },
        {
          headers: {
            Authorization: `Bearer 9db074d2025c7c8b89da3094894c8309`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
          },
        }
      );
      console.log(initializeResponse.data)
      const uploadLink = initializeResponse.data.upload.upload_link;
      const videoUri = initializeResponse.data.link;

      await new Promise((resolve, reject) => {
        const upload = new Upload(file, {
          headers: {
            Authorization: `Bearer 890e9adaa2ba1ea2377b5a3ca1bc4bda`,
          },
          uploadUrl: uploadLink,

          chunkSize: 10 * 1024 * 1024,
          uploadSize: file.size,
          metadata: {
            filename: file.name,
            filetype: file.type
          },
          onError: (error) => {
            console.error('Failed to upload:', error);
            reject('فشل تحميل الفيديو ');
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
            progressCallback(percentage);
          },
          onSuccess: () => {
            console.log('Upload completed successfully!');
            // console.log(upload.url);
            resolve(upload.url || '');
          },
        });

        upload.start();
      });
      return videoUri
    } catch (error) {
      console.error('Failed to upload to Vimeo:', error);
      throw new Error('فشل تحميل الفيديو ');
    }
  }
}
