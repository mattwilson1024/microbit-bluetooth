import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const MS_IN_MINUTE = 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class BpmDetectorService {

  public timestamps$ = new BehaviorSubject<number[]>([]);
  public bpm$ = new BehaviorSubject<number>(50);
  public nextBeatNumber$ = this.timestamps$.pipe(map(timestamps => timestamps.length + 1));

  constructor() { }

  public registerBeat(): void {
    const previousTimestampsArray = this.timestamps$.value;
    const newTimestampsArray = [...previousTimestampsArray, performance.now()];
    this.timestamps$.next(newTimestampsArray);

    const MAX_BEATS = 8;
    if (newTimestampsArray.length === MAX_BEATS) {
      const firstBeat = newTimestampsArray[0];
      const lastBeat = newTimestampsArray.slice(-1)[0];
      const totalDuration = lastBeat - firstBeat;
      const beatLengthInMs = totalDuration / (MAX_BEATS - 1);
      const bpm = Math.floor(MS_IN_MINUTE / beatLengthInMs);
      this.bpm$.next(bpm);
      this.timestamps$.next([]);
    }
  }

}
