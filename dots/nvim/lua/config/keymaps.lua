-- Remove Default Keymaps
vim.keymap.set('n', 'Q', '<nop>')

-- Diagnostic Keymaps
vim.keymap.set('n', '[d', vim.diagnostic.goto_prev, { desc = 'Go to previous [D]iagnostic message' })
vim.keymap.set('n', ']d', vim.diagnostic.goto_next, { desc = 'Go to next [D]iagnostic message' })
vim.keymap.set('n', '<leader>e', vim.diagnostic.open_float, { desc = 'Show diagnostic [E]rror messages' })
vim.keymap.set('n', '<leader>q', vim.diagnostic.setloclist, { desc = 'Open diagnostic [Q]uickfix list' })

-- Quick Fix Navigation
vim.keymap.set('n', '<C-k>', '<cmd>cnext<CR>zz', { desc = 'Go to next Quickfix occurrence' })
vim.keymap.set('n', '<C-j>', '<cmd>cprev<CR>zz', { desc = 'Go to prev Quickfix occurrence' })
vim.keymap.set('n', '<leader>k', '<cmd>lnext<CR>zz', { desc = 'Go to next Quickfix occurrence' })
vim.keymap.set('n', '<leader>j', '<cmd>lprev<CR>zz', { desc = 'Go to prev Quickfix occurrence' })

-- Split Window Navigation
vim.keymap.set('n', '<C-h>', '<C-w><C-h>', { desc = 'Move focus to the left window' })
vim.keymap.set('n', '<C-l>', '<C-w><C-l>', { desc = 'Move focus to the right window' })
vim.keymap.set('n', '<C-j>', '<C-w><C-j>', { desc = 'Move focus to the lower window' })
vim.keymap.set('n', '<C-k>', '<C-w><C-k>', { desc = 'Move focus to the upper window' })

-- Open Split Windows
vim.keymap.set('n', '<leader>\\', '<C-w>v', { desc = 'Split window to the bottom' })
vim.keymap.set('n', '<leader>-', '<C-w>s', { desc = 'Split window to the right' })

-- Move Highlighted Lines
vim.keymap.set('v', 'J', ":m '>+1<CR>gv=gv", { desc = 'Move highlighted lines up one line' })
vim.keymap.set('v', 'K', ":m '<-2<CR>gv=gv", { desc = 'Move highlighted lines down one line' })

-- Static Position on Join
vim.keymap.set('n', 'J', 'mzJ`z', { desc = 'Join next line, keeping the cursor at its current position' })

-- Static Position on Half Page Up/Down
vim.keymap.set('n', '<C-d>', '<C-d>zz', { desc = 'Jump half a page down' })
vim.keymap.set('n', '<C-u>', '<C-u>zz', { desc = 'Jump half a page up' })

-- Static Position on Search
vim.keymap.set('n', 'n', 'nzzzv', { desc = 'Jump to next occurrence' })
vim.keymap.set('n', 'N', 'nzzzv', { desc = 'Jump to previous occurrence' })

-- Paste without Overwrite
vim.keymap.set('x', '<leader>p', '"_dP', { desc = 'Paste without overwriting the register' })

-- Replace All Occurrences of Word Under Cursor
vim.keymap.set('n', '<leader>s', [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]])

-- Make File Executable
vim.keymap.set('n', '<leader>x', '<cmd>!chmod +x %<CR>', { silent = true })
