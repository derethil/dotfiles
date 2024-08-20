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
      { "<leader>mo", "<cmd>GitConflictChooseOurs<cr>", desc = "Git Conflict: Choose Ours" },
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
    keys = {
      { "<leader>uB", "<cmd>BlameToggle<CR>", desc = "Toggle Git Blame Window" },
    },
    opts = {
      date_format = "%m.%d.%Y",
      merge_consecutive = true,
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
  {
    "machakann/vim-swap",
    keys = {
      { "<leader>c<", "<Plug>(swap-prev)", desc = "Swap with Prev" },
      { "<leader>c>", "<Plug>(swap-next)", desc = "Swap with Next" },
      { "<leader>ci", "<Plug>(swap-interactive)", desc = "Interactive Swap" },
    },
  },
  {
    "pocco81/auto-save.nvim",
    event = "BufEnter",
    enabled = false,
    keys = {
      { "<leader>n", "<cmd>ASToggle<cr>", desc = "Toggle Auto Save" },
    },
  },
}
