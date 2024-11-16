local constants = require("overseer.constants")
local TAG = constants.TAG

local function build_task(tasks, template)
  local cmd = template.cmd or "ags"

  table.insert(template.components or {}, "default")

  table.insert(tasks, {
    name = string.format("%s %s", cmd, table.concat(template.args, " ")),
    tags = template.tags,
    cwd = vim.fn.getcwd(),
    params = template.params,
    priority = template.priority,
    builder = function(params)
      table.insert(template.args, params.window)
      return {
        cmd = { cmd },
        args = template.args,
        components = template.components,
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
        args = { "run", "--directory", "/home/derethil/.config/astal" },
        priority = 2,
        tags = { TAG.RUN },
      },
      {
        args = { "inspect" },
        priority = 1,
        components = { { "on_complete_dispose", timeout = 0.1 } },
      },
      {
        args = { "quit" },
        priority = 3,
        components = { { "on_complete_dispose", timeout = 0.1 } },
      },
      {
        args = { "toggle" },
        priority = 4,
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
