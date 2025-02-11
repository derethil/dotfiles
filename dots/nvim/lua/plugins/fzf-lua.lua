return {
  {
    "piersolenski/telescope-import.nvim",
    dependencies = "nvim-telescope/telescope.nvim",
  },
  {
    "ibhagwan/fzf-lua",
    keys = {
      { "<leader>fb", "<cmd>FzfLua builtin<cr>", desc = "Find Telescope builtins" },
      { "<leader>fy", "<cmd>FzfLua filetypes<cr>", desc = "Find Filestypes" },
      { "<leader>fd", "<cmd>FzfLua files cwd=~/.dotfiles/<cr>", desc = "Find Dotfiles" },
    },
    opts = {
      defaults = {
        previewer = false,
        preview_pager = "diff-so-fancy",
      },
    },
  },
  {
    "nvim-telescope/telescope.nvim",
    lazy = true,
    keys = {
      {
        "<leader>fi",
        "<cmd>Telescope import<cr>",
        desc = "Add Import",
      },
    },
    config = function(_, opts)
      require("telescope").setup(opts)
      require("telescope").load_extension("import")
    end,
    opts = {
      extensions = { import = { insert_at_top = true } },
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
