export const FRONTDOOR_CONTEXT_MENU_ITEM_ID: string = 'frontdoor';

function createContextMenu(): void {
  chrome.contextMenus.create({
    // %s is substituted into the menu item label with any highlighted text
    title: 'Frontdoor "%s"',
    id: FRONTDOOR_CONTEXT_MENU_ITEM_ID,
    // only the menu item display on text selection
    contexts: ['selection']
  });
}

function removeContextMenu(): void {
  chrome.contextMenus.remove(FRONTDOOR_CONTEXT_MENU_ITEM_ID);
}

export function toggleContextMenu(setActive: boolean): void {
  if (setActive) {
    createContextMenu();
  } else {
    removeContextMenu();
  }
}
