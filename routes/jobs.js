var express = require("express");
var router = express.Router();

let jobs = [
  {
    id: 1,
    customerName: "John Doe",
    jobType: "Plumbing",
    status: "Scheduled",
    appointmentDate: "2024-06-15T09:00:00Z",
    technician: "Jane Smith",
  },
  {
    id: 2,
    customerName: "Alice Johnson",
    jobType: "Electrical",
    status: "Completed",
    appointmentDate: "2024-05-20T14:00:00Z",
    technician: "Bob Brown",
  },
];
let lastId = 3;
function createID() {
  return lastId++;
}
/* Retrieves all jobs. */
router.get("/", function (req, res, next) {
  res.send(jobs);
});

/* Retrieves a specific job by ID */
router.get("/:id", function (req, res, next) {
  const found = jobs.find((job) => job.id == req.params.id);
  if (!found) {
    next({ message: `No job with id ${req.params.id} found!`, status: 404 });
  } else {
    res.send(found);
  }
});

/* Adds a new job record */
router.post("/", function (req, res, next) {
  const newID = createID();
  const newJob = { ...req.body, id: newID };
  jobs.push(newJob);
  res.status(200);
  res.send(newJob);
});

/* Updates an existing job record. */
router.put("/:id", function (req, res, next) {
  const found = jobs.find((job) => job.id == req.params.id);
  if (!found) {
    next({ message: `No job with id ${req.params.id} found!`, status: 404 });
  } else {
    const newJob = { ...req.body, id: found.id };
    jobs = jobs.map((job) => (job.id == newJob.id ? newJob : job));
    res.status(200);
    res.send(jobs);
  }
});

/* Deletes a job record.  */
router.delete("/:id", function (req, res, next) {
  const found = jobs.find((job) => job.id == req.params.id);
  if (!found) {
    next({ message: `No job with id ${req.params.id} found!`, status: 404 });
  } else {
    jobs = jobs.filter((job) => job.id.toString() !== req.params.id);
    res.status(200);
    res.send(jobs);
  }
});

module.exports = router;
