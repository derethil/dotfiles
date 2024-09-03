-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua

-- Autocommands
vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
  desc = "Set filetype for git config in ~/.dotfiles/dots/git/config",
  pattern = vim.fn.expand("~/.dotfiles/dots/git/config"),
  callback = function()
    vim.bo.filetype = "gitconfig"
  end,
})

-- User Commands
-- Copy text to clipboard using codeblock format ```{ft}{content}```
vim.api.nvim_create_user_command("CopyCodeBlock", function(opts)
  local lines = vim.api.nvim_buf_get_lines(0, opts.line1 - 1, opts.line2, true)
  local content = table.concat(lines, "\n")
  local result = string.format("```%s\n%s\n```", vim.bo.filetype, content)
  vim.fn.setreg("+", result)
  vim.notify("Text copied to clipboard")
end, { range = true })

vim.api.nvim_create_user_command("ConventionalCommits", function()
  local url = "https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index"
  vim.fn.system(string.format("open %s", url))
end, {})
