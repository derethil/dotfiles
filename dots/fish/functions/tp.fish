
function tp
    set arg $argv[1]
    set selected_path (locate $arg | fzf)

    if test -n "$selected_path"
        if test -d "$selected_path"
            cd $selected_path
        else if test -f "$selected_path"
            cd (dirname $selected_path)
        else
            echo "Error: Selected path is neither a file nor a directory!"
            exit 1
        end
    else
        echo "No selection made!"
        exit 1
    end
end
