-- Leader Keys
vim.g.mapleader = ' '
vim.g.maplocalleader = '\\'

-- Neovide Options
if vim.g.neovide then
  vim.o.neovide_refresh_rate = 144

  vim.o.guifont = 'Liga SFMono Nerd Font,Source Code Pro:h12'

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

local opt = vim.opt

-- Line Numbering
opt.number = true
opt.relativenumber = true

-- Minimum Window Height
opt.winminwidth = 5

-- Indent Options
opt.tabstop = 4
opt.softtabstop = 4
opt.shiftwidth = 4
opt.shiftround = true
opt.expandtab = true
opt.smartindent = true

-- Disable Wrap
opt.wrap = false
opt.sidescrolloff = 8

-- Mouse Mode
opt.mouse = 'a'

-- Use System Clipboard
opt.clipboard = 'unnamedplus'

-- Hightlight on Search
opt.hlsearch = false
opt.incsearch = true

-- 24-Bit Colors
opt.termguicolors = true

-- Hide Vim Modeline
opt.showmode = true

-- Global Statusline
opt.laststatus = 3

-- Undo History
opt.undofile = true
opt.undolevels = 10000

-- Smart Searching
opt.ignorecase = true
opt.smartcase = true

-- Always Show Signcolumn
opt.signcolumn = 'yes:1'

-- Decrease Update Time
opt.updatetime = 250

-- Decrease Mapped Sequence Timeout (Show which-key sooner)
opt.timeoutlen = 300

-- Default Split Behavior
opt.splitright = true
opt.splitbelow = true

-- Whitespace Character Icons
opt.list = true
opt.listchars = { tab = '» ', trail = '·', nbsp = '␣' }

-- Preview Substitutions Live
opt.inccommand = 'split'

-- Highlight Cursor Line
opt.cursorline = true

-- Minimum Lines Above/Below Cursor
opt.scrolloff = 8

-- Insert Mode Completions
opt.completeopt = 'menu,menuone,noselect'

-- Confirm Changes on Exit
opt.confirm = true

-- Grep
opt.grepformat = '%f:%l:%c:%m'
opt.grepprg = 'rg --vimgrep'

-- Popup Options
opt.pumblend = 10
opt.pumheight = 10

-- Spell Checking
opt.spelllang = { 'en' }

-- Allow Visual Selection of No Text
opt.virtualedit = 'block'
-- Command Autocompletion
opt.wildmode = 'longest:full,full'

-- Disable Swapfile
opt.swapfile = false
