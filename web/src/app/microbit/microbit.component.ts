import {Component, OnDestroy, OnInit} from '@angular/core';
import {MicrobitService} from './microbit.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-microbit',
  templateUrl: './microbit.component.html',
  styleUrls: ['./microbit.component.scss']
})
export class MicrobitComponent implements OnInit, OnDestroy {

  public formKeys = {
    speed: 'speed'
  };

  public formGroup: FormGroup;
  public get speed(): FormControl { return this.formGroup ? this.formGroup.get(this.formKeys.speed) as FormControl : null; }

  private componentDestroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              public microbitService: MicrobitService) { }

  ngOnInit(): void {
    this.setupForm();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private setupForm(): void {
    this.formGroup = this.formBuilder.group({
      [ this.formKeys.speed ]: [ 100, [Validators.required] ]
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
      () => this.sendFormData()
      );
  }

  public onFormSubmit(): void {

  }

  public connect(): void {
    this.microbitService.connect();
  }

  public sendFormData(): void {
    this.microbitService.sendMessage(this.speed.value);
  }

}
