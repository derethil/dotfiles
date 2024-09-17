local M = {}

M.twClassedRegex = {
  { "classed(?:\\.\\w*)?\\(([^)]*)\\)", "[\"'`]([a-zA-Z\\s\\-]*)[\"'`]" },
}

M.cvaRegex = {
  { "cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
  { "cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)" },
}

M.mergedRegex = vim.tbl_extend("keep", M.twClassedRegex, M.cvaRegex)

return M
