// import CDOM from './create-dom-element';
// import Styles from './styles';
// const id = '#__POPUP_ALERT';

// const Remove = () => {
//   var el = document.querySelector(id);
//   el && el.remove();
// };

// const Create = (title: string, msg?: string) => {
//   const el = CDOM('div', {
//     backgroundColor: 'rgba(20,20,20,0.7)',
//     zIndex: '999999',
//     ...Styles.cover,
//     ...Styles.fixed,
//     ...Styles.center,
//   })
//     .setId(id)
//     .addCss(
//       /*css*/ `
//       .${id.slice(1)}-buttons {
//         display : flex;
//         justify-content: center;
//         aling-items: center;
//       }
//       ${id} button {
//         border-radius: 4px;
//         border-style: none;
//         min-width: 20px;
//         padding: 8px 20px;
//         user-select: none;
//         text-transform: uppercase;
//         outline-style: none;
//         cursor: pointer;
//         margin: 0 6px;
//         background-color: #3f51b5;
//         color: white;
//         transition: all ease 250ms;
//       }
//       ${id} button:active {
//         transform: scale(0.95)
//       }
//       .${id.slice(1)}-title {
//         text-align: center;
//         font-size: 1.8em;
//         padding-bottom: 20px;
//       }
//       .${id.slice(1)}-content {
//         word-break: break-all;
//         overflow-y: auto;
//       }
//     `
//     )
//     // WINDOW
//     .addElement('div', {
//       backgroundColor: 'white',
//       width: '300px',
//       height: '300px',
//       display: 'grid',
//       borderRadius: '4px',
//       gridTemplateRows: `${title ? 'min-content' : ''} auto min-content`,
//       padding: '20px',
//     })
//     .addHtml(
//       /*html*/ `
//         ${title ? `<div class="${id.slice(1)}-title">${title}</div>` : ''}
//         <div class="${id.slice(1)}-content">${msg || ''}</div>
//         <div class="${id.slice(1)}-buttons">
//           <button>ACEPTAR</button>
//         </div>
//     `
//     )
//     .getRoot();
//   document.querySelector('body')?.appendChild(el);
//   return el;
// };

// export default {
//   create: ({ title, msg }: { title: string; msg?: string }): Promise<null> =>
//     new Promise((resolve: Function) => {
//       if (!title && !msg) return;
//       var el = document.querySelector(id);
//       el && Remove();
//       Create(title, msg).querySelector('button').onclick = () => {
//         Remove();
//         resolve();
//       };
//     }),
//   remove: () => Remove(),
// };
