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
vim.api.nvim_create_user_command("CloseOtherBuffers", function()
  local windownrs = vim.api.nvim_list_wins()
  local currbuf = vim.api.nvim_get_current_buf()

  for _, buf in ipairs(vim.api.nvim_list_bufs()) do
    local is_open = false
    for _, win in ipairs(windownrs) do
      if vim.api.nvim_win_get_buf(win) == buf or currbuf == buf then
        is_open = true
        break
      end
    end
    if not is_open then
      vim.api.nvim_buf_delete(buf, { force = true })
    end
  end
end, {})
