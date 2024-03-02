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

function git
    if test $argv[1] = "clone"
        # Store the output of the original git clone command
        set -l output (command git $argv)

        # Extract the directory name from the clone URL
        set -l dir (basename -s .git $argv[-1])

        # Change directory into the cloned directory if the clone was successful
        if test $status -eq 0
            cd $dir
        end

        # Return the output of the original git clone command
        echo $output
    else
        # For any other git command, execute it as usual
        command git $argv
    end
end
