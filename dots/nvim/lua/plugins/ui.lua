return {
  -- Remove Intrusive Cmdline and Notifications
  {
    "folke/noice.nvim",
    enabled = false,
  },
  {
    "rcarriga/nvim-notify",
    enabled = false,
  },
  {
    "j-hui/fidget.nvim",
    opts = {
      notification = {
        override_vim_notify = true,
      },
    },
  },
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
      { "<leader>uB", "<cmd>GitBlameToggle<CR>",        desc = "Toggle Git Blame" },
      { "<leader>gc", "<cmd>GitBlameOpenCommitURL<CR>", desc = "Open Blamed Commit URL" },
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

      -- Git Blame to C Section
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
      -- Remove Trouble v3 from C Section
      table.remove(opts.sections.lualine_c, 6)

      -- Add Branch to Z Section
      opts.sections.lualine_z = { "branch" }
    end,
  },
  {
    "Bekaboo/dropbar.nvim",
    dependencies = {
      "nvim-telescope/telescope-fzf-native.nvim",
    },
    opts = {
      enabled = true,
    },
    init = function()
      vim.opt.winbar = nil
      vim.keymap.set("n", "<leader>ls", require("dropbar.api").pick, { desc = "Select Dropdown Menu" })
    end,
  },
  -- Help with the 20/20/20 rule
  {
    "wildfunctions/myeyeshurt", opts = {}
  },
}
