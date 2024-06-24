import { Injectable } from '@angular/core';
import { Upload } from 'tus-js-client';
import axios from 'axios';
import * as tus from 'tus-js-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatError } from '../../utilities/error-util';
@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {
  private vimeoToken = '4b5c656f638f944192b6cb2a2a135889'; // Replace with your Vimeo token
  upload: Upload | null = null;
  videoUri: string = ''
  constructor(private http: HttpClient) { }
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
    await this.clearFileUpload()
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
      const videoLink = initializeResponse.data.link;
      this.videoUri = initializeResponse.data.uri
      // Store upload link in local storage
      localStorage.setItem('uploadLink', uploadLink);
      localStorage.setItem('videoUri', this.videoUri);
      await new Promise((resolve, reject) => {
        this.upload = new Upload(file, {
          headers: {
            Authorization: `Bearer 890e9adaa2ba1ea2377b5a3ca1bc4bda`,
          },
          uploadUrl: uploadLink,
          retryDelays: [0, 5000, 7000, 1000],
          chunkSize: 10 * 1024 * 1024,
          uploadSize: file.size,
          metadata: {
            filename: file.name,
            filetype: file.type
          },
          onError: (error) => {
            console.error('Failed to upload:', error);
            reject(formatError(error) + 'فشل تحميل الفيديو ');
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
            progressCallback(percentage);
            localStorage.setItem('uploadOffset', bytesUploaded.toString());
          },
          onSuccess: () => {
            console.log('Upload completed successfully!');
            console.log(this.upload);
            resolve(this.upload?.url || '');
            localStorage.removeItem('uploadLink');
            localStorage.removeItem('uploadOffset');
            localStorage.removeItem('videoUri');
          },
        });

        this.upload.start();
      });
      return videoLink
    } catch (error) {
      console.error('Failed to upload to Vimeo:', error);
      throw new Error(formatError(error) + "فشل تحميل الفيديو ");
    }
  }
  // clearFileUpload() {
  //   if (this.upload) {
  //     this.upload.abort();
  //     this.upload = null;
  //   }
  // }
  async clearFileUpload(): Promise<void> {
    return new Promise(async (resolve) => {
      if (this.upload) {
        this.upload.abort();
        this.upload = null;
        if (this.videoUri) {
          await this.deleteVideoOnVimeo(this.videoUri)
          this.videoUri = '';
        }

        console.log('Upload aborted');
      }
      resolve();
    });

  }
  async deleteVideoOnVimeo(videoUri: string) {
    console.log(videoUri)
    if (!videoUri) return;
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer 890e9adaa2ba1ea2377b5a3ca1bc4bda`,
      });

      await this.http.delete(`https://api.vimeo.com${videoUri}`, { headers }).toPromise();
      console.log('Video deleted successfully.');
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  }
}
