const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e69aa916e5f64987ad0498a78f93f90d'
});

const handleApiCall=(req,res)=>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data=>{
            res.json(data);
        })  
    .catch(err=> res.status(400).json('Unable to work with API'))
}

const handleImage = (db)=>(req, res) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports={
    handleImage,
    handleApiCall
}