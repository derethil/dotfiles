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
    "kristijanhusak/vim-dadbod-ui",
    keys = {
      { "<leader>td", dadbod_toggle, desc = "Toggle Dadbod UI" },
      { "<leader>tf", "<cmd>DBUIFindBuffer<cr>", desc = "Find Dadbod Buffer" },
      { "<leader>ta", "<cmd>DBUIAddConnection<cr>", desc = "Add Dadbod Connection" },
    },
  },
}
