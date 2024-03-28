local M = setmetatable({}, {
  __call = function(m, ...)
    return m.telescope(...)
  end,
})

function M.telescope(builtin, opts)
  local params = { builtin = builtin, opts = opts }
  return function()
    builtin = params.builtin
    opts = params.opts
    opts = opts or {}
    require('telescope.builtin')[builtin](opts)
  end
end

return M
