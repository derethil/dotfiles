return {
  {
    "hrsh7th/nvim-cmp",
    opts = function(_, opts)
      opts.mapping["<CR>"] = nil
    end,
  },
  {
    "tikhomirov/vim-glsl",
  },
  {
    "akinsho/git-conflict.nvim",
    version = "*",
    event = "VeryLazy",
    config = function(_, opts)
      require("git-conflict").setup(opts)
    end,
    opts = {
      default_mappings = false,
      default_commands = true,
    },
    keys = {
      { "<leader>mo", "<cmd>GitConflictCHooseOurs<CR>",   "Git Conflict: Choose Ours" },
      { "<leader>mt", "<cmd>GitConflictChooseTheirs<CR>", "Git Conflict: Choose Theirs" },
      { "<leader>mb", "<cmd>GitConflictChooseBoth<CR>",   "Git Conflict: Choose Both" },
      { "<leader>m0", "<cmd>GitConflictChooseNone<CR>",   "Git Conflict: Choose None" },
      { "[m",         "<cmd>GitConflictPrevConflict<CR>", "Go to Previous Conflict" },
      { "]m",         "<cmd>GitConflictNextConflict<CR>", "Go to Next Conflict" },
      { "<leader>xm", "<cmd>GitConflictListQf<CR>",       "Git Conflicts List" },
    },
  },
  {
    "tris203/precognition.nvim",
    lazy = true,
    event = { 'LazyFile', 'VeryLazy' },
    opts = {
      startVisible = false,
      showBlankVirtLine = false,
    },
    config = function(_, opts)
      require("precognition").setup(opts)
    end,
    keys = {
      { "<leader>uk", function() require("precognition").toggle() end, desc = "Toggle Precognition Hints" }
    }
  }
}