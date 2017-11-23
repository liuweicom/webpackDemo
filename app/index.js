import{cube} from './math.js';
import printMe from './print.js';


if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

   const component=()=> {
    var element = document.createElement('pre');
    var btn = document.createElement('button');

  
    element.innerHTML=[
      'hello',
      '5 cubed is equal to'+cube(5)
    ].join('\n\n');

    return element;

    return element;
  }

  document.body.appendChild(component());
