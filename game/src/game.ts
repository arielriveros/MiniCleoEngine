import { Engine } from 'minicleo';
import { GameLevel1 } from './level1';
import { GameLevel2 } from './level2';

let engine = new Engine({context: 'game-context', fullscreen: true});




const level1 = new GameLevel1();
const level2 = new GameLevel2();

engine.addLevel(level1);
engine.addLevel(level2);
engine.setActiveLevel('GameLevel1');
engine.start();