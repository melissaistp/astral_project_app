9.times do |i|
    Friend.create(
      alias: "Friend #{i + 1}",
      sign: "Taurus",
      likeability: "Close friend",
      experience: "Flying dream",
      message: "Hope you're having a good time",
      instruction: "Make this person suffer",
      image: "assets/ghost.png"
    )
  end