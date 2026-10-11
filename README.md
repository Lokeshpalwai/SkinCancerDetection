# Skin Cancer Detection

## About the Project

Skin Cancer Detection is a web-based machine learning project that accepts an uploaded skin image and processes it using a TensorFlow.js model to produce a prediction score.

The project demonstrates how a trained deep learning model can be integrated into a web application using JavaScript.

## Features

- Upload an image through the browser.
- Load a trained machine learning model.
- Process and resize the uploaded image.
- Display the model's numeric output.
- Provide loading indicators during model processing.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- TensorFlow.js
- Deep Learning

## Project Structure

```text
SkinCancerDetection/
├── index.html
├── public/
│   ├── css/
│   │   ├── main.css
│   │   └── libs/
│   └── js/
│       ├── main.js
│       └── libs/
└── test_images/
```

*The structure above is illustrative; adjust it to match the files in your repository.*

## How to Run

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Start a local development server, such as the Live Server extension.
4. Open the webpage in your browser.
5. Wait for the model to load.
6. Upload an image to view the model's output.

An internet connection is required if the model is loaded from a remote URL.

## Limitations

- The model's class mapping and preprocessing requirements have not been independently verified.
- The displayed output should not be considered a medically reliable prediction.
- This project is intended for educational and demonstration purposes only.
- Do not use this application to diagnose skin conditions or make medical decisions.

## Future Improvements

- Verify the model's original preprocessing and class labels.
- Evaluate predictions using a labeled test dataset.
- Improve input validation and error handling.
- Enhance the user interface and mobile responsiveness.

## Maintainer

**Lokesh Palwai**