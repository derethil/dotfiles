#!/usr/bin/env bash

# get bash source directory
BASH_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CURRENT_DIR="$(cd "$BASH_DIR/../plugins/tmux-continuum/scripts" && pwd)"

if [ -z "$CURRENT_DIR" ]; then
	echo "Could not find continuum directory"
	exit 1
fi

source "$CURRENT_DIR/helpers.sh"
source "$CURRENT_DIR/variables.sh"
source "$CURRENT_DIR/shared.sh"

get_interval() {
	get_tmux_option "$auto_save_interval_option" "$auto_save_interval_default"
}

current_timestamp() {
	echo "$(date +%s)"
	"$(date +%s)"
}

print_status() {
	local save_int="$(get_tmux_option "$auto_save_interval_option")"
	local status=""
	local style_wrap="$(get_tmux_option "$status_on_style_wrap_option" "")"
	local style_wrap
	if [ $save_int -gt 0 ]; then
		local last_saved_timestamp="$(get_tmux_option "$last_auto_save_option" "0")"
		local interval_minutes="$(get_interval)"
		local interval_seconds="$((interval_minutes * 60))"
		local next_run="$((last_saved_timestamp + $interval_seconds))"
		local now="$(date +%s)"
		local secs="$((next_run - now))"
		local til_next_save=$(printf '%d:%02d\n' $((secs % 3600 / 60)) $((secs % 60)))
		status="$til_next_save"
	else
		style_wrap="$(get_tmux_option "$status_off_style_wrap_option" "")"
		status="off"
	fi

	if [ -n "$style_wrap" ]; then
		status="${style_wrap/$status_wrap_string/$status}"
	fi
	echo "$status"
}
print_status
