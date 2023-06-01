import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Loading, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { ProjectAddPage } from '../project-add/project-add';
import { ViewProfilePage } from '../view-profile/view-profile';

/**
* Generated class for the ProjectListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {
  data:any =[]; 
  employee_id:any;
  filter:any = {};
  filterType:any ={};
  loading:Loading;
  flag:any='';
  upload_url:any=''

  
  
  
  constructor(public navCtrl: NavController, public modalCtrl:ModalController, public con:ConstantProvider, public navParams: NavParams,public dbService:DbserviceProvider, public loadingCtrl:LoadingController,  public translate:TranslateService) {
    this.projectList('');
    this.upload_url = this.con.upload_url3;
  }
  
  ionViewDidLoad() {
    this.presentLoading();
  }
  
  
  doRefresh (refresher)
  {
    this.projectList('');
    setTimeout(() => {
      refresher.complete();
    }, 1000);
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
  
  
  projectList(search){
    this.filter.limit = 0;
    this.filter.search=search;
    this.dbService.post_rqst( {'karigar_id':this.dbService.karigar_id, 'filter': this.filter}, 'app_karigar/project_listing').subscribe( r =>
      {
        console.log(r);
        
        this.loading.dismiss();
        this.data  = r['projects'];
        console.log(this.data);
        
        // console.log(r.request_list.data);
        // this.data = r.request_list.data;
        // this.filter.mode = 1;
        
      });
      
    }
    
    goOnAdd(){
      this.navCtrl.push(ProjectAddPage);
    }
    
    loadData(infiniteScroll)
    {
      console.log(infiniteScroll);
      
      console.log('loading');
      this.filter.limit=this.data.length;
      console.log(this.filter.limit);
      this.dbService.post_rqst({'karigar_id':this.dbService.karigar_id, 'filter': this.filter},'app_karigar/project_listing')
      .subscribe( (r) =>
      {
        console.log(r);
        if(r['transaction']=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.data=this.data.concat(r['projects']);
            infiniteScroll.complete();
          },1000);
        }
      });
    }

    viewDetail(image)
    {
      let normal = 'normalUrl'
      this.modalCtrl.create(ViewProfilePage, {"Image": image, "type":normal}).present();
    }
    
  }
  