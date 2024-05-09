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
        mappings = {
          ["i"] = {
            ["jk"] = require("telescope.actions").close,
          },
        },
      },
    },
  },
  -- File Browser with Telescope
  {
    "nvim-telescope/telescope-file-browser.nvim",
    dependencies = {
      "nvim-telescope/telescope.nvim",
      "nvim-lua/plenary.nvim",
    },
    opts = {
      extensions = {
        file_browser = {
          theme = "ivy",
          grouped = true,
          use_ui_input = false,
          display_stat = false,
          hijack_netrw = true,
          select_buffer = true,
          prompt_path = true,
          mappings = {
            ["n"] = {
              ["Y"] = require("util.telescope").copy_selected_file_entry_path,
              ["O"] = require("util.telescope").open_selected_file_entry_with_system,
            },
            ["i"] = {
              ["<c-s-y>"] = require("util.telescope").copy_selected_file_entry_path,
              ["<c-s-o>"] = require("util.telescope").open_selected_file_entry_with_system,
            },
          },
        },
      },
    },
    config = function(_, opts)
      require("telescope").setup(opts)
      require("telescope").load_extension("file_browser")

      vim.keymap.set("n", "<leader>e", function()
        local file_browser = require("telescope").extensions.file_browser
        file_browser.file_browser({
          path = "%:p:h",
          current_buffer = true,
        })
      end, { desc = "File Browser (cwd)" })

      vim.keymap.set("n", "<leader>E", function()
        local file_browser = require("telescope").extensions.file_browser
        file_browser.file_browser({
          path = LazyVim.root(),
        })
      end, { desc = "File Browser (Root Dir)" })
    end,
  },
  {
    "nvim-neo-tree/neo-tree.nvim",
    enabled = false,
  },
}
