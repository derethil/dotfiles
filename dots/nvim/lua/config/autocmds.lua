-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua

vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
  desc = "Set filetype for git config in ~/.dotfiles/dots/git/config",
  pattern = vim.fn.expand("~/.dotfiles/dots/git/config"),
  callback = function()
    vim.bo.filetype = "gitconfig"
  end,
})
