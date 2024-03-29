local M = setmetatable({}, {
  __call = function(m, ...)
    return m.telescope(...)
  end,
})
-- Automatically selects git_files or find_files based on the current directory
function M.telescope(builtin, opts)
  local params = { builtin = builtin, opts = opts }
  return function()
    builtin = params.builtin
    opts = params.opts
    opts = opts or {}

    if builtin == 'files' then
      if _G.Vars.cwd_is_git then
        if opts.show_untracked == nil then
          opts.show_untracked = true
        end
        builtin = 'git_files'
      else
        builtin = 'find_files'
      end
    end

    require('telescope.builtin')[builtin](opts)
  end
end

return M
