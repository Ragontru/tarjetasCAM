import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tarjeta } from '../modelo/Tarjeta';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  formulario: FormGroup;
  grupoDatos: FormGroup;

  tipo = [
    { nombre: "American Express" },
    { nombre: "Discover" },
    { nombre: "MasterCard" },
    { nombre: "Visa" }
  ];

  validation_messages = {
    'numTarjeta': [
      { type: 'required', message: 'El número de tarjeta es necesario.' },
      { type: 'minlength', message: 'El número de tarjeta debe tener 16 caracteres.' },
      { type: 'maxlength', message: 'El número de tarjeta debe tener 16 caracteres.' },
      { type: 'pattern', message: 'El número de tarjeta sólo contiene números.' }
    ],
    'expira': [
      { type: 'required', message: 'Se requiere la fecha de vencimiento.' }
    ],
    'cvv': [
      { type: 'required', message: 'Se requiere el código de verificación.' }
    ],
    'tipo': [
      { type: 'required', message: 'Se requiere la fecha de vencimiento.' }
    ],
    'grupoDatos': [
      { type: 'required', message: 'Tipo requerido' }
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }


  ngOnInit() {
    this.grupoDatos = new FormGroup({
      numTarjeta: new FormControl('', Validators.compose([
        Validators.maxLength(16),
        Validators.minLength(16),
        Validators.pattern('[0-9]'),
        Validators.required
      ])),
      expira: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      tipo: new FormControl(this.tipo[0], Validators.required),
      clientePromocional: new FormControl(false, Validators.pattern('true'))
    }, (formGroup: FormGroup) => {
      return this.validarGrupoDatos(formGroup);
    });
  }
  validarGrupoDatos(fg: FormGroup) {
    return null;
  }

  onSubmit(values) {
    let tarjeta: Tarjeta;
    tarjeta = new Tarjeta(values['grupoDatos']['numTarjeta'],
      values['grupoDatos']['expira'],
      values['grupoDatos']['cvv'],
      values['grupoDatos']['tipo'],
      values['grupoDatos']['clientePromocional']);

    console.log(Tarjeta);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        tarjeta: JSON.stringify(tarjeta)
      }
    };
    this.navCtrl.navigateForward('/pagina2', navigationExtras);
  }
}
