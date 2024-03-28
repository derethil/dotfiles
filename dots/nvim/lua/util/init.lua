local M = {}

setmetatable(M, {
    __index = function(t, k)
        local module = require('util.' .. k)
        rawset(t, k, module) -- Cache the module
        return module
    end
})

return M