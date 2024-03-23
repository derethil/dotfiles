# Pacman Abbreviations
abbr --position anywhere -a paca 'pacman -S'       # install
abbr --position anywhere -a pacu 'pacman -Syua'    # update
abbr --position anywhere -a pacr 'pacman -Rns'     # remove
abbr --position anywhere -a pacs 'pacman -Ss'      # search
abbr --position anywhere -a paci 'pacman -Si'      # info
abbr --position anywhere -a paclo 'pacman -Qdt'    # list orphans
abbr --position anywhere -a pacro 'pacman -Qdt && sudo pacman -Rns $(pacman -Qtdq)' # remove orphans
abbr --position anywhere -a pacc 'pacman -Scc'     # clean cache
abbr --position anywhere -a paclf 'pacman -Ql'     # list files

# Yay Abbreviations
abbr --position anywhere -a yaya 'yay -S'         # install
abbr --position anywhere -a yayr 'yay -Rns'       # remove
abbr --position anywhere -a yays 'yay -Ss'        # search
abbr --position anywhere -a yayi 'yay -Si'        # info
abbr --position anywhere -a yaylo 'yay -Qdt'      # list orphans
abbr --position anywhere -a yayro 'yay -Qdt && yay -Rns $(yay -Qtdq)' # remove orphans
abbr --position anywhere -a yayc 'yay -Scc'       # clean cache
abbr --position anywhere -a yaylf 'yay -Ql'       # list files
abbr --position anywhere -a yayo 'yay -So'        # open AUR page
