return {
  {
    "christoomey/vim-tmux-navigator",
    lazy = false,
    keys = {
      { "<C-h>", "<cmd>TmuxNavigateLeft<CR>", "Tmux Navigate Left" },
      { "<C-l>", "<cmd>TmuxNavigateRight<CR>", "Tmux Navigate Right" },
      { "<C-j>", "<cmd>TmuxNavigateDown<CR>", "Tmux Navigate Down" },
      { "<C-k>", "<cmd>TmuxNavigateUp<CR>", "Tmux Navigate Up" },
    },
  },
  {
    "folke/persistence.nvim",
    lazy = false,
    config = function(_, opts)
      local plugin = require("persistence")
      plugin.setup(opts)

      local argv = vim.fn.argv()

      if type(argv) == "string" then
        argv = { argv }
      end

      if next(argv) == nil then
        plugin.load()
      end
    end,
  },
}
