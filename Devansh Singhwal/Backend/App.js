const express = require('express')
const mongoose = require('mongoose');
const Company = require('./model/Company');
const cors  = require('cors')


const app = express();
app.use(cors())
app.use(express.json())
// app.use("/",(req,res,next)=>{
//     res.send("app has started")
// })
app.get('/search', async (req, res, next) => {
    // We look for a query parameter "search"
    console.log(req.query,Company)
    if(req.query.search){
      const { search } = req.query;
      let result;
      if (search) { // If search exists, the user typed in the search bar
        result = await Company.aggregate(
         [
      {
        '$search': {
          'index': 'searchcomp', 
          'autocomplete': {
            'query': search, 
            'path': 'name'
          }
        }
      }, 
      {
        '$match': {
          '$or': [
            {
              'name': {
                '$regex': search,
                '$options': 'i'
              }
            },
            {
              'headline': {
                '$regex': search,
                '$options': 'i'
              }
            },
            {
              'description': {
                '$regex': search,
                '$options': 'i'
              }
            }
          ]
        }
      },
      {
        '$limit': 5
      }, {
        '$project': {
          'name': 1, 
          'primary_text': 1, 
          'description': 1, 
          'headline': 1
        }
      }
    ]
        )
  };

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched results',
    data: { result },
  }); 

} else { // The search is empty so the value of "search" is undefined
        result = await Company.find().sort({ createdAt: 'desc' });
      }
    
     
    }  
  );
mongoose.connect("mongodb+srv://singhwaldevansh:vC8ahcUb1oEurf1h@cluster0.ku5d3ft.mongodb.net/").then(()=>{
    console.log("connected to mongoose")
}).then(()=>{
    app.listen(8000);
}).catch((err)=> console.log(err))
//vC8ahcUb1oEurf1h
