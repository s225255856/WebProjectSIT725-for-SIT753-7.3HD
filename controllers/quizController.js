const QuizSubmission = require('../models/quizSubmission');

// Generates gift suggestions
function getGiftSuggestions(age, budget, recipient, personality) {
  const suggestions = [];

  // Age-based suggestions
  if (age === 'under12') {
    suggestions.push("Lego Kit", "Coloring Book", "RC Car");
  } else if (age === '13to20') {
    suggestions.push("Bluetooth Speaker", "Comic Hoodie", "Desk Lamp");
  } else if (age === '21to35') {
    suggestions.push("Smart Watch", "Leather Wallet", "Fitness Band");
  } else {
    suggestions.push("Massage Pillow", "Classic Novel", "Indoor Plant Set");
  }

  // Budget-based suggestions
  if (budget === 'under20') {
    suggestions.push("Cute Keychain", "Custom Mug", "Socks Gift Set");
  } else if (budget === '20to50') {
    suggestions.push("Perfume", "Desk Organizer", "Bluetooth Earbuds");
  } else if (budget === '50to100') {
    suggestions.push("Mini Projector", "Spa Gift Basket", "Wireless Charger");
  } else {
    suggestions.push("Designer Handbag", "Smart Gadget", "Luxury Candle Set");
  }

  // Recipient-based suggestions
  if (recipient === 'partner') {
    suggestions.push("Date Night Box", "Couple Photo Frame");
  } else if (recipient === 'friend') {
    suggestions.push("Friendship Bracelet", "Polaroid Album");
  } else if (recipient === 'family') {
    suggestions.push("Memory Journal", "Custom Calendar");
  } else {
    suggestions.push("Coffee Gift Box", "Notebook Set");
  }

  // Personality-based suggestions
  if (personality === 'trendy') {
    suggestions.push("Trendy Beanie", "LED Room Lights");
  } else if (personality === 'thoughtful') {
    suggestions.push("Book Subscription", "Handwritten Letter Kit");
  } else if (personality === 'creative') {
    suggestions.push("DIY Craft Kit", "Sketch Pad");
  } else if (personality === 'practical') {
    suggestions.push("Reusable Water Bottle", "Tool Set");
  }

  return [...new Set(suggestions)].slice(0, 5); // Ensure unique and only 5
}

// Submits quiz and renders recommendation view
exports.submitQuizAndRedirect = async (req, res) => {
  try {
    const { username, recipient, age, budget, occasion, personality } = req.body;

    const newSubmission = await QuizSubmission.create({
      username,
      recipient,
      age,
      budget,
      occasion,
      personality,
    });

    const suggestions = getGiftSuggestions(age, budget, recipient, personality);

    res.render('quizRecommendation', {
  user: null,
  username,
  suggestions: suggestions.map(title => ({ title }))
});


  } catch (error) {
    console.error("❌ Error submitting quiz:", error);
    res.status(500).send("Internal server error");
  }
};
