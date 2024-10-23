local lazyLuaLine = require("lazyvim.util.lualine")

local M = {}

---@param opts? {filename_hl: string?, modified_hl: string?, modified_sign: string?}
function M.pretty_filename(opts)
  opts = vim.tbl_extend("force", {
    filename_hl = "Bold",
    modified_hl = "MatchParen",
    modified_sign = "",
  }, opts or {})

  return function(self)
    local path = vim.fn.expand("%:p") --[[@as string]]

    if path == "" then
      return ""
    end

    local parts = vim.split(path, "[\\/]")
    local filename = parts[#parts]

    if opts.modified_hl and vim.bo.modified then
      filename = filename .. opts.modified_sign
      filename = lazyLuaLine.format(self, filename, opts.modified_hl)
    else
      filename = lazyLuaLine.format(self, filename, opts.filename_hl)
    end

    return filename
  end
end

return M
