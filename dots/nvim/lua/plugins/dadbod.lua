vim.api.nvim_create_autocmd("FileType", {
  pattern = { "sql", "mysql", "plsql", "pgsql", "sqlite", "dbui" },
  callback = function()
    local cmp = require("cmp")
    cmp.setup.buffer({
      sources = {
        { name = "vim-dadbod-completion" },
        { name = "buffer" },
      },
    })
  end,
})

local function is_dadbod_closed()
  for _, buf in ipairs(vim.api.nvim_list_bufs()) do
    if vim.api.nvim_buf_is_loaded(buf) then
      local buf_name = vim.api.nvim_buf_get_name(buf)
      if string.find(buf_name, "dbui") then
        return false
      end
    end
  end
  return true
end

local function dadbod_toggle()
  -- if dbui is closed, open it
  if is_dadbod_closed() then
    vim.cmd("DBUI")
    return
  end

  -- if dbui is open, close all dbui buffers
  for _, buf in ipairs(vim.api.nvim_list_bufs()) do
    if vim.api.nvim_buf_is_loaded(buf) then
      local buf_name = vim.api.nvim_buf_get_name(buf)
      local ft = vim.api.nvim_get_option_value("filetype", { buf = buf })

      if buf_name:find("dbout") or ft == "sql" then
        vim.api.nvim_buf_delete(buf, { force = true })
      end
    end
  end

  -- finally, close dbui itself
  vim.cmd("DBUIClose")
end

return {
  {
    "tpope/vim-dadbod",
  },
  {
    "kristijanhusak/vim-dadbod-completion",
  },
  {
    "kristijanhusak/vim-dadbod-ui",
    dependencies = {
      { "tpope/vim-dadbod", lazy = true },
      {
        "kristijanhusak/vim-dadbod-completion",
        ft = { "sqlite" },
        lazy = true,
      },
    },
    cmd = { "DBUI", "DBUIToggle", "DBUIAddConnection", "DBUIFindBuffer" },
    keys = {
      { "<leader>td", dadbod_toggle, desc = "Toggle Dadbod UI" },
      { "<leader>tf", "<cmd>DBUIFindBuffer<cr>", desc = "Find Dadbod Buffer" },
      { "<leader>ta", "<cmd>DBUIAddConnection<cr>", desc = "Add Dadbod Connection" },
    },
    init = function()
      vim.g.db_ui_use_nerd_fonts = 1
      vim.g.db_ui_use_nvim_notify = 1
    end,
  },
}
