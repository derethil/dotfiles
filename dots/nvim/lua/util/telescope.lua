local pickers = require("telescope.pickers")
local finders = require("telescope.finders")
local config = require("telescope.config").values
local actions = require("telescope.actions")
local action_state = require("telescope.actions.state")

local M = {}

function M.grep_current_buffer()
  require("telescope.builtin").current_buffer_fuzzy_find(require("telescope.themes").get_ivy({
    previewer = false,
  }))
end

function M.grep_ags_style_variables(opts)
  local path = "/tmp/ags/variables.scss"

  -- Check if the file exists
  if vim.fn.filereadable(path) == 0 then
    print("File not found: " .. path)
    return
  end

  -- Function to read the variables from the file
  local function read_file()
    local file = io.open(path, "r")

    if file == nil then
      return nil
    end

    local lines = {}
    for line in file:lines() do
      line = line:match("([^:]+):")
      table.insert(lines, line)
    end
    file:close()
    return lines
  end

  -- Run the search
  opts = opts or {}
  pickers.new(opts, {
    prompt_title = "AGS Style Variables",
    finder = finders.new_table(read_file()),
    sorter = config.generic_sorter(opts),
    attach_mappings = function(prompt_bufnr)
      actions.select_default:replace(function()
        actions.close(prompt_bufnr)
        local selection = action_state.get_selected_entry()
        vim.api.nvim_put({ selection.value }, "", false, true)
      end)
      return true
    end,
  }):find()
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
