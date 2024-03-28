return {

  -- Comments
  {
    'JoosepAlviste/nvim-ts-context-commentstring',
    lazy = true,
    opts = {
      enable_autocmd = false,
    },
  },
  {
    'echasnovski/mini.comment',
    event = 'VeryLazy',
    opts = {
      options = {
        custom_commentstring = function()
          return require('ts_context_commentstring.internal').calculate_commentstring() or vim.bo.commentstring
        end,
      },
    },
  },

  -- Git Integration
  {
    'lewis6991/gitsigns.nvim',
    opts = {
      signs = {
        add = { text = '▎' },
        change = { text = '▎' },
        delete = { text = '' },
        topdelete = { text = '' },
        changedelete = { text = '▎' },
        untracked = { text = '▎' },
      },
      on_attach = function(buffer)
        local gs = package.loaded.gitsigns

        local function map(mode, l, r, desc)
          vim.keymap.set(mode, l, r, { buffer = buffer, desc = desc })
        end

        map('n', ']h', gs.next_hunk, 'Next Hunk')
        map('n', '[h', gs.prev_hunk, 'Prev Hunk')
        map({ 'n', 'v' }, '<leader>ghs', ':Gitsigns stage_hunk<CR>', 'Stage Hunk')
        map({ 'n', 'v' }, '<leader>ghr', ':Gitsigns reset_hunk<CR>', 'Reset Hunk')
        map('n', '<leader>ghS', gs.stage_buffer, 'Stage Buffer')
        map('n', '<leader>ghu', gs.undo_stage_hunk, 'Undo Stage Hunk')
        map('n', '<leader>ghR', gs.reset_buffer, 'Reset Buffer')
        map('n', '<leader>ghp', gs.preview_hunk_inline, 'Preview Hunk Inline')
        map('n', '<leader>ghb', function()
          gs.blame_line { full = true }
        end, 'Blame Line')
        map('n', '<leader>ghd', gs.diffthis, 'Diff This')
        map('n', '<leader>ghD', function()
          gs.diffthis '~'
        end, 'Diff This ~')
        map({ 'o', 'x' }, 'ih', ':<C-U>Gitsigns select_hunk<CR>', 'GitSigns Select Hunk')
      end,
    },
  },

  -- Telescope
  {
    'nvim-telescope/telescope.nvim',
    event = 'VimEnter',
    version = false,
    dependencies = {
      {
        'nvim-telescope/telescope-fzf-native.nvim',
        build = 'make',
        cond = function()
          return vim.fn.executable 'make' == 1
        end,
      },
      { 'nvim-telescope/telescope-ui-select.nvim' },
    },
    keys = {
      { '<leader>sh', Util.telescope 'help_tags', desc = '[S]earch [H]elp' },
      { '<leader>sk', Util.telescope 'keymaps', desc = '[S]earch [K]eymaps' },
      { '<leader>sf', Util.telescope 'find_files', desc = '[S]earch [F]iles' },
      { '<leader>ss', Util.telescope 'builtin', desc = '[S]earch [S]elect Telescope' },
      { '<leader>sw', Util.telescope 'grep_string', desc = '[S]earch current [W]ord' },
      { '<leader>sg', Util.telescope 'live_grep', desc = '[S]earch by [G]rep' },
      { '<leader>sd', Util.telescope 'diagnostics', desc = '[S]earch [D]iagnostics' },
      { '<leader>sr', Util.telescope 'resume', desc = '[S]earch [R]esume' },
      { '<leader>s.', Util.telescope 'oldfiles', desc = '[S]earch Recent Files ("." for repeat)' },
      { '<leader><leader>', Util.telescope 'buffers', desc = '[ ] Find existing buffers' },
      { '<leader>cs', Util.telescope 'colorscheme', desc = 'Set [C]olor [S]cheme' },
      { '<leader>s/', Util.telescope('live_grep', { grep_open_files = true }), desc = '[S]earch [/] in Open Files' },
      { '<leader>sn', Util.telescope('find_files', { cwd = vim.fn.stdpath 'config' }), desc = '[S]earch [N]eovim files' },
      { '<leader>/', Util.telescope 'current_buffer_fuzzy_find', '[/] Fuzzily search in current buffer' },
    },
    config = function()
      require('telescope').setup {
        extensions = {
          ['ui-select'] = {
            require('telescope.themes').get_dropdown(),
          },
        },
        pickers = {
          current_buffer_fuzzy_find = { prompt_title = 'Current Buffer Fuzzy Search' },
          colorscheme = {
            layout_strategy = 'horizontal',
            enable_preview = true,
          },
        },
        defaults = {
          -- Make rg follow symbolic links
          vimgrep_arguments = {
            'rg',
            '-L',
            '--color=never',
            '--no-heading',
            '--with-filename',
            '--line-number',
            '--column',
            '--smart-case',
          },
          -- Mappings
          mappings = {
            n = { ['q'] = require('telescope.actions').close },
          },
          -- Layout
          layout_strategy = 'flex',
          layout_config = {
            vertical = { prompt_position = 'top', mirror = true },
            horizontal = { prompt_position = 'top', preview_width = 0.55 },
            flex = { flip_columns = 150 },
          },
          -- Misc
          file_ignore_patterns = { 'node_modules ' },
        },
      }

      pcall(require('telescope').load_extension, 'fzf')
      pcall(require('telescope').load_extension, 'ui-select')
    end,
  },
}
