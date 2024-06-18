local M = {}

M.twClassedRegex = {
  { "classed(?:\\.\\w*)?\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
}

M.cvaRegex = {
  { "cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
  { "cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)" },
}

M.mergedRegex = vim.tbl_extend("keep", M.twClassedRegex, M.cvaRegex)

return M
