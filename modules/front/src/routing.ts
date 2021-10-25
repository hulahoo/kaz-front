// import { ConcourseRequestManagement } from "./app/pages/ConcourseRequest/ConcourseRequestManagement";
import { getMenuItems } from "@cuba-platform/react";
import { rootStore } from "./app/store";
import { MenuRouteItem, MenuSubMenu } from "./app/store/MenuStore";

export const menuItems = getMenuItems();

rootStore.menu.menuList.forEach((e: MenuSubMenu | MenuRouteItem) => {
  menuItems.push(e);
});

function flattenRoutes(
  routes?: Array<MenuRouteItem | MenuSubMenu>
): Array<MenuRouteItem> {
  const list: Array<MenuRouteItem> = [];
  if (!routes) {
    return list;
  }
  for (let route of routes) {
    if ((route as MenuSubMenu).items) {
      list.push(...flattenRoutes((route as MenuSubMenu).items));
    } else {
      list.push(route as MenuRouteItem);
    }
  }
  return list;
}

export function getRouteList() {
  return flattenRoutes(rootStore.menu.menuList);
}

// menuItems.push({
//   pathPattern: "/concourseRequest/:entityId?",
//   menuLink: "/concourseRequest",
//   component: ConcourseRequestManagement,
//   caption: "Concourse"
// });
