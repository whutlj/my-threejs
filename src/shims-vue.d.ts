// 外部模块
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'stats.js' {
  export default class Stats {
    constructor();
    public dom: HTMLElement;
    public showPanel(panel: number): void;
    public begin(): void;
    public end(): void;
    public update(): void;
  }
}
interface GuiController {
  onChange(cb: Function): void;
}
declare module 'dat.gui' {
  class GUI {
    constructor();
    public destroy(): void;
    public add(one: object, key: string): GuiController;
  }
}
