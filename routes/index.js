var express = require('express');
var router = express.Router();

const aws = require('aws-sdk');
aws.config.region = 'us-west-1';

//const S3_BUCKET = 's3bucket4me';//process.env.S3_BUCKET;
//console.log(S3_BUCKET) 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account', function(req, res, next) {
  res.render('account');
});
process.env.AWS_ACCESS_KEY_ID='AKIAJ4BJU7HYM6WQORVA'
process.env.AWS_SECRET_ACCESS_KEY='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'
process.env.S3_BUCKET = 's3bucket4me'
console.log('S3_BUCKET') 
//console.log(process.env)
const S3_BUCKET = process.env.S3_BUCKET;

router.get('/sign-s3', (req, res) => {
console.log(S3_BUCKET) 

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


module.exports = router;
