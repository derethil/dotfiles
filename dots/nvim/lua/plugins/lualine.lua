return {
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
      { "<leader>gB", "<cmd>GitBlameToggle<CR>", desc = "Toggle Git Blame" },
      { "<leader>gC", "<cmd>GitBlameOpenCommitURL<CR>", desc = "Open Blamed Commit URL" },
    },
  },
  {
    "nvim-lualine/lualine.nvim",
    opts = function(_, opts)
      opts.options.component_separators = { left = "|", right = "|" }
      opts.options.section_separators = { left = "", right = "" }

      -- Remove Branch from B Section
      table.remove(opts.sections.lualine_b, 1)
      -- Pretty Filename (Not Full Path)
      table.remove(opts.sections.lualine_c, 4)
      table.insert(opts.sections.lualine_c, 4, {
        require("util.lualine").pretty_filename(),
      })
      -- Git Blame
      local git_blame = require("gitblame")
      table.insert(opts.sections.lualine_c, 5, {
        git_blame.get_current_blame_text,
        cond = git_blame.is_blame_text_available,
        fmt = function(blame)
          local truncate_at = 72
          if #blame > truncate_at then
            blame = blame:sub(1, truncate_at) .. "..."
          end
          return blame
        end,
      })
      -- Change Default Clock Format
      opts.sections.lualine_z = { "branch" }
    end,
  },
}
