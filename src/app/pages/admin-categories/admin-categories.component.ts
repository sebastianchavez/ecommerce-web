import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category/category.service';
import { LoggerService } from '../../services/logger/logger.service';
import { MessagesService } from '../../services/messages/messages.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  idLog: string = 'AdminCategoriesComponent'
  displayedColumns: string[] = ['name', 'action',];
  categories: Category[] = [];
  newCategory: Category = { 
    id:'',
    isDeleted: false,
    name: ''
  }
  filters = {
    name: '',
    isDeleted: false
  }

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private messagesService: MessagesService,
    private logger: LoggerService
  ) {
    this.getCategories()
   }

  ngOnInit(): void {
  }

  getCategories(){
    this.categoryService.searchCategory(this.filters)
      .subscribe(res => {
        this.categories = res
        this.logger.log(this.idLog, 'getCategories', {info: 'Success get categories', response: res})
      },err => {
        this.logger.error(this.idLog, 'getCategories', {info: 'Error get categories', error: err})
      })
  }

  async saveCategory(category: Category){
    try {
      const resp = await this.categoryService.saveCategory(category)
      this.logger.log(this.idLog, 'saveCategory', {info: 'Success save category in firestore', response: resp })
    } catch (e) {
      this.logger.log(this.idLog, 'saveCategory', {info: 'Error save category in firestore', error: e })
    }
  }

  updatecategory(){

  }

  deleteCategory(category: Category){
    this.messagesService.confirm('Desea eliminar esta categoría?')
      .then(async res => {
        if(res.value){
          try {
            let response = await this.categoryService.deleteCategory(category)
            this.logger.log(this.idLog, 'deleteCategory', {info: 'Success delete category', response})
          } catch (e) {
            this.logger.error(this.idLog, 'deleteCategory', {info: 'Error delete category', error: e})
          }
        }
      })
  }

  openDialog(category: Category = {id: '', name: '', isDeleted: false}) {
    const dialogRef = this.dialog.open(DialogContentCategory,{
      width: '250px',
      data: {...category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveCategory({...result})
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-admin-categories',
  templateUrl: 'dialog-content-admin-categories.html',
})
export class DialogContentCategory {
  constructor(
    public dialogRef: MatDialogRef<DialogContentCategory>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}