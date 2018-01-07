import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { SharedModule } from '../../shared-module/shared.module';
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { POST_ROUTING } from './post.routing';


@NgModule({
    declarations:[PostComponent],
    imports:[CommonModule,SharedModule,MinifiedPostModule,POST_ROUTING],
    providers:[]
})
export class PostModule {}