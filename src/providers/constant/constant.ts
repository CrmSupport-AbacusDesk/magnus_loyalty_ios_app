import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {

  constructor(public http: Http) {
    console.log('Hello ConstantProvider Provider');
  }

  public rootUrl: string = 'https://apps.abacusdesk.com/magnus_plywood/dd_api/';  
  public server_url: string = this.rootUrl + 'index.php/app/';
  public upload_url: string ='https://apps.abacusdesk.com/magnus_plywood/dd_api/app/uploads/';
  public upload_url3:string ='https://apps.abacusdesk.com/magnus_plywood/dd_api/app/uploads/site_images/'
  public upload_url4:string ='https://apps.abacusdesk.com/magnus_plywood/dd_api/app/uploads/point_img/'


  public backButton = 0;

}
