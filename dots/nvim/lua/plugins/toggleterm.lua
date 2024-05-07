return {
  {
    "akinsho/toggleterm.nvim",
    cmd = "ToggleTerm",
    keys = { { "<c-/>", "<cmd>ToggleTerm<cr>", desc = "Toggle terminal" } },
    opts = {
      open_mapping = [[<c-/>]],
      direction = "horizontal",
      autochdir = true,
      hide_numbers = true,
      insert_mappings = false,
      terminal_mappings = false,
      start_in_insert = true,
      close_on_exit = true,
    },
  },
}
