local key = function(modes, key, action, opts)
  vim.keymap.set(vim.split(modes, ""), key, action, opts)
end

-- Vim Keymaps
key("n", "<leader>q", "<cmd>q<CR>", { desc = "Quit" })
key("n", "x", '"_x', { desc = "Delete without yanking" })
key("v", "p", '"_dP', { desc = "Paste without yanking" })
key("n", "<leader>j", "*``cgn", { desc = "Replace word under cursor" })
key("nv", "B", "^", { desc = "Move to the beginning of the line" })
key("nv", "E", "$", { desc = "Move to the end of the line" })
key("nvi", "<C-c>", "<esc>ggVG", { desc = "Select all" })

key("n", "i", function()
  return #vim.fn.getline(".") == 0 and '"_cc' or "i"
end, { desc = "Automatically indent to the appropriate position", silent = true, expr = true })

-- User Command Keymaps
key("v", "<leader>yb", "<cmd>'<,'>CopyCodeBlock<CR>", { desc = "Copy in Code Block format" })
key("nxv", "<space>bo", "<cmd>CloseOtherBuffers<cr>", { desc = "Close Other Buffers" })

-- Disable Tab Keymaps
key("n", "<leader><tab>l", "<nop>")
key("n", "<leader><tab>o", "<nop>")
key("n", "<leader><tab>f", "<nop>")
key("n", "<leader><tab><tab>", "<nop>")
key("n", "<leader><tab>j", "<nop>")
key("n", "<leader><tab>]", "<nop>")
key("n", "<leader><tab>d", "<nop>")
key("n", "<leader><tab>[", "<nop>")
