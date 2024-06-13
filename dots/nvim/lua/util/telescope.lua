local pickers = require("telescope.pickers")
local builtin = require("telescope.builtin")
local previewers = require("telescope.previewers")
local finders = require("telescope.finders")
local config = require("telescope.config").values
local actions = require("telescope.actions")
local action_state = require("telescope.actions.state")

local Job = require("plenary.job")

local M = {}

-- Grep Current Buffer

function M.grep_current_buffer()
  require("telescope.builtin").current_buffer_fuzzy_find(require("telescope.themes").get_ivy({
    previewer = false,
  }))
end

-- AGS Variable Picker

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

-- Git Utils

local diff_so_fancy = previewers.new_termopen_previewer {
  get_command = function(entry)
    -- Command for Git Status
    if entry.status == '??' or 'A ' then
      return { "git", "diff", entry.path }
    end
    -- For Git Commits and Git BCommits
    return { "git", "diff", entry.path .. "^!" }
  end
}
function M.dsf_git_status(opts)
  opts = opts or {}
  opts.previewer = diff_so_fancy
  builtin.git_status(opts)
end

function M.dsf_git_commits(opts)
  opts = opts or {}
  opts.previewer = diff_so_fancy
  builtin.git_commits(opts)
end

function M.dsf_git_bcommits(opts)
  opts = opts or {}
  opts.previewer = diff_so_fancy
  builtin.git_bcommits(opts)
end

return M
