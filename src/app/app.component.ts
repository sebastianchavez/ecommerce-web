import { Component } from '@angular/core';
import { Menu } from './models/menu.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-web';
  menu: Array<Menu> = [
    {
      name: 'Publicar',
      router: 'publish'
    },
    {
      name: 'Productos',
      router: 'products'
    }
  ]
}
