export async function GET(req, res) {


    // Make a note we are on
  
    // the api. This goes to the console.
  
    console.log("in the api page")
  
  
  
    // get the values
  
    // that were sent across to us.
  
    const { searchParams } = new URL(req.url)
  
    const email = searchParams.get('email')
  
    const pass = searchParams.get('pass')

    const confirmemail= searchParams.get('email')
    const Confirmpass= searchParams.get('pass')
  
    console.log(email);
    console.log(Confirmpass)
  
    console.log(pass);
    console.log(confirmemail);

    const bcrypt = require('bcrypt');

    const saltRounds = 10;




   const hash = bcrypt.hashSync(pass, saltRounds);

    const {MongoClient} = require('mongodb')
   const url ='mongodb+srv://admin:test@cluster0.b1dl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
   const client = new MongoClient(url);
  
    const dbName = 'app';
    await client.connect();
    console.log('connected sucess to server');
    const db = client.db(dbName);
    const collection = db.collection('login');
  
   const findResult = await collection.insertOne({"username": email, "pass": hash });
  
  
    // database call goes here
    runDBCallAsync(`http://localhost:3000/api/login?confirmemail=${confirmemail}&confirmpass=${Confirmpass}&email=${email}&pass=${pass}`)



  
    // at the end of the process we need to send something back.
  
    return Response.json({ "status": "registered" })
  
  }
  
  
  