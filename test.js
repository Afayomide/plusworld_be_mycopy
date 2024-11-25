const AWS = require('@aws-sdk/client-s3');
require("dotenv").config();


// Set up the AWS credentials directly in the code
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN, // Only needed if you're using temporary credentials
  },
  region: process.env.AWS_REGION
});

// Function to update metadata for all files in the bucket
const updateAllFilesMetadata = async (bucketName) => {
  try {
    // List all objects in the bucket
    const listParams = {
      Bucket: bucketName
    };

    let continuationToken;
    let isTruncated = true;

    while (isTruncated) {
      if (continuationToken) {
        listParams.ContinuationToken = continuationToken;
      }

      const data = await s3.listObjectsV2(listParams);
      isTruncated = data.IsTruncated;
      continuationToken = data.NextContinuationToken;

      // Iterate over each object and copy it with new metadata
      for (const object of data.Contents) {
        const { Key } = object;
        console.log(`Updating metadata for: ${Key}`);

        // Copy object with new metadata
        const copyParams = {
          Bucket: bucketName,
          CopySource: `${bucketName}/${Key}`,
          Key: Key,
          MetadataDirective: 'REPLACE', // Replace existing metadata
          ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', // New Content-Type (adjust for your file type)
          ContentEncoding: 'identity', // New Content-Encoding (identity means no compression)
        };

        await s3.copyObject(copyParams);
        console.log(`Metadata updated for: ${Key}`);
      }
    }

    console.log('Metadata update for all files is complete.');
  } catch (error) {
    console.error('Error updating metadata:', error);
  }
};

// Call the function with your bucket name
updateAllFilesMetadata(process.env.AWS_S3_BUCKET_NAME);


