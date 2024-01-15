# Pacman Abbreviations
abbr -a pac 'sudo pacman -S'   # install
abbr -a pacu 'sudo pacman -Syua'    # update
abbr -a pacr 'sudo pacman -Rns'   # remove
abbr -a pacs 'pacman -Ss'      # search
abbr -a paci 'pacman -Si'      # info
abbr -a paclo 'pacman -Qdt'    # list orphans
abbr -a pacro 'pacman -Qdt && sudo pacman -Rns $(pacman -Qtdq)' # remove orphans
abbr -a pacc 'sudo pacman -Scc'    # clean cache
abbr -a paclf 'pacman -Ql'   # list files

# Yay Abbreviations
abbr -a yaya 'yay -S'        # install
abbr -a yayr 'yay -Rns'     # remove
abbr -a yays 'yay -Ss'     # search
abbr -a yayi 'yay -Si'     # info
abbr -a yaylo 'yay -Qdt'    # list orphans
abbr -a yayro 'yay -Qdt && yay -Rns $(yay -Qtdq)' # remove orphans
abbr -a yayc 'yay -Scc'     # clean cache
abbr -a yaylf 'yay -Ql'     # list files
