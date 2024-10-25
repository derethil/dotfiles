local constants = require("overseer.constants")
local TAG = constants.TAG

local function get_main()
  local matches = vim.fn.globpath(vim.fn.getcwd(), "main.go", true, true)
  if #matches ~= 0 then
    return matches[1]
  end
end

local function build_task(tasks, command)
  local cmd = command.cmd or "go"
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

return {
  condition = {
    callback = function()
      if vim.fn.executable("go") == 0 then
        return false, "Command `go` not found"
      end
      if not get_main() then
        return false, "File `main.go` not found"
      end
      return true
    end,
  },
  generator = function(_, cb)
    local main = get_main()
    local task_list = {}

    local commands = {
      { args = { "run", main }, tags = { TAG.RUN } },
      { args = { "build" }, tags = { TAG.BUILD } },
      { args = { "install" } },
      { args = { "test" }, tags = { TAG.TEST } },
      { args = { "env" } },
      { args = { "list" } },
      { args = { "fmt" } },
      { args = { "vet" } },
      { args = { "fix" } },
    }

    for _, command in ipairs(commands) do
      build_task(task_list, command)
    end

    if vim.fn.executable("godoc") == 1 then
      build_task(task_list, { cmd = "godoc", args = { "-http", ":8080" } })
    end

    cb(task_list)
  end,
}
