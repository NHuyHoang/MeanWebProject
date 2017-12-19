import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';

import { VisitUserComponent } from './visit-user.component';
import { PostService,AreaService,CategoryService } from '../shared-service/shared-service'
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[ VisitUserComponent ],
    imports:[ CommonModule, MinifiedPostModule, RouterModule ],
    providers:[PostService, AreaService, CategoryService]
})
export class VisitUserModule{

}