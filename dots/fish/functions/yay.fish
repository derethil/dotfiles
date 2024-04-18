function yay
    if contains -- -So $argv
        # Check if a pckage name was provided
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
