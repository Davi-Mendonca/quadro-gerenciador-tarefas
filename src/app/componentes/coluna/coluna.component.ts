import { Component, ElementRef } from '@angular/core';



@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss']
})
export class ColunaComponent {

  constructor(private el: ElementRef) {}

  primeiroFilho: boolean = false

  ngAfterViewInit() {

    const nativeElement = this.el.nativeElement;

    this.primeiroFilho = nativeElement.parentElement.firstChild === nativeElement;
    console.log(this.primeiroFilho)
  }

}
