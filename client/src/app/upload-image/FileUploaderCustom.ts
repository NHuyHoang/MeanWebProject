import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';


export class FileUploaderCustom extends FileUploader {


  constructor(options: FileUploaderOptions) {
    super(options);
  }

  uploadAllFiles() {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var sendable = new FormData();
      var fakeitem: FileItem = null;
      this.onBuildItemForm(fakeitem, sendable);

      for (const item of this.queue) {
        item.isReady = true;
        item.isUploading = true;
        item.isUploaded = false;
        item.isSuccess = false;
        item.isCancel = false;
        item.isError = false;
        item.progress = 0;

        if (typeof item._file.size !== 'number') {
          throw new TypeError('The file specified is no longer valid');
        }
        sendable.append("files", item._file, item.file.name);
      }

      if (this.options.additionalParameter !== undefined) {
        Object.keys(this.options.additionalParameter).forEach((key) => {
          sendable.append(key, this.options.additionalParameter[key]);
        });
      }

      xhr.onload = () => {
        var gist = (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 ? 'Success' : 'Error';
        var method = 'on' + gist + 'Item';
        this[method](fakeitem, null, xhr.status, null);

      };
      xhr.onerror = () => {
        this.onErrorItem(fakeitem, null, xhr.status, null);
      };

      xhr.onabort = () => {
        this.onErrorItem(fakeitem, null, xhr.status, null);
      };

      xhr.open("POST", this.options.url, true);
      xhr.withCredentials = true;
      if (this.options.headers) {
        for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
          var header = _a[_i];
          xhr.setRequestHeader(header.name, header.value);
        }
      }

      function readBody(xhr) {
        var data;
        if (!xhr.responseType || xhr.responseType === "text") {
          data = xhr.responseText;
        } else if (xhr.responseType === "document") {
          data = xhr.responseXML;
        } else {
          data = xhr.response;
        }
        return data;
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          resolve(JSON.parse(readBody(xhr)));
          //console.log(readBody(xhr))
        }
      }


      if (this.authToken) {
        xhr.setRequestHeader(this.authTokenHeader, this.authToken);
      }
      xhr.send(sendable);
    }))


  };

}


