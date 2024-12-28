export function CreateLoading() {
  //   if (window['LOADING' as keyof Window]) return;
  //   var loading = document.createElement('div');
  //   loading.id = '__loading';
  //   loading.classList.add('cover');
  //   loading.classList.add('center');
  //   Object.assign(loading.style, {
  //     position: 'fixed',
  //     left: 0,
  //     top: 0,
  //     zIndex: '99999',
  //     backgroundColor: 'rgba(20,20,20,0.7)',
  //     display: 'none',
  //     transition: 'all ease 350ms',
  //     width: '100%',
  //     height: '100%',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   });
  //   var win = document.createElement('div');
  //   win.classList.add('__window_loading');
  //   Object.assign(win.style, {
  //     backgroundColor: 'white',
  //     overflow: 'hidden',
  //     borderRadius: '5px',
  //     width: '300px',
  //     height: '100px',
  //     display: 'grid',
  //     gridTemplateColumns: '60px auto',
  //     alignItems: 'center',
  //     padding: '18px',
  //     boxShadow: '0 5px 18px 0px rgba(0, 0, 0, 0.14)',
  //   });
  //   win.innerHTML = `
  //     <style>
  //         @keyframes __spin_loader {
  //             0% { transform: rotate(0deg); }
  //             100% { transform: rotate(360deg); }
  //         }
  //     </style>
  //     <div id="__loader" style="border: 6px solid #e4e4e4;
  //     border-top: 6px solid #FF9800;
  //     border-radius: 50%;
  //     width: 50px;
  //     height: 50px;
  //     animation: __spin_loader 2s linear infinite;"></div>
  //     <i class="fa fa-check" style="
  //         display:none;
  //         font-size: 2em;
  //         color: #4CAF50;
  //         justify-content: center;
  //         align-items: center;
  //     "></i>
  //     <p style="margin: 0;
  //     width: 100%;
  //     text-align: center;
  //     letter-spacing: 0.05em;
  //     font-size: 1.1em;
  //     color: #6b6b6b;
  //     text-transform: uppercase;"></p>
  // `;
  //   loading.appendChild(win);
  //   document.querySelector('body')?.appendChild(loading);
  //   window['LOADING' as keyof Window] = async function (
  //     value: boolean = true,
  //     msg: string = 'cargando'
  //   ) {
  //     const sdom = window['S' as keyof Window] ? true : false;
  //     // if (!window["S"]) {
  //     //     return console.error("Required SDOM");
  //     // }
  //     this.loadingInAnimation = false;
  //     const ng: any = document.querySelector('app-root');
  //     const el: any = document.querySelector('#__loading');
  //     const win: any = el.querySelector('.__window_loading');
  //     const wait = (time: number) =>
  //       new Promise((done: any) => setTimeout(() => done(), time));
  //     if (this.loadingInAnimation) {
  //       await wait(500);
  //     }
  //     let p = el.querySelector('p');
  //     p.innerHTML = msg;
  //     sdom && p.in('slideInRight', 300);
  //     if (value) {
  //       this.loadingInAnimation = true;
  //       sdom && win.in('fadeInDown', 'grid');
  //       el.style.display = 'flex';
  //       el.querySelector('i').visible(false);
  //       sdom
  //         ? el
  //             .querySelector('#__loader')
  //             .in('zoomIn')
  //             .then(() => {
  //               this.loadingInAnimation = false;
  //             })
  //         : (this.loadingInAnimation = false);
  //       ng.style.filter = 'blur(5px)';
  //     } else {
  //       this.loadingInAnimation = true;
  //       sdom && el.querySelector('#__loader').visible(false);
  //       sdom && el.querySelector('i').in('zoomIn', 'flex');
  //       this.stop = false;
  //       this.timeLoading = setTimeout(() => {
  //         if (sdom) {
  //           win.out('fadeOutUp', 200).then(() => {
  //             ng.style.filter = 'blur(0)';
  //             el.out('fadeOut', 200).then(() => {
  //               el.visible(false);
  //               this.loadingInAnimation = false;
  //             });
  //           });
  //         } else {
  //           ng.style.filter = 'blur(0)';
  //           this.loadingInAnimation = false;
  //         }
  //       }, 500);
  //     }
  //   };
}
