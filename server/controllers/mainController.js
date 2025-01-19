// GET /
// Homepage

exports.homepage = async (req, res) => {
	const locals = {
		title: 'Notebook',
		description: 'The Unlimited Version'
	}
	res.render('index', locals);
}

// GET /
// About
exports.about = async (req, res) => {
	const locals = {
		title: 'About - Notebook',
		description: 'The Unlimited Version'
	}
	res.render('about', locals);
}





























// GET /attributes
// Image Attributes
exports.attributes = async (req, res) => {
  const locals = {
    title: 'Image Attributes - Notebook',
    description: 'Image Attributes Page',
    imageAttributes: [
      { 
        id: 1, 
        src: '../img/passion.jpg', 
        alt: 'Background Image', 
        description: 'This is the first image', 
        width: 400, 
        height: 300, 
        shoutout: 'Photo by <a href="https://unsplash.com/@goian?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ian Schneider</a> on <a href="https://unsplash.com/photos/two-person-standing-on-gray-tile-paving-TamMbr4okv4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' 
      },
    //   { 
    //     id: 2, 
    //     src: 'images/image2.png', 
    //     alt: 'Image 2', 
    //     description: 'This is the second image', 
    //     width: 500, 
    //     height: 400, 
    //     shoutout: 'Thanks to Jane Smith for this amazing photo' 
    //   },
    //   { 
    //     id: 3, 
    //     src: 'images/image3.png', 
    //     alt: 'Image 3', 
    //     description: 'This is the third image', 
    //     width: 600, 
    //     height: 500, 
    //     shoutout: 'Kudos to Bob Johnson for capturing this moment' 
    //   },
    ],
  };
  res.render('attribute', locals);
};
exports.attributesRoute = (app) => {
  app.get('/attributes', exports.attributes);
};
