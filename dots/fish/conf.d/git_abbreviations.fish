# Git abbreviations (source: https://gist.github.com/james2doyle/6e8a120e31dbaa806a2f91478507314c#file-git-fish-L49)
abbr -a gd "git diff -M"
abbr -a ga "git add"
abbr -a gf "git fetch"
abbr -a gaa "git add --all ."
abbr -a gbd "git branch -D"
abbr -a gbl "git branch --list"
abbr -a gs "git status"
abbr -a gca "git commit -a -m"
abbr -a gm "git merge --no-ff"
abbr -a gpt "git push --tags"
abbr -a gP "git push"
abbr -a gp "git pull"
abbr -a gpf "git push --force-with-lease"
abbr -a grh "git reset --hard"
abbr -a gb "git branch"
abbr -a gcob "git checkout -b"
abbr -a gco "git checkout"
abbr -a gba "git branch -a"
abbr -a gcp "git cherry-pick"
abbr -a gl "git log --pretty=format:\"%Cgreen%h%Creset - %Cblue%an%Creset @ %ar : %s\""
abbr -a gl2 "git log --pretty='format:%Cgreen%h%Creset %an - %s' --graph"
abbr -a glv "git log --stat"
abbr -a gpom "git pull origin master"
abbr -a gcd 'cd "`git rev-parse --show-toplevel`"'
abbr -a gw 'git switch'

# remove files that are not under version control
abbr -a gcf "git clean -fd"
# discard changes in the working directory
abbr -a gcod "git checkout -- ."
# grab the latest upstream version
abbr -a gpum "git pull upstream master"
# delete branch from github. follow with branch name
abbr -a gpod "git push origin --delete"
# show git status without untracked files
abbr -a gsu "git status -uno"
# commit -m
abbr -a gcm "git commit -m"
abbr -a gcv "git commit --verbose"
abbr -a gcn "git commit --amend --no-edit"
abbr -a gc "git commit --verbose"
# diff in sublime
abbr -a gds "git diff | sublime"
# remove staged file
abbr -a grm "git reset HEAD"
# add current files, commit those file
abbr -a gacm "git add . --all; git commit --verbose"
# list the git tags by date
abbr -a gtd "git log --tags --simplify-by-decoration --pretty=\"format:%ai %d\""
# list stats for the repo
abbr -a grs "git shortlog -s -n --all --no-merges"
# open current repo and branch in browser
abbr -a gop "git open"
# prune branches
abbr -a gpr git_prune_merged

# prune merged branches
function git_prune_merged
    if test (count $argv) -ne 1
        echo "Usage: prune_merged <branch>"
        return 1
    end

    set branch $argv[1]

    if not git rev-parse --verify $branch >/dev/null 2>&1
        echo "Branch '$branch' does not exist"
        return 1
    end

    if test (count (git branch --merged=$branch)) -eq 0
        echo "No branches to prune"
        return 1
    end

    git branch --merged=$branch | grep -v "$branch" | xargs -n 1 git branch -d
    git fetch --prune
end
