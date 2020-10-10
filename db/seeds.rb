9.times do |i|
    Friend.create(
      alias: "Friend #{i + 1}",
      sign: "Taurus",
      likeability: "Close friend",
      experience: "Flying dream",
      message: "Hope you're having a good time",
      instruction: "Make this person suffer"
    #  image: 'https://lh3.googleusercontent.com/proxy/5Sk5o6g27JxOm1UDnAStlvYAEb3KqxhfVm9KZKMr7NlyScEFSJfjtW8sgvvpJYt9roKsWagYafmP2czg56tvFKDUwokOVDuL3pIRGM8'
    )
  end