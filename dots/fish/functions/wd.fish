
function wd
    if test -z $argv
        echo "Usage: wd <pattern>"
        return 1
    end

    set pattern (echo "$argv\$")
    set results (locate -r $pattern)

    if test (count $results) -eq 0
        echo "No results found for $argv"
        return 1
    end

    set selected (echo $results | string split " " | fzf -i)

    if test (count $selected) -ne 1
        echo "No selection made"
        return 1
    end

    z $selected
end
