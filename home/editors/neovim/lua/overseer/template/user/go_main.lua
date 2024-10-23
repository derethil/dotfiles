return {
  name = "Run Go Main",
  builder = function()
    return {
      cmd = { "go", "run" },
      args = { "main.go" },
    }
  end,
  condition = { filetype = { "go" } },
}
