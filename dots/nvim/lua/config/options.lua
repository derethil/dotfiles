-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here

-- Neovide Options

if vim.g.neovide then
  vim.o.guifont = "Liga SFMono Nerd Font,Source Code Pro:h12"

  vim.g.neovide_refresh_rate = 144

  local padding = 8
  vim.g.neovide_padding_top = padding
  vim.g.neovide_padding_bottom = padding
  vim.g.neovide_padding_right = padding
  vim.g.neovide_padding_left = padding

  vim.g.neovide_scroll_animation_length = 0.2
  vim.g.neovide_scroll_animation_far_lines = 6

  vim.g.neovide_hide_mouse_when_typing = true

  vim.g.neovide_cursor_trail_size = 0.4
end