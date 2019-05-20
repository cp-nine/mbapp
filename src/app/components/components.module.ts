import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardComponent } from './card/card.component';
import { ContainerComponent } from './container/container.component';
import { ContentBodyComponent } from './content-body/content-body.component';
import { ImageComponent } from './image/image.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';

@NgModule({
  declarations: [
    ButtonComponent, 
    NavbarComponent, 
    SidebarComponent, 
    BreadcrumbComponent, 
    CardComponent, ContainerComponent, ContentBodyComponent, ImageComponent, AlertComponent, ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent, ComboBoxComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    ButtonComponent, 
    NavbarComponent, 
    SidebarComponent,
    BreadcrumbComponent,
    CardComponent, ContainerComponent, ContentBodyComponent, ImageComponent, AlertComponent, ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent, ComboBoxComponent
  ]
})
export class ComponentsModule { }
