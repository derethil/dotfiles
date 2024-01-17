function activate
    source ./.venv/bin/activate.fish
end

function refish
    source ~/.config/fish/config.fish
end

function mkdir -d "Create a directory and set CWD"
    command mkdir $argv
    if test $status = 0
        switch $argv[(count $argv)]
            case '-*'

            case '*'
                cd $argv[(count $argv)]
                return
        end
    end
end

# Always cd after git clone
function git
    command git $argv
    if test $status = 0
        switch $argv[1]
            case 'clone'
                cd $argv[(count $argv)]
                return
        end
    end
end