import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/product-cart.interface';
import { Menu } from '../../models/menu.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() menu: Array<Menu> = []
  @Input() counter: number = 5
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToPage(path: string){
    this.router.navigate([path])
  }
}
