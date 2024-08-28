return {
  -- Git Blame Buffer Window
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
  -- Git Blame Statusline
  {
    "f-person/git-blame.nvim",
    event = "VeryLazy",
    opts = {
      display_virtual_text = false,
      message_template = "<author> • <date> • <summary>",
      date_format = "%r",
      message_when_not_committed = "Not Committed",
      delay = 0,
    },
    keys = {
      { "<leader>uo", "<cmd>GitBlameToggle<CR>", desc = "Toggle Statusline Git Blame" },
      { "<leader>gC", "<cmd>GitBlameOpenCommitURL<CR>", desc = "Git Browse Commit" },
    },
  },
}
