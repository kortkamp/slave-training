import penisImg from '../assets/fgimage/Hx1/tools/prone_penis.png';
import fistImg from '../assets/fgimage/Hx1/tools/fist.png';
import plugImg from '../assets/fgimage/Hx1/tools/prone_plug.png';
import ballsImg from '../assets/fgimage/Hx1/tools/thai_balls.png';
import chokeHand from '../assets/fgimage/Hx1/tools/hand.png';
import fingerImg from '../assets/fgimage/Hx1/tools/finger.png';
import dildoImg from '../assets/fgimage/Hx1/tools/dildo.png';
import syringeImg from '../assets/fgimage/Hx1/tools/syringe1.png';

export interface IToolData {
  name:string;
  image:string;
  depthLimit: number;
  angle: number;
  area: 'ass'|'stomach'|'neck';
  type: 'penetrator'|'draggable'|'fixed'|'elastic';
  map:number[][];
}

const Penis:IToolData = {
  name: 'penis',
  image: penisImg,
  area: 'ass',
  type: 'penetrator',
  depthLimit: 268,
  angle: -41,
  map: [
    [49, 0], [38, 4], [19, 25], [12, 41], [7, 65], [4, 89], [1, 203], [3, 268], [14, 252],
  ],
};
const Dildo:IToolData = {
  name: 'dildo',
  image: dildoImg,
  area: 'ass',
  type: 'penetrator',
  depthLimit: 293,
  angle: -41,
  map: [
    [28, 0], [9, 6], [1, 25], [1, 49], [1, 283], [4, 290], [15, 292],
  ],
};

const Syringe:IToolData = {
  name: 'syringe',
  image: syringeImg,
  area: 'ass',
  type: 'penetrator',
  depthLimit: 50,
  angle: -41,
  map: [
    [70, 0], [65, 2], [64, 47],
  ],
};

const Fist:IToolData = {
  name: 'fist',
  image: fistImg,
  area: 'stomach',
  type: 'elastic',
  depthLimit: 500,
  angle: -41,
  map: [

  ],
};

const Plug:IToolData = {
  name: 'plug',
  image: plugImg,
  area: 'ass',
  type: 'penetrator',
  depthLimit: 110,
  angle: -41,
  map: [
    [39, 0], [31, 4], [26, 9], [19, 19], [14, 28], [10, 38],
    [9, 48], [9, 62], [18, 74], [28, 81], [28, 113],
  ],
};

const Finger:IToolData = {
  name: 'finger',
  image: fingerImg,
  area: 'ass',
  type: 'penetrator',
  depthLimit: 60,
  angle: -41,
  map: [
    [116, 0], [106, 6], [104, 40], [103, 60],
  ],
};

const Strangle:IToolData = {
  name: 'strangle',
  image: chokeHand,
  area: 'neck',
  type: 'penetrator',
  depthLimit: 30,
  angle: -21,
  map: [],
};

const Balls:IToolData = {
  name: 'balls',
  image: ballsImg,
  area: 'ass',
  type: 'penetrator',
  depthLimit: 380,
  angle: -41,
  map: [
    [40, 0], [33, 2], [28, 8], [27, 16],
    [30, 22], [34, 24], [28, 47], [24, 59],
    [26, 64], [30, 68], [33, 71], [33, 89],
    [25, 95], [21, 101], [20, 104], [20, 111],
    [23, 117], [26, 122], [30, 125], [33, 127],
    [33, 145], [26, 150], [21, 154], [18, 159], [16, 166], [16, 175],
    [19, 181], [23, 186], [28, 190], [31, 192], [31, 209], [22, 214],
    [13, 223], [10, 232], [10, 245], [12, 251], [14, 255], [19, 261],
    [25, 265], [30, 268], [30, 282], [20, 287], [12, 293], [6, 301],
    [2, 309], [0, 318], [0, 326], [2, 334], [5, 340], [9, 346],
    [15, 352], [21, 356], [29, 359], [29, 394],
  ],
};

// TODO: add choking hand as a pentrable tool
export const Tools = [Penis, Plug, Balls, Fist, Strangle, Finger, Dildo, Syringe];
