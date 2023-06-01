import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, IonicPage, Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { ProjectListPage } from '../project-list/project-list';

/**
* Generated class for the ProjectAddPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-project-add',
  templateUrl: 'project-add.html',
})
export class ProjectAddPage {
  data:any={};
  today_date:any ={};
  todayDate:any
  contractorData:any =[];
  loading:Loading;
  formData= new FormData();
  state_list:any=[];
  district_list:any=[];
  city_list:any=[];
  pincode_list:any=[];
  formFasle:any = false
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public dbService:DbserviceProvider, public loadingCtrl:LoadingController, public translate:TranslateService, public actionSheetController: ActionSheetController,private camera: Camera) {
    // this.dbService.karigar_id;
    this.data.site_image='';
    this.getstatelist();
  }
  
  ionViewDidLoad() { 
    
    this.translate.get("Camera")
    .subscribe(resp=>{
      this.cam = resp
    });
    
    this.translate.get("Gallery")
    .subscribe(resp=>{
      this.gal = resp
    });
    
    this.translate.get("Cancel")
    .subscribe(resp=>{
      this.cancl = resp
    });
    
    this.translate.get("OK")
    .subscribe(resp=>{
      this.ok = resp
    });
    
    this.translate.get("Upload File")
    .subscribe(resp=>{
      this.upl_file = resp
    });
    
    this.translate.get("Registered Successfully")
    .subscribe(resp=>{
      this.save_succ = resp
    });
    
  }
  
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Delete successfully',
      duration: 3000
    });
    toast.present();
  }
  
  getstatelist(){
    this.dbService.get_rqst('app_master/getStates').subscribe( r =>
      {
        console.log(r);
        this.state_list=r['states'];
        console.log(this.state_list);
      });
    }
    getDistrictList(state_name)
    {
      console.log(state_name);
      this.dbService.post_rqst({'state_name':state_name},'app_master/getDistrict')
      .subscribe( (r) =>
      {
        console.log(r);
        this.district_list=r['districts'];
        console.log(this.state_list);
      });
    }
    
    getCityList(district_name)
    {
      console.log(district_name);
      this.dbService.post_rqst({'district_name':district_name},'app_master/getCity')
      .subscribe( (r) =>
      {
        console.log(r);
        this.city_list=r['cities'];
        this.pincode_list=r['pins'];
        console.log(this.pincode_list);
      });
    }
    


    MobileNumber(event: any) {
      const pattern = /[0-9]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
      }
  }

    getaddress(pincode)
    {
      if(this.data.pincode.length=='6')
      {
        this.dbService.post_rqst({'pincode':pincode},'app_karigar/getAddress')
        .subscribe( (result) =>
        {
          console.log(result);
          var address = result.address;
          if(address!= null)
          {
            this.data.state = result.address.state_name;
            this.getDistrictList(this.data.state)
            this.data.district = result.address.district_name;
            this.data.city = result.address.city;
            console.log(this.data);
          }
        });
      }
      
    }
    
    
    submit(form:any){
      console.log(this.data , 'Line number 190');
      console.log(this.data);
      this.data.karigar_id = this.dbService.karigar_id;
      
      this.dbService.post_rqst({'data':this.data},'app_karigar/add_project').subscribe( r =>
        {
          console.log(r);
          if(r['status'] == 'SUCCESS'){
            this.navCtrl.push(ProjectListPage);
          }
        });
      }
      
      
      
      
      presentLoading() 
      {
        this.translate.get("Please wait...")
        .subscribe(resp=>{
          this.loading = this.loadingCtrl.create({
            content: resp,
            dismissOnPageChange: false
          });
          this.loading.present();
        })
      }
      
      cam:any="";
      gal:any="";
      cancl:any="";
      ok:any="";
      upl_file:any="";
      save_succ:any="";
      flag:boolean=true;  
      
      onUploadImage(evt: any) {
        let actionsheet = this.actionSheetController.create({
          title:this.upl_file,
          cssClass: 'cs-actionsheet',
          buttons:[{
            cssClass: 'sheet-m',
            text: this.cam,
            icon:'camera',
            handler: () => {
              this.chequePhoto();
            }
          },
          {
            cssClass: 'sheet-m1',
            text: this.gal,
            icon:'image',
            handler: () => {
              this.chequeImage();
            }
          },
          {
            cssClass: 'cs-cancel',
            text: this.cancl,
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      actionsheet.present();
    }
    chequePhoto()
    {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth : 500,
        targetHeight : 400
      }
      
      console.log(options);
      this.camera.getPicture(options).then((imageData) => {
        this.flag=false;
        this.data.site_image = 'data:image/jpeg;base64,' + imageData;
        console.log(this.data.site_image, 'Line number 168');
      }, (err) => {
      });
    }
    chequeImage()
    {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum:false
      }
      console.log(options);
      this.camera.getPicture(options).then((imageData) => {
        this.flag=false;
        this.data.site_image = 'data:image/jpeg;base64,' + imageData;
        console.log(this.data.site_image, 'Line number 184');
      }, (err) => {
      });
    }
    
    
    
    
    
  }
  