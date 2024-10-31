local function get_cwd_as_name()
  local dir = vim.fn.getcwd(0)
  return dir:gsub("[^A-Za-z0-9]", "_")
end

local status

vim.api.nvim_create_autocmd("User", {
  desc = "Save Overseer tasks during Persistence session save",
  pattern = "PersistenceSavePre",
  callback = function()
    local overseer = require("overseer")
    overseer.save_task_bundle(get_cwd_as_name(), nil, { on_conflict = "overwrite" })
  end,
})

vim.api.nvim_create_autocmd("User", {
  desc = "Load Overseer tasks during Persistence session load",
  pattern = "PersistenceLoadPost",
  callback = function()
    local overseer = require("overseer")
    overseer.load_task_bundle(get_cwd_as_name(), { ignore_missing = true })

    -- List loaded tasks to notify user
    local tasks = overseer.list_tasks({ status })
    local message = "Restored " .. #tasks .. " Overseer task" .. (#tasks == 1 and "" or "s")
    if #tasks > 0 then
      vim.notify(message, vim.log.levels.INFO, { title = "Overseer" })
    end
  end,
})

vim.keymap.set({ "n", "x", "v" }, "<space>or", function()
  local overseer = require("overseer")
  vim.cmd("OverseerRestartLast")

  -- Don't do anything if there are no tasks
  local most_recent = overseer.list_tasks({ status = status, recent_fist = true })[1]
  if not most_recent then
    return
  end

  vim.notify("Restarted last Overseer task: " .. most_recent.name, vim.log.levels.INFO, { title = "Overseer" })
end, { desc = "Restart Last Task" })

return {
  "stevearc/overseer.nvim",
  opts = function()
    local overseer = require("overseer")
    status = { overseer.STATUS.RUNNING, overseer.STATUS.PENDING }
    return {
      templates = { "builtin", "user.go", "user.nix" },
      bundles = {
        save_task_opts = {
          on_conflict = "overwrite",
          status = status,
        },
        autostart_on_load = true,
      },
    }
  end,
}
