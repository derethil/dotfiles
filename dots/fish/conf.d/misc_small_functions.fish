function activate
    source ./.venv/bin/activate.fish
end

function refish
    source ~/.config/fish/config.fish
end

function yay
    if contains -- -So $argv
        # Check if a pckage name weas provided
        if test (count $argv) != 2
            return
        end
        
        # Get AUR URL 
        set -l url (command yay -Si $argv[2] | grep 'AUR URL' | awk '{ print $4 }')
        
        if test -z $url
            # Exit if no URL is found
            command echo 'yay: no AUR URL Found'
            return 1
        else
            # Otherwise open URL in browser
            command xdg-open $url
        end
    else
        command yay $argv
    end
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
        set -l dir (basename -s .git (basename $argv[-1]))

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
