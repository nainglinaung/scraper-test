const Queue = require('bee-queue');
const queue = new Queue('example', {
    activateDelayedJobs: true,
    isWorker:false
});
var sleep = require('system-sleep');

const keywordsstring = "The widespread popularity of this idea suggests that there may be numerous instances of successful outcomes associated with this behavior."


for (let keyword of keywordsstring.split(" ")) {

    const job = queue.createJob({keyword});
    job.save();
}



// job.on('succeeded', (result) => {
//     console.log(`Received result for job ${job.id}: ${result}`);

// });

// Process jobs from as many servers or processes as you like
queue.process(async function (job, done) {
    console.log(`Processing job ${job.id}`);
    // await sleep(1000);
    console.log(job.data.keyword)
    return 
});