-- leader Keys
vim.g.mapleader = ' '
vim.g.maplocalleader = '\\'

-- Line Numbering
vim.opt.number = true
vim.opt.relativenumber = true

-- Tab Widths
vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

-- Mouse Mode
vim.opt.mouse = 'a'

-- Use System Clipboard
vim.opt.clipboard = 'unnamedplus'

-- Hightlight on Search
vim.opt.hlsearch = false
vim.opt.incsearch = true

-- 24-Bit Colors
vim.opt.termguicolors = true

-- Hide Vim Modeline
vim.opt.showmode = false

-- Disable Wrap
vim.opt.wrap = false

-- Undo History
vim.opt.undofile = true

-- Smart Searching
vim.opt.ignorecase = true
vim.opt.smartcase = true

-- Always Show Signcolumn
vim.opt.signcolumn = 'yes:1'

-- Decrease Update Time
vim.opt.updatetime = 250

-- Decrease Mapped Sequence Timeout (Show which-key sooner)
vim.opt.timeoutlen = 300

-- Default Split Behavior
vim.opt.splitright = true
vim.opt.splitbelow = true

-- Whitespace Character Icons
vim.opt.list = true
vim.opt.listchars = { tab = '» ', trail = '·', nbsp = '␣' }

-- Preview Substitutions Live
vim.opt.inccommand = 'split'

-- Highlight Cursor Line
vim.opt.cursorline = true

-- Minimum Lines Above/Below Cursor
vim.opt.scrolloff = 8
