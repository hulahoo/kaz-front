import {getMenuItems, RouteItem, SubMenu} from "@cuba-platform/react";
import {MenuSubMenu, MenuRouteItem} from "./app/store/MenuStore";
import {rootStore} from "./app/store";

export const menuItems = getMenuItems();

// Code below demonstrates how we can create SubMenu section
// Remove '/*' '*/' comments and restart app to get this block in menu

// const parseMenuItemsToRouteItems = (menuItems: Array<MenuSubMenu | MenuRouteItem>): Array<RouteItem | SubMenu> => {
//   return menuItems.map(el => {
//     if (el.items && el.items.length > 0) {
//       return {caption: el.caption, items: parseMenuItemsToRouteItems(el.items)};
//     }
//     return {caption: el.caption, component: null, menuLink: el.menuLink!, pathPattern: el.menuLink!} as RouteItem;
//   })
// }
//
// const addMenuItem = (menuItem: MenuSubMenu | MenuRouteItem) => {
//   if (menuItem.items && menuItem.items.length > 0) {
//     menuItems.push({caption: menuItem.caption, items: parseMenuItemsToRouteItems(menuItem.items)});
//   } else {
//     menuItems.push({
//       caption: menuItem.caption,
//       component: null,
//       menuLink: menuItem.menuLink!,
//       pathPattern: menuItem.menuLink!
//     });
//   }
// }

rootStore.menu.menuList.forEach((e: MenuSubMenu | MenuRouteItem) => {
  menuItems.push(e);
  // addMenuItem(e);
});

// const backToHomeRouteItem = {
//   pathPattern: "/backToHome",
//   menuLink: "/",
//   component: null,
//   caption: "home"
// };
// // // SubMenu object
// const userSettingsSubMenu = {
//   caption: 'UserSettings', // add router.UserSettings key to src/i18n/en.json for valid caption
//   items: [backToHomeRouteItem]
// };
//
// // Add sub menu item to menu config
// menuItems.push(userSettingsSubMenu);
