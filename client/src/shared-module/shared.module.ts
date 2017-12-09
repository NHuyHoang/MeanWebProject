import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from '../app/truncate-text.pipe';
import { UnderscoreTruncatePipe } from '../app/underscore-truncate.pipe';

@NgModule({
    declarations:[TruncateTextPipe,UnderscoreTruncatePipe],
    imports:[CommonModule],
    exports:[TruncateTextPipe,UnderscoreTruncatePipe]
})
export class SharedModule {}