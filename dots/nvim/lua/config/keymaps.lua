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
vim.keymap.set("n", "<leader>A", "ggVG", { desc = "Select All" })
vim.keymap.set("v", "<leader>A", "VggVG", { desc = "Select All " })
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

-- User Command Keymaps
vim.keymap.set("v", "<leader>yb", "<cmd>'<,'>CopyCodeBlock<CR>", { desc = "Copy in Code Block format" })
