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

return M
