{pkgs, ...}: {
  programs.tmux = {
    enable = true;

    terminal = "tmux-256color";

    baseIndex = 1;

    shortcut = "Space";
    keyMode = "vi";
    mouse = true;

    extraConfig = ''
      # True Color Support
      set -sa terminal-overrides ",*:Tc"

      # Undercurl Support
      set -sa terminal-overrides ',*:Smulx=\E[4::%p1%dm'

      # Underline Colors
      set -as terminal-overrides ',*:Setulc=\E[58::2::%p1%{65536}%/%d::%p1%{256}%/%{255}%&%d::%p1%{255}%&%d%;m'

      # Renumber Windows
      set -g renumber-windows on

      # Fix Scrolling in Neovim
      bind -n WheelUpPane {
      if -F '#{==:#{window_name},nvim}' {
          send-keys -M
      } {
          copy-mode -e
      }

      # Enable Yazi Image Preview
      set -g allow-passthrough on
      set -ga update-environment TERM
      set -ga update-environment TERM_PROGRAM

      # Window Commands
      bind -T prefix w switch-client -T prefix_w
      bind -T prefix_w d kill-pane
      bind -T prefix_w m resize-pane -Z

      # Moving Between / Swapping Windows
      bind -n M-H previous-window
      bind -n M-L next-window
      bind -n C-M-H swap-window -t -1\; select-window -t -1
      bind -n C-M-L swap-window -t +1\; select-window -t +1

      # Cycle Layouts
      bind l next-layout

      # Open in Current Directory
      bind - split-window -v -c "#{pane_current_path}"
      bind | split-window -h -c "#{pane_current_path}"
      bind c new-window -c "#{pane_current_path}"

      # Vi Copy Mode
      bind -T copy-mode-vi v send-keys -X begin-selection
      bind -T copy-mode-vi C-v send-keys -X rectangle-toggle
      bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel

      # Fix Two Pane Borders
      set -g pane-border-style bg=black,fg=blue
      set -g pane-active-border-style bg=black,fg=blue

      # Session Restoring
      set -g @resurrect-processes 'false'
      set -g @resurrect-save 'S'
      set -g @resurrect-restore 'R'

      set -g @continuum-restore 'on'
      set -g @continuum-save-interval '5'
    '';

    plugins = with pkgs.tmuxPlugins; [
      sensible
      yank
      resurrect
      vim-tmux-navigator
      fzf-tmux-url
      continuum
    ];
  };
}
