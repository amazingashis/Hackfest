let modelLoaded = false;
$( document ).ready(async function () {
    const MODEL_URL = '/model.json';
	modelLoaded = false;
    $('.progress-bar').show();
    document.getElementById('model-status').innerHTML = "Loading model...";
    model = await tf.loadLayersModel(MODEL_URL);
    $('.progress-bar').hide();
    document.getElementById('model-status').innerHTML = "Loaded model...";
	modelLoaded = true;
});

$(".predict-btn").click(async function () {
	if (!modelLoaded) { alert("The model must be loaded first"); return; }
	if (!imageLoaded) { alert("Please select an image first"); return; }
	
	let img = $('#selected-image').get(0);
	
	// Pre-process the image
	// const img = document.getElementById('img');
    console.log(model.summary());
    //console.log(img)
    
    //tensor =  tf.browser.fromPixels(img,1);
    //imgclone = tf.image.resizeBilinear(tensor, [50,50], true).toFloat();
    let tensor = tf.browser.fromPixels(img, 1)
    .resizeNearestNeighbor([50, 50]) // change the image size
    .expandDims()
    .toFloat();
    // console.log(tensor)


    const result = model.predict(tensor).data();
    // alert(result)
    result.then((res) => {
        if(res[0] == 1){
            console.log('chest')
            alert('chest')
        }
        else{
            console.log('Skull')
            alert('skull')
        }
    })
});

let imageLoaded = false;
$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
        imageLoaded = true;
	}
	
	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);
});