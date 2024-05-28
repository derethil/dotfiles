function fish_greeting
    set greeting "from zoya
  🌷🌸🌷🌸
  🌸🌷🌸🌷🌸
 /ᐠ🌷🌸🌷🌸🌷
(˶ᵔᵕᵔ🌷🌸🌷
 \ つ\  /
  U U/🎀\\"

    if type -q tte
        echo $greeting | tte --no-color --frame-rate 300 beams
    else
        echo $greeting
    end
end
