return {
  {
    "vague2k/huez.nvim",
    lazy = false,
    import = "huez-manager.import",
    config = function(_, opts) require("huez").setup(opts) end,
    init = function()
      vim.keymap.set('n', '<leader>uR', '<cmd>HuezLive<cr>', { noremap = true, silent = true })
      vim.keymap.set('n', '<leader>uC', '<cmd>Huez<cr>', { noremap = true, silent = true })
    end
  }
}
