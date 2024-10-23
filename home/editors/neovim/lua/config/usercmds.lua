-- Copy text to clipboard using codeblock format ```{ft}{content}```
vim.api.nvim_create_user_command("CopyCodeBlock", function(opts)
  local lines = vim.api.nvim_buf_get_lines(0, opts.line1 - 1, opts.line2, true)
  local content = table.concat(lines, "\n")
  local result = string.format("```%s\n%s\n```", vim.bo.filetype, content)
  vim.fn.setreg("+", result)
  vim.notify("Text copied to clipboard")
end, { range = true })

-- Open the Conventional Commits Cheatsheet
vim.api.nvim_create_user_command("ConventionalCommits", function()
  local url = "https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index"
  vim.fn.system(string.format("open %s", url))
end, {})

-- Restart Last Overseer Task
vim.api.nvim_create_user_command("OverseerRestartLast", function()
  local overseer = require("overseer")
  local tasks = overseer.list_tasks({ recent_first = true })
  if vim.tbl_isempty(tasks) then
    vim.notify("No tasks found", vim.log.levels.WARN)
  else
    overseer.run_action(tasks[1], "restart")
  end
end, {})

-- Close Nonvisible Buffers
vim.api.nvim_create_user_command("CloseOtherBuffers", function()
  local windownrs = vim.api.nvim_list_wins()
  local currbuf = vim.api.nvim_get_current_buf()

  for _, buf in ipairs(vim.api.nvim_list_bufs()) do
    if buf ~= currbuf then
      local close = false

      local filebuffer = vim.api.nvim_get_option_value("buftype", { buf = buf }) == ""
      local hidden = vim.api.nvim_get_option_value("bufhidden", { buf = buf }) == "hide"

      for _, win in ipairs(windownrs) do
        local in_window = vim.api.nvim_win_is_valid(win) and vim.api.nvim_win_get_buf(win) == buf
        if not in_window and not hidden and filebuffer then
          close = true
          break
        end
      end

      if close then
        vim.api.nvim_buf_delete(buf, { force = true })
      end
    end
  end
end, {})
