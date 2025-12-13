/**
 * Toggle Bar Mount Facade
 * 외부 API는 유지하면서, 내부 책임은 controller/dom/view로 위임
 */

export { setPanelOpen } from './controller/panelController';
export { mountToggleBar, updateToggleBar } from './controller/toggleBarController';
