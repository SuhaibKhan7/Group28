
  import express from "express"
import helmet from "helmet"
import { connectGraphQL } from "./graphql/graphql.js"
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors'
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
  
  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;
  
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';

connectDB(mongoURI);
  
const app = express();
  
const graphqlServer = connectGraphQL();
await graphqlServer.start();
    
                                
  
  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
    
app.use(express.json());

//app.use(express.urlencoded({extended: true}));

app.use("/graphql", expressMiddleware(graphqlServer));
app.use(cors({origin:' * ',credentials:true}));
    
  
  app.get('/', (req, res) => {
     res.send('Hello, World!');
  });
  
  // your routes here
  
    
  app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });
  
  
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  