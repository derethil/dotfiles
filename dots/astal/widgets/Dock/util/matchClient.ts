import AstalHyprland from "gi://AstalHyprland";

export function matchClient(client: AstalHyprland.Client, term: string) {
  if (client.class.toLowerCase().includes(term.toLowerCase())) return true;
  if (client.title.toLowerCase().includes(term.toLowerCase())) return true;
  if (client.initialTitle.toLowerCase().includes(term.toLowerCase())) return true;
  return false;
}
