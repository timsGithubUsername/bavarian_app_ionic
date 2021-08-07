import {QuizFactoryImpl} from "./QuizFactoryImpl";
import {QuizWordFactoryImpl} from "./QuizWordFactoryImpl";
import {VocabularyWord} from "../VocabularyWord";
import {VocabularyWordFactoryImpl} from "./VocabularyWordFactoryImpl";



describe("Generate new Quiz", () => {

  let factory : QuizFactoryImpl = new QuizFactoryImpl();
  let vocFac = new VocabularyWordFactoryImpl();

  let list:VocabularyWord[] = [];
  list.push(vocFac.createVocabularyWord(0,null,"",null,null));
  list.push(vocFac.createVocabularyWord(1,null,"",null,null));
  list.push(vocFac.createVocabularyWord(2,null,"",null,null));
  list.push(vocFac.createVocabularyWord(3,null,"",null,null));
  list.push(vocFac.createVocabularyWord(4,null,"",null,null));
  list.push(vocFac.createVocabularyWord(5,null,"",null,null));
  list.push(vocFac.createVocabularyWord(6,null,"",null,null));
  list.push(vocFac.createVocabularyWord(7,null,"",null,null));

  let quiz = factory.createQuiz(list,new QuizWordFactoryImpl())


  expect(quiz.getQuizWords().length === 7);

  });
