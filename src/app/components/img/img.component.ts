import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() imagen : string = '';
  @Output() loaded = new EventEmitter<string>();
  imagenPaila = "../../../assets/paila.jpg"
  counter = 0;
  counterFn: number | undefined;

  constructor() {
/*     console.log("chupala desde el constructor", "valor de img =>", this.imagen)     */
  }
  
  imgError(){
    /* this.imagen = this.imagenPaila */
  }
  imgLoaded(){
    this.loaded.emit(this.imagen)
  }

}
