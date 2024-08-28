return {
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
}
