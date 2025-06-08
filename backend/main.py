from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import networkx as nx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {status_code: 200, detail: "API is up and running 🚀"}

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    

    # Basic validations
    if len(nodes) == 0:
        raise HTTPException(status_code=400, detail="No nodes found in the pipeline. Please add at least one node.")

    if len(nodes) == 1 and len(edges) == 0:
        raise HTTPException(status_code=400, detail="A single node without any connections is not a valid pipeline.")

    if len(nodes) > 1 and len(edges) == 0:
        raise HTTPException(status_code=400, detail="Multiple nodes detected, but no connections found. Connect the nodes to form a valid pipeline.")

    # Build graph and check DAG
    G = nx.DiGraph()
    for node in nodes:
        G.add_node(node["id"])
    for edge in edges:
        G.add_edge(edge["source"], edge["target"])

    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag
    }