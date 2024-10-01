local function get_cwd_as_name()
  local dir = vim.fn.getcwd(0)
  return dir:gsub("[^A-Za-z0-9]", "_")
end

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
    local status = { overseer.STATUS.RUNNING, overseer.STATUS.PENDING }
    local tasks = overseer.list_tasks({ status })
    local message = "Restored " .. #tasks .. " Overseer task" .. (#tasks == 1 and "" or "s")
    vim.notify(message, vim.log.levels.INFO, { title = "Overseer" })
  end,
})

vim.keymap.set({ "n", "x", "v" }, "<space>or", function()
  vim.cmd("OverseerRestartLast")
  vim.notify("Restarted last Overseer task", vim.log.levels.INFO, { title = "Overseer" })
end, { desc = "Restart Last Task" })

return {
  "stevearc/overseer.nvim",
  config = function(opts)
    local overseer = require("overseer")
    overseer.setup(opts)
  end,
  opts = {
    bundles = {
      autostart_on_load = true,
    },
  },
}
