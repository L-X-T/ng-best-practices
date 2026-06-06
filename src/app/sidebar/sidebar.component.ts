import { Component, ElementRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

import { BlinkService } from '../shared/blink.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: 'sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: 'sidebar.component.scss',
})
export class SidebarComponent {
  private readonly blinkService = inject(BlinkService);
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  protected blink(): void {
    this.blinkService.blinkElementsFirstChild(this.elementRef);
  }

  protected goHome(): void {
    this.router.navigate(['/home']);
  }
}
