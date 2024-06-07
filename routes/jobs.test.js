const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Jobs Endpoints", () => {
  it("GET /jobs should show all jobs", async () => {
    const res = await requestWithSupertest.get("/jobs");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toEqual(2);
  });

  it("GET /jobs/1 should show job whose id =1", async () => {
    const res = await requestWithSupertest.get("/jobs/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.id).toEqual(1);
  });

  it("POST /jobs should add a job to jobs", async () => {
    const newJob = {
      id: "",
      customerName: "John Doe",
      jobType: "Plumbing",
      status: "Scheduled",
      appointmentDate: "2024-06-15T09:00:00Z",
      technician: "Jane Smith",
    };
    const res = await requestWithSupertest.post("/jobs").send(newJob);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ ...newJob, id: 3 });
  });

  it("PUT /jobs/1 should update job whose id = 1", async () => {
    const newJob = {
      id: 1,
      customerName: "Updated John Doe",
      jobType: "Plumbing",
      status: "Scheduled",
      appointmentDate: "2024-06-15T09:00:00Z",
      technician: "Jane Smith",
    };
    const res = await requestWithSupertest.put("/jobs/1").send(newJob);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));

    const updatedInstance = res.body.find((j) => j.id == 1);
    expect(updatedInstance).toEqual({ ...newJob });
  });

  it("DELETE /jobs/1 should update job whose id = 1", async () => {
    const newJob = {
      id: 1,
      customerName: "Updated John Doe",
      jobType: "Plumbing",
      status: "Scheduled",
      appointmentDate: "2024-06-15T09:00:00Z",
      technician: "Jane Smith",
    };
    const res = await requestWithSupertest.delete("/jobs/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));

    expect(res.body.length).toEqual(2);
  });
});
