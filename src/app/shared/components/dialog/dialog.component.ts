import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input()
  titulo: string;

  mostrar = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrir() {
    this.mostrar = true;
  }

  cerrar() {
    this.mostrar = false;
  }

}
