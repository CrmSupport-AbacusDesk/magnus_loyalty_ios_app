import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';

/**
 * Generated class for the PointImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-image',
  templateUrl: 'point-image.html',
})
export class PointImagePage {

  uploadUrl:any='';
  filter :any = {};
  image : any = [];
  loading:Loading;



  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public service:DbserviceProvider, public constant:ConstantProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointImagePage');
   this.getPointDetailImage();
   this.uploadUrl = this.constant.upload_url4;
   this.presentLoading();

  }
  presentLoading() 
  {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: false
    });
    this.loading.present();
  }

  getPointDetailImage(){
    this.filter;
  
    this.service.post_rqst({'filter' : this.filter},'app_karigar/Points_image')
  
    .subscribe( (r) =>
          {
              console.log(r);
              // this.loading.dismiss();
              this.loading.dismiss();
              this.image=r['img'] ;
  
          });
  }

}
