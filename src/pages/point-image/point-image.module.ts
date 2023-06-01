import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointImagePage } from './point-image';
import { createTranslateLoader } from '../offers/offers.module';

@NgModule({
  declarations: [
    PointImagePage,
  ],
  imports: [
    IonicPageModule.forChild(PointImagePage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class PointImagePageModule {}
