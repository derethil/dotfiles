return {
  -- Disable Defaults
  { "folke/noice.nvim", enabled = false },
  { "rcarriga/nvim-notify", enabled = false },
  { "lukas-reineke/indent-blankline.nvim", enabled = false },
  -- Less Intrusive notifications
  {
    "j-hui/fidget.nvim",
    opts = {
      notification = {
        override_vim_notify = true,
        window = {
          winblend = 0,
        },
      },
    },
  },
  -- Git Blame
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
  -- Custom Lualine Config
  {
    "nvim-lualine/lualine.nvim",
    opts = function(_, opts)
      opts.options.component_separators = { left = "|", right = "" }
      opts.options.section_separators = { left = "", right = "" }

      -- Remove Branch from B Section
      table.remove(opts.sections.lualine_b, 1)

      -- Pretty Filename (Not Full Path)
      table.remove(opts.sections.lualine_c, 4)
      table.insert(opts.sections.lualine_c, 4, {
        require("util.lualine").pretty_filename(),
      })

      -- Remove Symbols from C Section
      table.remove(opts.sections.lualine_c, 5)
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

      -- Y Section
      opts.sections.lualine_y = {
        { "progress", separator = { left = "", right = nil } },
        {
          function()
            local words = vim.fn.wordcount()["words"]
            return words .. " words"
          end,
          cond = function()
            local ft = vim.bo.filetype
            local count = {
              latex = true,
              tex = true,
              text = true,
              markdown = true,
              vimwiki = true,
            }
            return count[ft] ~= nil
          end,
        },
      }

      -- Add Branch to Z Section
      opts.sections.lualine_z = { { "branch", separator = { left = "", right = nil } } }
    end,
  },
  {
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
  },
}
