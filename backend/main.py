from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from simulator import run_pipeline, calculate_results


app = FastAPI(
    title="FairPath API",
    description="Hiring Fairness Simulation Platform",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimulationRequest(BaseModel):
    job_role: str
    candidate_count: int
    technical_weight: float
    college_weight: float
    experience_weight: float


@app.get("/")
def root():
    return {
        "application": "FairPath",
        "status": "online"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/api/simulate")
def simulate(request: SimulationRequest):

    total_weight = (
        request.technical_weight
        + request.college_weight
        + request.experience_weight
    )

    if abs(total_weight - 100) > 0.01:
        return {
            "success": False,
            "error": "Weights must total 100%"
        }

    if request.candidate_count < 100:
        return {
            "success": False,
            "error": "Candidate count must be at least 100"
        }

    df = run_pipeline(
        count=request.candidate_count,
        technical_weight=request.technical_weight,
        college_weight=request.college_weight,
        experience_weight=request.experience_weight
    )

    results = calculate_results(df)

    return {
        "success": True,

        "job_role": request.job_role,

        "configuration": {
            "candidate_count":
                request.candidate_count,

            "technical_weight":
                request.technical_weight,

            "college_weight":
                request.college_weight,

            "experience_weight":
                request.experience_weight
        },

        "results": results
    }