import { Group } from "./Group";

interface PageProps<T> {
  title: string;
  icon: string;
  groups?: ReturnType<typeof Group<T>>[];
}

export const Page = <T>(props: PageProps<T>) => {
  const { title, icon, groups = [] } = props;
  return Widget.Box({
    className: "page",
    attribute: { title, icon },
    child: Widget.Scrollable({
      css: "min-height: 300px;",
      child: Widget.Box({
        className: "page-content",
        vexpand: true,
        vertical: true,
        children: groups,
      }),
    }),
  });
};
