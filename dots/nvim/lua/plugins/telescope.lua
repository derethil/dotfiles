return {
  "nvim-telescope/telescope.nvim",
  keys = {
    { "<leader>fb", "<cmd>Telescope builtin<cr>", desc = "Find Telescope builtins" },
  },
  opts = {
    pickers = {
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
}
