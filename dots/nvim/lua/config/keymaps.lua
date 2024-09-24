-- Vim Keymaps
vim.keymap.set("n", "x", '"_x', { desc = "Delete without yanking" })
vim.keymap.set("v", "p", '"_dP', { desc = "Paste without yanking" })
vim.keymap.set("n", "<leader>j", "*``cgn", { desc = "Replace word under cursor" })
vim.keymap.set({ "n", "v" }, "B", "^", { desc = "Move to the beginning of the line" })
vim.keymap.set({ "n", "v" }, "E", "$", { desc = "Move to the end of the line" })
vim.keymap.set({ "n", "v", "i" }, "<C-a>", "<esc>ggVG", { desc = "Select all" })

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
vim.keymap.set({ "n", "x", "v" }, "<space>bo", "<cmd>CloseOtherBuffers<cr>", { desc = "Close Other Buffers" })
vim.keymap.set({ "n", "x", "v" }, "<space>or", "<cmd>OverseerRestartLast<cr>", { desc = "Restart Last Task" })
