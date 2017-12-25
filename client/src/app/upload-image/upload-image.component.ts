import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileUploaderCustom } from './FileUploaderCustom';
import { Response } from '@angular/http';
import { GdriveService } from '../shared-service/shared-service'
const URL = 'http://127.0.0.1:3000/fetch/google/drive/upload';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  private uploader = new FileUploaderCustom({ url: URL });
  private uploading = false;
  private uploaded = false;
  private imageId;
  private uploadSuccess = false;
  constructor(private gdrive: GdriveService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("oke");
      var responsePath = JSON.parse(response);
      if (status === 200) {
        console.log(response, responsePath);// the url will be in the response
      }
    };
  }

  ngOnInit() {
  }


  onUpload() {
    this.uploading = true;
    this.uploader.uploadAllFiles()
      .subscribe(res => {
        this.uploading = false;
        this.uploaded = true;
        this.imageId = res;
        this.uploadSuccess = true;
      }
      );
  }

  onReSelect() {
    this.uploading = true;
    this.gdrive.removeFile(this.imageId).subscribe(result => {
      if (result.success) {
        this.uploader.queue = [];
        this.uploaded = false;
        this.uploading = false;
        this.uploadSuccess = false;
      }
    })
  }
}
