import AstalHyprland from "gi://AstalHyprland";

export function matchClient(client: AstalHyprland.Client, term: string) {
  if (client.class.toLowerCase().includes(term)) return true;
  if (client.title.toLowerCase().includes(term)) return true;
  if (client.initialTitle.toLowerCase().includes(term)) return true;
  return false;
}
