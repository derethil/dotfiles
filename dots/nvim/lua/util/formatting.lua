local M = {}

function M.rustywindRegex(regexList)
  local flattenedRegex = require("util.table").flatten(regexList)
  local returnList = {}

  for _, regex in ipairs(flattenedRegex) do
    table.insert(returnList, "--custom-regex")
    table.insert(returnList, regex)
  end

  return returnList
end

local range_ignore_filetypes = { "lua" }

function M.format_diff(buf_id)
  -- Get diff data
  local hunks = require("mini.diff").get_buf_data(buf_id).hunks
  local format = require("conform").format

  -- -- stylua range format mass up indent, so use full format for now
  if vim.tbl_contains(range_ignore_filetypes, vim.bo.filetype) then
    format({ lsp_fallback = true, timeout_ms = 500 })
    return
  end

  for i = #hunks, 1, -1 do
    local hunk = hunks[i]
    if hunk ~= nil and hunk.type ~= "delete" then
      local start = hunk.buf_start
      local last = start + hunk.buf_count
      -- nvim_buf_get_lines uses zero-based indexing -> subtract from last
      local last_hunk_line = vim.api.nvim_buf_get_lines(0, last - 2, last - 1, true)[1]
      local range = { start = { start, 0 }, ["end"] = { last - 1, last_hunk_line:len() } }
      format({ range = range })
    end
  end
end

return M
