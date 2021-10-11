export class VocabWordsTableModel {
  categories: number;
  german: string;
  pictureName: string;
  comment:string;
  dialect:string;
  dialectLiterally:string;
  audioName:string;
  translation:string;
}

export class CategoriesTableModel{
  id:number;
  name:string;
  pictureName:string;
  level:number;
}

export class DialectTableModel{
  id:number;
  name:string;
  gender:string;
  color:string;
  info:string;
}

export class LanguagesTableModel{
  id:number;
  language:string;
  pictureName:string;
}

export class LevelsTableModel{
  id:number;
  pictureName:string;
}

