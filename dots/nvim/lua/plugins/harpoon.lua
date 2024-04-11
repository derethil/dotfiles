return {
  "ThePrimeagen/harpoon",
  branch = "harpoon2",
  keys = function()
    local keys = {
      -- Unmap Default LazyVim Harpoon Keys
      { "<space>H", "<nop>" },
      { "<space>h", "<nop>" },
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

    for file = 1, 5, 1 do
      table.insert(keys, {
        "<leader>r" .. file,
        function()
          require("harpoon"):list():remove_at(file)
        end,
        desc = "Harpoon Remove File " .. file,
      })

      table.insert(keys, {
        "<leader>" .. file,
        function()
          require("harpoon"):list():select(file)
        end,
        desc = "Harpoon to File " .. file,
      })
    end

    return keys
  end,
}
