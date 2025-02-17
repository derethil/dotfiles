return {
  "nvim-lualine/lualine.nvim",
  opts = function(_, opts)
    opts.options.component_separators = { left = "|", right = "" }
    opts.options.section_separators = { left = "", right = "" }
    opts.sections.lualine_b = {}
    opts.sections.lualine_c[4] = { require("util.lualine").pretty_filename() }
    table.remove(opts.sections.lualine_c, 1)
    table.remove(opts.sections.lualine_c, 4)
    -- Git Blame
    local git_blame = require("gitblame")
    table.insert(opts.sections.lualine_c, 4, {
      git_blame.get_current_blame_text,
      cond = git_blame.is_blame_text_available,
      fmt = function(blame)
        local truncate_at = 80
        if #blame > truncate_at then
          blame = blame:sub(1, truncate_at) .. "..."
        end
        return blame
      end,
    })
    opts.sections.lualine_y = {
      { "progress", separator = { left = "", right = nil } },
      { "location", separator = { left = nil, right = nil } },
      -- Word Count
      -- stylua: ignore
      {
        function() return vim.fn.wordcount()["words"] .. " words" end,
        cond = function()
          local count = { latex = true, tex = true, text = true, markdown = true, vimwiki = true }
          return count[vim.bo.filetype] ~= nil
        end,
      },
    }
    opts.sections.lualine_x = { "overseer" }
    opts.sections.lualine_z = {
      { "branch", separator = { left = "", right = nil } },
    }
  end,
}
