export class MenuItemI {
    title: string;
    isHeading?: boolean = false;
    isDivider?: boolean = false;
    heading?: string = '';
    link?: string = '';
    class?: string = '';
    icon?: string = '';
    childrens?: MenuItemI[];
  }
