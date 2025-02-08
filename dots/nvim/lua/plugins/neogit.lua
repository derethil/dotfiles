return {
  "NeogitOrg/neogit",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "ibhagwan/fzf-lua",
  },
  config = function(_, opts)
    require("neogit").setup(opts)
  end,
  keys = {
    {
      "<leader>gg",
      function()
        require("neogit").open()
      end,
      desc = "Neogit (Root Dir)",
    },
    {
      "<leader>gG",
      function()
        require("neogit").open({ cwd = vim.fn.expand("%:p:h") })
      end,
      desc = "Neogit (cwd)",
    },
    {
      "<leader>gl",
      function()
        require("neogit").action("log", "log_current", { "--graph", "--decorate" })()
      end,
      desc = "Neogit Log (Root Dir)",
    },
    {
      "<leader>gL",
      function()
        require("neogit").action("log", "log_current", { "--", vim.fn.expand("%:p:h"), "--decorate" })()
      end,
      desc = "Neogit Log (cwd)",
    },
    {
      "<leader>gf",
      function()
        require("neogit").action("log", "log_current", { "--", vim.fn.expand("%:p"), "--decorate" })()
      end,
      desc = "Neogit Log (Buffer)",
    },
    {
      "<leader>gw",
      function()
        require("neogit").action("branch", "checkout_create_branch")()
      end,
      desc = "Switch to New Branch",
    },
  },
  opts = {
    commit_editor = {
      staged_diff_split_kind = "auto",
    },
    integrations = {
      telescope = true,
    },
    graph_style = "unicode",
    git_services = {
      ["gitlab.dragonarmy.rocks"] = "https://gitlab.dragonarmy.rocks/${owner}/${repository}/merge_requests/new?merge_request[source_branch]=${branch_name}",
    },
  },
}
