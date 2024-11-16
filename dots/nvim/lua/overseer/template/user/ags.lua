local snacks = require("snacks")
local constants = require("overseer.constants")
local TAG = constants.TAG

local function build_task(tasks, command)
  local cmd = command.cmd or "ags"

  table.insert(command.components, "default")

  table.insert(tasks, {
    name = string.format("%s %s", cmd, table.concat(command.args, " ")),
    tags = command.tags,
    cwd = vim.fn.getcwd(),
    params = command.params,
    builder = function(params)
      table.insert(command.args, params.window)
      return {
        cmd = { cmd },
        args = command.args,
        components = command.components,
      }
    end,
  })
end

return {
  condition = {
    dir = {
      "~/.dotfiles",
      "~/.config/agsv2",
    },
  },
  generator = function(_, cb)
    local task_list = {}

    local commands = {
      {
        args = { "run", "--directory", "/home/derethil/.config/agsv2" },
        tags = { TAG.RUN },
      },
      {
        args = { "inspect" },
        components = { { "on_complete_dispose", timeout = 0.1 } },
      },
      {
        args = { "toggle" },
        components = { { "on_complete_dispose", timeout = 0.1 } },
        params = {
          window = {
            type = "string",
            name = "Window Name",
            description = "Name of the window to toggle",
            optional = false,
          },
        },
      },
    }

    for _, command in ipairs(commands) do
      build_task(task_list, command)
    end

    return cb(task_list)
  end,
}
