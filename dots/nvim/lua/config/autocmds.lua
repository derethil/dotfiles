-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here

-- Create folders recursively on save
vim.api.nvim_create_autocmd({ "BufWritePre", "FileWritePre", "BufNewFile" }, {
  desc = "Create folders recursively on save",
  callback = function()
    local directory = vim.fn.expand("%:p:h")
    if vim.fn.isdirectory(directory) == 0 then
      vim.fn.mkdir(directory, "p")
    end
  end,
})

-- Git config filetype in dotfiles
vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
  pattern = vim.fn.expand("~/.dotfiles/dots/git/config"),
  callback = function()
    vim.bo.filetype = "gitconfig"
  end,
})

-- Auto Activate Python Virtual Environment
vim.api.nvim_create_autocmd('VimEnter', {
  desc = 'Auto select virtualenv Nvim open',
  pattern = '*.py',
  callback = function()
    local venv = vim.fn.findfile('pyproject.toml', vim.fn.getcwd() .. ';')
    if venv ~= '' then
      vim.notify('Virtualenv found, activating...')
      require('venv-selector').retrieve_from_cache()
    else
      vim.notify('No virtualenv found')
    end
  end,
  once = true,
})
