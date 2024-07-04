return {
  -- Color Previews
  {
    "brenoprata10/nvim-highlight-colors",
    config = function(_, opts)
      require("nvim-highlight-colors").setup(opts)
    end,
    event = "LazyFile",
    ft = { "typescriptreact", "javascriptreact", "css", "javascript", "typescript", "html" },
    opts = {
      render = "virtual",
      virtual_symbol = "",
      enable_named_colors = true,
      enable_tailwind = true,
    },
  },
  -- Disable Space Completion
  {
    "hrsh7th/nvim-cmp",
    opts = function(_, opts)
      opts.mapping["<CR>"] = nil
    end,
  },
  -- Build Better Vim Habits
  {
    "m4xshen/hardtime.nvim",
    event = "VeryLazy",
    dependencies = { "MunifTanjim/nui.nvim", "nvim-lua/plenary.nvim" },
    keys = {
      { "<leader>uk", "<cmd>Hardtime toggle<cr>", "Toggle Hardtime" },
    },
    opts = {
      enabled = false,
    },
  },
  {
    "tris203/precognition.nvim",
    lazy = true,
    event = { "LazyFile", "VeryLazy" },
    opts = {
      startVisible = false,
      showBlankVirtLine = false,
    },
    config = function(_, opts)
      require("precognition").setup(opts)
    end,
    keys = {
      {
        "<leader>uk",
        function()
          require("precognition").toggle()
        end,
        desc = "Toggle Precognition Hints",
      },
    },
  },
  -- Git Merge Conflicts
  {
    "akinsho/git-conflict.nvim",
    version = "*",
    lazy = false,
    config = function(_, opts)
      require("git-conflict").setup(opts)
    end,
    opts = {
      default_mappings = false,
      default_commands = true,
    },
    keys = {
      { "<leader>mo", "<cmd>GitConflictCHooseOurs<cr>", desc = "Git Conflict: Choose Ours" },
      { "<leader>mt", "<cmd>GitConflictChooseTheirs<cr>", desc = "Git Conflict: Choose Theirs" },
      { "<leader>mb", "<cmd>GitConflictChooseBoth<cr>", desc = "Git Conflict: Choose Both" },
      { "<leader>m0", "<cmd>GitConflictChooseNone<cr>", desc = "Git Conflict: Choose None" },
      { "[m", "<cmd>GitConflictPrevConflict<cr>", desc = "Go to Previous Conflict" },
      { "]m", "<cmd>GitConflictNextConflict<cr>", desc = "Go to Next Conflict" },
      { "<leader>xm", "<cmd>GitConflictListQf<cr>", desc = "Git Conflicts List" },
    },
  },
  -- Git Blame Window
  {
    "FabijanZulj/blame.nvim",
    config = function(_, opts)
      require("blame").setup(opts)
    end,
    keys = {
      { "<leader>uB", "<cmd>BlameToggle<CR>", desc = "Toggle Git Blame" },
    },
    opts = {
      date_format = "%d/%m/%Y",
      merge_consecutive = false,
    },
  },
  -- Git Integration
  {
    "NeogitOrg/neogit",
    dependencies = {
      "nvim-lua/plenary.nvim",
      "sindrets/diffview.nvim",
      "ibhagwan/fzf-lua",
    },
    config = function(_, opts)
      require("neogit").setup(opts)
    end,
    keys = {
      { "<leader>gg", "<cmd>Neogit<cr>", desc = "Neogit" },
    },
    opts = {
      commit_editor = {
        staged_diff_split_kind = "auto",
      },
      integrations = {
        diffview = true,
        fzf = true,
      },
      graph_style = "unicode",
      git_services = {
        ["gitlab.dragonarmy.rocks"] = "https://gitlab.dragonarmy.rocks/${owner}/${repository}/merge_requests/new?merge_request[source_branch]=${branch_name}",
      },
    },
  },
  -- File Explorer
  {
    "mikavilpas/yazi.nvim",
    event = "VeryLazy",
    keys = {
      {
        "<leader>e",
        function()
          require("yazi").yazi()
        end,
        desc = "Open File Explorer (buffer dir)",
      },
      {
        "<leader>E",
        function()
          require("yazi").yazi(nil, LazyVim.root())
        end,
        desc = "Open File Explorer (root dir)",
      },
    },
    opts = {
      open_for_directories = true,
      yazi_floating_window_border = "rounded",
    },
  },
  {
    "nvim-neo-tree/neo-tree.nvim",
    enabled = false,
  },
  -- {
  --   "stevearc/oil.nvim",
  --   opts = {
  --     delete_to_trash = true,
  --     use_default_keymaps = false,
  --     skip_confirm_for_simple_edits = false,
  --     view_options = {
  --       show_hidden = true,
  --     },
  --     keymaps = {
  --       ["g?"] = "actions.show_help",
  --       ["<C-y>"] = "actions.select",
  --       ["<CR>"] = "actions.select",
  --       ["<C-\\>"] = "actions.select_vsplit",
  --       ["<C-->"] = "actions.select_split",
  --       ["<C-u>"] = "actions.preview",
  --       ["q"] = "actions.close",
  --       ["<C-r>"] = "actions.refresh",
  --       ["-"] = "actions.parent",
  --       ["_"] = "actions.open_cwd",
  --       ["`"] = "actions.cd",
  --       ["~"] = "actions.tcd",
  --       ["gs"] = "actions.change_sort",
  --       ["gx"] = "actions.open_external",
  --       ["gt"] = "actions.toggle_trash",
  --       ["g."] = "actions.toggle_hidden",
  --     },
  --   },
  --   config = function(_, opts)
  --     require("oil").setup(opts)
  --   end,
  --   dependencies = { "nvim-tree/nvim-web-devicons" },
  --   keys = {
  --     {
  --       "<leader>e",
  --       function()
  --         require("oil").open()
  --       end,
  --       desc = "Open Oil Explorer (Cwd)",
  --     },
  --     {
  --       "<leader>E",
  --       function()
  --         require("oil").open(LazyVim.root())
  --       end,
  --       desc = "Open Oil Explorer (Root Dir)",
  --     },
  --   },
  -- },
  {
    "arnamak/stay-centered.nvim",
    event = "VeryLazy",
    config = function(_, opts)
      require("stay-centered").setup(opts)
    end,
    keys = {
      {
        "<leader>ct",
        function()
          local plug = require("stay-centered")
          plug.toggle()
          if plug.cfg.enabled then
            vim.notify("Center Cursor Enabled", vim.log.levels.INFO)
          else
            vim.notify("Center Cursor Disabled", vim.log.levels.WARN)
          end
        end,
        desc = "Toggle Center Cursor",
      },
    },
  },
}
