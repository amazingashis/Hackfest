async function run(){
    const MODEL_URL = '/model.json';
    const model = await tf.loadLayersModel(MODEL_URL);
    return model
}
run().then((model)=>{
    const img = document.getElementById('img');
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