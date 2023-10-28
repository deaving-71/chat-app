import { atom } from "recoil";

const SidebarAtom = atom<boolean>({
  default: true,
  key: "SidebarDrawer",
});

const RightInfoBarAtom = atom<boolean>({
  default: true,
  key: "RightInfoBar",
});

export { SidebarAtom, RightInfoBarAtom };
