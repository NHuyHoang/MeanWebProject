import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { SharedModule } from '../../shared-module/shared.module';
import { MinifiedPostModule } from '../minified-post/minified-post.module';


@NgModule({
    declarations:[PostComponent],
    imports:[CommonModule,SharedModule,MinifiedPostModule],
    providers:[]
})
export class PostModule {}