import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ProductCart } from 'src/app/models/product-cart.interface';
import { MessagesService } from '../../services/messages/messages.service';
import { StripeService } from '../../services/stripe/stripe.service';
import { LoggerService } from '../../services/logger/logger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


declare global {
  interface Window {
    Stripe?: any;
  }
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  idLog: string = 'CartComponent';
  displayedColumns: string[] = ['position', 'name', 'category', 'quant', 'price'];
  products: ProductCart[] = [];
  dataSource = this.products;
  total: number = 0;
  private readonly STRIPE!: any;


  constructor(
    private app: AppComponent,
    private messagesService: MessagesService,
    private dialog: MatDialog,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts(){  
    console.log('=== getProducts ===')
    let productsCart: string = ''
    if(localStorage.getItem('productsCart')){
      productsCart = localStorage.getItem('productsCart')!.toString() 
    }
    let products = productsCart != '' ? JSON.parse(productsCart) : []
    products.forEach((x:any) => {
      if(x.price && x.quant){
        this.total+= x.price * x.quant;
        this.products.push(x)
      }
    })
    console.log({products: this.products})
  }

  cancel(){
    localStorage.removeItem('productsCart')
    this.app.counter = 0;
    this.products = []
  }

  pay(){
    this.messagesService.confirm('Desea pagar?').then(async x => {
      if (x.value) {
        this.openDialog()
        
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentCart,{
      width: '30em',
      data: {...this.products, total: this.total }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.addCart({...product, quant: result})
      this.cancel()
      console.log(`Dialog result:`, result);
    });
  }

}



@Component({
  selector: 'diagog-content-cart',
  templateUrl: './diagog-content-cart.html',
})
export class DialogContentCart implements OnInit {
  idLog: string = 'DialogContentCart'
  private readonly STRIPE!: any; //TODO: window.Stripe
  private elementStripe!: any;
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  form: FormGroup = new FormGroup({})
  id!: string;
  orderData!: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogContentCart>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logger: LoggerService,
    private cd: ChangeDetectorRef,
    private stripeService: StripeService,
    // private restService: RestService, 
    private messagesService: MessagesService,
    private route: ActivatedRoute) { 
      this.STRIPE = window.Stripe(environment.stripe_pk);
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
      cardCvv: [false, [Validators.required, Validators.requiredTrue]],//TODO true | false
      cardExp: [false, [Validators.required, Validators.requiredTrue]],//TODO true | false
    })

    this.loadDetail();
    this.createStripeElement()
  }

  loadDetail(): void {
    // this.restService.getOrderDetail(this.id).subscribe(({data}) => {
    //   this.orderData = data;
    //   if (data.status.includes('succe')) {
    //     this.form.disable()
    //     this.toaster.open({
    //       text: '🔴 Error con orden',
    //       caption: 'Ya se ha pagado'
    //     });
    //   }
    //   this.form.patchValue({
    //     amount: data.amount
    //   })
    // })
  }

  

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: '\'Poppins\', sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#E3E2EC',
        },
      },
      invalid: {
        color: '#dc3545',
      },
    };

    //TODO: SDK de Stripe inicia la generacion de elementos
    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    //TODO: SDK Construimos los inputs de tarjeta, cvc, fecha con estilos
    const cardNumber = this.elementStripe.create('cardNumber', {
      placeholder: '4242 4242 4242 4242',
      style,
      classes: {
        base: 'input-stripe-custom'
      },
    });
    const cardExp = this.elementStripe.create('cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes: {
        base: 'input-stripe-custom'
      },
    });
    const cardCvc = this.elementStripe.create('cardCvc', {
      placeholder: '000',
      style,
      classes: {
        base: 'input-stripe-custom'
      },
    });

    //TODO: SDK Montamos los elementos en nuestros DIV identificados on el #id
    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;

    //TODO: Escuchamos los eventos del SDK
    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));

  }

  async initPay(): Promise<any> {
    try {
      // this.form.disable();
      //TODO: SDK de Stripe genera un TOKEN para la intencion de pago!
      const name = 'usuario'
      console.log({cardNumber: this.cardNumber, cardExp: this.cardExp, cardCvv: this.cardCvv})
      const {token} = await this.STRIPE.createToken(this.cardNumber)

      // const {token} = await this.STRIPE.createToken(this.cardNumber)

        const request = {
          name,
          amount: this.data.total
        }
        try {
          const responseGenerate = await this.stripeService.generateOrder(request).toPromise()
          this.logger.log(this.idLog, 'pay', {info: 'Success generateOrder', response: responseGenerate})
          const responseIntent = await this.stripeService.payIntent(responseGenerate.data.localizator, token.id).toPromise()
          this.logger.log(this.idLog, 'pay', {info: 'Success payIntent', response: responseIntent})
          const responseConfirm = await this.stripeService.confirmPay(responseGenerate.data.localizator).toPromise()
          this.logger.log(this.idLog, 'pay', {info: 'Success confirmPay', response: responseConfirm})
          const responseConfirmStatus = await this.stripeService.confirmStatusPay(responseGenerate.data.localizator).toPromise()
          this.logger.log(this.idLog, 'pay', { info:'Success confirmStatusPay', response: responseConfirmStatus })
          this.messagesService.toast('Pago realizado con éxito')
        } catch (e) {
          this.logger.error(this.idLog, 'pay', {info: 'Error pay', error: e})
        }
      this.dialogRef.close()
      //TODO: Enviamos el token a nuesta api donde generamos (stripe) un metodo de pago basado en el token
      //TODO: tok_23213
      // const {data} = await this.stripeService.sendPayment(token.id, this.id)

      //TODO: Nuestra api devolver un "client_secret" que es un token unico por intencion de pago
      //TODO: SDK de stripe se encarga de verificar si el banco necesita autorizar o no
      // this.STRIPE.handleCardPayment(data.client_secret)
      //   .then(async () => {

      //     //TODO: 👌 Money Money!!!
      //     // this.toaster.open({text: 'Dinerito dineron', caption: 'Yeah!', type: 'success'})

      //     //TODO: Enviamos el id "localizador" de nuestra orden para decirle al backend que confirme con stripe si es verdad!
      //     // await this.restService.confirmOrder(this.id)
      //   })
      //   .catch(() => {
      //     // this.toaster.open('Error con el pago')
      //   })
    } catch (e) {
      // this.toaster.open({text: 'Algo ocurrio mientras procesaba el pago', caption: 'ERROR', type: 'danger'})
    }

  }

  //TODO: Manejadores de validacion de input de stripe

  onChangeCard({error}: any) {
    this.form.patchValue({cardNumber: !error});
  }

  onChangeCvv({error}: any) {
    this.form.patchValue({cardCvv: !error});
  }

  onChangeExp({error}: any) {
    this.form.patchValue({cardExp: !error});
  }
}
