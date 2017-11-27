import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { ProductService } from './product.service';
import { AreaService } from './area.service';
import { CategoryService } from './category.service';
import { DateTimeFormatService } from './date-time-format.service';
import { SignInManageService } from './sign-in-manage.service';

@NgModule({
    declarations:[],
    imports:[],
    providers:[ 
        ProductService,
        AreaService,
        CategoryService,
        DateTimeFormatService,
        PostService,
        SignInManageService,
        UserService ],
    exports:[ ]
})
export class SharedServiceModule{}