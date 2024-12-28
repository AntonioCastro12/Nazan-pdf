//prettier-ignore

import CDOM from "./create-dom-element";
import Styles from './styles';
const id = '#__POPUP_LOADING';
export default {
  create({ color = 'coral', msg = null } = {}) {
    var el = document.querySelector(id);

    if (!el) {
      el = CDOM('div', {
        backgroundColor: 'rgba(20,20,20,0.7)',
        zIndex: '99999',
        ...Styles.cover,
        ...Styles.fixed,
        ...Styles.center,
      })
        .setId(id)
        .addCss(
          `
        ${id}_RIPPLE {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
        }
        ${id}_RIPPLE div {
            position: absolute;
            border: 4px solid ${color};
            opacity: 1;
            border-radius: 50%;
            animation: ${id.slice(1)} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        ${id} p {
            text-transform: uppercase;
            font-size: 1.3em;
            font-weight: 500;
            font-family: sans-serif;
            color: #aaaaaa;
            letter-spacing: 0.08em;
        }
        @keyframes ${id.slice(1)} {
            0% {
                top: 36px;
                left: 36px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: 0px;
                left: 0px;
                width: 72px;
                height: 72px;
                opacity: 0;
            }
        }
      `
        )
        // WINDOW
        .addElement('div', {
          ...Styles.center,
          backgroundColor: 'white',
          width: '300px',
          height: '300px',
          borderRadius: '4px',
          ...Styles.centerY,
        })
        .addHtml(
          `
            <div>
                <div id="__POPUP_LOADING_RIPPLE"><div>
                </div><div></div></div>
            </div>
            ${msg ? `<p>${msg}</p>` : ''}
        `
        )
        .getRoot();
    }
    document.querySelector('body')?.appendChild(el);
  },

  remove() {
    var el = document.querySelector(id);
    el && el.remove();
  },

  open() {},

  close() {},
};
