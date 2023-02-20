import AWS from 'aws-sdk'

const S3_BUCKET = {
    name: process.env.BUCKET_NAME,
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    url: process.env.BUCKET_URL,
}


const UploadFile = (filename, file) => {
    AWS.config.update({
        accessKeyId: S3_BUCKET.accessKeyId,
        secretAccessKey: S3_BUCKET.secretAccessKey
    })

    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET.name},
        region: S3_BUCKET.region,
    })

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET.name,
        Key: filename,
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            console.log(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })

    console.log(`${S3_BUCKET.url}${filename}`)

    return `${S3_BUCKET.url}${filename}`

}

module.exports = UploadFile