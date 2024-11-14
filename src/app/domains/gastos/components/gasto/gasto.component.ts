import { Component, Input, OnInit } from '@angular/core';
import { Gasto } from 'src/app/domains/shared/models/gasto.model';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
})
export class GastoComponent  implements OnInit {
  @Input() gasto: Gasto | undefined;
  @Input() indice?: number;
  constructor() { }

  ngOnInit() {}

}
