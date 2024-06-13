return {
  -- Telescope Configuration
  { "nvim-telescope/telescope-ui-select.nvim" },
  {
    "nvim-telescope/telescope.nvim",
    keys = {
      {
        "<leader>fb",
        "<cmd>Telescope builtin<cr>",
        desc = "Find Telescope builtins",
      },
      {
        "<leader>fy",
        "<cmd>Telescope filetypes<cr>",
        desc = "Select filetype",
      },
      {
        "<leader>/",
        function()
          require("util.telescope").grep_current_buffer()
        end,
        desc = "Grep (buffer)",
      },
      {
        "<leader>fv",
        function()
          require("util.telescope").grep_ags_style_variables(require("telescope.themes").get_dropdown())
        end,
        desc = "Find AGS Style Variables",
      },
      {
        "<leader>.",
        function()
          require("telescope.builtin").find_files(require("telescope.themes").get_ivy({
            cwd = vim.fn.expand("%:p:h"),
            prompt_title = "Find Sibling Files",
            preview = true,
          }))
        end,
        desc = "Find Files (Buffer Dir)",
      },
      {
        "<leader>gs",
        function()
          require("util.telescope").dsf_git_status()
        end,
        desc = "Git Status",
      },
    },
    opts = {
      defaults = {
        preview = {
          hide_on_startup = true,
        },
        layout_strategy = "flex",
        sorting_strategy = "ascending",
        layout_config = {
          vertical = { prompt_position = "top", mirror = true },
          horizontal = { prompt_position = "top", preview_width = 0.55 },
          flex = { flip_columns = 150 },
        },
        mappings = {
          ["i"] = {
            ["<esc>"] = require("telescope.actions").close,
            ["<C-u>"] = require("telescope.actions.layout").toggle_preview,
          },
        },
      },
    },
  },
}
