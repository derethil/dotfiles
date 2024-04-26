return {
  { "nvim-telescope/telescope-ui-select.nvim" },
  {
    "nvim-telescope/telescope.nvim",
    keys = {
      { "<leader>fb", "<cmd>Telescope builtin<cr>", desc = "Find Telescope builtins" },
      {
        "<leader>/",
        function()
          require("util.telescope").grep_current_buffer()
        end,
        desc = "Grep (buffer)",
      },
    },
    opts = {
      pickers = {
        find_files = {
          hidden = true,
        },
        colorscheme = {
          layout_strategy = "horizontal",
          enable_preview = true,
        },
      },
      defaults = {
        layout_strategy = "flex",
        sorting_strategy = "ascending",
        layout_config = {
          vertical = { prompt_position = "top", mirror = true },
          horizontal = { prompt_position = "top", preview_width = 0.55 },
          flex = { flip_columns = 150 },
        },
      },
    },
  },
}
