# Pacman Abbreviations
abbr -a pac 'pacman -S'   # install
abbr -a pacu 'pacman -Syua'    # update
abbr -a pacr 'pacman -Rs'   # remove
abbr -a pacs 'pacman -Ss'      # search
abbr -a paci 'pacman -Si'      # info
abbr -a paclo 'pacman -Qdt'    # list orphans
abbr -a pacro 'paclo && sudo pacman -Rns $(pacman -Qtdq)' # remove orphans
abbr -a pacc 'pacman -Scc'    # clean cache
abbr -a paclf 'pacman -Ql'   # list files
