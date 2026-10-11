
'use strict';

let MODEL = null;

const MODEL_URL =
    'https://raw.githubusercontent.com/MartinKondor/SkinCancerDetection/master/trained/model.json';

const IMAGE_SIZE = 224;

const predictionElement = document.getElementById('prediction');
const inputsElement = document.getElementById('inputs');
const loadingElement = document.getElementById('loading');
const loadingDataElement = document.getElementById('loading-data');

async function loadModel() {
    try {
        loadingElement.style.display = 'block';
        inputsElement.style.display = 'none';
        predictionElement.textContent = 'Loading model...';

        MODEL = await tf.loadLayersModel(MODEL_URL);

        loadingElement.style.display = 'none';
        inputsElement.style.display = 'block';
        predictionElement.textContent = 'Model loaded. Upload an image.';
    } catch (error) {
        console.error('Model loading failed:', error);
        loadingElement.style.display = 'none';
        predictionElement.textContent = 'Unable to load model.';
    }
}

async function processInput(input) {
    const file = input.files && input.files[0];

    if (!file || !MODEL) return;

    let imageURL;
    let imageTensor;
    let resizedTensor;
    let batchTensor;
    let outputTensor;

    loadingDataElement.style.display = 'block';

    try {
        imageURL = URL.createObjectURL(file);

        const image = new Image();
        image.src = imageURL;

        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(new Error('Invalid image.'));
        });

        imageTensor = tf.browser.fromPixels(image);

        resizedTensor = tf.image.resizeBilinear(
            imageTensor,
            [IMAGE_SIZE, IMAGE_SIZE]
        );

        batchTensor = resizedTensor.expandDims(0);

        outputTensor = MODEL.predict(batchTensor);

        const values = await outputTensor.data();
        const score = Number(values[0]);

        if (!Number.isFinite(score)) {
            throw new Error('Invalid model output.');
        }

        console.log('Model score:', score);

        // Provisional mapping; original training labels are unverified.
        const result = score >= 0.5 ? 'Malignant' : 'Benign';

        predictionElement.textContent =
            'Tentative prediction: ' + result +
            ' (Score: ' + score.toFixed(4) + ')';

    } catch (error) {
        console.error('Prediction failed:', error);
        predictionElement.textContent = 'Unable to process image.';
    } finally {
        if (imageTensor) imageTensor.dispose();
        if (resizedTensor) resizedTensor.dispose();
        if (batchTensor) batchTensor.dispose();
        if (outputTensor) outputTensor.dispose();

        if (imageURL) URL.revokeObjectURL(imageURL);

        loadingDataElement.style.display = 'none';
        input.value = '';
    }
}

loadModel();
