// src/app/pages/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,  // Indica que es un componente standalone
  imports: [CommonModule, ReactiveFormsModule],  // Importa los módulos necesarios
  template: `
    <div class="contact-container">
      <h2>Contacto</h2>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <label>Nombre:</label>
        <input type="text" formControlName="name">
        <label>Email:</label>
        <input type="email" formControlName="email">
        <label>Mensaje:</label>
        <textarea formControlName="message"></textarea>
        <button type="submit" [disabled]="contactForm.invalid">Enviar</button>
      </form>
      <div *ngIf="message" class="success">{{ message }}</div>
      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  message = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Inicializa el formulario reactivo con validaciones básicas
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post('/api/contact', this.contactForm.value).subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.contactForm.reset();
        },
        error: err => {
          console.error(err);
          this.errorMessage = 'Error al enviar el mensaje.';
        }
      });
    }
  }
}
