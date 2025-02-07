require 'reline'

IRB.conf[:SAVE_HISTORY] ||= 1000
IRB.conf[:HISTORY_FILE] ||= File.join(ENV['XDG_DATA_HOME'], 'irb', 'history')

Reline::Face.config(:completion_dialog) do |conf|
  conf.define :default, foreground: :white, background: :black
end
