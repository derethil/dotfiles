local function handleRestoreSession()
  local argv = vim.fn.argv()
  if type(argv) == "string" then
    argv = { argv }
  end
  if next(argv) == nil then
    require("persistence").load()
  end
end

return {
  {
    "hiasr/vim-zellij-navigator.nvim",
    config = function()
      require("vim-zellij-navigator").setup()
    end,
  },
  {
    -- After https://github.com/numToStr/Navigator.nvim/pull/35 is merged,
    -- we can switch back to numToStr/Navigator.nvim
    "dynamotn/Navigator.nvim",
    config = function(opts)
      require("Navigator").setup(opts)
    end,
    lazy = false,
    keys = {
      { "<C-h>", "<CMD>NavigatorLeft<CR>", "Navigate Left" },
      { "<C-j>", "<CMD>NavigatorDown<CR>", "Navigate Down" },
      { "<C-k>", "<CMD>NavigatorUp<CR>", "Navigate Up" },
      { "<C-l>", "<CMD>NavigatorRight<CR>", "Navigate Right" },
    },
  },
  {
    "folke/persistence.nvim",
    lazy = false,
    config = function(_, opts)
      local plugin = require("persistence")
      plugin.setup(opts)
      handleRestoreSession()
    end,
  },
}
