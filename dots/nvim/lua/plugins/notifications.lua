return {
  { "folke/noice.nvim", enabled = false },
  { "rcarriga/nvim-notify", enabled = false },
  { "j-hui/fidget.nvim", opts = {
    notification = {
      override_vim_notify = true,
    },
  } },
}
