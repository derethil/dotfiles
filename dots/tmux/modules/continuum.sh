# Requires https://github.com/tmux-plugins/tmux-continuum/

BASH_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_DIR="$(cd "$BASH_DIR/../scripts" && pwd)"

show_continuum() {
	local index icon color text module

	index=$1

	icon="$(get_tmux_option "@theme_continuum_icon" "󰆓")"
	color="$(get_tmux_option "@theme_continuum_color" "$thm_blue")"
	text="$(get_tmux_option "@theme_continuum_text" "#( $SCRIPT_DIR/continuum_status.sh )")"

	module=$(build_status_module "$index" "$icon" "$color" "$text")

	echo "$module"
}
