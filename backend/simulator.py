import numpy as np
import pandas as pd


def generate_candidates(count: int):

    np.random.seed(42)

    colleges = np.random.choice(
        ["Tier-1", "Tier-2", "Tier-3"],
        size=count,
        p=[0.30, 0.40, 0.30]
    )

    locations = np.random.choice(
        ["Metro", "Tier-2 City", "Tier-3/Rural"],
        size=count,
        p=[0.40, 0.35, 0.25]
    )

    genders = np.random.choice(
        ["Female", "Male", "Other"],
        size=count,
        p=[0.45, 0.50, 0.05]
    )

    technical_scores = np.clip(
        np.random.normal(72, 12, count),
        35,
        100
    )

    experience_scores = np.clip(
        np.random.normal(68, 15, count),
        30,
        100
    )

    english_scores = np.clip(
        np.random.normal(72, 12, count),
        35,
        100
    )

    df = pd.DataFrame({
        "college": colleges,
        "location": locations,
        "gender": genders,
        "technical": technical_scores,
        "experience": experience_scores,
        "english": english_scores
    })

    df["college_score"] = df["college"].map({
        "Tier-1": 95,
        "Tier-2": 75,
        "Tier-3": 55
    })

    return df


def run_pipeline(
    count=10000,
    technical_weight=50,
    college_weight=20,
    experience_weight=30
):

    df = generate_candidates(count)

    technical_weight /= 100
    college_weight /= 100
    experience_weight /= 100

    # Resume screening
    df["resume_score"] = (
        df["technical"] * technical_weight
        + df["college_score"] * college_weight
        + df["experience"] * experience_weight
    )

    df["resume_pass"] = df["resume_score"] >= 65

    # Technical assessment
    df["technical_pass"] = (
        (df["technical"] >= 60)
        & df["resume_pass"]
    )

    # Interview
    interview_score = (
        df["technical"] * 0.65
        + df["experience"] * 0.35
    )

    df["interview_pass"] = (
        (interview_score >= 65)
        & df["technical_pass"]
    )

    # Final selection
    df["selected"] = (
        (interview_score >= 70)
        & df["interview_pass"]
    )

    return df


def calculate_rates(df, column):

    result = []

    for group in ["Tier-1", "Tier-2", "Tier-3"]:

        group_df = df[df["college"] == group]

        total = len(group_df)

        rate = (
            group_df[column].sum() / total * 100
            if total > 0
            else 0
        )

        result.append({
            "group": group,
            "rate": round(float(rate), 2),
            "count": total
        })

    return result


def calculate_results(df):

    stages = {
        "resume": "resume_pass",
        "technical": "technical_pass",
        "interview": "interview_pass",
        "selected": "selected"
    }

    stage_results = {}

    for name, column in stages.items():

        stage_results[name] = calculate_rates(
            df,
            column
        )

    max_gap = 0
    max_stage = None

    for stage, values in stage_results.items():

        rates = [
            item["rate"]
            for item in values
        ]

        if rates:

            gap = max(rates) - min(rates)

            if gap > max_gap:
                max_gap = gap
                max_stage = stage

    return {
        "total_candidates": len(df),
        "stage_results": stage_results,
        "largest_disparity": round(float(max_gap), 2),
        "disparity_stage": max_stage
    }