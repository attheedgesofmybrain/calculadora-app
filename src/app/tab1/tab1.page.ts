import { Component } from '@angular/core';
import { evaluate } from 'mathjs'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // criação das variáveis que seram utilizadas tanto no html quando no manipulamento das funções
  public calculo = ''
  public resultado: string
  private ponto = false
  private ope = ['+','-','*','/']

  constructor(
    public alertCtrl: AlertController // importação de uma ferramenta do ionic que serve para como um alerta 
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
      this.calculo = this.resultado.toString() // função toString converte para string
      this.resultado = null
    }
    const ultimo = this.calculo.slice(-1)
    if(this.ope.indexOf(ultimo) > -1) { // funçaõ indexOf usado para comparação de objetos
      return
    }
    this.calculo += ope
    this.ponto = false  
  }

  // função para apagar todo o visor como retornar as variáveis a estaca inicial
  apagarTudo() {
    this.calculo = ''
    this.resultado = null
    this.ponto = false
  }

  // função que apaga o último digito
  apagarUltimo() {
    const ultimo = this.calculo.slice(-1) // a função slice permite "fatiar" algo de acordo com os parâmetros adotados, nesse caso, ele retornará na variavél "ultimo" o valor da variável "calculo" com excessão da última posição 
    if(ultimo == '.') {
      this.ponto = false
    }
    this.calculo = this.calculo.slice(0, -1)
  }

  // função que calcula o resultado total da expressão matemática apresentada, possível apartir de uma função importada de uma biblioteca chamada "mathjs"
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
