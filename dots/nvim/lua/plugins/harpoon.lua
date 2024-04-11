return {
  "ThePrimeagen/harpoon",
  branch = "harpoon2",
  keys = function()
    local keys = {
      -- Unmap Default LazyVim Harpoon Keys
      { "<space>H", "<nop>" },
      { "<space>h", "<nop>" },
      { "<space>1", "<nop>" },
      { "<space>2", "<nop>" },
      { "<space>3", "<nop>" },
      { "<space>4", "<nop>" },
      { "<space>5", "<nop>" },
      -- Keybinds
      {
        "<space>a",
        function()
          require("harpoon"):list():add()
        end,
        desc = "Harpoon File",
      },
      {
        "<C-d>",
        function()
          local harpoon = require("harpoon")
          harpoon.ui:toggle_quick_menu(harpoon:list())
        end,
        desc = "Harpoon List",
      },
    }

    for key, file in pairs({ h = 1, j = 2, k = 3, l = 4 }) do
      table.insert(keys, {
        "<C-" .. key .. ">",
        function()
          require("harpoon"):list():select(file)
        end,
        desc = "Harpoon to File " .. file,
      })

      table.insert(keys, {
        "<C-S-" .. key .. ">",
        function()
          require("harpoon"):list():remove_at(file)
        end,
        desc = "Harpoon Replace File " .. file,
      })
    end

    return keys
  end,
}
