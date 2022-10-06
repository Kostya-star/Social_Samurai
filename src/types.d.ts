import {compose } from "redux";


// declare module '*.css' {
//     interface IClassNames {
//         [className: string]: string
//       }
//       const classNames: IClassNames;
//       export = classNames;
//     }
    
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  declare module '*.module.css'
  declare module '*.png'
  declare module '*.svg'
}
