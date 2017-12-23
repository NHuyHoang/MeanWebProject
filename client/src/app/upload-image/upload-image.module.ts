import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UploadImageComponent } from './upload-image.component';
import { ImgPreviewDirective } from '../shared-directives/img-preview.directive';
import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
    declarations:[ UploadImageComponent, ImgPreviewDirective, FileSelectDirective ],
    imports:[ CommonModule ],
    providers:[],
    exports:[UploadImageComponent],

})
export class UploadImgModule { }