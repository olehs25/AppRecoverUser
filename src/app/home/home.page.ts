import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {RecoverUserService} from "../recover-user.service";
import {UserDTO} from "src/models/userDTO.model";
import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "my-app",
  styleUrls: ['./home.page.scss'],
  template: `
    <div class="text">
      <p>1. {{'DO YOU KNOW YOUR EMPLOYEE USER NAME? IF YOU KNOW IT CLICK YES, IF YOU DONT KNOW IT CLICK NO.' | translate}}.
        <br /><br /> <br />
        <a href="http://localhost:4200/"><input type="submit" class="button" value="{{'YES' | translate}}" />
        </a> {{'OR' | translate}} <input type="submit" (click)="showForm()" style="padding: 4px 10px;" value="No" required/></p>
    </div>
    <div *ngIf="!show" class="example-wrapper">
      <form class="k-form" [formGroup]="registerForm">
        <p class="text">2. {{'COMPLETE THE FORM' | translate}}</p>
        <fieldset class="example-wrapper">
          <br />
          <div>
            <br />
            <kendo-formfield>
              <kendo-label [for]="fullName" text="{{'FULL NAME' | translate}}"></kendo-label>
              <input formControlName="fullName" value="kendoTextBox" #fullName [(ngModel)]="user.fullName" required/>
              <kendo-formhint class="helptext"> {{'YOUR FULL NAME' | translate}}</kendo-formhint>
              <br />
              <kendo-formerror class="formerror">{{'ERROR: FULL NAME IS REQUIRED' | translate}}</kendo-formerror>
            </kendo-formfield>

            <br />
            <kendo-formfield>
              <kendo-label [for]="nif" text="{{'YOU NIF/NIE' | translate}}"></kendo-label>
              <input type="text" #nif required formControlName="nif"
                      [(ngModel)]="user.nif">
              <br />
             <kendo-formhint class="helptext"> {{'YOU PERSONAL NIF/NIE' | translate}}</kendo-formhint>
              <kendo-formerror class="formerror">{{'ERROR: NIF IS REQUIRED' | translate}}</kendo-formerror>
            </kendo-formfield>
            <br /><br />

            <div>
              <input type="submit" class="button" (click)="submitForm(this.user)"  value="{{'SUBMIT' | translate}}" />
              &nbsp;&nbsp;
              <input type="submit" style="padding: 4px 10px;" (click)="clearForm()"  value="{{'CLEAR' | translate}}" />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    <div class="footer">
      <p>{{'RESET PASS' | translate}}</p>
    </div>
  `,

  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  customer: Object | undefined;

  constructor(private recoverService: RecoverUserService, public atrCtrl: AlertController,
              private translate: TranslateService) {

    this.translate.setDefaultLang('es');
    this.translate.use(window.navigator.language);
  }
  show: boolean = true;
  user: UserDTO = new UserDTO();


  public registerForm: FormGroup = new FormGroup({
    nif: new FormControl(),
    fullName: new FormControl(),

  });


  public  submitForm(user : UserDTO): void {
    this.registerForm.markAllAsTouched();
    if (this.user.fullName!="" && this.user.nif!="") {
      this.recoverService.loadUserES(user).subscribe({
        next: (customer) => {
          this.customer = customer
        }, error: (err) => {
          if (err.status == 404 || err.status == 400) {
            this.showPopup404()

          } else if (err.status == 200) {
            this.showPopup200()
          } else {
            this.showPopupElse()
          }
        }
      });
    }else{
    }
  }

  public async showPopup200(): Promise<void> {
    let alert = await this.atrCtrl.create({
      message:  this.translate.instant('THE DATA ENTERED IS CORRECT. YOU WILL RECEIVE YOUR USERNAME VIA SMS IN A FEW SECONDS.'),
      buttons: [{
        text: 'OK',
        handler: () => {
          // Redirigir a localhost:4200
          window.location.href = 'http://localhost:4200/login';
        }
      }]
    });
    await alert.present();
  }

  public async showPopup404(): Promise<void> {
    let alert = await this.atrCtrl.create({
      message:  this.translate.instant('THE DATA ENTERED IS INCORRECT.'),
      buttons: ['OK'],
    });
    await alert.present();
  }



  public async showPopupElse(): Promise<void> {

    let alert = await this.atrCtrl.create({
      message: this.translate.instant('THERE WAS AN UNESPECTED ERROR. PLEASE CONTACT WITH HELPDESK.'),
      buttons: ['OK'],
    });
    alert.present();
  }


  public clearForm(): void {
    this.registerForm.reset();
  }

  public showForm(): void {
    this.show = false;
  }

}
