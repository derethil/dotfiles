local function build_task(tasks, command)
  local cmd = command.cmd or "nh"
  table.insert(tasks, {
    name = string.format("%s %s", cmd, table.concat(command.args, " ")),
    tags = command.tags,
    cwd = vim.fn.getcwd(),
    builder = function()
      return {
        cmd = { cmd },
        args = command.args,
      }
    end,
  })
end

local function get_flake()
  local matches = vim.fn.globpath(vim.fn.getcwd(), "flake.nix", true, true)
  if #matches ~= 0 then
    return matches[1]
  end
end

return {
  condition = {
    callback = function()
      if vim.fn.executable("nh") == 0 then
        return false, "Command `nh` not found"
      end
      if not get_flake() then
        return false, "File `flake.nix` not found"
      end
      return true
    end,
  },
  generator = function()
    local flake_path = get_flake()
    local task_list = {}

    local commands = {
      { args = { "os", "switch", flake_path } },
    }

    for _, command in ipairs(commands) do
      build_task(task_list, command)
    end

    return task_list
  end,
}
