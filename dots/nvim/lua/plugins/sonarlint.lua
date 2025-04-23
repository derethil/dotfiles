local MASON = vim.fn.stdpath("data") .. "/mason"

local function analyzer_paths(analyzers)
  local paths = {}
  for _, analyzer in ipairs(analyzers) do
    table.insert(paths, vim.fn.expand(MASON .. "/share/sonarlint-analyzers/" .. analyzer .. ".jar"))
  end
  return paths
end

return {
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = { "sonarlint-language-server" },
    },
  },
  {
    "https://gitlab.com/sledigabel/sonarlint.nvim",
    ft = {
      "javascript",
      "typescript",
      "javascriptreact",
      "typescriptreact",
      "go",
    },
    opts = {
      server = {
        cmd = {
          MASON .. "/bin/sonarlint-language-server",
          "-stdio",
          "-analyzers",
          unpack(analyzer_paths({
            "sonarjs",
            "sonarpython",
            "sonarhtml",
            "sonargo",
            "sonartext",
          })),
        },
        settings = {
          sonarlint = {
            connectedMode = {
              connections = {
                sonarqube = {
                  {
                    connectionId = "dragonarmy",
                  },
                },
              },
            },
          },
        },
      },
      filetypes = {
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact",
        "go",
      },
    },
  },
}
