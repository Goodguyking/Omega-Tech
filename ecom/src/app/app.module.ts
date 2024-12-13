import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { SellerdashboardComponent } from './sellerdashboard/sellerdashboard.component';
import { SellerUploadComponent } from './seller-upload/seller-upload.component';
import { ProductListComponent } from './product-list/product-list.component';  // Add FormsModule and ReactiveFormsModule
import { FormGroup } from '@angular/forms';
import { ProductComponent } from './product/product.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    AdmindashboardComponent,
    SellerdashboardComponent,
    SellerUploadComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    UserUpdateComponent,
    CheckoutComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
