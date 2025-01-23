const Note = require("../models/Notes");
const mongoose = require("mongoose");

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "The Unlimited Version",
  };

  try {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;

    const notes = await Note.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 20] },
          createdAt: 1
        }
      }
    ])
    .skip(perPage * (page - 1))
    .limit(perPage);

    const count = await Note.countDocuments({ user: req.user._id });

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).render('error', {
      message: "An error occurred while fetching dashboard",
      error: error.message
    });
  }
};


/**
 * GET /
 * View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Something went wrong.");
  }
};

/**
 * PUT /
 * Update Specific Note
 */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};




// try {
//   await Note.insertMany([
//     {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Gardening Tips",
//         body: "Tips for a thriving garden:\n- Water plants early in the morning\n- Use compost for better soil\n- Prune regularly\n- Rotate crops",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Music Playlist",
//         body: "Favorite songs:\n1. 'Bohemian Rhapsody' by Queen\n2. 'Imagine' by John Lennon\n3. 'Hotel California' by Eagles\n4. 'Stairway to Heaven' by Led Zeppelin",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Startup Ideas",
//         body: "Potential startup ideas:\n- On-demand tutoring app\n- Eco-friendly packaging solutions\n- Virtual event platform\n- Health and wellness subscription box",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Daily Journal",
//         body: "Reflections and thoughts:\n- Today was a productive day\n- Learned new JavaScript concepts\n- Had a great workout session\n- Cooked a delicious dinner",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Movie Watchlist",
//         body: "Movies to watch:\n1. 'Inception'\n2. 'The Matrix'\n3. 'Interstellar'\n4. 'The Shawshank Redemption'\n5. 'The Godfather'",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Workout Plan",
//         body: "Weekly workout plan:\n- Monday: Cardio\n- Tuesday: Strength training\n- Wednesday: Yoga\n- Thursday: HIIT\n- Friday: Rest day",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Learning Goals",
//         body: "Goals for the month:\n- Complete JavaScript course\n- Build a personal website\n- Read two technical books\n- Contribute to an open-source project",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Travel Itinerary",
//         body: "Upcoming travel plans:\n- Visit Tokyo\n- Explore the Great Barrier Reef\n- Hike in the Swiss Alps\n- Experience the Northern Lights in Norway",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Business Strategy",
//         body: "Key strategies:\n- Focus on customer satisfaction\n- Invest in marketing\n- Expand product line\n- Optimize operations",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         user: "67916935732ac5d3bc964b0d",
//         title: "Cooking Experiments",
//         body: "New recipes to try:\n1. Sushi\n2. Paella\n3. Tacos\n4. Ramen\n5. Cheesecake",
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//   ]);
// } catch (error) {
//   console.error("Error inserting dummy notes:", error);
// }