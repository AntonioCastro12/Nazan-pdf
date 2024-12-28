declare type DomElemen = 'div' | 'p' | 'h1';

interface Factory {}

const createElement = (
  element: DomElemen,
  style?: Partial<CSSStyleDeclaration>,
  html?: string,
  root?: any
) => {
  const el = document.createElement(element);
  !root && (root = el);
  style && Object.assign(el.style, style);
  html && (el.innerHTML = html);

  const factory = {
    getEelement(): HTMLElement {
      return el;
    },
    addElement(
      element: DomElemen,
      style?: Partial<CSSStyleDeclaration>,
      html?: string
    ) {
      return createElement(element, style, html, root).appendTo(el);
    },
    addHtml(html: string) {
      el.innerHTML = html;
      return factory;
    },
    addCss(css: string) {
      const style = document.createElement('style');
      style.innerHTML = css;
      el.appendChild(style);
      return factory;
    },
    setId(id: string) {
      id.indexOf('#') === 0 && (id = id.slice(1));
      el.id = id;
      return factory;
    },
    getRoot(): HTMLElement {
      return root;
    },
    appendTo(query: string | HTMLElement) {
      const select =
        typeof query === 'string'
          ? document.querySelector(query as string)
          : query;
      select && select.appendChild(el);
      return factory;
    },
    appendRootTo(query: string) {
      const select = document.querySelector(query);
      select && select.appendChild(root);
      return factory;
    },
  };

  return factory;
};

export default (
  element: DomElemen,
  style?: Partial<CSSStyleDeclaration>,
  html?: string
) => {
  var root = undefined;
  return createElement(element, style, html, root);
};
