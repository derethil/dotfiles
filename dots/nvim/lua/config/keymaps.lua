-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- Neovide Keymaps

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

-- Vim Keymaps

vim.keymap.set("n", "<C-a>", "ggVG", { desc = "Select All" })
vim.keymap.set("v", "<C-a>", "VggVG", { desc = "Select All " })
vim.keymap.set("n", "x", '"_x', { desc = "Delete without yanking" })
vim.keymap.set("v", "p", '"_dP', { desc = "Paste without yanking" })
vim.keymap.set("n", "<leader>j", "*``cgn", { desc = "Replace word under cursor" })
vim.keymap.set("n", "i", function()
  local cond = #vim.fn.getline(".") == 0
  if cond then
    return '"_cc'
  else
    return "i"
  end
end, { desc = "Automatically indent to the appropriate position", silent = true, expr = true })

-- Plugin Keymaps

vim.keymap.set(
  "n",
  "<leader>uh",
  ":lua require('mini.hipatterns').toggle()<CR>",
  { desc = "Toggle Highlight Patterns", silent = true }
)

-- User Command Keymaps

vim.keymap.set("v", "<leader>yb", "<cmd>'<,'>CopyCodeBlock<CR>", { desc = "Copy in Code Block format" })
