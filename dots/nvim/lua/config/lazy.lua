local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not (vim.uv or vim.loop).fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath })
end

vim.opt.rtp:prepend(vim.env.LAZY or lazypath)

require("lazy").setup({
  spec = {
    {
      "LazyVim/LazyVim",
      import = "lazyvim.plugins"
    },
    -- Coding Extras
    { import = "lazyvim.plugins.extras.coding.copilot" },
    { import = "lazyvim.plugins.extras.coding.copilot-chat" },
    { import = "lazyvim.plugins.extras.coding.yanky" },
    { import = "lazyvim.plugins.extras.coding.mini-surround" },
    -- Debug Adapter Protocol Extras
    { import = "lazyvim.plugins.extras.dap.core" },
    -- Editor Extras
    { import = "lazyvim.plugins.extras.editor.mini-move" },
    { import = "lazyvim.plugins.extras.editor.mini-diff" },
    { import = "lazyvim.plugins.extras.editor.refactoring" },
    { import = "lazyvim.plugins.extras.editor.dial" },
    { import = "lazyvim.plugins.extras.editor.illuminate" },
    { import = "lazyvim.plugins.extras.editor.outline" },
    -- Lang Extras
    { import = "lazyvim.plugins.extras.lang.python" },
    { import = "lazyvim.plugins.extras.lang.typescript" },
    { import = "lazyvim.plugins.extras.lang.tailwind" },
    { import = "lazyvim.plugins.extras.lang.json" },
    { import = "lazyvim.plugins.extras.lang.clangd" },
    { import = "lazyvim.plugins.extras.lang.cmake" },
    { import = "lazyvim.plugins.extras.lang.yaml" },
    { import = "lazyvim.plugins.extras.lang.docker" },
    -- Linting Extras
    { import = "lazyvim.plugins.extras.linting.eslint" },
    -- Util Extras
    { import = "lazyvim.plugins.extras.util.dot" },
    { import = "lazyvim.plugins.extras.util.project" },
    -- LazyVim Plugins
    { import = "plugins" },
  },
  defaults = {
    lazy = false,
    version = false,            -- always use the latest git commit
  },
  checker = { enabled = true }, -- automatically check for plugin updates
  performance = {
    rtp = {
      disabled_plugins = {
        "gzip",
        "tarPlugin",
        "tohtml",
        "tutor",
        "zipPlugin",
      },
    },
  },
})
