import { castella, css, html, slot } from "@castella/macro";

export const GlobalLayout = castella(
  css`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;

    .tree-panel {
      flex: 30% 0 0;
      border-right: 1px solid #cccccc;
    }
    .main {
      flex: auto 1 1;
    }
  `,
  html`
    <div class="tree-panel">${slot("treePanel")}</div>
    <div class="main">${slot("main")}</div>
  `
);
