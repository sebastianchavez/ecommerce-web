import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() clickBack: EventEmitter<any> = new EventEmitter();
  @Output() clickNext: EventEmitter<any> = new EventEmitter();
  @Input() pagination: any = {
    totalProducts: 0,
    page: 1,
    totalPages: 1,
    pages:[]
  }
  constructor() { }

  ngOnInit(): void {
  }

  back(){
    this.clickBack.emit()
  }

  next(){
    this.clickNext.emit()
  }

}
