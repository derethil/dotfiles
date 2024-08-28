return {
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
}
