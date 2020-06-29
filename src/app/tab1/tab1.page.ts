import { Component } from '@angular/core';
import { evaluate } from 'mathjs'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public calculo = ''
  public resultado: string
  private ponto = false
  private ope = ['+','-','*','/']

  constructor(
    public alertCtrl: AlertController
  ) {}

  addNumber(valor: string) {
    if(this.resultado) {
      this.apagarTudo()
    }
    this.calculo = this.calculo + valor
  }

  addPon(){
    if(this.ponto) {
      return
    }
    this.calculo += '.'
    this.ponto = true
  }

  addOpe(ope: string) {
    if(this.resultado) {
      this.calculo = this.resultado.toString()
      this.resultado = null
    }
    const ultimo = this.calculo.slice(-1)
    if(this.ope.indexOf(ultimo) > -1) {
      return
    }
    this.calculo += ope
    this.ponto = false  
  }

  apagarTudo() {
    this.calculo = ''
    this.resultado = null
    this.ponto = false
  }

  apagarUltimo() {
    const ultimo = this.calculo.slice(-1)
    if(ultimo == '.') {
      this.ponto = false
    }
    this.calculo = this.calculo.slice(0, -1)
  }

  calcularResultado() {
    try {
      this.resultado = evaluate(this.calculo)
    } catch(e) {
      this.resultado = ''
      this.presentAlert('ERROR!', 'Cálculo inválido, verifique!')
    }
  }

  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'titulo',
      message: mensagem,
      buttons: ['OK']
    })
    await alert.present()
  }


}
