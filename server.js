const express = require('express');
const createBucket = require('./main'); // Adjust the path as needed

const app = express();
const port = 3000; // Change this to your desired port number

app.get('/create_bucket', async (req, res) => {
  const bucketName = req.query.name || 'default_bucket_name'; // Use a default name if not provided in the query
  console.log('/create_bucket RECEIVE', req.query)

  const result = await createBucket(bucketName);
  console.log('/create_bucket RESPONSE', result)

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});