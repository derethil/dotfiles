# Word Navigation
bind --user $argv \eh prevd-or-backward-word
bind --user $argv \el nextd-or-forward-word

# Char Navigation
bind --user $argv \eH backward-char
bind --user $argv \eL forward-char

# Line Navigation
bind --user $argv \eJ next-line
bind --user $argv \eK previous-line

# Clear Screen
bind --user $argv \cl clear-screen
