-- Highlight on Yank
vim.api.nvim_create_autocmd('TextYankPost', {
  desc = 'Highlight when yanking (copying) text',
  group = vim.api.nvim_create_augroup('highlight-yank', { clear = true }),
  callback = function()
    vim.highlight.on_yank()
  end,
})

-- Detect if Git Directory
-- Doing this on-demand is a bit slow (especially when running it on user input) so I prefetch the value on cwd change
vim.api.nvim_create_autocmd({ 'VimEnter', 'DirChanged' }, {
  desc = 'Detect if in a repository when changing cwd',
  group = vim.api.nvim_create_augroup('cwd', { clear = true }),
  callback = function()
    vim.fn.jobstart('cd ' .. vim.uv.cwd() .. '; git rev-parse --is-inside-work-tree', {
      on_exit = function(_, code, _)
        _G.Vars.cwd_is_git = (code == 0)
      end,
    })
  end,
})
