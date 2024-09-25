-- Run User Cmds file
require("config.usercmds")

vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
  desc = "Set filetype for git config in ~/.dotfiles/dots/git/config",
  pattern = vim.fn.expand("~/.dotfiles/dots/git/config"),
  callback = function()
    vim.bo.filetype = "gitconfig"
  end,
})
