exports.connectConfig = {
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b2742dd9273833',
  password: '99f7887d5ff6a81',
  database: 'heroku_766db354cb15187',
  multipleStatements: true,
}

// exports.connectConfig =
//     {
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'root',
//         database: 'cos4105',
//         multipleStatements: true,
//     }

// exports.googleCloudConfig =
//     {
//         CLOUD_BUCKET_IMG: 'student_upload_images',
//         CLOUD_BUCKET_PDF: 'reportfacerecognizer',
//         PROJECT_ID: '627471179698',
//     }
exports.googleCloudConfig =
    {
        CLOUD_BUCKET_IMG: 'student_upload',
        CLOUD_BUCKET_PDF: 'report_facerecognizer',
        CLOUD_BUCKET_KEY: 'key_facerecognizer', //not use.
        PROJECT_ID: '204186457948',
        KEY_RING_ID: 'mykeyring',  //not use.
        CRYPTO_KEY_ID:  'namekeyring', //not use.
        SERVICE_ACCOUNT_KEY:'My Project-068c33e27d80.json'
    }
