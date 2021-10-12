import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArchievmentsService {

  constructor() { }
}

export enum ArchievmentName {
  ArchievmentLevel1 = 'al1',
  ArchievmentLevel2 = 'al2',
  ArchievmentLevel3 = 'al3',
  ArchievmentLevel4 = 'al4',
  ArchievmentLevel5 = 'al5',
  ArchievmentLevel6 = 'al6',
  ArchievmentLevel7 = 'al7',
  ArchievmentLevel8 = 'al8'
}
