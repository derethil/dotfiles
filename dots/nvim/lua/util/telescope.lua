---@diagnostic disable: param-type-mismatch
local M = {}

function M.grep_current_buffer()
  require("telescope.builtin").current_buffer_fuzzy_find(require("telescope.themes").get_dropdown({
    winblend = 10,
    previewer = false,
  }))
end

function M.copy_selected_file_entry_path()
  local entry = require("telescope.actions.state").get_selected_entry()
  local path = entry and entry.value
  if path then
    vim.fn.setreg("+", path, "c")
  else
    local fb_utils = require("telescope._extensions.file_browser.utils")
    fb_utils.notify("actions.copypath", { msg = "Couldn't copy path to clipboard!", level = "WARN" })
  end
end

function M.open_selected_file_entry_with_system()
  local entry = require("telescope.actions.state").get_selected_entry()
  local path = entry and entry.value

  if path then
    require("lazy.util").open(path, { system = true })
  else
    local fb_utils = require("telescope._extensions.file_browser.utils")
    fb_utils.notify("actions.open", { msg = "Couldn't open file!", level = "WARN" })
  end
end

return M
