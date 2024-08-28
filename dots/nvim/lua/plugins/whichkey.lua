return {
  "folke/which-key.nvim",
  config = function(_, opts)
    local icons = LazyVim.config.icons
    local wk = require("which-key")
    wk.setup(opts)
    wk.add({
      { "<leader>m", group = "conflicts", icon = { icon = "󰊢", color = "orange" } },
      { "<leader>D", group = "dadbod", icon = { icon = icons.kinds.Struct, color = "green" } },
      { "<leader>r", group = "refactor", icon = { icon = icons.kinds.Interface, color = "yellow" } },
      { "<leader>e", hidden = true },
    })
  end,
}
