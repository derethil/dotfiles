return {
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
      { "location", separator = { left = nil, right = nil } },
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

    opts.sections.lualine_x = { "overseer" }

    -- Add Branch to Z Section
    opts.sections.lualine_z = { { "branch", separator = { left = "", right = nil } } }
  end,
}
