local M = {}

function M.flatten(item, result)
  if not result then
    result = {}
  end

  if type(item) == "table" then
    for _, v in pairs(item) do
      M.flatten(v, result)
    end
  else
    result[#result + 1] = item
  end
  return result
end

return M
