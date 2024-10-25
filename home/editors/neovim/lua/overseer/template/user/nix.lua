local constants = require("overseer.constants")
local TAG = constants.TAG

local function build_task(tasks, command)
	local cmd = command.cmd or "nh"
	table.insert(tasks, {
		name = string.format("%s %s", cmd, table.concat(command.args, " ")),
		tags = command.tags,
		cwd = vim.fn.getcwd(),
		builder = function()
			return {
				cmd = { cmd },
				args = command.args,
			}
		end,
	})
end

local function get_flake_dir()
	local matches = vim.fs.find("flake.nix", { upward = true })
	if #matches ~= 0 then
		return vim.fs.dirname(matches[1])
	end
end

return {
	condition = {
		callback = function()
			if vim.fn.executable("nh") == 0 then
				vim.print("Command `nh` not found")
				return false, "Command `nh` not found"
			end
			if not get_flake_dir() then
				vim.print("File `flake.nix` not found")
				return false, "File `flake.nix` not found"
			end
			return true
		end,
	},
	generator = function()
		local flake_path = get_flake_dir()
		local task_list = {}

		local commands = {
			{ args = { "os", "switch", flake_path } },
			{ args = { "os", "build", flake_path } },
			{ args = { "os", "boot", flake_path } },
			{ args = { "os", "test", flake_path }, tags = { TAG.TEST } },
			{ args = { "home", "switch", flake_path } },
			{ args = { "home", "build", flake_path } },
			{ args = { "clean", "all" }, tags = { TAG.CLEAN } },
			{ args = { "clean", "user" }, tags = { TAG.CLEAN } },
		}

		for _, command in ipairs(commands) do
			build_task(task_list, command)
		end

		return task_list
	end,
}
