const express = require('express');
const connectDB = require('./config/db')
connectDB() 
const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json())



app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/blog', require('./routes/blog'))

// Serve Static assets in production

if(process.env.NODE_ENV === 'production'){
  // Set Static Folder
  app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
}); // get anything

}

app.listen(PORT,() => {
  console.log(`The Server is Running Successfully on PORT ${PORT}`)
})