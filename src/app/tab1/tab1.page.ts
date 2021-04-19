import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  validations_form: FormGroup;
  tipo: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }


  ngOnInit() {
    this.tipo = [
      "American Express",
      "Discover",
      "MasterCard",
      "Visa"
    ];
    this.validations_form = this.formBuilder.group({
      numTarjeta: new FormControl('', Validators.compose([
        Validators.maxLength(16),
        Validators.minLength(16),
        Validators.pattern('[0-9]'),
        Validators.required
      ])),
      expira: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      tipo: new FormControl(this.tipo[0], Validators.required),
      clientePromocional: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$')
      ])),
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }
}
