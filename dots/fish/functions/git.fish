function git
    if test $argv[1] = clone
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
