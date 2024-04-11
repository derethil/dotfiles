-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

if vim.g.neovide then
  local scalemap = function(key, factor, desc)
    vim.keymap.set({ "n", "v" }, key, "<nop>")
    vim.keymap.set(
      { "n", "v" },
      key,
      string.format(":lua vim.g.neovide_scale_factor = %s<CR>", factor),
      { desc = desc }
    )
  end

  scalemap("<C-ScrollWheelUp>", "vim.g.neovide_scale_factor + 0.1", "Zoom In")
  scalemap("<C-ScrollWHeelDown>", "vim.g.neovide_scale_factor - 0.1", "Zoom Out")
  scalemap("<C-0>", "1", "Reset Zoom")
end
