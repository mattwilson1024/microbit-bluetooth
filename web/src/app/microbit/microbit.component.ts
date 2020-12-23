import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BpmDetectorService } from './bpm-detector.service';
import { MicrobitService } from './microbit.service';

@Component({
  selector: 'app-microbit',
  templateUrl: './microbit.component.html',
  styleUrls: ['./microbit.component.scss']
})
export class MicrobitComponent implements OnInit, OnDestroy {

  public formKeys = {
    bpm: 'bpm'
  };

  public formGroup: FormGroup;
  public get bpm(): FormControl { return this.formGroup ? this.formGroup.get(this.formKeys.bpm) as FormControl : null; }

  private componentDestroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              public bpmService: BpmDetectorService,
              public microbitService: MicrobitService) { }

  ngOnInit(): void {
    this.setupForm();

    this.bpmService.bpm$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(
        bpm => this.bpm.setValue(bpm)
      );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private setupForm(): void {
    this.formGroup = this.formBuilder.group({
      [ this.formKeys.bpm ]: [ 100, [Validators.required] ]
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
      () => this.sendFormData()
      );
  }

  public onFormSubmit(): void {

  }

  public tap(): void {
    this.bpmService.registerBeat();
  }

  public connect(): void {
    this.microbitService.connect();
  }

  public sendFormData(): void {
    const delayTime = this.bpmToDelayConverter(this.bpm.value);
    this.microbitService.sendMessage(delayTime.toString());
  }

  private bpmToDelayConverter(bpm: number): number {
    const targetFlashesPerSecond = bpm / 60;
    const targetOnOffCyclesPerSecond = targetFlashesPerSecond * 2;
    return Math.floor(1000 / targetOnOffCyclesPerSecond);
  }

}
